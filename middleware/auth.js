module.exports = (req, res, next) => {
  if (!req.session.authen) {
    res.redirect("/admin/auth/login");
    return;
  }
  res.locals.admin = req.session.admin;
  next();
};
