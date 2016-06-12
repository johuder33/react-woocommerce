// Copyright (c) 2016 ZBox, Spa. All Rights Reserved.
// See LICENSE.txt for license information.

const http = require('http');
const fs = require('fs');
const path = require('path');
//const config = require('./src/config/config.json');

const mimes = {
    js: 'text/javascript',
    json: 'application/json',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    svg: 'image/svg+xml',
    eot: 'application/vnd.ms-fontobject',
    woff2: 'application/font-woff2',
    woff: 'application/font-woff',
    ttf: 'application/x-font-truetype'
};

const server = http.createServer((req, res) => {
    const mime = (/^\/[a-zA-Z0-9\/]*\.(js|json|css|jpg|png|gif|svg|ttf|eot|woff|woff2)$/).exec(req.url.toString());
    if (mime) {
        const ext = mime[1];
        const filename = path.join(__dirname, 'dist', req.url.toString().substring(1));
        return sendFileContent(res, filename, mimes[ext]);
    }

    return sendFileContent(res, 'dist/index.html', 'text/html');
});

server.listen(3000);

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.info('Solid ID Test Server listening on ' + bind);
});

function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.write('Not Found!');
        } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.write(data);
        }
        response.end();
    });
}