import { clientService } from './src/services/database.service';
import * as express from 'express';
import { Application } from 'express';
import * as fs from 'fs';
import * as https from 'https';
import { config } from './config/config';
import { routes } from './src/routes/web';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.json());
app.use(cookieParser());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean },
];

const options = commandLineArgs(optionDefinitions);

routes(app);

const port = config().port;
clientService.connect();

if (config().secure) {
    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);

    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(port, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer.address()['port']));

} else {
    // launch an HTTP Server
    const httpServer = app.listen(port, () => {
        console.log(`HTTP Server running at http://localhost:${httpServer.address()['port']}`);
    });
}

// TODO
// Add filter endpoint
// - add migration
    // CRUD
    // index (create / drop)
    
