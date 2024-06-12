const UserModel = require('../model/user')
const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req,res,next) => {
   
        const email = req.body.email
        const password =req.body.password
        const name = req.body.name
        const contact = req.body.contact
        try {
            if(!email || !password || !name || !contact) {
                throw createHttpError(400, 'Missing is required')
            }
    
            const isUserAvailable = await UserModel.findOne({email:email}).exec();
    
            if(isUserAvailable){
                throw createHttpError(400, 'User already exists')
            }
             
            const hashedPassword = await bcrypt.hash(password,10);
    
            const user = new UserModel({
                name:name,
                email:email,
                password:hashedPassword,
                contact:contact
            })
            const result = await user.save();
            res.status(201).send(result)
        } catch(error) {
                next(error)
        }
    
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        if (!email || !password) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const buyer = await UserModel.findOne({ email: email }).exec();

        if (!buyer) {
            throw createHttpError(400, 'User does not exist')
        }

        const isPasswordValid = await bcrypt.compare(password, buyer.password);

        if (!isPasswordValid) {
            throw createHttpError(400, 'Invalid credentials')
        }

        const user = await UserModel.findOne({ email: email }).exec();

        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn: "4h",
            }
        )

        user.token = token;

        const result = await user.save();

        res.status(200).send(result);

    } catch (error) {
        next(error)
        
    }
}
 