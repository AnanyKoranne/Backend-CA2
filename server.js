const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [];

app.post('/signup', (req, res) => {

    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob) {
        return res.status(400).json({ message: 'All fields are required!' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email cannot be empty' });
    }

    if (!username) {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken!' });
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date of birth format!' });
    }

    const newUser = {
        username,
        email,
        password, 
        dob: dobDate
    };

    users.push(newUser);
    res.status(201).json({
        message: 'User created successfully!',
        user: {
            username: newUser.username,
            email: newUser.email,
            dob: newUser.dob.toISOString().split('T')[0], 
        }
    });
});

app.get('/', (req, res)=> {
    res.send("hello world");
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
