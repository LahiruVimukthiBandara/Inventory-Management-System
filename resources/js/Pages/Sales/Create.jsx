import InputError from "@/Components/Core/InputError";
import InputLabel from "@/Components/Core/InputLabel";
import PrimaryButton from "@/Components/Core/PrimaryButton";
import TextInput from "@/Components/Core/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SaleForm({
    customers: initialCustomers,
    products: initialProducts,
    sale,
}) {
    const [customers, setCustomers] = useState(initialCustomers || []);
    const [products, setProducts] = useState(initialProducts || []);

    // map sale items to products
    const initialProductsState =
        sale?.sale_items?.length > 0
            ? sale.sale_items.map((item) => ({
                  product_id: item.product_id.toString(),
                  quantity: item.quantity.toString(),
                  selling_price: parseFloat(item.selling_price).toFixed(2),
                  subtotal: parseFloat(item.subtotal).toFixed(2),
                  id: item.id,
              }))
            : [
                  {
                      product_id: "",
                      quantity: "",
                      selling_price: "",
                      subtotal: "",
                  },
              ];

    const { data, setData, post, put, processing, reset, errors } = useForm({
        customer_id: sale?.customer_id?.toString() || "",
        sale_date: sale?.sale_date || "",
        status: sale?.status || "",
        total_amount:
            sale?.total_amount !== undefined && sale?.total_amount !== null
                ? parseFloat(sale.total_amount).toFixed(2)
                : "0.00",
        products: initialProductsState,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!initialCustomers?.length || !initialProducts?.length) {
                    const [custRes, prodRes] = await Promise.all([
                        axios.get("/api/customers"),
                        axios.get("/api/sellProducts"),
                    ]);
                    setCustomers(custRes.data.data || custRes.data);
                    setProducts(prodRes.data.data || prodRes.data);
                }
            } catch (error) {
                console.error("Failed loading data.", error);
            }
        };
        fetchData();
    }, []);

    // Recalculate subtotals & total
    useEffect(() => {
        const updatedProducts = data.products.map((product) => {
            const quantity = parseFloat(product.quantity) || 0;
            const sellingPrice = parseFloat(product.selling_price) || 0;
            return {
                ...product,
                subtotal: (quantity * sellingPrice).toFixed(2),
            };
        });
        setData("products", updatedProducts);

        const total = updatedProducts.reduce(
            (sum, p) => sum + parseFloat(p.subtotal || 0),
            0
        );
        setData("total_amount", total.toFixed(2));
    }, [JSON.stringify(data.products)]);

    const submit = (e) => {
        e.preventDefault();
        try {
            if (sale) {
                put(route("sales.update", sale.id), {
                    onSuccess: () => {
                        toast.success("Sale updated successfully.");
                    },
                    onError: () => toast.error("Something went wrong.", errors),
                });
            } else {
                post(route("sales.store"), {
                    onSuccess: () => {
                        reset();
                        toast.success("Sale created successfully.");
                    },
                    onError: () => toast.error("Something went wrong.", errors),
                });
            }
        } catch (error) {
            console.error("Submission failed.", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={sale ? "Edit Sale" : "Create Sale"} />
            <div className="px-[5%] py-5 flex flex-col gap-5">
                <form onSubmit={submit} className="flex flex-col gap-5">
                    {/* Sale Details */}
                    <div className="p-5 shadow-md card">
                        <div className="card-content">
                            <div className="py-3 mb-5 font-bold border-b text-primary">
                                <h1>Sale Details</h1>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {/* Customer */}
                                <div className="flex flex-col gap-3">
                                    <InputLabel htmlFor="customer_id">
                                        Customer
                                    </InputLabel>
                                    <select
                                        className="select"
                                        value={data.customer_id}
                                        onChange={(e) =>
                                            setData(
                                                "customer_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Customer
                                        </option>
                                        {customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.customer_id}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Sale Date */}
                                <div className="flex flex-col gap-2">
                                    <InputLabel htmlFor="sale_date">
                                        Sale Date
                                    </InputLabel>
                                    <TextInput
                                        type="date"
                                        id="sale_date"
                                        value={data.sale_date}
                                        className="block w-full mt-1"
                                        onChange={(e) =>
                                            setData("sale_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.sale_date}
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
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="ready">Ready</option>
                                        <option value="delivered">
                                            Delivered
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
                                <div className="flex flex-col w-full gap-3">
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
                            <div className="py-3 mb-5 font-bold border-b text-primary">
                                <h1>Products Details</h1>
                            </div>

                            {data.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 gap-3 mb-5"
                                >
                                    {/* Product */}
                                    <div className="flex flex-col w-full gap-3">
                                        <InputLabel
                                            htmlFor={`product_id_${index}`}
                                        >
                                            Product
                                        </InputLabel>
                                        <select
                                            id={`product_id_${index}`}
                                            className="w-full select"
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
                                    <div className="flex flex-col w-full gap-2">
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

                                    {/* Selling Price */}
                                    <div className="flex flex-col w-full gap-3">
                                        <InputLabel
                                            htmlFor={`selling_price_${index}`}
                                        >
                                            Selling Price
                                        </InputLabel>
                                        <label className="input">
                                            Rs
                                            <input
                                                id={`selling_price_${index}`}
                                                value={product.selling_price}
                                                className="block w-full mt-1"
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...data.products,
                                                    ];
                                                    updated[
                                                        index
                                                    ].selling_price =
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
                                                    `products.${index}.selling_price`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Subtotal */}
                                    <div className="flex flex-col w-full gap-3">
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
                                            selling_price: "",
                                            subtotal: "",
                                        },
                                    ])
                                }
                                className="mt-3 btn btn-secondary"
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
                            {sale ? "Update Sale" : "Create Sale"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
