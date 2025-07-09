<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchesResource;
use App\Models\Product;
use App\Models\Purches;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PurchesController extends Controller {

 public function index(Request $request)
{
    $query = Purches::query();

    if ($request->filled('search')) {
        $search = $request->input('search');

        $query->where(function ($q) use ($search) {
            $q->where('id', $search)
              ->orWhereHas('supplier', function ($suppQ) use ($search) {
                  $suppQ->where('name', 'like', '%' . $search . '%');
              });
        });
    }

    if($request->filled('status')){
        $status = $request->input('status');
        $query->where('status', $status);
    }

    $purcheses = $query->with('supplier')->latest()->paginate();

    return Inertia::render('Purches/Purches', [
        'purcheses' => PurchesResource::collection($purcheses),
    ]);
}


    public function create() {
        return Inertia::render( 'Purches/Create' );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:1',
            'products.*.cost_price' => 'required|numeric|min:0',
            'products.*.subtotal' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {
            $purches = Purches::create([
                'supplier_id' => $validated['supplier_id'],
                'purchase_date' => $validated['purchase_date'],
                'status' => $validated['status'],
                'total_amount' => $validated['total_amount'],
            ]);

            foreach ($validated['products'] as $product) {
                $purches->purchesItems()->create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'cost_price' => $product['cost_price'],
                    'subtotal' => $product['subtotal'],
                ]);

                if (strtolower($validated['status']) === 'received') {
                    $productModel = Product::find($product['product_id']);
                    if ($productModel) {
                        $productModel->increment('stock_quantity', $product['quantity']);
                    }
                }
            }
        });

        return back()->with('success', 'Purchase created successfully!');
    }


   public function show($id)
    {
        $purches = Purches::with(['supplier', 'purchesItems.products'])->findOrFail($id);

        return Inertia::render('Purches/Show', [
            'purches' => new PurchesResource($purches),
        ]);
    }



    public function edit($id)
    {
        $purches = Purches::with(['supplier', 'purchesItems'])
            ->findOrFail($id);

        return Inertia::render('Purches/Create', [
            'purches' => [
                'id' => $purches->id,
                'supplier_id' => $purches->supplier_id,
                'purchase_date' => $purches->purchase_date,
                'status' => $purches->status,
                'total_amount' => $purches->total_amount,
                'purches_items' => $purches->purchesItems->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'cost_price' => $item->cost_price,
                        'subtotal' => $item->subtotal,
                    ];
                }),
            ],
            'suppliers' => Supplier::select('id', 'name')->get(),
            'products' => Product::select('id', 'name')->get(),
        ]);
    }




    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'purchase_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|numeric|min:1',
            'products.*.cost_price' => 'required|numeric|min:0',
            'products.*.subtotal' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated, $id) {
            // Get existing purchase or fail if not found
            $purches = Purches::findOrFail($id);

            // Update purchase main details
            $purches->update([
                'supplier_id' => $validated['supplier_id'],
                'purchase_date' => $validated['purchase_date'],
                'status' => $validated['status'],
                'total_amount' => $validated['total_amount'],
            ]);

            // Delete existing purchase items (simplest way to avoid stale data)
            $purches->purchesItems()->delete();

            // Recreate purchase items
            foreach ($validated['products'] as $product) {
                $purches->purchesItems()->create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'cost_price' => $product['cost_price'],
                    'subtotal' => $product['subtotal'],
                ]);

                if(strtolower($validated['status']) === 'received'){
                    $productModel = Product::find($product['product_id']);
                    if($productModel){
                        $productModel->increment('stock_quantity', $product['quantity']);
                    }
                }
            }
        });

        return back()->with('success', 'Purchase updated successfully!');
    }


    public function destroy( Purches $purches ) {
        //
    }
}
