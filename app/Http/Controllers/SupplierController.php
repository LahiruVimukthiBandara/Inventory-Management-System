<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller {

    public function index( Request $request ) {
        $query = Supplier::query();

        if ( $request->filled( 'search' ) ) {
            $search = $request->input( 'search' );
            $query->where( function( $q ) use( $search ) {
                $q->where( 'name', 'like', '%' . $search . '%' )
                ->orWhere( 'email', 'like', '%' . $search . '%' )
                ->orWhere( 'phone', 'like', '%' . $search . '%' );
            }
        );
    }
    if($request->filled('status')){
        $status = $request->input('status');
        $query->where('status', $status);
    }

    $suppliers = $query->latest()->paginate( 10 );

    return Inertia::render( 'Supplier/Supplier', [
        'suppliers' => SupplierResource::collection( $suppliers )
    ] );
}

public function create() {
    //
}

public function store( Request $request ) {
    $validated = $request->validate( [
        'name'=>'required|string',
        'contact_person'=>'required|string',
        'phone'=>'required|string|unique:suppliers,phone',
        'email'=>'required|string|unique:suppliers,email',
        'status'=>'required|string',
        'address'=>'required|string',
    ] );

    $supplier = Supplier::create( $validated );
    return back()->with( 'success', 'Supplier created successfully!' );

}

public function show($id)
{
    $supplier = Supplier::with('purcheses')->findOrFail($id);

    return Inertia::render('Supplier/Show', [
        'supplier' => $supplier,
    ]);
}


public function edit( Supplier $supplier ) {
    //
}

public function update( Request $request, Supplier $supplier ) {
    $validated = $request->validate( [
        'name' => 'required|string',
        'contact_person' => 'required|string',
        'phone' => 'required|string|unique:suppliers,phone,' . $supplier->id,
        'email' => 'required|string|email|unique:suppliers,email,'.$supplier->id,
        'status' => 'required|string',
        'address' => 'required|string',
    ] );

        $supplier->update( $validated );

        return redirect()->back()->with( 'success', 'Supplier updated successfully.' );
    }

    public function destroy( Supplier $supplier ) {
        $supplier->delete();
    }

    public function getSuppliers( ) {
        $query = Supplier::query();
        $suppliers = $query->where('status', '!=', 'blocked')->get();

        return response()->json($suppliers);
    }
}
