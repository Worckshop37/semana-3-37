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
                    name: user.name,
                    rol: user.rol
                },'config.secret', {
                    expiresIn: 3600,
                }
                );
                res.status(200).send({
                    tokenReturn: token,
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

// exports.createuser = async(req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// };

// exports.listar = async(req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// };