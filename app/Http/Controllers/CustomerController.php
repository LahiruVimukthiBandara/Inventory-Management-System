<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller {

    public function index( Request $request ) {
        $query = Customer::query();

        if ( $request->filled( 'search' ) ) {
            $search = $request->input('search');
                $query->where(function($q) use ($search){
                $q->where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        if($request->filled('status')){
            $status = $request->input('status');
            $query->where('status', $status);
        }

        $customers = $query->latest()->paginate( 10 );
        return Inertia::render( 'Customer/Customer', [
            'customers'=> CustomerResource::collection( $customers ),
        ] );
    }

    public function create() {
        //
    }

    public function store( Request $request ) {

        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|unique:customers,phone',
            'email' => 'required|email|unique:customers,email',
            'status' => 'required|string',
            'address' => 'required|string',
        ]);

        $customer = Customer::create($validated);

        return back()->with('success', 'Customer created successfully');
    }

    public function show( $id ) {

        $customer = Customer::with('sales')->findOrFail($id);

        return Inertia::render('Customer/Show', [
            'customer' => $customer
        ]);
    }

    public function edit( Customer $customer ) {
        //
    }

    public function update( Request $request, Customer $customer ) {
        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string|unique:customers,phone,'.$customer->id,
            'email' => 'required|email|unique:customers,email,'.$customer->id,
            'status' => 'required|string',
            'address' => 'required|string',
        ]);

        $customer->update($validated);

         return back()->with('success', 'Customer updated successfully');
    }

    public function destroy( Customer $customer ) {
        $customer->delete();
    }

    public function getCustomers(){
        $query = Customer::query();

        $customers = $query->where('status', '!=', 'blocked')->get();

        return response()->json( $customers);
    }
}
