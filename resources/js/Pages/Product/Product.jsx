import ProductForm from "@/Components/App/Forms/ProductForm";
import ProductTable from "@/Components/App/Tables/ProductTable";
import Modal from "@/Components/Core/Modal";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Product({ products }) {
    const [search, setSearch] = useState();
    const [status, setStatus] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // modal handle
    const createProduct = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
        setSelectedProduct(null);
    };

    // filter handle
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("product.index"),
                { search, status },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status]);
    return (
        <AuthenticatedLayout>
            <Head title="Product" />

            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-3 shadow-md card">
                    <div className="flex items-center justify-between gap-3 card-content">
                        <div className="flex gap-3">
                            <h1 className="text-sm badge badge-soft badge-info">
                                <span className="text-primary">
                                    {products.meta.total}
                                </span>{" "}
                                Products
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* status */}
                            <div>
                                <select
                                    className="select w-36"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    <option value="">All</option>
                                    <option value="available">Available</option>
                                    <option value="production">
                                        Production
                                    </option>
                                    <option value="unavailable">
                                        Unavailable
                                    </option>
                                </select>
                            </div>
                            {/* search */}
                            <div>
                                <TextInput
                                    className="w-[300px]"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Search Product by name or ID..."
                                />
                            </div>

                            <div>
                                <PrimaryButton onClick={createProduct}>
                                    New Product
                                </PrimaryButton>
                                <Modal show={openModal} onClose={closeModal}>
                                    <ProductForm
                                        product={selectedProduct}
                                        onClose={closeModal}
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductTable
                    products={products}
                    onEditProduct={(product) => {
                        setSelectedProduct(product);
                        setOpenModal(true);
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
