const router = require('express').Router();
const { Post, Profile } = require('../models');
const withAuth = require('../utils/auth');


// Gets info from posts onto dashboard
router.get('/', withAuth, async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }

    res.render('login');
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }
    res.render('login');
});
// Paths to settings
router.get('/settings', async (req, res) => {
    const profileData = await Profile.findOne({
        where: {
            id: req.session.profile_id
        }
    });

    const userProfile = JSON.parse(JSON.stringify(profileData));

    res.render('settings', {
        loggedIn: req.session.loggedIn,
        userProfile
    });
});

router.get('/home', async (req, res) => {
    const profileData = await Profile.findAll();
    
    let profiles = profileData.map((profile) =>
    profile.get({ plain: true })
    );
     
    res.render('home', {
        loggedIn: req.session.loggedIn,
        profiles
    });
});

router.get('/profile', async (req, res) => {
    const profileData = await Profile.findOne({
        where: {
            id: req.session.profile_id
        }
    });

    const userProfile = JSON.parse(JSON.stringify(profileData));

    res.render('profile', {
        loggedIn: req.session.loggedIn,
        userProfile
    });
})

// router.get('/profile/:id', async (req, res) => {
//     try {
//         const profileData = await Profile.findByPk(req.params.id);

//         res.render('profile')
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/inbox', async (req, res) => {
    const profileData = await Profile.findOne({
        where: {
            id: req.session.profile_id
        }
    });

    const userProfile = JSON.parse(JSON.stringify(profileData));

    res.render('inbox', {
        loggedIn: req.session.loggedIn,
        userProfile
    });
})

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/feedback', async (req, res) => {
    const profileData = await Profile.findOne({
        where: {
            id: req.session.profile_id
        }
    });

    const userProfile = JSON.parse(JSON.stringify(profileData));

    res.render('feedback', {
        loggedIn: req.session.loggedIn,
        userProfile
    });
});

router.get('/aboutus', async (req, res) => {
    const profileData = await Profile.findOne({
        where: {
            id: req.session.profile_id
        }
    });

    const userProfile = JSON.parse(JSON.stringify(profileData));

    res.render('aboutus', {
        loggedIn: req.session.loggedIn,
        userProfile
    });
});

module.exports = router;