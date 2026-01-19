"use client";  

import Link from "next/link";



export default function ProductItem ({product}) {

    return (
        <li> 
            <Link href= {`/products/${product.id}`} >
            {product.name} - ${product.price}
            </Link>
        </li>
    ); 
}