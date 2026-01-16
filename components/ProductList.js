import ProductItem from "./ProductItem"; 

export default function ProductList ({products}) {

    return (
    <ul> 
        {ProductList.map((p) => (
            <ProductItem key={p.id} products={p} />
        ))}
    </ul>
    ); 
}