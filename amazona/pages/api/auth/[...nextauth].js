/* This is importing the bcryptjs library. */
import bcryptjs from 'bcryptjs';
/* This is importing the NextAuth library. */
import NextAuth from 'next-auth';
/* This is importing the CredentialsProvider from the NextAuth library. */
import CredentialsProvider from 'next-auth/providers/credentials';
/* This is importing the User model from the `models/User.js` file. */
import User from '../../../models/User';
/* Importing the database connection from the `utils/db.js` file. */
import db from '../../../utils/db';
/* This is the configuration for the NextAuth library. */
export default NextAuth({
    /* Telling NextAuth to use JWT for session management. */
    session: {
        strategy: 'jwt',
    },
    /* Adding the user id and isAdmin to the JWT token. */
    callbacks: {
        async jwt({ token, user }) {
            if (user?._id) token._id = user._id;
            if (user?.isAdmin) token.isAdmin = user.isAdmin;
            return token;
        },
        async session({ session, token }) {
            if (token?._id) session.user._id = token._id;
            if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
    /* This is the configuration for the NextAuth library. */
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await db.connect();
                const user = await User.findOne({
                    email: credentials.email,
                });
                await db.disconnect();
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        image: 'f',
                        isAdmin: user.isAdmin,
                    };
                }
                throw new Error('Invalid email or password');
            },
        }),
    ],
});