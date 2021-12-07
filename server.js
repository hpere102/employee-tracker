const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');

// routes
const apiRoutes = require('./routes/apiRoutes');

// express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// url defined
app.use('/api', apiRoutes);


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});
