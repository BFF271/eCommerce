import React from 'react';
import Head from "next/head";
import Link from "next/link";

function Layout({title, children}) {
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
                            <Link href="/cart"><a className={'p-2'}>Cart</a></Link>
                            <Link href="/login"><a className={'p-2'}>Login</a></Link>
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