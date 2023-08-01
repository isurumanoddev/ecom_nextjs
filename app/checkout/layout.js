import {Providers} from "@/app/GlobalRedux/provider";




export default function CheckoutLayout({
  children
}) {
  return (
    <Providers>


      {children}
    </Providers>
  )
}