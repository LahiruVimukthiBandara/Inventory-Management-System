import { Link } from "@inertiajs/react";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Pagination from "../Pagination";
import { FaRegEye } from "react-icons/fa";

export default function SalesTable({ sales }) {
    const sale = sales.data || sales.data.data;
    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sale ID</th>
                                <th>Customer Name</th>
                                <th>status</th>
                                <th>Total Amount</th>
                                <th>Sale Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.map((sa) => (
                                <tr className="hover:bg-blue-50" key={sa.id}>
                                    <th>{sa.id}</th>
                                    <td className="capitalize">
                                        {sa.customer.name}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-soft ${
                                                sa.status === "delivered"
                                                    ? "badge-success"
                                                    : sa.status === "processing"
                                                    ? "badge-warning"
                                                    : sa.status === "canceled"
                                                    ? "badge-error"
                                                    : sa.status === "ready"
                                                    ? "badge-info"
                                                    : "badge-natural"
                                            }`}
                                        >
                                            {sa.status}
                                        </span>
                                    </td>
                                    <td>{sa.total_amount}</td>
                                    <td>{sa.sale_date}</td>
                                    <td>{sa.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <Link
                                            type="button"
                                            href={route("sales.edit", sa.id)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </Link>
                                        <Link
                                            type="button"
                                            href={route("sales.show", sa.id)}
                                        >
                                            <FaRegEye className="text-xl text-warning" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <td colSpan={7}>
                                    <Pagination
                                        links={sales.meta.links}
                                        currentPage={sales.meta.current_page}
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
