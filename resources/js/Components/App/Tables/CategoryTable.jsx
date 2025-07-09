import { Link } from "@inertiajs/react";
import React from "react";
import Pagination from "../Pagination";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";

export default function CategoryTable({ categories, onEditCategory }) {
    const cat = categories.data;

    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Category ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cat.map((c) => (
                                <tr className="hover:bg-blue-50" key={c.id}>
                                    <th>{c.id}</th>
                                    <td className="capitalize">{c.name}</td>
                                    <td>
                                        {c.description.length > 50
                                            ? c.description.slice(0, 50) + "..."
                                            : c.description}
                                    </td>
                                    <td>{c.created_at}</td>
                                    <td>{c.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEditCategory(c)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </button>

                                        <Link
                                            as="button"
                                            href={route(
                                                "category.destroy",
                                                c.id
                                            )}
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
                                        links={categories.meta.links}
                                        currentPage={
                                            categories.meta.current_page
                                        }
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
