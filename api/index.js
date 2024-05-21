const config = require('../config')
const express = require('express');
const app = express();
const user = require('../api/components/user/network')
const auth = require('../api/components/auth/network')

app.use(express.json())

// Routes
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);

app.listen(config.api.port, () => console.log('Iniciando express ', config.api.port));