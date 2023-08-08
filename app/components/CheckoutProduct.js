'use client'

import Image from "next/image";
import React from "react";

import toast, {Toaster} from "react-hot-toast";

import Star from "@mui/icons-material/Star";

const CheckoutProduct = ({id, name, price, description, category, image, ratedby, rating,}) => {
    return (

        <div className="flex">
            <Image src={image} height={80} width={80} className="object-contain basis-1/5 px-4 md:px-10" alt={"image"}/>
            <div className="flex justify-between items-center basis-4/5 px-2">
                <div className={"flex flex-col"}>
                    <p className={"text-sm md:text-lg"}>{name}</p>

                    <p className="text-xs my-2 line-clamp-3">{description}</p>
                    <div className="flex">
                        {Array(rating)
                            .fill()
                            .map((_, i) => (


                                <Star key={i} className="h-5 text-green-600"/>))}
                        <p className={"text-gray-500 pl-2"}>({ratedby})</p>
                    </div>
                </div>

                <p className={"font-semibold"}>
                    $ {price.toFixed(2)}</p>

            </div>

        </div>);
};

export default CheckoutProduct;
