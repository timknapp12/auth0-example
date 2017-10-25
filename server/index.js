require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();






app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))