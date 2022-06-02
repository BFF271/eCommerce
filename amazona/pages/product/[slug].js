import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useContext} from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import {Store} from "../../utils/Store";
/**
 * It renders the product page
 * @returns A product page.
 */
export default function ProductScreen(){
    const {state, dispatch} = useContext(Store);
    const router = useRouter();
    const {query} = useRouter();
    const {slug} = query;
    const product = data.products.find(x => x.slug === slug);
    /* If the product is not found, it will return a message saying that the product is not found. */
    if(!product) return <h1>Product not found</h1>;
    /**
     * When the adding to cart button is clicked, dispatch an action to the reducer to add the product to the cart.
     */
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find( (x) => x.slug === product.slug);
        const quantity = existItem? existItem.quantity + 1 : 1;
        /* Checking if the product is in stock. If it is not in stock, it will return. */
        if(product.countInStock < quantity) {
            alert('The product is not in stock');
            return;
        }
        /* Dispatching an action to the reducer. */
        dispatch( {type: 'CART_ADD_ITEM', payload: {...product, quantity} } );
        /* Redirecting the user to the cart page and then scrolling to the top of the page. */
        router.push('/cart').then(r => window.scrollTo(0, 0));
    }
    /* Rendering the product page. */
    return (
        <Layout title={product.name}>
            <div className={'py-2'}>
                <Link href={'/'}>back to products</Link>
            </div>
            <div className={'grid md:grid-cols-4 md:gap-3'}>
                <div className={'md:col-span-2'}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={'100%'}
                        height={'100%'}
                        layout={'responsive'}
                    />
                </div>
                <div>
                    <ul>
                        <li><h1 className="text-lg font-bold">{product.name}</h1></li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className={'card p-5'}>
                        <div className={'mb-2 flex justify-between'}>
                            <div>Price:</div>
                            <div>${product.price}</div>
                        </div>
                        <div className={'mb-2 flex justify-between'}>
                            <div>Status:</div>
                            <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
                        </div>
                        <button className={'primary-button w-full'} onClick={addToCartHandler}>Add to cart</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}