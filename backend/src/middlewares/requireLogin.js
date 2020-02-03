const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.APP_SECRET);
      req.userId = id;
      return next();
    }
    return res.status(401).json({ message: 'You need to login' });
  } catch (err) {
    if (token) {
      res.clearCookie('token');
    }
    return res.status(401).json({ message: 'You need to login' });
  }
};
