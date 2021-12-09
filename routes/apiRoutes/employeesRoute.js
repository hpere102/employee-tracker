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


router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id)
                 VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id];

    db.query(sql, params, (err, result) => {
        if (err) { 
            res.status(400).json({ error: err.message });
        return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});


router.put('/employee/:id', (req, res) => {
    
    const sql = `UPDATE employees SET role_id = ?
                 WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) { 
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({message: 'Employee not found'
        });
        }  res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
    });
});




module.exports = router;