import BrandForm from "@/Components/App/Forms/BrandForm";
import BrandTable from "@/Components/App/Tables/BrandTable";
import Modal from "@/Components/Core/Modal";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Brand({ brands }) {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState();

    // modal handle
    const createBrand = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
        setSelectedBrand(null);
    };

    // filter handle
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("brand.index"),
                { search },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);
    return (
        <AuthenticatedLayout>
            <Head title="Brands" />

            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-3 shadow-md card">
                    <div className="flex items-center justify-end gap-3 card-content">
                        <div>
                            <TextInput
                                className="w-[300px]"
                                name="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search Category bu name or ID..."
                            />
                        </div>
                        <div>
                            <PrimaryButton onClick={createBrand}>
                                New Brand
                            </PrimaryButton>
                            <Modal show={openModal} onClose={closeModal}>
                                <BrandForm
                                    brand={selectedBrand}
                                    onClose={closeModal}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>

                <BrandTable
                    brands={brands}
                    onEditBrand={(brand) => {
                        setSelectedBrand(brand);
                        setOpenModal(true);
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
