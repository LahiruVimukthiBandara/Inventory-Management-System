import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import TextInput from "@/Components/Core/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

export default function SupplierForm({ supplier, onClose }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: supplier?.name || "",
        contact_person: supplier?.contact_person || "",
        phone: supplier?.phone || "",
        email: supplier?.email || "",
        status: supplier?.status || "",
        address: supplier?.address || "",
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!supplier) {
                post(route("supplier.store"), {
                    onFinish: () =>
                        reset(
                            "name",
                            "contsct_person",
                            "phone",
                            "email",
                            "status",
                            "address"
                        ),
                    onSuccess: () => {
                        toast.success("supplier created successfully!");
                        onClose();
                    },
                });
            } else {
                put(route("supplier.update", supplier.id), {
                    onFinish: () =>
                        reset(
                            "name",
                            "contsct_person",
                            "phone",
                            "email",
                            "status",
                            "address"
                        ),
                    onSuccess: () => {
                        toast.success("supplier updated successfully.");
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
                    <h1>{supplier ? "Update" : "Create New"} supplier</h1>
                    <p className="mt-2 text-sm font-light text-warning">
                        {supplier
                            ? "Modify the fields below to update this Supplier's information."
                            : "Fill in the details below to add a new Supplier to your list."}
                    </p>
                </div>
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        {/* supplier name */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                Supplier Name
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
                        {/* contact person */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="contact_person">
                                Contact Person
                            </InputLabel>
                            <TextInput
                                id="contact_person"
                                name="contact_person"
                                value={data.contact_person}
                                className="block w-full mt-1"
                                autoComplete="contact_person"
                                onChange={(e) =>
                                    setData("contact_person", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.contact_person}
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
                        {/* status */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="status">
                                Email Address
                            </InputLabel>
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
                            {supplier ? "Update " : "Add "} Supplier
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
