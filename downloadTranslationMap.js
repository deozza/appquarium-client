import fetch from 'node-fetch';
import * as fs from 'fs';
await fetch("https://us-central1-appquarium-ebcb4.cloudfunctions.net/updateTranslationMap")
	.then(res => res.json())
	.then(data => {
		console.log(data)
		fs.writeFile('./src/app/utils/i18n/i18n.json', JSON.stringify(data), (err) => {
			if (err) {
				throw err;
			}
			console.log("JSON data is saved.");
		});
	})
	.catch(error => {
		console.log(error)
	})
