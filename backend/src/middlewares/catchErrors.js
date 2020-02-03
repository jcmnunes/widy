/**
 * Catch errors middleware
 *
 * Wrap async controllers with this function.
 * It will catch all errors and pass them to handleErrors middleware.
 *
 * @param {function} handler - async controller function
 * @return {function} - async route handler function
 */
module.exports = handler => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (err) {
    next(err);
  }
};
