const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

const diaryBook = []; // diary book
let msg200 = '' // response message for status code 202
let msg400 = '' // response message for status code 404

app.use(bodyParser.urlencoded({ extended: true })); // parse req.body

/*
 * method: GET, pathname: /
 * description: send welcome message
 */
app.get('/', (req, res) => {
	msg200 = 'Welcome to my diary';
	res.status(200).send(msg200);
});

/*
 * method: GET, pathname: /diaries
 * description: get diary book data
 */
app.get('/diaries', (req, res) => {
	if(!diaryBook.length) { // do for empty diary book
		msg200 = 'No diary written!';
		res.status(200).send(msg200);
	}
	else { // do for nonempty diary book
		msg200 = '';
		for (let diary of diaryBook) {
			msg200 += `#${diary.id}: ${diary.title} (${diary.isActive})`;
			if (diary.id != diaryBook.length - 1) {
				msg200 += '\n';
			}
		}
		res.status(200).send(msg200);
	}
});

/*
 * method: GET, pathname: /diary/:id
 * description: get diary data
 */
app.get('/diary/:id', (req, res) => {
	const key = req.params.id;
	
	if (!diaryBook[key]) { // handle invalid key
		msg404 = `Diary #${key} does not exist!`;
		res.status(404).send(msg404);
	}
	else {
		const keyDiary = diaryBook[key];
		
		if (!keyDiary.isActive) { // do for inactive diary
			msg200 = `Diary #${keyDiary.id} has already been deleted`;
			res.status(200).send(msg200);
		}
		else { // do for active diary
			msg200 = `#${keyDiary.id}: ${keyDiary.title} (${keyDiary.isActive})`;
			res.status(200).send(msg200);
		}
	}
});

/*
 * method: GET, pathname: /diary, query: id
 * description: redirect to http://localhost:port/diary/:id
 */
app.get('/diary', (req, res) => {
	res.redirect(`http://localhost:${port}/diary/${req.query.id}`);
});

/*
 * method: POST, pathname: /diary, query: title
 * description: post new diary to diary book
 */
app.post('/diary', (req, res) => {
	const diary = {
		id: diaryBook.length,
		title: req.body.title,
		isActive: true
	};
		
	diaryBook.push(diary);

	msg200 = `Added Diary #${diary.id}: ${diary.title} (${diary.isActive})`
	res.status(200).send(msg200);
});


/*
 * method: PUT, pathname: /diary, query: id, title
 * description: change diary title
 */
app.put('/diary', (req, res) => {
	const key = Number(req.body.id);

	if (!diaryBook[key]) { // handle invalid key
		msg404 = 'Diary does not exist!'
		res.status(404).send(msg404);
	}
	else {
		const keyDiary = diaryBook[key]

		if (!keyDiary.isActive) { // do for inactive diary
			msg200 = `Diary #${keyDiary.id} has already been deleted`;
			res.status(200).send(msg200);
		}
		else { // do for active diary
			keyDiary.title = req.body.title;

			msg200 = `Changed Diary #${keyDiary.id}: ${keyDiary.title} (${keyDiary.isActive})`;
			res.status(200).send(msg200);
		}
	}
});

/*
 * method: DELETE, pathname: /diary, query: id
 * description: delete diary from diary book
 */
app.delete('/diary', (req, res) => {
	const key = Number(req.body.id);

	if (!diaryBook[key]) { // handle invalid key
		msg404 = 'Diary does not exist!'
		res.status(404).send(msg404);
	}
	else {
		const keyDiary = diaryBook[key];

		if(!keyDiary.isActive) { // do for inactive diary
			msg200 = `Diary #${keyDiary.id} has already been deleted`;
			res.status(200).send(msg200);
		}
		else { // do for active diary
			keyDiary.title = '';
			keyDiary.isActive = false;

			msg200 = `Deleted diary #${keyDiary.id}: ${keyDiary.title} (${keyDiary.isActive})`;
			res.status(200).send(msg200);
		}
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
