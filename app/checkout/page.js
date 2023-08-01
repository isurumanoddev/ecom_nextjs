'use client'

import React from 'react';
import {useSelector} from "react-redux";
import CheckoutProduct from "@/app/components/CheckoutProduct";
import {selectItems} from "@/app/GlobalRedux/Features/basket/basketSlice";

function Page() {
    const items = useSelector(selectItems);

    //   const total = useSelector(selectTotal);
    return (
        <div>
            <main className="lg:flex max-w-7xl mx-auto">
                <div className="flex-grow m-5 shadow-sm">


                    <div className="flex flex-col py-5 px-2 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0
                                ? "Your Amazon Basket is empty"
                                : "Your Shopping Basket"}
                        </h1>
                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                description={item.description}

                                image={item.image}

                                rating={item.rating}
                                ratedby={item.ratedby}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                subtotal ({items.length}) items:
                                {/*<p className={"font-semibold"}>*/}
                                {/*    {new Intl.NumberFormat('en-US', {*/}
                                {/*        style: 'currency',*/}
                                {/*        currency: "USD"*/}
                                {/*    }).format(price)}</p>*/}
                            </h2>
                            <button
                                role="link"
                                className="transition mt-2 button border-2 w-fit p-2 px-5 border-gray-400 rounded-full text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600  "
                            >
                                {`Proceed to checkout`}
                            </button>

                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Page;