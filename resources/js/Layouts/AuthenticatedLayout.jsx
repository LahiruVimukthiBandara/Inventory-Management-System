import Navbar from "@/Components/App/Navbar";
import { Toaster } from "sonner";

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-white">
            <Toaster position="top-right" richColors />
            <Navbar />

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
