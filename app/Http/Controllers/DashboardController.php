<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Supplier;
use Illuminate\Http\Request;

class DashboardController extends Controller {
    public function saleOverview() {
        $today = now()->toDateString();
        $startOfMonth = now()->startOfMonth()->toDateString();

        $todaySales = Sale::whereDate( 'created_at', $today )
        ->sum( 'total_amount' );

        $monthSales = Sale::whereDate( 'created_at', '>=', $startOfMonth )
        ->whereDate( 'created_at', '<=', $today )
        ->sum( 'total_amount' );

        $totalSales = Sale::sum( 'total_amount' );

        return response()->json( [
            'today' => $todaySales,
            'month' => $monthSales,
            'total' => $totalSales,
        ] ) ;
    }

    public function productOverview(){

        $productCount = Product::count();
        $customerCount = Customer::count();
        $supplierCount = Supplier::count();

        $activeCustomers = Customer::where('status', 'active')->count();
        $inActiveCustomers = Customer::where('status', 'inactive')->count();
        $blockedCustomers = Customer::where('status', 'blocked')->count();

        $activeSuppliers = Supplier::where('status', 'active')->count();
        $inActiveSuppliers = Supplier::where('status', 'inactive')->count();
        $blockedSuppliers = Supplier::where('status', 'blocked')->count();

        return response()->json([
            'productCount' => $productCount,
            'customerCount' => $customerCount,
            'supplierCount' => $supplierCount,
            'activeCustomers' => $activeCustomers,
            'inActiveCustomers' => $inActiveCustomers,
            'blockedCustomers' => $blockedCustomers,
            'activeSuppliers' => $activeSuppliers,
            'inActiveSuppliers' => $inActiveSuppliers,
            'blockedSuppliers' => $blockedSuppliers,
        ]);
    }

}
