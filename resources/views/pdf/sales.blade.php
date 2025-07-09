<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Sales Report</title>
    <style>
        /* Base styles */
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 13px;
            margin: 30px;
            color: #333333;
            background-color: #ffffff;
        }

        /* Header section */
        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #2c3e50;
            font-weight: 700;
            letter-spacing: 1.2px;
        }

        .header p {
            font-size: 14px;
            color: #7f8c8d;
            margin-top: 4px;
        }

        /* Sale container */
        .sale {
            margin-bottom: 50px;
            page-break-inside: avoid;
            border: 1px solid #e0e0e0;
            padding: 25px 30px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        /* Section titles */
        .section-title {
            font-size: 17px;
            font-weight: 700;
            color: #34495e;
            border-left: 5px solid #2980b9;
            padding-left: 10px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Info paragraphs */
        .info p {
            margin: 4px 0;
            font-weight: 600;
            color: #2c3e50;
        }

        .info.text-sm p {
            font-weight: 500;
            font-size: 12px;
            color: #555555;
        }

        /* Table styles */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            box-shadow: 0 0 15px rgba(41, 128, 185, 0.1);
            border-radius: 6px;
            overflow: hidden;
        }

        thead tr {
            background-color: #2980b9;
            color: white;
            text-align: left;
            font-weight: 700;
            letter-spacing: 0.05em;
        }

        th,
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #ddd;
            vertical-align: middle;
        }

        tbody tr:nth-child(odd) {
            background-color: #f4f6f8;
        }

        tbody tr:hover {
            background-color: #eaf3fc;
        }

        /* Number alignment */
        td.qty,
        td.price,
        td.subtotal {
            text-align: center;
            font-variant-numeric: tabular-nums;
        }

        /* Total amount styling */
        .total-amount {
            font-weight: 700;
            color: #2980b9;
            font-size: 15px;
            margin-top: 10px;
            text-align: right;
        }

        /* Responsive text for smaller details */
        @media print {
            body {
                margin: 10px;
            }
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Sales Report</h1>
        <p>{{ \Carbon\Carbon::now()->format('F j, Y') }}</p>
    </div>

    @foreach ($sales as $sale)
        <div class="sale">
            <div class="section-title">Sale #{{ $sale->id }}</div>
            <div class="info">
                <p><strong>Sale Date:</strong> {{ $sale->sale_date ?? 'N/A' }}</p>
                <p><strong>Status:</strong> {{ ucfirst($sale->status) }}</p>
                <p class="total-amount"><strong>Total Amount:</strong> ${{ number_format($sale->total_amount, 2) }}</p>
            </div>

            <div class="section-title">Customer Details</div>
            <div class="info text-sm">
                <p><strong>Name:</strong> {{ $sale->customer->name ?? 'N/A' }}</p>
                <p><strong>Email:</strong> {{ $sale->customer->email ?? 'N/A' }}</p>
                <p><strong>Phone:</strong> {{ $sale->customer->phone ?? 'N/A' }}</p>
                <p><strong>Address:</strong> {{ $sale->customer->address ?? 'N/A' }}</p>
            </div>

            <div class="section-title">Sale Items</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th class="qty">Quantity</th>
                        <th class="price">Selling Price ($)</th>
                        <th class="subtotal">Sub Total ($)</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($sale->saleItems as $index => $item)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $item->product->sku ?? 'N/A' }}</td>
                            <td>{{ $item->product->name ?? 'N/A' }}</td>
                            <td class="qty">{{ $item->quantity }}</td>
                            <td class="price">{{ number_format($item->selling_price, 2) }}</td>
                            <td class="subtotal">{{ number_format($item->sub_total, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endforeach
</body>

</html>
