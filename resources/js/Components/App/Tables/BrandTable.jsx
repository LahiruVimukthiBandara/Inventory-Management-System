import React from "react";
import Pagination from "../Pagination";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";

export default function BrandTable({ brands, onEditBrand }) {
    const brand = brands.data;
    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Brand ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brand.map((b) => (
                                <tr className="hover:bg-blue-50" key={b.id}>
                                    <th>{b.id}</th>
                                    <td className="capitalize">{b.name}</td>
                                    <td>
                                        {b.description.length > 50
                                            ? b.description.slice(0, 50) + "..."
                                            : b.description}
                                    </td>
                                    <td>{b.created_at}</td>
                                    <td>{b.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEditBrand(b)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </button>

                                        <Link
                                            as="button"
                                            href={route("brand.destroy", b.id)}
                                            method="delete"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        "Are you sure you want to delete this category?"
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                } else {
                                                    toast.success(
                                                        "Category deleted successfully."
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
                                <td colSpan={6}>
                                    <Pagination
                                        links={brands.meta.links}
                                        currentPage={brands.meta.current_page}
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
