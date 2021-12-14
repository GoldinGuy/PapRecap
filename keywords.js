const vfile = require("vfile");
const keywords = require("retext-keywords");
const toString = require("nlcst-to-string");
// const stringify = require("retext-stringify");
// const englishParser = require("retext-english");
const retext = require("retext");
const retextPos = require("retext-pos");
const fs = require("fs");
const pdf = require("pdf-parse");
const datefinder = require("datefinder"); 

const INPUT_URL = "./pdfs/gpt-3.pdf";

const parsePDF = async (url) => {
	let dataBuffer = fs.readFileSync(url);
	let data = await pdf(dataBuffer);
	fs.writeFileSync("./output/test.txt", data.text);
	return data;
};

parsePDF(INPUT_URL).then((data) => {
	let date = datefinder(data.text)[0];
	var paperRecap = {
		id: 1,
		url: INPUT_URL,
		title: data.text.trim().split("\n")[0],
		date: {
			string: date.string,
			date: date.date,
		},
		authors: [],
		abstract: "",
		keywords: [],
		summary: "",
		pdf: {
			pageCount: data.numpages,
			creationDate: data.info.CreationDate,
			modDate: data.info.ModDate,
			formatVersion: data.info.PDFFormatVersion,
			version: data.version,
		},
	};
	console.log(paperRecap);
	findKeywords(data.text);
});

const findKeywords = (text) => {
	retext()
		.use(retextPos)
		.use(
			keywords
			// , { maximum: this.state.keywordNum }
		)
		.process(vfile(text))
		.then((file) => {
			if (file) {
				console.log("Keywords:");
				// @ts-ignore
				file.data.keywords.forEach((keyword) => {
                    console.log(toString(keyword.matches[0].node)
                    );
				});

				console.log();
				console.log("Key-phrases:");
				// @ts-ignore

				file.data.keyphrases.forEach((phrase) => {
					console.log(phrase.matches[0].nodes.map(toString).join(""));
				});
			}
		});
	return [];
};

