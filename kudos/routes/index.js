let kudosController = require('../controllers/kudo');
let router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    status: 'Kudos API',
    message: 'Welcome to Kudos API!'
  });
});

router.route('/kudos')
  .get(kudosController.index)
  .post(kudosController.new);

router.route('/kudos/:kudo_id')
  .get(kudosController.view)
  // TODO: Update not required. Enable these lines when needed.
  // .patch(kudosController.update)
  // .put(kudosController.update)
  .delete(kudosController.delete);

module.exports = router;