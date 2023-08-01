'use client'

import {motion} from "framer-motion";
import Image from "next/image";
import React, {useState} from "react";

import toast, {Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";
import Star from '@mui/icons-material/Star';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {addToBasket} from "@/app/GlobalRedux/Features/basket/basketSlice";

const Product = ({
                     id,
                     name,
                     price,
                     description,
                     status,
                     image,
                     rating,
                     ratedby
                 }) => {
    const dispatch = useDispatch();

    // const [customRating] = useState(
    //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING)) + MIN_RATING
    // );


    const addItemTOBasket = () => {
        const loadingToast = toast.loading("Adding Item...");

        const product = {
            id,
            name,
            price,
            description,
            status,
            image,
            ratedby,
            rating,
        };


        dispatch(addToBasket(product));



        // dispatch(addToBasket(product));
        //
        // toast.success(`Item Added To Basket`, {
        //     id: loadingToast,
        //
        //     position: "bottom-right",
        //     style: {
        //         textAlign: "center",
        //         padding: "18px",
        //     },
        // });
    };


    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="relative flex flex-col m-2 bg-white z-30 p-3 hover:shadow-sm"
        >
            <Toaster/>
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {status}
            </p>
            <div className="items-center flex justify-center bg-gray-100 py-8 rounded-lg relative">
                <div
                    className={'absolute right-2.5 top-2.5 rounded-full bg-white p-2.5 cursor-pointer hover:bg-rose-400 transition hover:text-white'}>
                    <FavoriteBorderIcon/></div>
                <img
                    src={image}
                    alt={name}


                    className="object-contain h-[170px] w-[170px] "
                />
            </div>
            <div className={"flex flex-col justify-between"}>
                <div className={'flex flex-col gap-1 px-1.5'}>

                    <div className={'flex flex-row justify-between mt-2'}>
                        <h4 className={'font-semibold text-lg'}>{name}</h4>
                        <div className="mb-2 font-semibold">
                            <p className={"font-semibold"}>
                                {new Intl.NumberFormat('en-US', {style: 'currency', currency: "USD"}).format(price)}</p>


                        </div>
                    </div>


                    <p className="text-sm text-gray-500  line-clamp-2 overflow-hidden">{description}</p>
                    <div className="flex">
                        {Array(rating)
                            .fill()
                            .map((_, i) => (


                                <Star key={i} className="h-5 text-green-600"/>
                            ))}
                        <p className={"text-gray-500 pl-2"}>({ratedby})</p>
                    </div>


                </div>
                <button

                    onClick={addItemTOBasket}
                    className="transition mt-2 button border-2 w-fit p-2 px-5 border-gray-400 rounded-full text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600  "
                >
                    Add to Busket
                </button>
            </div>


        </motion.div>
    );
};

export default Product;
