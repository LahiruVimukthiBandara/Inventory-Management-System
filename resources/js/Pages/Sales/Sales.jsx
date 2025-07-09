import SalesTable from "@/Components/App/Tables/SalesTable";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Sales({ sales }) {
    const [search, setSearch] = useState();
    const [status, setStatus] = useState();
    console.log(sales);

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("sales.index"),
                { search, status },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status]);

    return (
        <AuthenticatedLayout>
            <Head title="Sales" />

            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-3 shadow-md card">
                    <div className="flex items-center justify-end gap-3 card-content">
                        {/* Status */}
                        <div className="flex flex-col gap-3">
                            <select
                                className="select w-[150px]"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>

                        {/* search */}
                        <div>
                            <TextInput
                                className="w-[300px]"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search Customer by name or email..."
                            />
                        </div>
                        <div>
                            <Link
                                as="button"
                                className="btn btn-primary"
                                href={route("sales.create")}
                            >
                                New Sale
                            </Link>
                        </div>
                    </div>
                </div>
                <SalesTable sales={sales} />
            </div>
        </AuthenticatedLayout>
    );
}
