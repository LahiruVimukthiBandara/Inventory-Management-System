import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Create({
    purches,
    suppliers: initialSuppliers,
    products: initialProducts,
}) {
    const [suppliers, setSuppliers] = useState(initialSuppliers || []);
    const [products, setProducts] = useState(initialProducts || []);

    // Initialize products array
    const initialProductsState = purches?.purches_items?.map((item) => ({
        product_id: item.product_id || "",
        quantity: item.quantity || "",
        cost_price: item.cost_price || "",
        subtotal: item.subtotal || "",
    })) || [
        {
            product_id: "",
            quantity: "",
            cost_price: "",
            subtotal: "",
        },
    ];

    const { data, setData, post, put, processing, reset, errors } = useForm({
        supplier_id: purches?.supplier_id || "",
        purchase_date: purches?.purchase_date || "",
        status: purches?.status || "",
        total_amount: purches?.total_amount || "",
        products: initialProductsState,
    });

    // Recalculate subtotals + total when products change
    useEffect(() => {
        const updatedProducts = data.products.map((product) => {
            const quantity = parseFloat(product.quantity) || 0;
            const cost_price = parseFloat(product.cost_price) || 0;
            return {
                ...product,
                subtotal: (quantity * cost_price).toFixed(2),
            };
        });
        setData("products", updatedProducts);

        const total = updatedProducts.reduce(
            (sum, p) => sum + parseFloat(p.subtotal || 0),
            0
        );
        setData("total_amount", total.toFixed(2));
    }, [JSON.stringify(data.products)]);

    // Fetch suppliers
    useEffect(() => {
        const loadData = async () => {
            try {
                if (!initialSuppliers?.length || !initialProducts?.length) {
                    const [supRes, prodRes] = await Promise.all([
                        axios.get("/api/suppliers"),
                        axios.get("/api/products"),
                    ]);
                    setSuppliers(supRes.data.data || supRes.data);
                    setProducts(prodRes.data.data || prodRes.data);
                }
            } catch (error) {
                console.error("Failed loading data.", error);
            }
        };
        loadData();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!purches) {
                post(route("purches.store"), {
                    onSuccess: () => {
                        reset();
                        toast.success("Purchase created successfully.");
                    },
                });
            } else {
                put(route("purches.update", purches.id), {
                    onSuccess: () => {
                        reset();
                        toast.success("Purchase updated successfully.");
                    },
                });
            }
        } catch (error) {
            console.error("Something went wrong.", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={purches?.id ? "Edit Purchase" : "Create Purchase"} />
            <div className="px-[5%] py-5 flex flex-col gap-5">
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="p-5 shadow-md card">
                        <div className="card-content">
                            <div className="py-3 text-primary font-bold border-b mb-5">
                                <h1>Purchase Details</h1>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {/* Supplier */}
                                <div className="flex flex-col gap-3">
                                    <InputLabel htmlFor="supplier_id">
                                        Supplier
                                    </InputLabel>
                                    <select
                                        className="select"
                                        value={data.supplier_id}
                                        onChange={(e) =>
                                            setData(
                                                "supplier_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Supplier
                                        </option>
                                        {suppliers.map((supplier) => (
                                            <option
                                                key={supplier.id}
                                                value={supplier.id}
                                            >
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.supplier_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Purchase Date */}
                                <div className="flex flex-col gap-2">
                                    <InputLabel htmlFor="purchase_date">
                                        Purchase Date
                                    </InputLabel>
                                    <TextInput
                                        type="date"
                                        id="purchase_date"
                                        value={data.purchase_date}
                                        className="block w-full mt-1"
                                        onChange={(e) =>
                                            setData(
                                                "purchase_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.purchase_date}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex flex-col gap-3">
                                    <InputLabel htmlFor="status">
                                        Status
                                    </InputLabel>
                                    <select
                                        className="select"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Status
                                        </option>
                                        <option value="pending">Pending</option>
                                        <option value="received">
                                            Received
                                        </option>
                                        <option value="canceled">
                                            Canceled
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Total Amount */}
                                <div className="flex flex-col gap-3 w-full">
                                    <InputLabel htmlFor="total_amount">
                                        Total Amount
                                    </InputLabel>
                                    <label className="input">
                                        Rs
                                        <input
                                            id="total_amount"
                                            value={data.total_amount}
                                            readOnly
                                            className="block w-full mt-1"
                                        />
                                    </label>
                                    <InputError
                                        message={errors.total_amount}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="p-5 shadow-md card">
                        <div className="card-content">
                            <div className="py-3 text-primary font-bold border-b mb-5">
                                <h1>Products Details</h1>
                            </div>

                            {data.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 gap-3 mb-5"
                                >
                                    {/* Product */}
                                    <div className="flex flex-col gap-3 w-full">
                                        <InputLabel
                                            htmlFor={`product_id_${index}`}
                                        >
                                            Product
                                        </InputLabel>
                                        <select
                                            id={`product_id_${index}`}
                                            className="select w-full"
                                            value={product.product_id}
                                            onChange={(e) => {
                                                const updated = [
                                                    ...data.products,
                                                ];
                                                updated[index].product_id =
                                                    e.target.value;
                                                setData("products", updated);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Product
                                            </option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={
                                                errors[
                                                    `products.${index}.product_id`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <InputLabel
                                            htmlFor={`quantity_${index}`}
                                        >
                                            Quantity
                                        </InputLabel>
                                        <TextInput
                                            id={`quantity_${index}`}
                                            value={product.quantity}
                                            className="block w-full mt-1"
                                            onChange={(e) => {
                                                const updated = [
                                                    ...data.products,
                                                ];
                                                updated[index].quantity =
                                                    e.target.value;
                                                setData("products", updated);
                                            }}
                                        />
                                        <InputError
                                            message={
                                                errors[
                                                    `products.${index}.quantity`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Cost Price */}
                                    <div className="flex flex-col gap-3 w-full">
                                        <InputLabel
                                            htmlFor={`cost_price_${index}`}
                                        >
                                            Cost Price
                                        </InputLabel>
                                        <label className="input">
                                            Rs
                                            <input
                                                id={`cost_price_${index}`}
                                                value={product.cost_price}
                                                className="block w-full mt-1"
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...data.products,
                                                    ];
                                                    updated[index].cost_price =
                                                        e.target.value;
                                                    setData(
                                                        "products",
                                                        updated
                                                    );
                                                }}
                                            />
                                        </label>
                                        <InputError
                                            message={
                                                errors[
                                                    `products.${index}.cost_price`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Subtotal */}
                                    <div className="flex flex-col gap-3 w-full">
                                        <InputLabel
                                            htmlFor={`subtotal_${index}`}
                                        >
                                            Subtotal
                                        </InputLabel>
                                        <label className="input">
                                            Rs
                                            <input
                                                id={`subtotal_${index}`}
                                                value={product.subtotal}
                                                readOnly
                                                className="block w-full mt-1"
                                            />
                                        </label>
                                        <InputError
                                            message={
                                                errors[
                                                    `products.${index}.subtotal`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ml-auto">
                            <button
                                type="button"
                                onClick={() =>
                                    setData("products", [
                                        ...data.products,
                                        {
                                            product_id: "",
                                            quantity: "",
                                            cost_price: "",
                                            subtotal: "",
                                        },
                                    ])
                                }
                                className="btn btn-secondary mt-3"
                            >
                                Add More Product
                            </button>
                        </div>
                    </div>

                    <div className="ml-auto">
                        <PrimaryButton
                            className="btn btn-primary"
                            type="submit"
                            disabled={processing}
                        >
                            {purches?.id
                                ? "Update Purchase"
                                : "Create Purchase"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
