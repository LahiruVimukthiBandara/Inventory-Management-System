import { Link } from "@inertiajs/react";
import React from "react";
import Pagination from "../Pagination";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";

export default function CustomerTable({ customers, onEditCustomers }) {
    const cust = customers.data;
    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Created Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cust.map((cu) => (
                                <tr className="hover:bg-blue-50" key={cu.id}>
                                    <th>{cu.id}</th>
                                    <td className="capitalize">{cu.name}</td>
                                    <td className="capitalize">
                                        <span
                                            className={`badge badge-soft ${
                                                cu.status === "active"
                                                    ? "badge-success"
                                                    : cu.status === "inactive"
                                                    ? "badge-warning"
                                                    : cu.status === "blocked"
                                                    ? "badge-error"
                                                    : "badge-natural"
                                            }`}
                                        >
                                            {cu.status}
                                        </span>
                                    </td>
                                    <td>{cu.phone}</td>
                                    <td className="text-primary">{cu.email}</td>
                                    <td>{cu.address}</td>
                                    <td>{cu.created_at}</td>
                                    <td>{cu.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEditCustomers(cu)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </button>
                                        <Link
                                            type="button"
                                            href={route("customer.show", cu.id)}
                                        >
                                            <FaRegEye className="text-xl text-warning" />
                                        </Link>

                                        <Link
                                            as="button"
                                            href={route(
                                                "supplier.destroy",
                                                cu.id
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
                                        links={customers.meta.links}
                                        currentPage={
                                            customers.meta.current_page
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
