const express = require('express');
const router = express.Router();

router.use(require('./departmentsRoute'));
router.use(require('./rolesRoute'));
router.use(require('./employeesRoute'));


module.exports = router;