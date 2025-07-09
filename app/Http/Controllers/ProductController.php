<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller {
    public function index(Request $request) {
        $query = Product::query();

        if ( $request->filled( 'search' ) ) {
            $search = $request->input( 'search' );
            $query->where( function( $q ) use ( $search ) {
                $q->where( 'name', 'like', '%' . $search . '%' )
                ->orWhere( 'sku', 'like', '%' . $search . '%');
            });
        }
        if($request->filled('status')){
            $status = $request->input('status');
            $query->where('status', $status);
        }

        $products = $query->latest()->paginate( 10 );
        return Inertia::render( 'Product/Product', [
            'products' => ProductResource::collection( $products ),
        ] );
    }

    public function create() {
        //
    }

    public function store( Request $request ) {
        $validated = $request->validate( [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'reorder_level' => 'nullable|integer|min:0',
            'status' => 'required',
            'image' => 'nullable|image|mimes:jpg, jpeg, png, webp|max:2048',
        ] );

        if ( $request->hasFile( 'image' ) ) {
            $validated[ 'image' ] = $request->file( 'image' )->store( 'products', 'public' );
        }

        $sku = strtoupper( substr( preg_replace( '/\s+/', '', $validated[ 'name' ] ), 0, 2 ) ) . rand( 10000, 99999 );
        $validated[ 'sku' ] = $sku;

        $product = Product::create( $validated );

        return back()->with( 'success', 'Product created successfully.' );
    }

   public function show($id)
{
    $product = Product::with(['saleItems', 'purchesItems'])->findOrFail($id);

    return Inertia::render('Product/Show', [
        'product' => new ProductResource($product)
    ]);
}


    public function edit( Product $product ) {
        //
    }

   public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'brand_id' => 'required|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'reorder_level' => 'nullable|integer|min:0',
            'status' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        } else {
            $validated['image'] = $product->image;
        }

        $product->update($validated);

        return back()->with('success', 'Product updated successfully.');
    }


    public function destroy( Product $product ) {
        if ( $product->image && Storage::disk( 'public' )->exists( $product->image ) ) {
            Storage::disk( 'public' )->delete( $product->image );
        }

        $product->delete();

        return back()->with( 'success', 'Product deleted successfully.' );
    }

    public function getProducts(){
        $query = Product::query();
        $products = $query->latest()->get();
        return response()->json($products);
    }

    public function getProductsForSales(){
        $query = Product::query();
        $sellProducts = $query->where('stock_quantity', '>', 'reorder_level')->orWhere('status', '!=', 'unavailable')->get();
        return response()->json($sellProducts);
    }

}
