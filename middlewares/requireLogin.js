module.exports = (req, res, next) => {
  if (!req.user) {
    // redirect to login page
    return res.status(401).send({ error: "You need to login first." });
  }
  next();
};
