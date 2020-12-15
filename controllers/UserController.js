const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.signin = async (req, res, next) => {
    try {
        const user = await models.user.findOne({ where: { email: req.body.email } });
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = jwt.sign({
                    id: user.id,
                    name: user.email,
                    rol: user.rol
                }, 'config.secret', {
                    expiresIn: 43200,
                }
                );
                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                })
            } else {
                res.status(401).json({
                    error: 'Usuario y/o contraseña invalidos'
                })
            }
        } else {
            res.status(404).json({
                error: 'Usuario y/o contraseña invalidos'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const newUser = await models.user.findOne({ where: { email: req.body.email } });
        if (!newUser) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await models.user.create(req.body);
            res.status(201).send({
                status: 'Usuario creado correctamente!',
                user: user
            })
        } else {
            res.status(405).json({
                error: 'Usuario ya registrado.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.listar = async (req, res, next) => {
    try {
        const user = await models.user.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};