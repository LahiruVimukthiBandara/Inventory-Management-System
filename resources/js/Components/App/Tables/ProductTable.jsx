import { Link } from "@inertiajs/react";
import React from "react";
import { BsTrash3 } from "react-icons/bs";
import Pagination from "../Pagination";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";

export default function ProductTable({ products, onEditProduct }) {
    const product = products.data;
    const imageUrl = "http://127.0.0.1:8000/storage/";
    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>
                                    Cost{" "}
                                    <span className="text-success"> Rs</span>
                                </th>
                                <th>
                                    Sell{" "}
                                    <span className="text-success"> Rs</span>
                                </th>
                                <th>In Stock</th>
                                <th>Reorder at</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((pro) => (
                                <tr className="hover:bg-blue-50" key={pro.id}>
                                    <th>{pro.sku}</th>
                                    <td>
                                        <div className="w-12 h-12 mask mask-squircle">
                                            <img
                                                src={
                                                    pro.image
                                                        ? imageUrl + pro.image
                                                        : "https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                }
                                                alt={pro.name}
                                            />
                                        </div>
                                    </td>

                                    <td className="capitalize">{pro.name}</td>
                                    <td className="capitalize">
                                        <span
                                            className={`badge badge-soft ${
                                                pro.status === "available"
                                                    ? "badge-success"
                                                    : pro.status ===
                                                      "production"
                                                    ? "badge-warning"
                                                    : pro.status ===
                                                      "unavailable"
                                                    ? "badge-error"
                                                    : "badge-natural"
                                            }`}
                                        >
                                            {pro.status}
                                        </span>
                                    </td>
                                    <td>
                                        {pro.description.length > 30
                                            ? pro.description.slice(0, 30)
                                            : pro.description}
                                    </td>
                                    <td className="capitalize">
                                        {pro.brand.name}
                                    </td>
                                    <td className="capitalize">
                                        {pro.category.name}
                                    </td>
                                    <td>{pro.cost_price}</td>
                                    <td>{pro.selling_price}</td>
                                    <td
                                        className={
                                            pro.stock_quantity <=
                                            pro.reorder_level
                                                ? "text-error"
                                                : pro.stock_quantity <=
                                                  pro.reorder_level + 20
                                                ? "text-warning"
                                                : ""
                                        }
                                    >
                                        {pro.stock_quantity === 0
                                            ? "Out Of Stock"
                                            : pro.stock_quantity}
                                    </td>
                                    <td>{pro.reorder_level}</td>
                                    <td>{pro.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEditProduct({
                                                    ...pro,
                                                    brand_id:
                                                        pro.brand?.id || null,
                                                    category_id:
                                                        pro.category?.id ||
                                                        null,
                                                })
                                            }
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </button>
                                        <Link
                                            type="button"
                                            href={route("product.show", pro.id)}
                                        >
                                            <FaRegEye className="text-xl text-warning" />
                                        </Link>

                                        <Link
                                            as="button"
                                            href={route(
                                                "product.destroy",
                                                pro.id
                                            )}
                                            method="delete"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        "Are you sure you want to delete this product?"
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                } else {
                                                    toast.success(
                                                        "Supplier deleted successfully."
                                                    );
                                                }
                                            }}
                                        >
                                            <BsTrash3 className="text-lg text-error" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <td colSpan={13}>
                                    <Pagination
                                        links={products.meta.links}
                                        currentPage={products.meta.current_page}
                                        setCurrentPage={(page) =>
                                            console.log("Page changed:", page)
                                        }
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
