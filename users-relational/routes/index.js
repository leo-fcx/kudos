import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Users Relational API',
    message: 'Welcome to Users Relational API!'
  });
});

router.route('/users')
  .get(userController.index)
  .post(userController.new);

router.route('/users/:user_id')
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;