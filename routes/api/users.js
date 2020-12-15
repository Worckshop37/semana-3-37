const router = require('express').Router();
const userController = require('../../controllers/UserController');
const bcrypt = require('bcryptjs');

// router.get('/', async(req, res) => {
//     const user = await User.findAll();
//     res.status(200).json(user);
// });

// router.post('/register', async(req, res) => {
//     req.body.password = bcrypt.hashSync(req.body.password, 10);
//     const user = await User.create(req.body);
//     res.status(200).json(user);
// });

router.post('/signin', userController.signin);
router.post('/register', userController.register);
router.get('/listar', userController.listar);

module.exports = router;