/* Importing the db.js file from the utils folder. */
import db from "../../utils/db";
/* Importing the User model from the models' folder. */
import User from "../../models/User";
/* Importing the data file. */
import data from "../../utils/data";
/**
 * It connects to the database, deletes all the users, inserts the users from the data file,
 * disconnects from the database, and sends a message to the client.
 * @param req - The request object.
 * @param res - The response object.
 */
const handler = async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: "Seeding successful!" });
}
/* It exports the handler function. */
export default handler;