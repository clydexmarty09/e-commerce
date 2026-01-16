import { products } from "../../../data/products"; 

export default function ProductDetailPage(
{params}:{params:{id: string }}

) {
    const product = products.find((p) => p.id == params.id); 
    if(!product) {
        return (
            <main> 
                <h1> Product not found </h1>
            </main>
        ); 
    }

    return (
        <main> 
            <h1> {product.name} </h1>
            <p> Price: {product.price} </p>
            <p> ID: {product.id} </p>
        </main>
    ); 
}