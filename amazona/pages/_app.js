import '../styles/globals.css'
import {StoreProvider} from "../utils/Store";

/**
 * The MyApp function is a wrapper for the entire application. It takes in a Component and pageProps as arguments and
 * returns a StoreProvider component that wraps the Component
 * @returns The StoreProvider is being returned.
 */
function MyApp( { Component, pageProps } ) {
  return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
  )
}

export default MyApp
