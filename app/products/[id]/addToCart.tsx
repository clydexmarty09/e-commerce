import { useCart } from "@/context/CartContext"; 

type Product = {
    id: string; 
    name: string; 
    price: number; 
    image?: string; 

}

export default function addToCartButton({product}: {product: Product} ) {

    const { addToCart } = useCart(); 

    return (

        <button
            onClick={()=> addToCart(product)}
        > Add To Cart</button>
    ); 

}