import ProductItem from "./ProductItem"; 

export default function ProductList ({products}) {

    return (
    <ul> 
        {products.map((p) => (
            <ProductItem key={p.id} products={p} />
        ))}
    </ul>
    ); 
}