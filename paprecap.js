
// READ PDF TO JSON
const fs = require("fs");
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('./pdfs/gpt-3.pdf');
 
pdf(dataBuffer).then((data) => {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
    fs.writeFileSync("./output/test.txt", data.text);
        
});







// PDFParser = require("pdf2json");
// const pdfParser = new PDFParser();

// var codex = [];

// pdfParser.on("readable", meta => console.log("PDF Metadata", meta) );
// pdfParser.on("data", page => {
//     if (page) {
//         for (let text of page.Texts) {
//             codex = codex.concat(text.R[0].T);
//         }
//     } else {
// 			fs.writeFileSync("./output/test.json", JSON.stringify(codex));
// 		}
//     console.log(page ? "One page paged" : "All pages parsed", codex)

// });
// pdfParser.on("error", err => console.error("Parser Error", err));

// // pdfParser.on("pdfParser_dataError", (errData) => console.error(errData.parserError));
// // pdfParser.on("pdfParser_dataReady", (pdfData) => {
// //     fs.writeFile("./output/test.json", JSON.stringify(pdfData));
// // });

// pdfParser.loadPDF("./pdfs/gpt-3.pdf");



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