import React from 'react';
import { useSelector } from "react-redux";
import CheckoutProduct from "@/app/components/CheckoutProduct";

function Page() {
      // const items = useSelector(selectItems);
      const items = [1,2,3,4,5,6,7,8,9,10];
      //   const total = useSelector(selectTotal);
    return (
        <div>
             <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">


          <div className="flex flex-col p-5 space-y-10 bg-white">
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
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                subtotal ({items.length}) items:
                <span className="font-bold">
                  {/*<Currency quantity={total} currency="USD" />*/}
                </span>
              </h2>
              <button
                role="link"
                // disabled={!session}
                // onClick={createCheckOutSession}
                className={'button mt-2 from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed'}
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