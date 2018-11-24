const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./GmailAPI/sendEmail');
const REALTOR_EMAIL = require('./Config/config').REALTOR_EMAIL;
const app = express();

let SERVER_PORT = 1337;

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/Source'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
console.log('Server On', __dirname)
});

app.get('/', (req, res) => {

    console.log('GET /');
    res.sendFile(__dirname + '/index.html');
});

app.post('/notification', (req, res) => {

    console.log(req.body);
    let name = req.body.NAME;
    let email = req.body.EMAIL;
    let phone = req.body.PHONE;
    let message = '';
    if(email === ''){
        message =   'Looks like an investor is interested!' + 
                    '\nHere is the contact information: '   +
                    '\n\nName: ' + name                    +
                    '\nPhone: ' + phone                     +
                    '\n\nGood Luck!';
    }else if(phone === ''){
        message =   'Looks like an investor is interested!' + 
                    '\nHere is the contact information: '   +
                    '\n\nName: ' + name                    +
                    '\nE-mail: ' + email                    +
                    '\n\nGood Luck!';
    }else{
        message =   'Looks like an investor is interested!' + 
        '\nHere is the contact information: '   +
        '\n\nName: ' + name                    +
        '\nE-mail: ' + email                    +
        '\nPhone: ' + phone                     +
        '\n\nGood Luck!';
    };

    sendEmail(REALTOR_EMAIL, message);
    res.send('Ok');
});