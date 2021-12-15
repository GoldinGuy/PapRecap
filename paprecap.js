const vfile = require("vfile");
const keywords = require("retext-keywords");
const toString = require("nlcst-to-string");
const retext = require("retext");
const retextPos = require("retext-pos");
const pdf = require("pdf-parse");
const datefinder = require("datefinder"); 
const fs = require("fs");

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
	let abstract = identifyAbstract(data.text);
    let abstractSummary = await summarizeAbstract(abstract);
	var paperRecap = {
		id: 1,
		url: INPUT_URL,
		title: data.text.trim().split("\n")[0],
		date: {
			string: date.string,
			date: date.date,
		},
		authors: [],
		abstract: abstract,
		keyterms: terms,
		summary: abstractSummary,
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
				// });
				file.data.keyphrases.forEach((phrase) => {
					terms.push(phrase.matches[0].nodes.map(toString).join(""));
				});
			}
        });
    return terms;
};

const identifyAbstract = (text) => {
const abStart = text.toLowerCase().indexOf("abstract") + 8;
const abStop = text.indexOf(".\n", abStart + 1) + 1;
return text.substring(abStart, abStop);
}

const summarizeAbstract = async (text) => {
	// init OPENAI
	const OpenAI = require("openai-api");
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
	const openai = new OpenAI(OPENAI_API_KEY);
	const TLDR = "\n tl;dr:";
	// Chunkify
	let summary = [];
    let paragraphs = [];
    for (var i = 0, charsLength = text.length; i < charsLength; i += 500) {
        paragraphs.push(text.substring(i, i + 500));
    }
	for (let para of paragraphs) {
		if (para.length > 10) {
			// && !RegExp('\W+').test(para)
			// console.log(para);
			const gptResponse = await openai.complete({
				engine: "davinci",
				prompt: para + TLDR,
				maxTokens: 140,
				temperature: 0.3,
				topP: 1,
				presencePenalty: 0,
				frequencyPenalty: 0,
				bestOf: 1,
				n: 1,
				stop: ["\n"],
			});
			summary.push(gptResponse['data']['choices'][0]['text']);
			// console.log(gptResponse.data);
		}
	}
	return summary.join(" ");
}