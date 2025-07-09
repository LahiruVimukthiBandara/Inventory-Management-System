import { Link, usePage } from "@inertiajs/react";
import React from "react";
import ApplicationLogo from "./ApplicationLogo";

export default function Navbar() {
    const user = usePage().props.auth.user;
    return (
        <div className="navbar bg-base-100 shadow-sm px-[5%] py-3 border-b">
            <div className="flex-1">
                <Link
                    href={route("dashboard")}
                    className="flex items-center gap-3 text-2xl font-bold"
                >
                    <ApplicationLogo /> Invento
                </Link>
            </div>
            {/* navlinks */}
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 text-sm">
                    <Link href={route("dashboard")} className="text-sm">
                        Dashboard
                    </Link>
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role=""
                            className="m-1 cursor-pointer"
                        >
                            Catalog Management
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52"
                        >
                            <li>
                                <Link href={route("category.index")}>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href={route("brand.index")}>Brands</Link>
                            </li>
                            <li>
                                <Link href={route("product.index")}>
                                    Products
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role=""
                            className="m-1 cursor-pointer"
                        >
                            Procurement
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52"
                        >
                            <li>
                                <Link href={route("supplier.index")}>
                                    Suppliers
                                </Link>
                            </li>
                            <li>
                                <Link href={route("purches.index")}>
                                    Purchases
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role=""
                            className="m-1 cursor-pointer"
                        >
                            Sales
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52"
                        >
                            <li>
                                <Link href={route("customer.index")}>
                                    Customers
                                </Link>
                            </li>
                            <li>
                                <Link href={route("sales.index")}>Sales</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role=""
                            className="m-1 cursor-pointer"
                        >
                            Reports
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 shadow-sm dropdown-content menu bg-base-100 rounded-box z-1 w-52"
                        >
                            <li>
                                <Link href={route("report.index")}>Sales</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div className="flex items-center gap-2">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                            </div>
                            <h1 className="capitalize">{user.name}</h1>
                        </div>
                        <ul
                            tabIndex={0}
                            className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52"
                        >
                            <li>
                                <Link
                                    href={route("profile.edit")}
                                    className="justify-between"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={route("logout")} method="post">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
