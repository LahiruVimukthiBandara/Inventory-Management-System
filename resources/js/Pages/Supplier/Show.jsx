import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { FaRegEye } from "react-icons/fa";

export default function Show({ supplier }) {
    console.log(supplier);
    return (
        <AuthenticatedLayout>
            <Head title="Supplier Data" />
            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-5 shadow-md card">
                    <div className="pb-4 border-b">
                        <h1 className="font-extrabold capitalize text-primary">
                            Supplier Details
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 gap-5 mt-3 text-sm">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> ID</h1>
                            <h2>{supplier.id}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Name</h1>
                            <h2>{supplier.name}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Contact Person</h1>
                            <h2>{supplier.contact_person}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Contact Number</h1>
                            <h2>{supplier.phone}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Email Address</h1>
                            <h2>{supplier.email}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Status </h1>
                            <span
                                className={`badge badge-soft ${
                                    supplier.status === "active"
                                        ? "badge-success"
                                        : supplier.status === "inactive"
                                        ? "badge-warning"
                                        : supplier.status === "blocked"
                                        ? "badge-error"
                                        : "badge-natural"
                                }`}
                            >
                                {supplier.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Address</h1>
                            <h2>{supplier.address}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-5 shadow-md card">
                    <div className="card-content">
                        <div className="pb-4 border-b">
                            <h1 className="font-extrabold capitalize text-primary">
                                Supplier History
                            </h1>
                        </div>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Purches ID</th>
                                    <th>Status</th>
                                    <th>Purches Date</th>
                                    <th>Total Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supplier.purcheses.map((purches) => (
                                    <tr
                                        className="hover:bg-blue-50"
                                        key={purches.id}
                                    >
                                        <th>{purches.id}</th>
                                        <td className="capitalize">
                                            <span
                                                className={`badge badge-soft ${
                                                    purches.status ===
                                                    "received"
                                                        ? "badge-success"
                                                        : purches.status ===
                                                          "pending"
                                                        ? "badge-warning"
                                                        : purches.status ===
                                                          "canceled"
                                                        ? "badge-error"
                                                        : "badge-natural"
                                                }`}
                                            >
                                                {purches.status}
                                            </span>
                                        </td>
                                        <td>{purches.purchase_date}</td>
                                        <td>{purches.total_amount}</td>
                                        <td>
                                            <Link
                                                href={route(
                                                    "purches.show",
                                                    purches.id
                                                )}
                                            >
                                                <FaRegEye className="text-xl text-warning" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
