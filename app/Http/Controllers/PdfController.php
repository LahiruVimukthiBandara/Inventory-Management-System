<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Sale;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class PdfController extends Controller {
    public function sales(Request $request)
    {
        $query = Sale::query();

        // Apply search filter (id or customer name)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                ->orWhereHas('customer', function ($cusQ) use ($search) {
                    $cusQ->where('name', 'like', '%' . $search . '%');
                });
            });
        }

        // Apply status filter
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Get all matching sales (no pagination here)
        $sales = $query->with(['customer', 'saleItems.product'])->latest()->get();

        // Load into PDF view
        $pdf = Pdf::loadView('pdf.sales', [
            'sales' => $sales,
        ]);

        return $pdf->download('Filtered-Sales.pdf');
    }

    public function customerReport($id){
        $customer = Customer::with('sales.saleItems.product')->findOrFail($id);
        $pdf = Pdf::loadView('pdf.customer', [
            'customer' => $customer
        ]);
// dd($customer->sales->pluck('saleItems')->flatten()->pluck('product'));

        return $pdf->download('Customer-report.pdf');
        // return response()->json($customer);
    }
}
