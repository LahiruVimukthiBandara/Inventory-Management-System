<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller {

    public function index( Request $request ) {
        $query = Category::query();

        if ( $request->filled( 'search' ) ) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search){
                $q->where('name', 'like', '%' . $search . '%')
                ->orWhere('id', 'like', '%' . $search . '%');
            });
        }

        $categories = $query->latest()->paginate( 10 );
        return Inertia::render( 'Category', [
            'categories' => CategoryResource::collection( $categories ),
        ] );
    }

    public function create() {
        //
    }

    public function store( Request $request ) {
        $validated = $request->validate( [
            'name' => 'required|string',
            'description' => 'required|string',
        ] );

        $category = Category::create( $validated );

        return back()->with( 'success', 'Category created successfully!' );
    }

    public function show( Category $category ) {
        //
    }

    public function edit( Category $category ) {
        //
    }

    public function update( Request $request, Category $category ) {
        $validated = $request->validate( [
            'name' => 'required|string',
            'description' => 'required|string',
        ] );

        $category->update( $validated );

        return redirect()
        ->route( 'category.index' ) // redirect to categories list page ( or wherever you like )
        ->with( 'success', 'Category updated successfully!' );
    }

    public function destroy( Category $category ) {
        $category->delete();
    }

    public function getCategories(){
        $query = Category::query();

        $categories = $query->latest()->get();
        return response()->json($categories);
    }
}
