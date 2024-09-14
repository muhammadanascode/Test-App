const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const todosPath = path.join(__dirname, 'todos.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to serve the todo list
app.get('/api/todos', (req, res) => {

    // Read data from JSON file
    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todo file' });
        }
        const todos = JSON.parse(data);
        res.json(todos);
    });
});

// POST route to add a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = req.body;  // Get new todo from the request body

    // Read the current todos from the JSON file
    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading todo file' });
        }

        const todos = JSON.parse(data);  // Parse current todos
        todos.push(newTodo);  // Add the new todo to the array

        // Write the updated todos back to the JSON file
        fs.writeFile(todosPath, JSON.stringify(todos, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to todo file' });
            }
            res.status(201).json({ message: 'Todo added successfully', todos });
        });
    });
});

app.get('/' , (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
