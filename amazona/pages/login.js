import Link from "next/link";
import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from "../components/Layout";

/**
 * It renders a form with two inputs, one for email and one for password, and a submit button
 * @returns A function component that renders a form.
 */
export default function LoginScreen() {
    /* Destructuring the useForm hook. */
    const { handleSubmit, register, formState: { errors } } = useForm();
    /**
     * It takes an object with two properties, email and password, and logs them to the console
     */
    const submitHandler = ({ email, password }) => {
        console.log(email, password);
    }
    /* Returning a function component that renders a form. */
    return (
        <Layout title={'Login'}>
            <form  className={'mx-auto max-w-screen-md'} onSubmit={handleSubmit(submitHandler)}>
                <h1 className={'mb-4 tex-xl'}>Login</h1>
                <div className={'mb-4'}>
                    <label htmlFor="email">Email</label>
                    <input {...register('email',
                        {
                            required: 'Please enter email.',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address.'
                            }
                        })} className={'w-full'} id={'email'} type="email" autoFocus/>
                    {errors.email && (<span className={'text-red-600'}>{errors.email.message}</span>)}
                </div>
                <div className={'mb-4'}>
                    <label htmlFor="password">Password</label>
                    <input {...register('password',
                        {
                            required: 'Please enter password.',
                            minLength: { value: 8, message: 'Password must be at least 8 characters.'
                            }
                        })} className={'w-full'} id={'password'} type="password" autoFocus/>
                    {errors.password && (<span className={'text-red-600'}>{errors.password.message}</span>)}
                </div>
                <div className={'mb-4'}>
                    <button className={'primary-button'}>Login</button>
                </div>
                <div className={'mb-4'}>
                    <span className={'mr-2'}>Don't have an account?</span>
                    <Link href={`register`}>Register</Link>
                </div>
            </form>
        </Layout>
    );
}