const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


router.get ('/role', (req, res) => {
    const sql = `SELECT r.id, r.title, r.salary, d.name AS department_name
                 FROM role r 
                 LEFT JOIN department d 
                 ON r.department_id = d.id;`;
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