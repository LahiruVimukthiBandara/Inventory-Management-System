import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [sales, setSales] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/sales");
            setSales(res.data.data || res.data);
        };
        getData();
    }, []);
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="px-[5%] py-10">
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
            </div>
        </AuthenticatedLayout>
    );
}
