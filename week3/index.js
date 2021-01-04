const calc = require('./calc'); // import module calc
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	const urlObj = url.parse(req.url); // get url object
	if(urlObj.pathname != '/') { // invalide pathname
		res.statusCode = 404;
		res.end('Page Not Found!');
	}

	const queryObj = querystring.parse(urlObj.query); // get query object
	if (!(queryObj.a && queryObj.b && queryObj.operator)) { // invalid query
		res.statusCode = 404;
		res.end('Invalid Query!');
	}
	
	// send calculation result to client
	res.statusCode = 200;
	const a = Number(queryObj.a);
	const b = Number(queryObj.b);
	const op = queryObj.operator;
	if (op == 'add') {
		res.end(`${calc.add(a, b)}`);
	} else if (op == 'sub') {
		res.end(`${calc.sub(a, b)}`);
	} else if (op == 'mul') {
		res.end(`${calc.mul(a, b)}`);
	} else if (op == 'div') {
		res.end(`${calc.div(a, b)}`);
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
