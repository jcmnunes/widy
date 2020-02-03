/**
 * Error handling middleware.
 *
 * Catches all async/await errors
 */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json(message);
};
