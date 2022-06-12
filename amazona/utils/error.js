/**
 * If the error has a response and the response has data and the data has a message, return the message, otherwise return
 * the error message
 * @param err - The error object returned from the API call.
 */
const getError = (err) =>
    err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;

/* Exporting the function `getError` so that it can be used in other files. */
export { getError };