import {createContext, useReducer} from 'react';

/* It creates a context provider that wraps the children of the component it's used in, and it provides the state and
dispatch functions to the children. */
export const Store = createContext();

/* Setting the initial state of the store. */
const initialState = {
    cart: { cartItems: [] },
};

/**
 * If the action type is CART_ADD_ITEM, then we check if the item already exists in the cart.
 * If it does, we update the quantity of the item.
 * If it doesn't, we add the item to the cart
 * @param state - The current state of the store.
 * @param action - This is the action object that is dispatched from the component.
 * @returns return { ...state, cart: { ...state.cart, cartItems } };
 */
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item.slug === newItem.slug
            );
            const cartItems = existItem? state.cart.cartItems.map((item) =>
                item.name === existItem.name ? newItem : item
            )
                : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item.slug !== action.payload.slug
            );
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        default:
            return state;
    }
}

/**
 * It creates a context provider that wraps the children of the component it's used in, and it provides the state and
 * dispatch functions to the children
 * @returns The StoreProvider is returning the Store.
 * Provider with the value of the state and dispatch.
 */
export function StoreProvider( {children} ) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}> {children} </Store.Provider>;
}
