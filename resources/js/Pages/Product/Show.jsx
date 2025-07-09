import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import React from "react";

export default function Show({ product }) {
    const imageUrl = "http://127.0.0.1:8000/storage/";
    console.log(product);
    return (
        <AuthenticatedLayout>
            <Head title="Product" />

            <div className="px-[5%] py-3 flex flex-col gap-5 pb-20">
                <div className="p-5 shadow-md card">
                    <div className="pb-4 border-b">
                        <h1 className="font-extrabold capitalize text-primary">
                            Product Details
                        </h1>
                    </div>
                    {/* image */}
                    <div className="flex justify-center w-full py-3 border-b">
                        <img
                            className="w-auto h-40"
                            src={imageUrl + product.data.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-5 mt-3 text-sm">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> ID</h1>
                            <h2>{product.data.sku}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Name</h1>
                            <h2>{product.data.name}</h2>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Brand</h1>
                            <h2>{product.data.brand.name}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Category</h1>
                            <h2>{product.data.category.name}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Status </h1>
                            <span
                                className={`badge badge-soft ${
                                    product.data.status === "active"
                                        ? "badge-success"
                                        : product.data.status === "inactive"
                                        ? "badge-warning"
                                        : product.data.status === "blocked"
                                        ? "badge-error"
                                        : "badge-natural"
                                }`}
                            >
                                {product.data.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Cost Price </h1>
                            <h2>{product.data.cost_price}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600"> Selling Price </h1>
                            <h2>{product.data.selling_price}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600">
                                Available Quantity
                            </h1>
                            <h2>{product.data.stock_quantity}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600">Reorder Level</h1>
                            <h2>{product.data.reorder_level}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600">Created Date</h1>
                            <h2>{product.data.created_at}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600">Last Update</h1>
                            <h2>{product.data.updated_at}</h2>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-600">Description</h1>
                            <h2>{product.data.description}</h2>
                        </div>
                    </div>
                </div>

                <div className="flex w-full p-5 acrd">
                    <div className="flex w-full card-content">
                        <div className="grid w-full grid-cols-2 gap-5">
                            {/* purches */}
                            <div className="">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize text-primary">
                                        Purches Details
                                    </h1>
                                </div>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Purches ID</th>
                                            <th>Quantity</th>
                                            <th>Cost Price</th>
                                            <th>Subtotal</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(Array.isArray(
                                            product.data.purchesItems
                                        ) &&
                                        Array.isArray(
                                            product.data.purchesItems[0]
                                        )
                                            ? product.data.purchesItems[0]
                                            : product.data.purchesItems
                                        ).map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-blue-100"
                                            >
                                                <td>{item.purches_id}</td>
                                                <td>{item.quantity}</td>
                                                <td>Rs. {item.cost_price}</td>
                                                <td>Rs. {item.subtotal}</td>
                                                <td>
                                                    {item.created_at
                                                        ? format(
                                                              new Date(
                                                                  item.created_at
                                                              ),
                                                              "dd MMM yyyy"
                                                          )
                                                        : ""}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* sales */}
                            <div className="">
                                <div className="pb-4 border-b">
                                    <h1 className="font-extrabold capitalize text-primary">
                                        Selling Details
                                    </h1>
                                </div>
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Sell ID</th>
                                            <th>Quantity</th>
                                            <th>Selling Price</th>
                                            <th>Subtotal</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(Array.isArray(
                                            product.data.saleItems
                                        ) &&
                                        Array.isArray(product.data.saleItems[0])
                                            ? product.data.saleItems[0]
                                            : product.data.saleItems
                                        ).map((item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-blue-100"
                                            >
                                                <td>{item.sale_id}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    Rs. {item.selling_price}
                                                </td>
                                                <td>Rs. {item.sub_total}</td>
                                                <td>
                                                    {item.created_at
                                                        ? format(
                                                              new Date(
                                                                  item.created_at
                                                              ),
                                                              "dd MMM yyyy"
                                                          )
                                                        : ""}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
