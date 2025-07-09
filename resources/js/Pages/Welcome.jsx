import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome to Invento" />
            <div className="relative flex flex-col min-h-screen overflow-hidden text-white bg-gradient-to-br from-blue-600 to-indigo-700">
                {/* Background image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598887142489-26c6b882d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center"></div>

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-6 text-center">
                    <h1 className="mb-4 text-5xl font-bold drop-shadow-lg">
                        Welcome to Invento
                    </h1>
                    <p className="max-w-xl mx-auto mb-8 text-lg text-white/90 drop-shadow">
                        Invento is your modern, streamlined inventory management
                        system. Track stock, manage suppliers, and gain powerful
                        insights for your business—all in one place.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="px-6 py-3 font-semibold text-blue-700 transition bg-white rounded-lg shadow hover:bg-gray-100"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="px-6 py-3 font-semibold text-blue-700 transition bg-white rounded-lg shadow hover:bg-gray-100"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="px-6 py-3 font-semibold transition bg-blue-700 border border-white rounded-lg shadow hover:bg-blue-800"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer at the bottom */}
                <footer className="relative z-10 py-4 text-sm text-center text-white/80">
                    &copy; {new Date().getFullYear()} Invento. All rights
                    reserved. By Lahiru Vimukthi
                </footer>
            </div>
        </>
    );
}
