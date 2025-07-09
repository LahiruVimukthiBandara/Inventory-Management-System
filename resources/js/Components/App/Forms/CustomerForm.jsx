import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import TextInput from "@/Components/Core/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

export default function CustomerForm({ customer, onClose }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: customer?.name || "",
        phone: customer?.phone || "",
        email: customer?.email || "",
        status: customer?.status || "",
        address: customer?.address || "",
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!customer) {
                post(route("customer.store"), {
                    onFinish: () => reset("name", "phone", "email", "address"),
                    onSuccess: () => {
                        toast.success("customer created successfully!");
                        onClose();
                    },
                });
            } else {
                put(route("customer.update", customer.id), {
                    onFinish: () => reset("name", "phone", "email", "address"),
                    onSuccess: () => {
                        toast.success("customer updated successfully.");
                        onClose();
                    },
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occurred.");
        }
    };
    return (
        <div className="p-5 shadow-lg card">
            <div className="card-content">
                <div className="py-5 font-bold text-center">
                    <h1>{customer ? "Update" : "Create New"} customer</h1>
                    <p className="mt-2 text-sm font-light text-warning">
                        {customer
                            ? "Modify the fields below to update this customer's information."
                            : "Fill in the details below to add a new customer to your list."}
                    </p>
                </div>
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        {/* customer name */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                customer Name
                            </InputLabel>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full mt-1"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* mobile number */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="phone">
                                Contact Number
                            </InputLabel>
                            <TextInput
                                id="name"
                                name="phone"
                                value={data.phone}
                                className="block w-full mt-1"
                                autoComplete="phone"
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        {/* email address */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* email address */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* status */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <select
                                defaultValue="Pick a color"
                                className="select"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option disabled={true}>Pick a color</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="blocked">Blocked</option>
                            </select>
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="address">Address</InputLabel>
                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="block w-full mt-1"
                                autoComplete="address"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={onClose}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {customer ? "Update " : "Add "} Customer
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
