require('dotenv').config();
const http = require('http');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

console.log("Hello");

console.log(__dirname);
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, response) => {
    try {
        const date = await fsPromises.readFile(filePath, 'utf8');
        response.end(data);
    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    
    let filePath;

    switch (req.url) {
        case '/states/':
            console.log(req.url);
           res.statusCode = 200;
           console.log(__dirname);
           console.log('states.html');
           filePath = path.join(__dirname, 'Files/states.json');
           //console.log(path.join(__dirname, 'states.html'))
            //contentType = '.html'
            
            fs.readFile(filePath, 'utf8', (err, data) => {
                res.end(data);
            });
            break;
        default:
            console.log(req.url, req.method);
            //serveFile(path.join(__dirname, 'index.js', 'text/html', res), contentType, res);
    }
         
    const fileExists = fs.existsSync(path);
    

    if (fileExists) {
        //serveFile(filePath, contentType, res);
    }else {
        console.log(req.url, req.method);
    }
        
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'Files',  'statesData.json'), 'utf8');
        console.log(JSON.parse(data));
    } catch (err) {
        console.error(err);
    }
}
//fileOps();

//fs.readFile(path.join(__dirname, 'Files',  'statesData.json'), (err, data) => {
//    if (err) throw err;
//    console.log(JSON.parse(data));
//})

//uncaught errors
process.on('uncaughtException', err => {
    console.error('There was an uncaught error: ');
    console.error(err);
    process.exit(1);
})