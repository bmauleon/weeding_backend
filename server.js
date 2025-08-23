const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'magento-user',
  password: 'bryant.UNAM8',
  database: 'weedingbyl',
});

app.get('/', (req, res) => {
    return res.json("From backend ")
})

app.get('/list/:lastname', (req, res) => {
    const lastname = req.params.lastname;
    const sql = "SELECT * FROM guest_list WHERE family = '"+lastname+"'";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/confirm/', (req, res) => {
    let tickets = 0;
    data = req.body;
    data.forEach(element => {
        const sql = "UPDATE guest_list SET is_confirmed = 1 WHERE id IN ("+element+")"
        db.query(sql, (err, data) => {
            if(err){
                return res.json(err);
            } 
        })
        tickets++;
    });
    res.json({ message: 'Update was make succesfully', status: 200, count: tickets});
})

app.post('/comments/', (req, res) => {
    data = req.body;
    console.log(data)
    const sql = "INSERT INTO family_comments (family, comment) VALUES ('"+data.family+"','"+data.comment+"')"
    db.query(sql, (err, data) => {
        if(err){
            return res.json(err);
        } 
    })
    res.json({ message: 'Insert was make succesfully', status: 200});
})

app.get('/list_comments/', (req, res) => {
    const sql = "SELECT * FROM family_comments";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(5000, () => console.log('Server started on port 5000'));