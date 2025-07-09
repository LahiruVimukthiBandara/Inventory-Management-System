import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import SecondaryButton from "@/Components/Core/SecondaryButton";
import TextInput from "@/Components/Core/TextInput";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductForm({ product, onClose }) {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    //get brands and categories
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const [brandRse, categoryRes] = await Promise.all([
                    axios.get("/api/brands"),
                    axios.get("/api/categories"),
                ]);
                setBrands(brandRse.data.data || brandRse.data);
                setCategories(categoryRes.data.data || categoryRes.data);
            } catch (error) {
                console.error("Failed to fetch brands", error);
            }
        };

        fetchBrands();
    }, []);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        brand_id: product?.brand_id || "",
        category_id: product?.category_id || "",
        cost_price: product?.cost_price || "",
        selling_price: product?.selling_price || "",
        stock_quantity: product?.stock_quantity || "",
        reorder_level: product?.reorder_level || "",
        status: product?.status || "",
        image: "",
        _method: product ? "PUT" : "POST",
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!product) {
                post(route("product.store"), {
                    onFinish: () =>
                        reset(
                            "name",
                            "description",
                            "brand_id",
                            "category_id",
                            "cost_price",
                            "selling_price",
                            "stock_quantity",
                            "reorder_level",
                            "status",
                            "image"
                        ),
                    onSuccess: () => {
                        toast.success("Product created successfully!");
                        onClose();
                    },
                });
            } else {
                post(route("product.update", product.id), {
                    onFinish: () =>
                        reset(
                            "name",
                            "description",
                            "brand_id",
                            "category_id",
                            "cost_price",
                            "selling_price",
                            "stock_quantity",
                            "reorder_level",
                            "statu",
                            "image"
                        ),
                    onSuccess: () => {
                        toast.success("Product updated successfully!");
                        onClose();
                    },
                });
            }
        } catch (error) {
            console.error("Something went wrong", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="p-5 shadow-lg card">
            <div className="card-content">
                <div className="py-5 font-bold text-center">
                    <h1>{product ? "Update" : "Create New"} product</h1>
                    <p className="mt-2 text-sm font-light text-warning">
                        {product
                            ? "Modify the fields below to update this products information."
                            : "Fill in the details below to add a new product to your list."}
                    </p>
                </div>
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-3">
                        {/* product name */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">product Name</InputLabel>
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

                        {/* product brand */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="brand_id">Brand</InputLabel>
                            <select
                                className="select"
                                value={data.brand_id}
                                onChange={(e) =>
                                    setData("brand_id", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select Brand
                                </option>
                                {brands.map((brand) => (
                                    <option
                                        key={brand.id}
                                        value={brand.id}
                                        onChange={(e) =>
                                            setData("brand_id", e.target.value)
                                        }
                                    >
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.brand_id}
                                className="mt-2"
                            />
                        </div>

                        {/* product category */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="category_id">
                                Category
                            </InputLabel>
                            <select
                                className="select"
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select Category
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.category_id}
                                className="mt-2"
                            />
                        </div>

                        {/* cost price */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name"> Cost Price </InputLabel>

                            <label className="input">
                                Rs
                                <input
                                    id="cost_price"
                                    name="cost_price"
                                    value={data.cost_price}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("cost_price", e.target.value)
                                    }
                                    required
                                />
                            </label>
                            <InputError
                                message={errors.cost_price}
                                className="mt-2"
                            />
                        </div>

                        {/* selling price */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                {" "}
                                Selling Price{" "}
                            </InputLabel>

                            <label className="input">
                                Rs
                                <input
                                    id="selling_price"
                                    name="selling_price"
                                    value={data.selling_price}
                                    className="block w-full mt-1"
                                    autoComplete="selling_price"
                                    onChange={(e) =>
                                        setData("selling_price", e.target.value)
                                    }
                                    required
                                />
                            </label>
                            <InputError
                                message={errors.selling_price}
                                className="mt-2"
                            />
                        </div>

                        {/* stock qty */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                Stock Quantity
                            </InputLabel>
                            <TextInput
                                id="stock_quantity"
                                name="stock_quantity"
                                value={data.stock_quantity}
                                className="block w-full mt-1"
                                autoComplete="stock_quantity"
                                onChange={(e) =>
                                    setData("stock_quantity", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.stock_quantity}
                                className="mt-2"
                            />
                        </div>

                        {/* stock qty */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="name">
                                Reorder Level
                            </InputLabel>
                            <TextInput
                                id="reorder_level"
                                name="reorder_level"
                                value={data.reorder_level}
                                className="block w-full mt-1"
                                autoComplete="reorder_level"
                                onChange={(e) =>
                                    setData("reorder_level", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.reorder_level}
                                className="mt-2"
                            />
                        </div>

                        {/* status */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <select
                                className="select"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="" disabled={true}>
                                    Select status
                                </option>
                                <option value="available">Available</option>
                                <option value="production">Production</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>

                        {/* image */}
                        <div className="flex flex-col gap-2">
                            <InputLabel htmlFor="image">
                                Product Image
                            </InputLabel>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="input"
                                autoComplete="image"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                            />

                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* description */}
                    <div className="flex flex-col w-full gap-2">
                        <InputLabel htmlFor="image">
                            Product Description
                        </InputLabel>
                        <textarea
                            className="w-full textarea"
                            placeholder=""
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={onClose}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {product ? "Update " : "Add "} Product
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
