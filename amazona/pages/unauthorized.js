/* Importing the useRouter hook from the next/router package. */
import { useRouter } from 'next/router';
/* Importing the React library. */
import React from 'react';
/* Importing the Layout component from the components folder. */
import Layout from '../components/Layout';

/**
 * It renders a page to forward unauthorized access
 */
export default function Unauthorized() {

    /* Using the useRouter hook to get the router object. */
    const router = useRouter();
    /* Destructuring the message property from the router.query object. */
    const { message } = router.query;

    return (
        <Layout title="Unauthorized Page">
            <h1 className="text-xl">Access Denied</h1>
            { message && <div className="mb-4 text-red-500">{ message }</div> }
        </Layout>
    );
}