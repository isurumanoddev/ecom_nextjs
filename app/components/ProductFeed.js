'use client'

import React from "react";

import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className=" grid grid-flow-row-dense  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
      {products

        .map(({ id, name, price, description, category, image, rating,ratedBy }) => (
          <Product
            key={id}
            id={id}
            title={name}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
            ratedby={ratedBy}
          />
        ))}
      {products

        .map(({ id, name, price, description, category, image, rating,ratedBy }) => (
          <Product
            key={id}
            id={id}
            title={name}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
            ratedby={ratedBy}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
