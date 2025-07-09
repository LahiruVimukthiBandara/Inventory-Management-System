<?php

namespace App\Http\Controllers;

use App\Models\Sale;
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

}
