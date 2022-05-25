import React, {useContext} from 'react';
import Head from "next/head";
import Link from "next/link";
import {Store} from "../utils/Store";

/**
 * It's a React component that renders a header, a main section, and a footer
 * @returns The Layout component is being returned.
 */
function Layout({title, children}) {
    const {state} = useContext(Store);
    const {cart} = state;
    return (
        <>
            <Head>
                <title>{title? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="E-Commerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={'flex min-h-screen flex-col justify-between'}>
                <header>
                    <nav className={'flex h-12 justify-between items-center px-4 shadow-md'}>
                        <Link href="/">
                            <a className={'text-lg font-bold'}>amazona</a>
                        </Link>
                        <div>
                            <Link href={"/cart"}><a className={'p-2'}>
                                Cart
                                {cart.cartItems.length > 0 && (
                                    <span className={'ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'}>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </span>
                                )}
                            </a></Link>
                            <Link href={"/login"}><a className={'p-2'}>Login</a></Link>
                        </div>
                    </nav>
                </header>
                <main className={'container m-auto mt-4 px-4'}>
                    {children}
                </main>
                <footer className={'flex h-10 justify-center items-center shadow-inner'}>
                    <p className={'font-mono'}>Copyright © 2022 Amazona</p>
                </footer>
            </div>
        </>
    );
}

export default Layout;