import React from "react";
import Pagination from "../Pagination";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "@inertiajs/react";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";

export default function SupplierTable({ suppliers, onEditSupplier }) {
    const supp = suppliers.data;
    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Name</th>
                                <th>status</th>
                                <th>Contact Person</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Created Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supp.map((s) => (
                                <tr className="hover:bg-blue-50" key={s.id}>
                                    <th>{s.id}</th>
                                    <td className="capitalize">{s.name}</td>
                                    <td className="capitalize">
                                        <span
                                            className={`badge badge-soft ${
                                                s.status === "active"
                                                    ? "badge-success"
                                                    : s.status === "inactive"
                                                    ? "badge-warning"
                                                    : s.status === "blocked"
                                                    ? "badge-error"
                                                    : "badge-natural"
                                            }`}
                                        >
                                            {s.status}
                                        </span>
                                    </td>
                                    <td>{s.contact_person}</td>
                                    <td>{s.phone}</td>
                                    <td className="text-primary">{s.email}</td>
                                    <td>{s.created_at}</td>
                                    <td>{s.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <Link
                                            type="button"
                                            href={route("supplier.show", s.id)}
                                        >
                                            <FaRegEye className="text-xl text-warning" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => onEditSupplier(s)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </button>

                                        <Link
                                            as="button"
                                            href={route(
                                                "supplier.destroy",
                                                s.id
                                            )}
                                            method="delete"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        "Are you sure you want to delete this Supplier?"
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
                                <td colSpan={9}>
                                    <Pagination
                                        links={suppliers.meta.links}
                                        currentPage={
                                            suppliers.meta.current_page
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
