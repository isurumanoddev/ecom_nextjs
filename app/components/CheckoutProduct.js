'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import toast, { Toaster } from "react-hot-toast";

import Star from "@mui/icons-material/Star";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) => {
  // const dispatch = useDispatch();

  const addItemTOBasket = () => {
    const loadingToast = toast.loading("Adding Item...");

    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };


  };


  return (
    <div
      className="grid grid-cols-5"
    >
      <Toaster />
      <Image src={image} height={200} width={200} className="object-contain"  alt={"image"}/>
      <div className="col-span-3 mx-5">
        <p>{title}</p>
         <div className="flex">
                        {Array(customRating)
                            .fill()
                            .map((_, i) => (


                                <Star key={i} className="h-5 text-green-600"/>
                            ))}
                        <p className={"text-gray-500 pl-2"}>({ratedby})</p>
                    </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />

      </div>

    </div>
  );
};

export default CheckoutProduct;
