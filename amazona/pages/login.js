/* It imports the `Link` component from the `next/link` package. */
import Link from 'next/link';
/* Importing the `useEffect` hook from the `react` package. */
import React, { useEffect } from 'react';
/* It imports the `signIn` and `useSession` functions from the `next-auth/react` package. */
import { signIn, useSession } from 'next-auth/react';
/* It imports the `useForm` hook from the `react-hook-form` package. */
import { useForm } from 'react-hook-form';
/* It imports the `Layout` component from the `Layout.js` file in the `components` folder. */
import Layout from '../components/Layout';
/* It imports the `getError` function from the `error.js` file in the `utils` folder. */
import { getError } from '../utils/error';
/* It imports the `toast` function from the `react-toastify` package. */
import { toast } from 'react-toastify';
/* It imports the `useRouter` hook from the `next/router` package. */
import { useRouter } from 'next/router';
/**
 * It renders a form with two inputs, one for email and one for password, and a submit button
 * @returns A function component that renders a form.
 */
export default function LoginScreen() {
    /* Destructuring the useSession hook. */
    const { data: session } = useSession();
    /* Getting the router object from the `next/router` package. */
    const router = useRouter();
    /* Destructuring the `redirect` property from the `router.query` object. */
    const { redirect } = router.query;
    /* Checking if the user is logged in. If the user is logged in, it redirects the user to the home page. */
    useEffect( () => {
        if ( session?.user ) {
            router.push( redirect || '/' );
        }
    }, [ router, session, redirect ] );
    /* Destructuring the useForm hook. */
    const { handleSubmit, register, formState: { errors } } = useForm();
    /**
     * It takes an object with two properties, email and password, and logs them to the console
     */
    const submitHandler = async ( { email, password } ) => {
        try {
            const result = await signIn( 'credentials', {
                redirect: false,
                email,
                password,
            } );
            if ( result.error ) {
                toast.error( result.error );
            }
        } catch ( err ) {
            toast.error( getError( err ) );
        }
    };
    /* Returning a function component that renders a form. */
    return (
        <Layout title={ 'Login' }>
            <form className={ 'mx-auto max-w-screen-md' } onSubmit={ handleSubmit( submitHandler ) }>
                <h1 className={ 'mb-4 tex-xl' }>Login</h1>
                <div className={ 'mb-4' }>
                    <label htmlFor="email">Email</label>
                    <input { ...register( 'email',
                        {
                            required: 'Please enter email.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address.'
                            }
                        } ) } className={ 'w-full' } id={ 'email' } type="email" autoFocus/>
                    { errors.email && ( <span className={ 'text-red-600' }>{ errors.email.message }</span> ) }
                </div>
                <div className={ 'mb-4' }>
                    <label htmlFor="password">Password</label>
                    <input { ...register( 'password',
                        {
                            required: 'Please enter password.',
                            minLength: {
                                value: 8, message: 'Password must be at least 8 characters.'
                            }
                        } ) } className={ 'w-full' } id={ 'password' } type="password" autoFocus/>
                    { errors.password && ( <span className={ 'text-red-600' }>{ errors.password.message }</span> ) }
                </div>
                <div className={ 'mb-4' }>
                    <button className={ 'primary-button' }>Login</button>
                </div>
                <div className={ 'mb-4' }>
                    <span className={ 'mr-2' }>Don&apos;t have an account?</span>
                    <Link href={ `register` }>Register</Link>
                </div>
            </form>
        </Layout>
    );
}