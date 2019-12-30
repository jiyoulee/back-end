const axios = require('axios');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	const urlObj = url.parse(req.url); // get url object
	if (urlObj.pathname != '/') { // invalid pathname
		res.statusCode = 404;
		res.end('Page Not Found!');
	}

	const queryObj = querystring.parse(urlObj.query); // get query object
	if (!queryObj.repo) { // invalid query
		res.statusCode = 404;
		res.end('Invalid Query!');
	}

	(async (repo) => {
		try {
			// get repository information from host
			const repoInfo = await axios.get('https://api.github.com/repos/' + repo);
			const sc = repoInfo.data.stargazers_count;
			const oc = repoInfo.data.open_issues_count;
			
			//send repository information to client
			res.statusCode = 200;
			res.end(`Repo: ${repo}\nstargazers_count: ${sc}\nopen_issues_count: ${oc}`);
		} catch (error) { // invalid repository
			res.statusCode = 404;
			res.end('Repository not found!');
		}
	})(queryObj.repo);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
