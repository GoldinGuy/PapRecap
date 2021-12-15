

const INPUT_URL = "./pdfs/gpt-3.pdf";

var paperRecap = {
    id: 1,
    url: INPUT_URL,
}



// READ TEXT FROM PDF
const fs = require("fs");
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync(INPUT_URL);
 
pdf(dataBuffer).then((data) => {

    paperRecap["pdf"] = {
			pageCount: data.numpages,
			creationDate: data.info.CreationDate,
			modDate: data.info.modDate,
            formatVersion: data.info.PDFFormatVersion,
            version: data.version,
	};
 
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