const {Router} = require('express');
const bcrypt = require('bcrypt');
const config = require('config')
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

//-endpoint1 /api/auth/register
router.post(
    '/register',
    [
        check('email', 'incorrect email address').isEmail(),
        check('password', 'Min size of password must be 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                //return to frontend and stops running script
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data on registration'
                });

            }
            const {email, password} = req.body;
            //    logic of registration
            //    1st: check if username exists on the db
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Username already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});
            await user.save();
            res.status(201).json({message: "User has been successfully created"})
        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again"})
        }
    }
)
;

//-endpoint2 /api/auth/login
let router1 = router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                //return to frontend and stops running script
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data on login to the system'
                });

            }

            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'User not exists'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message:'Incorrect password try again'});

            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );
            res.json({token,userId:user.id});

        } catch (e) {
            res.status(500).json({message: "Something went wrong, try again"})
        }
    })

module.exports = router;