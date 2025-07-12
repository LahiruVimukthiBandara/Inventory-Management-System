<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Customer Sales Report</title>
    <style>
        html, body {
            margin: 10px;
            padding: 10px;
            font-family: DejaVu Sans, sans-serif;
        }
        h1, h2, h3, h4, h5, h6, p, span, label {
            font-family: DejaVu Sans, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        table thead th {
            height: 28px;
            text-align: left;
            font-size: 16px;
        }
        table, th, td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 14px;
        }
        .heading {
            font-size: 24px;
            margin-top: 12px;
            margin-bottom: 12px;
        }
        .total-heading {
            font-size: 18px;
            font-weight: 700;
        }
        .text-start { text-align: left; }
        .text-end { text-align: right; }
        .text-center { text-align: center; }
        .company-data span {
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
        }
        .no-border { border: 1px solid #fff !important; }
        .bg-blue {
            background-color: #414ab1;
            color: #fff;
        }
    </style>
</head>
<body>

    <table class="order-details">
        <thead>
            <tr>
                <th width="50%" colspan="2">
                    <h2 class="text-start">Invento </h2>
                </th>
                <th width="50%" colspan="2" class="text-end company-data">
                    <span>Invoice for: {{ $customer->name }}</span><br>
                    <span>Date: {{ \Carbon\Carbon::now()->format('d/m/Y') }}</span><br>
                    <span>Email: {{ $customer->email }}</span><br>
                    <span>Phone: {{ $customer->phone }}</span><br>
                    <span>Address: {!! nl2br(e($customer->address)) !!}</span><br>
                </th>
            </tr>
            <tr class="bg-blue">
                <th colspan="4">Customer Info</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Name:</td>
                <td>{{ $customer->name }}</td>
                <td>Status:</td>
                <td>{{ ucfirst($customer->status) }}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{{ $customer->email }}</td>
                <td>Phone:</td>
                <td>{{ $customer->phone }}</td>
            </tr>
        </tbody>
    </table>

    @forelse($customer->sales as $sale)
        <table>
            <thead>
                <tr>
                    <th class="no-border text-start heading" colspan="5">
                        Sale ID: {{ $sale->id }} | Date: {{ $sale->sale_date }} | Status: {{ ucfirst($sale->status) }}
                    </th>
                </tr>
                <tr class="bg-blue">
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
                @if($sale->saleItems && $sale->saleItems->count())
                    @foreach($sale->saleItems as $index => $item)
                        <tr>
                            <td>{{ $item->product->sku ?? 'N/A' }}</td>
                            <td>{{ $item->product->name ?? 'N/A' }}</td>
                            <td>Rs. {{ number_format($item->selling_price, 2) }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>Rs. {{ number_format($item->sub_total, 2) }}</td>
                        </tr>
                    @endforeach
                    <tr>
                        <td colspan="4" class="total-heading">Total Amount:</td>
                        <td class="total-heading">Rs. {{ number_format($sale->total_amount, 2) }}</td>
                    </tr>
                @else
                    <tr><td colspan="5">No sale items for this sale.</td></tr>
                @endif
            </tbody>
        </table>
    @empty
        <p>No sales found for this customer.</p>
    @endforelse

    <br>
    <p class="text-center">
        Thank you for doing business with us.
    </p>

</body>
</html>
