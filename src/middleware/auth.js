const basicAuth = require('express-basic-auth');

const auth = basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true
});

module.exports = auth;
