import CustomerForm from "@/Components/App/Forms/CustomerForm";
import CustomerTable from "@/Components/App/Tables/CustomerTable";
import Modal from "@/Components/Core/Modal";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Customer({ customers }) {
    const [search, setSearch] = useState();
    const [status, setStatus] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // modal handling
    const createCust = () => {
        setOpenModal(true);
    };
    const closeModal = () => {
        setOpenModal(false);
        setSelectedCustomer(null);
    };

    // filter handle
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route("customer.index"),
                { search, status },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(delay);
    }, [search, status]);
    return (
        <AuthenticatedLayout>
            <Head title="Customers" />

            <div className="px-[5%] py-3 flex flex-col gap-5">
                <div className="p-3 shadow-md card">
                    <div className="flex items-center justify-end gap-3 card-content">
                        {/* Status */}
                        <div className="flex flex-col gap-3">
                            <select
                                className="select w-[150px]"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="blocked">Blocked</option>
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
                                placeholder="Search Customer by name or email..."
                            />
                        </div>
                        <div>
                            <PrimaryButton onClick={createCust}>
                                New Customer
                            </PrimaryButton>
                            <Modal show={openModal} onClose={closeModal}>
                                <CustomerForm
                                    customer={selectedCustomer}
                                    onClose={closeModal}
                                />
                            </Modal>
                        </div>
                    </div>
                </div>
                <CustomerTable
                    customers={customers}
                    onEditCustomers={(customer) => {
                        setSelectedCustomer(customer);
                        setOpenModal(true);
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
