import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [sales, setSales] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const [salesRes, productRes] = await Promise.all([
                axios.get('/api/sales'),
                axios.get('api/product'),
            ])
            setSales(salesRes.data.data || salesRes.data);
            setProduct(productRes.data.data || productRes.data);
        };
        getData();
    }, []);

    console.log(product)
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-[5%] py-10 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Today’s Sales */}
                    <div className="border shadow-xl stat bg-base-100 rounded-2xl border-base-200">
                        <div className="text-lg font-semibold stat-title">
                            Today's Sales
                        </div>
                        <div className="stat-value text-primary">
                            {Number(sales.today).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })}{" "}
                            LKR
                        </div>
                    </div>

                    {/* This Month’s Sales */}
                    <div className="border shadow-xl stat bg-base-100 rounded-2xl border-base-200">
                        <div className="text-lg font-semibold stat-title">
                            This Month's Sales
                        </div>
                        <div className="stat-value text-warning">
                            {Number(sales.month).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })}{" "}
                            LKR
                        </div>
                    </div>

                    {/* Total Sales */}
                    <div className="border shadow-xl stat bg-base-100 rounded-2xl border-base-200">
                        <div className="text-lg font-semibold stat-title">
                            Total Sales
                        </div>
                        <div className="stat-value text-accent">
                            {Number(sales.total).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })}{" "}
                            LKR
                        </div>
                    </div>
                </div>

                {/* section 2 */}
                <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-4">

                    {/* Total products */}
                    <div className="border shadow-xl stat bg-base-100 rounded-2xl border-base-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-base-content">Products</h2>
                            <div className="text-xs badge badge-primary badge-outline">Total</div>
                        </div>
                        <div className="stat-value text-primary">
                            <h1>{product.productCount}</h1>
                        </div>
                    </div>

                    {/* Total customers */}
                    <div className="p-5 border shadow-xl rounded-2xl border-base-200 bg-base-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-base-content">Customers</h2>
                            <div className="text-xs badge badge-primary badge-outline">Total</div>
                        </div>

                        <div className="mb-4 text-4xl font-bold text-primary">
                            {product.customerCount}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-success">{product.activeCustomers}</span>
                                <span className="mt-1 text-xs">Active</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-warning">{product.inActiveCustomers}</span>
                                <span className="mt-1 text-xs">Inactive</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-error">{product.blockedCustomers}</span>
                                <span className="mt-1 text-xs">Blocked</span>
                            </div>
                        </div>
                    </div>

                    {/* Total suppliers */}
                    <div className="p-5 border shadow-xl rounded-2xl border-base-200 bg-base-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-base-content">Suppliers</h2>
                            <div className="text-xs badge badge-primary badge-outline">Total</div>
                        </div>

                        <div className="mb-4 text-4xl font-bold text-primary">
                            {product.supplierCount}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-success">{product.activeSuppliers}</span>
                                <span className="mt-1 text-xs">Active</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-warning">{product.inActiveSuppliers}</span>
                                <span className="mt-1 text-xs">Inactive</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-error">{product.blockedSuppliers}</span>
                                <span className="mt-1 text-xs">Blocked</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
