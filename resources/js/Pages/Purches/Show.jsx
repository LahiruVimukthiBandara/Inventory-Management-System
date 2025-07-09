import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Show({ purches }) {
    const imageUrl = "http://127.0.0.1:8000/storage/";

    return (
        <AuthenticatedLayout>
            <Head title="Purches Details" />

            <div className="px-[15%] py-5 flex flex-col gap-3">
                <div className="p-5 shadow-md card">
                    <div className="flex flex-col gap-3 text-sm card-content">
                        {/* purches and supplier details */}
                        <div className="grid grid-cols-2 gap-5">
                            {/* purches details */}
                            <div className="flex flex-col gap-3">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize  text-primary">
                                        Purches Details
                                    </h1>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600"> ID</h1>-
                                    <h2>{purches.data.id}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Purches Date
                                    </h1>
                                    -<h2>{purches.data.purchase_date}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Total Amount
                                    </h1>
                                    -<h2>Rs {purches.data.total_amount}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Create Date
                                    </h1>
                                    -
                                    <h2 className="badge badge-soft badge-success">
                                        {purches.data.created_at}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        Last Update
                                    </h1>
                                    -
                                    <h2 className="badge badge-soft badge-info">
                                        {" "}
                                        {purches.data.updated_at}
                                    </h2>
                                </div>
                            </div>

                            {/* supplier details */}
                            <div className="flex flex-col gap-3">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize  text-primary">
                                        supplier Details
                                    </h1>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600"> Name</h1>-
                                    <h2>{purches.data.supplier.name}</h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <h1 className="text-gray-600">Status</h1>-
                                    <h2
                                        className={
                                            "badge badge-soft " +
                                            (purches.data.supplier.status ===
                                            "active"
                                                ? "badge-success"
                                                : purches.data.supplier
                                                      .status === "inactive"
                                                ? "badge-warning"
                                                : purches.data.supplier
                                                      .status === "blocked"
                                                ? "badge-error"
                                                : "badge-neutral")
                                        }
                                    >
                                        {purches.data.supplier.status}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        {" "}
                                        Contact Person
                                    </h1>
                                    -
                                    <h2>
                                        {purches.data.supplier.contact_person}
                                    </h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        {" "}
                                        Contact Number
                                    </h1>
                                    -<h2>{purches.data.supplier.phone}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600">
                                        {" "}
                                        Email Address
                                    </h1>
                                    -<h2>{purches.data.supplier.email}</h2>
                                </div>

                                <div className="flex gap-3">
                                    <h1 className="text-gray-600"> Address</h1>-
                                    <h2>{purches.data.supplier.address}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 mt-2 shadow-md card">
                    <div className="card-content">
                        <div className="pb-4 mb-4 border-b">
                            <h1 className="font-extrabold capitalize text-primary">
                                Purchased Items
                            </h1>
                        </div>

                        <div className="">
                            <table className="table table-sm">
                                <thead>
                                    <tr className="text-left bg-base-200">
                                        <th>Purches ID</th>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Cost Price</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purches.data.purchesItems.length > 0 ? (
                                        purches.data.purchesItems.map(
                                            (products, i) =>
                                                products.map((item, j) => (
                                                    <tr
                                                        key={`${i}-${j}`}
                                                        className="hover"
                                                    >
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <div className="w-12 h-12 mask mask-squircle">
                                                                <img
                                                                    src={
                                                                        item.products &&
                                                                        item
                                                                            .products
                                                                            .length >
                                                                            0
                                                                            ? imageUrl +
                                                                              item
                                                                                  .products[0]
                                                                                  .image
                                                                            : "https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                                    }
                                                                    alt={
                                                                        item.products &&
                                                                        item
                                                                            .products
                                                                            .length >
                                                                            0
                                                                            ? item
                                                                                  .products[0]
                                                                                  .name
                                                                            : "Product Image"
                                                                    }
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            {item.products &&
                                                            item.products
                                                                .length > 0
                                                                ? item
                                                                      .products[0]
                                                                      .name
                                                                : "Unknown Product"}
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            Rs {item.cost_price}
                                                        </td>
                                                        <td>
                                                            Rs {item.subtotal}
                                                        </td>
                                                    </tr>
                                                ))
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                No items found for this
                                                purchase.
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
