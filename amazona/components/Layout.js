/* It's importing the `useSession()` hook from the `next-auth/react` library. */
import { signOut, useSession } from "next-auth/react";
/* It's importing the `Head` component from the `next/head` library. */
import Head from "next/head";
/* It's importing the `Link` component from the `next/link` library. */
import Link from "next/link";
/* It's importing the `Cookies` library. */
import Cookies from 'js-cookie';
/* It's importing the `useContext()`, `useEffect()`, and `useState()` hooks from the `react` library. */
import React, { useContext, useEffect, useState } from 'react';
/* It's importing the `ToastContainer` component from the `react-toastify` library. */
import { ToastContainer } from 'react-toastify';
/* It's importing the `Menu` component from the `@headlessui/react` library. */
import { Menu } from '@headlessui/react';
/* It's importing the CSS file for the `react-toastify` library. */
import 'react-toastify/dist/ReactToastify.css';
/* It's importing the `Store` component from the `../utils/Store` file. */
import { Store } from "../utils/Store";
/* It's importing the `DropdownLink` component from the `./DropdownLink` file. */
import DropdownLink from "./DropdownLink";
/**
 * It's a React component that renders a header, a main section, and a footer
 * @returns The Layout component is being returned.
 */
function Layout( { title, children } ) {
    /* It's destructuring the `useSession()` hook. */
    const { status, data : session } = useSession();
    /* It's destructuring the `state` property from the `useContext(Store)` hook. */
    const { state, dispatch } = useContext( Store );
    /* It's destructuring the `cart` property from the `state` property. */
    const { cart } = state;
    /* It's destructuring the `useState()` hook. */
    const [ cartItemsCount, setCartItemsCount ] = useState( 0 );
    /* It's updating the `cartItemsCount` state property whenever the `cart.cartItems` property changes. */
    useEffect( () => {
        setCartItemsCount( cart.cartItems.reduce( ( a, c ) => a + c.quantity, 0 ) );
    }, [ cart.cartItems ] );
    /**
     * It removes the cart cookie and resets the cart state.
     */
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    };
    return (
        <>
            {/** It's adding a title, a description, and a favicon to the page. **/ }
            <Head>
                <title>{ title ? title + ' - Amazona' : 'Amazona' }</title>
                <meta name="description" content="E-Commerce Website"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/** It's displaying a toast message. **/ }
            <ToastContainer position="bottom-center" limit={ 1 }/>
            {/* It's creating a header, a main section, and a footer. */ }
            <div className={ 'flex min-h-screen flex-col justify-between' }>
                {/* It's creating a header. */ }
                <header>
                    {/** It's creating a navigation bar. **/ }
                    <nav className={ 'flex h-12 justify-between items-center px-4 shadow-md' }>
                        {/** It's creating a link to the `/` page. **/ }
                        <Link href="/">
                            <a className={ 'text-lg font-bold' }>amazona</a>
                        </Link>
                        <div>
                            {/** It's creating a link to the `/cart` page. **/ }
                            <Link href={ "/cart" }>
                                <a className={ 'p-2' }>
                                    Cart
                                    { cartItemsCount > 0 && (
                                        <span
                                            className={ 'ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white' }>
                                            { cartItemsCount }
                                        </span>
                                    ) }
                                </a>
                            </Link>
                            {/** It's checking if the `status` property is equal to `loading` and if it is,
                             * it's displaying `Loading`.
                             * If it's not, it's checking if the `session` property is truthy and if it is, it's
                             * displaying the `session.user.name` property.
                             * If it's not, it's displaying a link to the`/login` page.
                             **/ }
                            { status === 'loading' ? (
                                'Loading'
                            ) : session?.user ? (
                                <Menu as={'div'} className={'relative inline-block z-50'}>
                                    <Menu.Button className={'text-blue-600'}>
                                        { session.user.name }
                                    </Menu.Button>
                                    <Menu.Items className={'absolute right-0 w-56 origin-top-right bg-white shadow-lg'}>
                                        <Menu.Item>
                                            <DropdownLink className={'dropdown-link'} href={'/profile'}>
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className={ 'dropdown-link' } href={'/logout'}>
                                                Order History
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a
                                                className={ 'dropdown-link' }
                                                href={'#'}
                                                onClick={logoutClickHandler}
                                            >
                                                Logout
                                            </a>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                    <Link href="/login">
                                        <a className="p-2">Login</a>
                                    </Link>
                                ) }
                        </div>
                    </nav>
                </header>
                {/** It's creating a main section. **/ }
                <main className={ 'container m-auto mt-4 px-4' }>
                    { children }
                </main>
                {/** It's creating a footer. **/ }
                <footer className={ 'flex h-10 justify-center items-center shadow-inner' }>
                    <p className={ 'font-mono' }>Copyright © 2022 Amazona</p>
                </footer>
            </div>
        </>
    );
}
/* It's exporting the Layout component. */
export default Layout;