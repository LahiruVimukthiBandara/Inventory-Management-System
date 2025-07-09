import { Link } from "@inertiajs/react";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import Pagination from "../Pagination";

export default function PurchesTable({ purcheses }) {
    const pur = purcheses.data;

    return (
        <div className="p-3 shadow-lg card">
            <div className="card-content">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Purches ID</th>
                                <th>Supplier</th>
                                <th>Status</th>
                                <th>Purchas Date</th>
                                <th>Total Amount</th>
                                <th>Created Date</th>
                                <th>Last Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pur.map((pu) => (
                                <tr className="hover:bg-blue-50" key={pu.id}>
                                    <th>{pu.id}</th>
                                    <td className="capitalize">
                                        {pu.supplier.name}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge badge-soft ${
                                                pu.status === "received"
                                                    ? "badge-success"
                                                    : pu.status === "pending"
                                                    ? "badge-warning"
                                                    : pu.status === "canceled"
                                                    ? "badge-error"
                                                    : "badge-natural"
                                            }`}
                                        >
                                            {pu.status}
                                        </span>
                                    </td>
                                    <td>{pu.purchase_date}</td>
                                    <td className="text-nowrap">
                                        Rs {pu.total_amount}
                                    </td>
                                    <td>{pu.created_at}</td>
                                    <td>{pu.updated_at}</td>
                                    <td className="flex items-center gap-2">
                                        <Link
                                            type="button"
                                            href={route("purches.edit", pu.id)}
                                        >
                                            <AiOutlineEdit className="text-lg text-info" />
                                        </Link>

                                        <Link
                                            as="button"
                                            href={route("purches.show", pu.id)}
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
                                <td colSpan={8}>
                                    <Pagination
                                        links={purcheses.meta.links}
                                        currentPage={
                                            purcheses.meta.current_page
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
