import { products } from "@/data/products"; 

export default async function ProductDetailPage(
{params}:{params: Promise<{id: string }>}

) {

    const { id } = await params; 

    //debugging
    console.log("PRODUCTS", products); 
    console.log("PARAMS ID:", id); 

    const product = products.find((p) => p.id === id); 
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