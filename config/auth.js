module.exports={
	'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_ID,
        'clientSecret'  : process.env.FACEBOOK_SECRET,
        'callbackURL'   : 'https://search-eventer.herokuapp.com/auth/facebook/callback'
    }
};
