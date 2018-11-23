module.exports = (err, req, res, next) => {
    if (res.headersSent) {
      console.log('HEADERS ALREADY SENT');
      return next(err);
    }
    if (err.name === 'CastError') {
      // specifically handles that error. In my case, 
      // if session id gets corrupted, delete the cookie from client browser.
      // req.logout alone was not enough.
      // NB the cookie had been created by cookie-session
      req.session = null;
      req.logout;
      return res.sendStatus(500);
    }
    return res.sendStatus(err.status || 500);
  };