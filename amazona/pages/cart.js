import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

/**
 * It renders a table of items in the cart, and a button to check out
 */
function CartScreen() {
    /* A hook that gives us access to the router object. */
    const router = useRouter();
    /* Using the `useContext` hook to get access to the `state` and `dispatch` functions from the `Store` context. */
    const { state, dispatch } = useContext(Store);
    /* Destructuring the `cartItems` from the `state` object. */
    const {
        cart: { cartItems },
    } = state;
    /**
     * When the removeItemHandler function is called, it will dispatch an action to the reducer, which will then update the
     * state.
     * @param item - The item to be removed from the cart.
     */
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    /**
     * It takes an item and a quantity, converts the quantity to a number, and dispatches an action to add the item to the
     * cart
     * @param item - The item object that is being added to the cart.
     * @param qty - The quantity of the item to be added to the cart.
     */
    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty);
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    };
    /* Rendering the cart screen. */
    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <table className="min-w-full ">
                            <thead className="border-b">
                            <tr>
                                <th className="p-5 text-left">Item</th>
                                <th className="p-5 text-right">Quantity</th>
                                <th className="p-5 text-right">Price</th>
                                <th className="p-5">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.slug} className="border-b">
                                    <td>
                                        <Link href={`/product/${item.slug}`}>
                                            <a className="flex items-center">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                ></Image>
                                                <span className={'mr-2'}></span>
                                                {item.name}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="p-5 text-right">
                                        <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                            {[...Array(item.countInStock).keys()].map((x) =>
                                                (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td className="p-5 text-right">${item.price}</td>
                                    <td className="p-5 text-center">
                                        <button onClick={() => removeItemHandler(item)}>
                                            <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">
                                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={() => router.push('/shipping')}
                                    className="primary-button w-full"
                                >
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default dynamic (()=> Promise.resolve(CartScreen), {ssr: false});