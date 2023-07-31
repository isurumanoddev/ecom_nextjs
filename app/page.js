
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
    <main className="max-w-screen-2xl mx-auto">

        <ProductFeed products={products.ecommerce.products}  />
      </main>
  )
}
