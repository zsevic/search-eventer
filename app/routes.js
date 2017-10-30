module.exports=function(app,passport){

    app.get('/', (req, res) => {
	    res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, (req,res) => {
	    res.render('profile.ejs',{
            user: req.user
        });
    });

    app.get('/search', isLoggedIn, (req,res) => {
	    const query = req.query;
	    const eventID = query.eventID;
	    const eventer = query.eventer;
	    const token = req.user.facebook.token;
	    require("../eventer")(eventID, eventer, token, (err,result) => {
		    if(err)
			    throw err;
		    res.render('search.ejs',{
                user:req.user,
                result
            });
	    });
    });

    app.get('/auth/facebook', passport.authenticate('facebook',{
        scope: 'email'
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	    successRedirect: '/profile',
	    failureRedirect: '/'
    }));

    app.get('/logout', (req,res) => {
	    req.logout();
	    res.redirect('/');
    });

};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
	    return next();
    }
	res.redirect('/');
}
