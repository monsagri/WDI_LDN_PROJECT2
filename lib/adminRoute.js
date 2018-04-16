function adminRoute(req, res, next) {
  // if the user is not logged in
  if(!req.session.isAdmin) {
    // clear the session cookie and redirect them to the login page
    req.flash('danger', 'You must be logged in.');
    return req.session.regenerate(() => res.redirect('/login'));
  }
  next();
}

module.exports = adminRoute;
