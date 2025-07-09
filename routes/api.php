<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('brands', [BrandController::class, 'getBrands'])->name('brands');
Route::get('categories', [CategoryController::class, 'getCategories'])->name('categories');
Route::get('suppliers', [SupplierController::class, 'getSuppliers'])->name('suppliers');
Route::get('products', [ProductController::class, 'getProducts'])->name('products');
Route::get('sellProducts', [ProductController::class, 'getProductsForSales'])->name('sellProducts');
Route::get('customers', [CustomerController::class, 'getCustomers'])->name('customers');

// dashboard
Route::get('sales', [DashboardController::class, 'saleOverview'])->name('sales');

// pdf
Route::post('/generate-pdf', [PdfController::class, 'sales']);
Route::get('/customerReport/{id}', [PdfController::class, 'customerReport']);


