import ProductItem from "./ProductItem"; 

export default function ProductList ({product}) {

    return (
    <ul> 

        {ProductList.map((p) => (
            <ProductItem key={p.id} product={p} />
        ))}
    </ul>
    ); 
}