/* Importing the global stylesheet. */
import '../styles/globals.css';
/* Importing the `SessionProvider` and `useSession` from the `next-auth/react` package. */
import { SessionProvider, useSession } from "next-auth/react";
/* Importing the StoreProvider from the Store.js file. */
import { StoreProvider } from "../utils/Store";
/* Importing the `useRouter` hook from the `next/router` package. */
import { useRouter } from "next/router";
/**
 * > The `MyApp` function is a wrapper for the `Component` that is passed in.
 * It wraps the `Component` in a `SessionProvider` and a `StoreProvider`
 * @returns A component that is wrapped in a SessionProvider and a StoreProvider.
 */
function MyApp( { Component, pageProps : { session, ...pageProps }, } ) {
    /* Wrapping the `Component` in a `SessionProvider` and a `StoreProvider`. */
    return (
        <SessionProvider session={ session }>
            <StoreProvider>
                {Component.auth ? (
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                     <Component {...pageProps} />
                 )}
            </StoreProvider>
        </SessionProvider>
    )
}
/**
 * If the user is not logged in, redirect them to the /unauthorized page
 * @returns The children of the Auth component.
 */
function Auth( { children } ) {
    const router = useRouter();
    const { status } = useSession( {
                                       required : true,
                                       onUnauthenticated() {
                                           router.push( '/unauthorized?message=login required' );
                                       },
                                   } );
    if ( status === 'loading' ) {
        return <div>Loading...</div>;
    }

    return children;
}
/* Exporting the MyApp function. */
export default MyApp
