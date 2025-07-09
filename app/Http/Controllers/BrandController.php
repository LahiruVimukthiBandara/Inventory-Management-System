<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller {

    public function index( Request $request ) {
        $query = Brand::query();

        if($request->filled('search')){
            $search = $request->input('search');
            $query->where(function ($q) use($search){
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        $brands = $query->latest()->paginate( 10 );
        return Inertia::render( 'Brand', [
            'brands'=> BrandResource::collection( $brands )
        ] );
    }

    public function create() {
        //
    }

    public function store( Request $request ) {

        $validated = $request->validate( [
            'name' => 'required|string|unique:brands,name',
            'description' => 'required|string'
        ] );

        $brand = Brand::create( $validated );
        return back()->with( 'success', 'Brand created successfully' );
    }

    public function show( Brand $brand ) {
        //
    }

    public function edit( Brand $brand ) {
        //
    }

    public function update( Request $request, Brand $brand ) {
        $validated = $request->validate( [
            'name' => 'required|string|unique:brands,name,' . $brand->id,
            'description' => 'required|string'
        ] );

        $brand->update( $validated );
        return back()->with( 'success', 'Brand updated succesfully' );
    }

    public function destroy( Brand $brand ) {
        $brand->delete();
    }

    public function getBrands(){
        $query = Brand::query();

        $brands = $query->latest()->get();

        return response()->json($brands);
    }
}
