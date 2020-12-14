const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.signin = async(req, res, next) => {
    try {
        const user = await models.user.findOne({where: {email: req.body.email}});
        if(user){
            const passwordInvalid = bcrypt.compareSync(req.body.password , user.password);
            if(passwordInvalid){
                const token = jwt.sign({
                    id: user.id,
                    name: user.name
                },'config.secret', {
                    expiresIn: 14400,
                }
                );
                res.status(200).send({
                    accessToken: token
                })
            }else{
                res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" })
            }
        }else{
            res.status(404).send('User Not Found.')
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
};

// exports.createUser = async(req, res, next) => {
//     try {
//         const newUser = await bcrypt.hash(req.body.password, 10);

//     } catch (error) {
        
//     }
// };

// exports.listar = async(req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// };