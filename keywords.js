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

parsePDF(INPUT_URL).then(async (data) => {
    let date = datefinder(data.text)[0];
    let terms = await findKeyTerms(data.text);
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
		keyterms: terms,
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
	
});

const findKeyTerms = async (text) => {
	let terms = [];
	await retext()
		.use(retextPos)
		.use(keywords, { maximum: 10 })
		.process(vfile(text))
		.then((file) => {
			if (file) {
				// file.data.keywords.forEach((keyword) => {
				//     terms.push(toString(keyword.matches[0].node));
				//     console.log(toString(keyword.matches[0].node));
				// });
				file.data.keyphrases.forEach((phrase) => {
					terms.push(phrase.matches[0].nodes.map(toString).join(""));
					// console.log(phrase.matches[0].nodes.map(toString).join(""));
				});
			}
        });
    return terms;
};

