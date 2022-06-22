import {createContext, useReducer} from 'react';
import Cookies from 'js-cookie';
/* It creates a context provider that wraps the children of the component it's used in, and it provides the state and
dispatch functions to the children. */
export const Store = createContext();
/* It's checking if there is a cookie called cart, and if there is, it's parsing it and setting it to the cart
property of the initialState object. If there isn't, it's setting the cart property to an empty array. */
const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] },
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
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item.slug !== action.payload.slug
            );
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_RESET':
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress: { location: {} },
                    paymentMethod: '',
                },
            };
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
