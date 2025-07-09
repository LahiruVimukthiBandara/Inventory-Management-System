<?php

namespace App\Http\Controllers;

use App\Http\Resources\SaleResource;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller {

    public function index(Request $request) {
        $query = Sale::query();

        if ($request->filled('search')) {
        $search = $request->input('search');

        $query->where(function ($q) use ($search) {
            $q->where('id', $search)
              ->orWhereHas('customer', function ($cusQ) use ($search) {
                  $cusQ->where('name', 'like', '%' . $search . '%');
              });
        });
    }
    if($request->filled('status')){
        $status = $request->input('status');
        $query->where('status', $status);
    }

        $sales = $query->latest()->paginate( 10 );
        return Inertia::render( 'Sales/Sales', [
            'sales' => SaleResource::collection( $sales ),
        ] );
    }

    public function create() {
        return Inertia::render( 'Sales/Create' );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:1',
            'products.*.selling_price' => 'required|numeric|min:0',
            'products.*.subtotal' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {
            $sale = Sale::create([
                'customer_id' => $validated['customer_id'],
                'sale_date' => $validated['sale_date'],
                'status' => $validated['status'],
                'total_amount' => $validated['total_amount'],
            ]);

            foreach ($validated['products'] as $product) {
                $sale->saleItems()->create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'selling_price' => $product['selling_price'],
                    'sub_total' => $product['subtotal'],
                ]);

                if (strtolower($validated['status']) === 'ready') {
                    $productModel = Product::find($product['product_id']);
                    if ($productModel) {
                        $productModel->decrement('stock_quantity', $product['quantity']);
                    }
                }
            }
        });

        return back()->with('success', 'Sale created successfully!');
    }

    public function show( $id ) {
        $sales = Sale::with(['customer', 'saleItems.product'])->findOrFail($id);

        return Inertia::render('Sales/Show',[
            'sales' => new SaleResource($sales)
        ]);
    }

    public function edit(Sale $sale)
    {

        $sale->load(['saleItems.product', 'customer']);

        $saleData = [
            'id' => $sale->id,
            'customer_id' => $sale->customer_id,
            'sale_date' => $sale->sale_date,
            'status' => $sale->status,
            'total_amount' => $sale->total_amount,
            'sale_items' => $sale->saleItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'selling_price' => $item->selling_price,
                    'subtotal' => $item->sub_total,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                    ],
                ];
            }),
        ];

        return inertia('Sales/Create', [
            'sale' => $saleData,
            'customers' => Customer::select('id', 'name')->get(),
            'products' => Product::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:1',
            'products.*.selling_price' => 'required|numeric|min:0',
            'products.*.subtotal' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $sale) {
            if (strtolower($sale->status) === 'ready') {
                foreach ($sale->saleItems as $item) {
                    $product = Product::find($item->product_id);
                    if ($product) {
                        $product->increment('stock_quantity', $item->quantity);
                    }
                }
            }

            $sale->update([
                'customer_id' => $validated['customer_id'],
                'sale_date' => $validated['sale_date'],
                'status' => $validated['status'],
                'total_amount' => $validated['total_amount'],
            ]);

            $sale->saleItems()->delete();

            foreach ($validated['products'] as $productData) {
                $sale->saleItems()->create([
                    'product_id' => $productData['product_id'],
                    'quantity' => $productData['quantity'],
                    'selling_price' => $productData['selling_price'],
                    'sub_total' => $productData['subtotal'],
                ]);

                if (strtolower($validated['status']) === 'ready') {
                    $product = Product::find($productData['product_id']);
                    if ($product) {
                        $product->decrement('stock_quantity', $productData['quantity']);
                    }
                }
                if (strtolower($validated['status']) === 'canceled') {
                    $product = Product::find($productData['product_id']);
                    if ($product) {
                        $product->increment('stock_quantity', $productData['quantity']);
                    }
                }
            }
        });

    return back()->with('success', 'Sale updated successfully!');
    }

    public function destroy( Sale $sale ) {
        //
    }
}
