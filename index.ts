import fs from "fs"
import pdf from "pdf-parse"
import { PaperRecap, PDFData } from "./interfaces";

const INPUT_URL = "./pdfs/gpt-3.pdf";


const parsePDF = async (url: string): Promise<PDFData> => {
	let dataBuffer = fs.readFileSync(url);
	let data = await pdf(dataBuffer);
	fs.writeFileSync("./output/test.txt", data.text);
	return data;
};

parsePDF(INPUT_URL).then((data: PDFData) => {
    var paperRecap: PaperRecap = {
        id: 1,
        url: INPUT_URL,
        title: data.text.trim().split("\n")[0],
        date: "",
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
        }
    };
	console.log(paperRecap);
});

// const getGPTResponse = async (url: string): Promise<PaperRecap> => {

// }




// pdf(dataBuffer).then((data) => {
// 	paperRecap.pdf = {
// 		pageCount: data.numpages,
// 		creationDate: data.info.CreationDate,
// 		modDate: data.info.modDate,
// 		formatVersion: data.info.PDFFormatVersion,
// 		version: data.version,
// 	};

// 	// // number of pages
// 	console.log(data.numpages);
// 	// // number of rendered pages
// 	// console.log(data.numrender);
// 	// // PDF info
// 	// console.log(data.info);
// 	// // PDF metadata
// 	// console.log(data.metadata);
// 	// // PDF.js version
// 	// // check https://mozilla.github.io/pdf.js/getting_started/
// 	// console.log(data.version);
// 	// // PDF text
// 	// console.log(data.text);
// 	fs.writeFileSync("./output/test.txt", data.text);
// });

// RUN THROUGH GPT
const OpenAI = require("openai-api");
// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const openai = new OpenAI(OPENAI_API_KEY);

// const TLDR = "\n tl;dr:"

// (async () => {
// 	const gptResponse = await openai.complete({
// 		engine: "davinci",
// 		prompt: "this is a test",
// 		maxTokens: 140,
// 		temperature: 0.4,
// 		topP: 1,
// 		presencePenalty: 0,
// 		frequencyPenalty: 0,
// 		bestOf: 1,
// 		n: 1,
// 		// stream: false,
// 		stop: ["\n"],
// 	});

// 	console.log(gptResponse.data);
// })();
