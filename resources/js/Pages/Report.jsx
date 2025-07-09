import React from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Report() {
    const generatePDF = async () => {
        try {
            const response = await axios.post(
                "/api/generate-pdf",
                {},
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Sales.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to download sales report.");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Reports" />
            <div className="px-[5%] py-20">
                <h1 className="mb-4 text-xl font-bold">Sales Report</h1>
                <button
                    onClick={generatePDF}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Download Sales Report PDF
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
