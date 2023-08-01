'use client'
import React, {useState} from 'react';
import Star from "@mui/icons-material/Star";
import ColorButton from "@/app/components/ColorButton";

async function getProduct(id) {
    const res = await fetch('https://my-json-server.typicode.com/kodplex/pr-re-ec-products/db')
    const data = await res.json()
    const product = data.ecommerce.products[id - 1]

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return product
}

async function Page({params}) {
    const product = await getProduct(params.productId)
    console.log("product ", product)

    console.log("params ", params)


    return (

        <div className="max-w-5xl mx-auto px-8 mt-6">
            <div className={" flex flex-col md:grid md:grid-cols-2 md:gap-5 gap-2 "}>
                <div className={'flex flex-col justify-between gap-2'}>
                    <div
                        className="basis-4/5 mt-4 bg-gray-100 flex h-full w-full lg:h-full lg:w-full justify-center items-center ">
                        <img
                            src={product.image}
                            alt="Product"
                            className="bg-gray-100 rounded-lg w-[300px] h-[300px] lg:h-[360px] lg:w-[360px] p-10"
                        />
                    </div>
                    <div className={"grid grid-cols-4 gap-4"}>
                        <img
                            src={product.image}
                            alt="Product"
                            className="bg-gray-100 rounded-lg w-full h-full p-4"
                        /><img
                            src={product.image}
                            alt="Product"
                            className="bg-gray-100 rounded-lg w-full h-full p-4"
                        /><img
                            src={product.image}
                            alt="Product"
                            className="bg-gray-100 rounded-lg w-full h-full p-4"
                        /><img
                            src={product.image}
                            alt="Product"
                            className="bg-gray-100 rounded-lg w-full h-full p-4"
                        />

                    </div>
                </div>

                <div className="bg-white p-4 shadow rounded-lg  flex flex-col gap-2 ">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-semibold">{product.name}</h1>

                    </div>


                    <p className="text-sm text-gray-900 ">
                        {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                        libero

                    </p>

                    <div className="flex pb-4 border-b-2 border-gray-200">
                        {Array(product.rating)
                            .fill()
                            .map((_, i) => (


                                <Star key={i} className="h-5 text-green-600"/>
                            ))}
                        <p className={"text-gray-500 pl-2"}>({product.ratedBy})</p>
                    </div>
                    <div className={"flex flex-col gap-2 py-2 pb-4 border-b-2 border-gray-300"}>
                        <h1 className={"text-2xl font-semibold text-black"}>$ 549.00 or 99.00 /month</h1>
                        <p className={"text-sm"}>Suggests payments with 6 month special financing</p>
                    </div>
                    <div className="mt-3 pb-4 border-b-2 border-gray-300">
                        <h2 className="text-lg font-semibold">Choose a Color</h2>
                        <div className="flex gap-3 mt-2">
                            <ColorButton
                                color="black"


                            />
                            <ColorButton
                                color="blue-900"


                            />
                            <ColorButton
                                color="red-900"


                            /> <ColorButton
                            color="green-900"


                        />

                        </div>
                    </div>
                    <div className={"flex flex-row items-center pt-3"}>
                        <div className={'rounded-full items-center bg-gray-100 px-4 flex justify-evenly gap-3 '}>
                            <button className={'p-1 text-black font-semibold text-lg'}>-</button>
                            <p className={'p-1 text-black font-semibold text-sm'}>1</p>
                            <button className={'p-1 text-black font-semibold text-lg'}>+</button>

                        </div>
                        <div className={"flex flex-col gap-1 pl-5"}>
                            <p className={'text-sm text-gray-800'}>Only <span
                                className={'text-orange-500'}>12 items </span>left</p>
                            <p className={'text-sm text-gray-800'}>Dont miss it !</p>
                        </div>

                    </div>
                    <div className="mt-4 flex flex-row gap-4  ">
                        <button
                            className="hover:scale-[1.05] transition text-xs w-40 flex justify-center items-center bg-green-700 text-white px-4 py-2 rounded-full shadow-md">
                            Buy now
                        </button>
                        <button
                            className="hover:scale-[1.05] transition text-xs w-40 flex justify-center items-center bg-white text-gray-900 border-2 border-gray-200 px-4 py-2 rounded-full shadow-md">
                            Add to Cart
                        </button>

                    </div>
                    <div className={"w-full grid grid-rows-2 border-2 rounded border-gray-200  mt-2 mb-2 divide-y"}>

                        <div className={"flex flex-col gap-1 px-5 py-3"}>
                            <p className={"text-sm text-black"}>Free Delivery</p>
                            <p className={"text-xs text-black underline"}>Enter your postal code for delivary
                                availability</p>

                        </div>
                        <div className={"flex flex-col gap-1 px-5 py-3"}>
                            <p className={"text-sm text-black"}>Free Delivery</p>
                            <p className={"text-xs text-black underline"}>Enter your postal code for delivary
                                availability</p>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Page;