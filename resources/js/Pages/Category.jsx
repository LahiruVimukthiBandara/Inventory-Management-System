import CategoryForm from "@/Components/App/Forms/CategoryForm";
import CategoryTable from "@/Components/App/Tables/CategoryTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import Modal from "@/Components/Core/Modal";
import TextInput from "@/Components/Core/TextInput";
export default function Category({ categories }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // modal handling
    const createCat = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
        setSelectedCategory(null);
    };

    // filter handling
    const [search, setSearch] = useState("");

    // send by params
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("category.index"),
                { search },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    return (
        <AuthenticatedLayout>
            <Head title="Category" />

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
                                placeholder="Search Category by name or ID..."
                            />
                        </div>
                        <div>
                            <PrimaryButton onClick={createCat}>
                                New Category
                            </PrimaryButton>
                            <Modal show={openModal} onClose={closeModal}>
                                <CategoryForm
                                    category={selectedCategory}
                                    onClose={closeModal}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
                <CategoryTable
                    categories={categories}
                    onEditCategory={(category) => {
                        setSelectedCategory(category);
                        setOpenModal(true);
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
