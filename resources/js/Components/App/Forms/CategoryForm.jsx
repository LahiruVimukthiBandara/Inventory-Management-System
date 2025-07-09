import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import TextInput from "@/Components/Core/TextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

export default function CategoryForm({ category, onClose }) {
    const { data, setData, processing, errors, post, put, reset } = useForm({
        name: category?.name || "",
        description: category?.description || "",
    });
    const submit = (e) => {
        e.preventDefault();
        try {
            if (!category) {
                post(route("category.store"), {
                    onFinish: () => reset("name", "description"),
                    onSuccess: () => {
                        toast.success("Category created successfully!");
                        onClose();
                    },
                });
            } else {
                put(route("category.update", category.id), {
                    onFinish: () => reset("name", "description"),
                    onSuccess: () => {
                        toast.success("Category updated successfully.");
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
        <>
            <div className="p-5 shadow-lg card">
                <div className="card-content">
                    <div className="py-5 font-bold text-center">
                        <h1>{category ? "Update" : "Create New"} Category</h1>
                        <p className="text-sm mt-2 font-light text-warning">
                            {category
                                ? "Modify the fields below to update this category's information."
                                : "Fill in the details below to add a new category to your list."}
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-5 px-5"
                    >
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                Category Name
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
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="description">
                                Category Description
                            </InputLabel>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="block w-full mt-1 textarea"
                                autoComplete="description"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex gap-3 justify-end">
                            <SecondaryButton onClick={onClose}>
                                Cancel
                            </SecondaryButton>
                            <PrimaryButton type="submit" disabled={processing}>
                                {category ? "Update " : "Add "}Category
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
