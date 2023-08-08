
import ProductFeed from "@/app/components/ProductFeed";


async function getData() {
  const res = await fetch('https://my-json-server.typicode.com/kodplex/pr-re-ec-products/db')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export default async function Home() {
    const products = await getData()
    console.log("products ",products.ecommerce.products)



  return (
    <main className=" mx-auto max-w-7xl  ">

        <ProductFeed products={products.ecommerce.products}  />
      </main>
  )
}
