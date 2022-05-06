function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', 'Please log in to view that resource');
	res.redirect('/user/login');
}

function forwardAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect(`/${req.user.role}`);
}

function authRole(role) {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return res.redirect(req.user.role)
		}
		next()
	}
}

function authApproval(req, res, next) {
	if (req.user.isApproved == 'yes') {
		return next()
	}
	res.redirect('/user/notapproved');
}

module.exports = {
	ensureAuthenticated,
	forwardAuthenticated,
	authApproval,
	authRole
}