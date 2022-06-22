/* Importing the Link component from the next/link package. */
import Link from "next/link";
/* Importing the React library. */
import React from 'react';
/**
 * It takes in a `href` prop and returns a `Link` component that wraps an `a` tag
 * @param props - This is the props object that is passed to the component.
 * @returns A Link component with an anchor tag inside it.
 */
export default function DropdownLink( props ) {
    /* Destructuring the props object. */
    let { href, children, ...rest } = props;
    return (
        <Link href={ href }>
            <a { ...rest }>{ children }</a>
        </Link>
    );
}