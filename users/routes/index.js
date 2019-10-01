import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/', function (req, res) {
  res.json({
    status: 'Users API',
    message: 'Welcome to Users API!'
  });
});

router.route('/users')
  .get(userController.index, userController.search)
  .post(userController.new);

router.route('/users/:user_id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;