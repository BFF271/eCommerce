/* It's importing the `mongoose` module. */
import mongoose from 'mongoose';
/* It's creating an empty object. */
const connection = {};
/**
 * If we're already connected, do nothing. If we're not connected, disconnect from any existing connections and then
 * connect to the database
 * @returns The connection object is being returned.
 */
async function connect() {
    if (connection.isConnected) {
        console.log('already connected');
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log('use previous connection');
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;
}
/**
 * If the connection is connected, disconnect it
 */
async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not disconnected');
        }
    }
}
/* Creating an object with two properties, `connect` and `disconnect`. */
const db = { connect, disconnect };
/* Exporting the `db` object. */
export default db;