/* Importing the global stylesheet. */
import '../styles/globals.css';
/* Importing the SessionProvider from the next-auth/react package. */
import { SessionProvider } from "next-auth/react";
/* Importing the StoreProvider from the Store.js file. */
import { StoreProvider } from "../utils/Store";
/**
 * > The `MyApp` function is a wrapper for the `Component` that is passed in.
 * It wraps the `Component` in a `SessionProvider` and a `StoreProvider`
 * @returns A component that is wrapped in a SessionProvider and a StoreProvider.
 */
function MyApp( { Component, pageProps: { session, ...pageProps }, } ) {
    /* Wrapping the `Component` in a `SessionProvider` and a `StoreProvider`. */
    return (
        <SessionProvider session={ session }>
            <StoreProvider>
                <Component { ...pageProps } />
            </StoreProvider>
        </SessionProvider>
    )
}
/* Exporting the MyApp function. */
export default MyApp
