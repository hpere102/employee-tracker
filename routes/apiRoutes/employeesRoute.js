const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');



router.get ('/employees', (req, res) => {
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary
                 FROM employees e 
                 LEFT JOIN roles r 
                 ON e.role_id = r.id
                 LEFT JOIN departments d
                 ON r.department_id = d.id;
                `;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


module.exports = router;