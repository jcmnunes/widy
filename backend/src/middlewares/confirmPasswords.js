/**
 * Check if reset passwords are equal
 */
module.exports = (req, res, next) => {
  if (req.body.password === req.body.confirm) {
    return next();
  }
  return res.status(400).json({ message: 'Passwords do not match' });
};
