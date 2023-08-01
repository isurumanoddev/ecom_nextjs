'use client'
import React from "react";


import {ShoppingCart} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {selectItems} from "@/app/GlobalRedux/Features/basket/basketSlice";
import {useSelector} from "react-redux";


const Header = () => {

    const items = useSelector(selectItems);

    const router = useRouter();


    return (
        <header>
            <div className="flex items-center px-4 justify-between shadow border-b-2">
                <div
                    onClick={() => router.push("/")}
                    className="mt-2 flex items-center flex-grow ">
                    <img
                        width={150}
                        height={40}
                        src="data:image/png;base64,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"
                        alt="amazon/logo"
                        className="cursor-pointer p-4"/>


                </div>
                <div
                    onClick={() => router.push("/checkout")}
                    className="link  flex items-center relative"
                >
                    <div
                        className={'cursor-pointer absolute left-0 -top-1.5 text-[12px] flex flex-col justify-center items-center font-bold  bg-red-600 rounded-full  w-5 h-5  text-white'}>
                        {items.length} </div>

                    <ShoppingCart fontSize="large"  className="cursor-pointer h-10 text-black font-semibold "/>
                    <p className={"pl-2 font-semibold"}>Cart</p>


                </div>


            </div>

        </header>
    );
};

export default Header;
