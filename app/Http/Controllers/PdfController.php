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

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('id', $search)
                ->orWhereHas('customer', function ($cusQ) use ($search) {
                    $cusQ->where('name', 'like', '%' . $search . '%');
                });
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $sales = $query->with(['customer', 'saleItems.product'])->latest()->get();

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

        return $pdf->download('Customer-report.pdf');
    }
}
