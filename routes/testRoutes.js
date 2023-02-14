const { Router } = require('express');
const testController = require('../controllers/testController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, testController.getTests);
router.get('/new', requireAuth, testController.getNewTest);
router.post('/', requireAuth, testController.postTest);

module.exports = router;