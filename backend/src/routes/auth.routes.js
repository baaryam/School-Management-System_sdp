const express = require('express');
const router = express.Router();
const { login, getMe, getRoles } = require('../controllers/auth.controller');
const { authenticate, authorizeRoles } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', authenticate, getMe);
router.get('/roles', authenticate, authorizeRoles('super_admin', 'admin', 'principal'), getRoles);

module.exports = router;
