const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const PouchDB = require('pouchdb');

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`Server listening at por ${3000}`);
});

