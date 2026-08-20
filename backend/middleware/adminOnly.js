// Must run AFTER the `auth` middleware, since it relies on req.userRole being set
module.exports = function (req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
