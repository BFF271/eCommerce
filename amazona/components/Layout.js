import React from 'react';
import Head from "next/head";

function Layout({title, children}) {
    return (
        <>
            <Head>
                <title>{title? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="E-Commerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <header>
                    Header
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </div>
        </>
    );
}

export default Layout;