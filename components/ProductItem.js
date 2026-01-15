export default function ProductItem ({product}) {

    return (
        <li> 
            {product.name} - ${product.price}
        </li>
    ); 
}