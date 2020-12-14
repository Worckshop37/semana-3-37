const router = require('express').Router();
const models = require('../../models');
const miController = require('../../controllers/MiController.js');
const bcrypt = require('bcryptjs');

//api/user
router.get('/', async(req, res) => {
    const user = await models.user.findAll();
    res.status(200).json(user);
});

//api/user/create(registrar usuario)

router.post('/createUser', async(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await models.user.create(req.body);
    res.status(200).json(user);
})

//api/user/login
// router.post('/createUser', miController.createUser);
router.post('/signin', miController.signin);

module.exports = router;