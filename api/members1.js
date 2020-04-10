const express = require('express');
const router = express.Router();

const members = [
    { 
        id: 1,
        ime: 'Uros',
        prezime: 'Kuzmanovic',
        posao: 'Student'
    },
    { 
        id: 2,
        ime: 'Danijela',
        prezime: 'Mladenovic',
        posao: 'Student'
    }
]

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req, res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

router.post('/', (req, res) => {
    const newMember = {
        id: req.body.id,
        ime: req.body.ime,
        prr: req.body.prezime
    };
    res.json(newMember);
});

module.exports = router;