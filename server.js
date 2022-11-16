

const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json')


// Helper method for generating unique ids

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
  res.json(db)
  // Send a message to the client
 // res.json(`${req.method} request received to get reviews`);

  // Log our request to the terminal
});

// POST request to add a review
app.post('/api/notes', (req, res) => {


  // Destructuring assignment for the items in req.body
  const { text, title } = req.body;

  // If all the required properties are present
  if (text && title) {
    // Variable for the object we will save
    const newNote = {
      text,
      title,
      id: uuidv4()// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

    };
db.push(newNote)
    // Convert the data to a string so we can save it
    const newNoteString = JSON.stringify(db);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, newNoteString, (err) =>
      err
        ? console.error(err)
        : console.log(
          'file written'
          )
    );

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
