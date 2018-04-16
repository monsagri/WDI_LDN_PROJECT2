function secureRoute(req, res, next) {
  // if the user is not logged in
  if(!req.session.userId) {
    // clear the session cookie and redirect them to the login page
    req.flash('danger', 'You must be logged in.');
    return req.session.regenerate(() => res.redirect('/login'));
  }
  next();
}

module.exports = secureRoute;
