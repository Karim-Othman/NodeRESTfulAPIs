const express = require('express');
const coursesrouter = require('./routes/courses');
const categoriesrouter = require('./routes/categories');
const loggerFunction = require ('./middleware/logger');

const app = express();
app.use(express.json());
app.use('/api/courses',coursesrouter);
app.use('/api/categories',categoriesrouter);
app.use(loggerFunction.log);

const port = process.env.NodePort || 3000;
//NodePort = 5000


app.listen(port, console.log(`Listen on port ${port}`))