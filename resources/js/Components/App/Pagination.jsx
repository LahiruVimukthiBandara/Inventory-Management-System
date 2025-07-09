import { router } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links, currentPage, setCurrentPage }) {
    const handleChange = (url) => {
        if (!url) return;
        const urlObj = new URL(url, window.location.origin);
        const pageParam = urlObj.searchParams.get("page");
        setCurrentPage(Number(pageParam));
        router.get(url, {}, { preserveState: true });
    };

    return (
        <div className="flex justify-center mt-4">
            {Array.isArray(links) && links.length > 0 ? (
                <ul className="flex items-center space-x-1">
                    {links.map((link, index) => (
                        <li key={index}>
                            {link.url ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChange(link.url);
                                    }}
                                    className={`px-3 py-1 rounded ${
                                        link.active
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    className="px-3 py-1 text-gray-400 bg-gray-100 rounded cursor-not-allowed"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No pagination links available.</p>
            )}
        </div>
    );
}
