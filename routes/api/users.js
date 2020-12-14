const router = require('express').Router();
const models = require('../../models');
const MiController = require('../../controllers/MiController.js');
var bcrypt = require('bcryptjs');

//api/user
router.get('/', async(req, res) => {
    const user = await models.user.findAll();
    res.status(200).json(user);
});

//api/user/create(registrar usuario)
router.post('/createuser', async(req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await models.user.create(req.body);
    res.status(200).json(user);
})

//api/user/login
router.post('/signin', MiController.signin);

module.exports = router;