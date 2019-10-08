const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router();

router.get('/', (req, res) => {
    const limit = req.query.limit || null;
    const sortby = req.query.sortby || 'id'
    const sortdir = req.query.sortdir || 'asc'
    console.log(req.query.sortby)
        db('accounts')
        .select('*')
        .orderBy(sortby, sortdir)
        .limit(limit)
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    // }
});

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/', (req, res) => {
    const accountData = req.body

    db('accounts')
        .insert(accountData, 'id')
        .then(([id]) => {
            db('accounts')
                .where({ id })
                .first()
                .then(account => {
                    res.status(201).json(account)
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    
});

router.put('/:id', (req, res) => {
    const changes = req.body

    db('accounts')
        .where({ id: req.params.id})
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `Updated ${count} record(s)`})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id})
        .delete()
        .then(count => {
            res.status(200).json({ message: `Deleted ${count} record(s)`})
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

module.exports = router