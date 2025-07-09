import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";

export default function Show({ customer }) {
    const id = customer.id;
    const customerPdf = async () => {
    try {
        const response = await axios.get(
            `/api/customerReport/${id}`,
            { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Customer-report.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to download customer report.");
    }
};


    return (
        <AuthenticatedLayout>
            <Head title="Customers" />

            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-3 shadow-md card">
                    <div className="flex justify-end gap-3 card-content ">
                        <Link as="button" onClick={customerPdf} className="btn btn-primary"> Customer Report </Link>
                    </div>
                </div>

                <div className="p-5 shadow-md card">
                    <div className="pb-4 border-b">
                        <h1 className="font-extrabold capitalize text-primary">
                            Customer Details
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 gap-5 mt-3 text-sm">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> ID</h1>
                            <h2>{customer.id}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Name</h1>
                            <h2>{customer.name}</h2>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Contact Number</h1>
                            <h2>{customer.phone}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Email Address</h1>
                            <h2>{customer.email}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Status </h1>
                            <span
                                className={`badge badge-soft ${
                                    customer.status === "active"
                                        ? "badge-success"
                                        : customer.status === "inactive"
                                        ? "badge-warning"
                                        : customer.status === "blocked"
                                        ? "badge-error"
                                        : "badge-natural"
                                }`}
                            >
                                {customer.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Address</h1>
                            <h2>{customer.address}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-5 shadow-md card">
                    <div className="card-content">
                        <div className="pb-4 border-b">
                            <h1 className="font-extrabold capitalize text-primary">
                                customer History
                            </h1>
                        </div>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Sales ID</th>
                                    <th>Status</th>
                                    <th>Sale Date</th>
                                    <th>Total Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer.sales.map((sale) => (
                                    <tr
                                        className="hover:bg-blue-50"
                                        key={sale.id}
                                    >
                                        <th>{sale.id}</th>
                                        <td className="capitalize">
                                            <span
                                                className={`badge badge-soft ${
                                                    sale.status === "received"
                                                        ? "badge-success"
                                                        : sale.status ===
                                                          "pending"
                                                        ? "badge-warning"
                                                        : sale.status ===
                                                          "canceled"
                                                        ? "badge-error"
                                                        : "badge-natural"
                                                }`}
                                            >
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td>
                                            {sale.sale_date
                                                ? format(
                                                      new Date(sale.sale_date),
                                                      "dd MMM yyyy"
                                                  )
                                                : ""}
                                        </td>

                                        <td>{sale.total_amount}</td>
                                        <td>
                                            <Link
                                                href={route(
                                                    "sales.show",
                                                    sale.id
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
