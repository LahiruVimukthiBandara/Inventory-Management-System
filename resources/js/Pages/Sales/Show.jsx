import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { FaRegEye } from "react-icons/fa";

export default function Show({ sales }) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    console.log(sales);

    return (
        <AuthenticatedLayout>
            <Head title="Sale Details" />

            <div className="px-[15%] py-5 flex flex-col gap-3">
                <div className="p-5 shadow-md card">
                    <div className="flex flex-col gap-3 text-sm card-content">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-3">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize text-primary">
                                        Sale Details
                                    </h1>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">ID</h1>-
                                    <h2>{sales.data.id}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">Sale Date</h1>
                                    -<h2>{sales.data.sale_date}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Total Amount
                                    </h1>
                                    -<h2>Rs {sales.data.total_amount}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Created At
                                    </h1>
                                    -
                                    <h2 className="badge badge-soft badge-success">
                                        {sales.data.created_at}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Updated At
                                    </h1>
                                    -
                                    <h2 className="badge badge-soft badge-info">
                                        {sales.data.updated_at}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize text-primary">
                                        Customer Details
                                    </h1>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">Name</h1>-
                                    <h2>
                                        {sales.data.customer?.name ||
                                            "Unknown Customer"}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <h1 className="text-gray-600">Status</h1>-
                                    <h2
                                        className={
                                            "badge badge-soft " +
                                            (sales.data.customer?.status ===
                                            "active"
                                                ? "badge-success"
                                                : sales.data.customer
                                                      ?.status === "inactive"
                                                ? "badge-warning"
                                                : sales.data.customer
                                                      ?.status === "blocked"
                                                ? "badge-error"
                                                : "badge-neutral")
                                        }
                                    >
                                        {sales.data.customer?.status || "N/A"}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Contact Number
                                    </h1>
                                    -
                                    <h2>
                                        {sales.data.customer?.phone || "N/A"}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Email Address
                                    </h1>
                                    -
                                    <h2>
                                        {sales.data.customer?.email || "N/A"}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">Address</h1>-
                                    <h2>
                                        {sales.data.customer?.address || "N/A"}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 mt-2 shadow-md card">
                    <div className="card-content">
                        <div className="pb-4 mb-4 border-b">
                            <h1 className="font-extrabold capitalize text-primary">
                                Sold Items
                            </h1>
                        </div>

                        <div className="">
                            <table className="table table-sm">
                                <thead>
                                    <tr className="text-left bg-base-200">
                                        <th>Sale Item ID</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Selling Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.data.saleItems &&
                                    sales.data.saleItems.length > 0 ? (
                                        sales.data.saleItems.map((item, i) => (
                                            <tr key={i} className="hover">
                                                <td>{item.id}</td>
                                                <td>
                                                    <div className="w-12 h-12 mask mask-squircle">
                                                        <img
                                                            src={
                                                                item.product
                                                                    ?.image
                                                                    ? imageUrl +
                                                                      item
                                                                          .product
                                                                          .image
                                                                    : "https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            }
                                                            alt={
                                                                item.product
                                                                    ?.name ||
                                                                "Product Image"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    {item.product?.name ||
                                                        "Unknown Product"}
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>Rs {item.selling_price}</td>
                                                <td>Rs {item.sub_total}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >
                                                No items found for this sale.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
