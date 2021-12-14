import fs from "fs"
import pdf from "pdf-parse"
import datefinder from "datefinder"
// import keyword_extractor from "keyword-extractor";
import { retext } from "retext";
import retextPos from "retext-pos";
// import { VFile } from "vfile"
import { VFile } from "vfile";
import unified from "unified";
import keywords from "retext-keywords";
import stringify from "retext-stringify";
import englishParser from "retext-english";

import { PaperRecap, PDFData, PDFDate } from "./interfaces";

const INPUT_URL = "./pdfs/gpt-3.pdf";


const parsePDF = async (url: string): Promise<PDFData> => {
	let dataBuffer = fs.readFileSync(url);
	let data = await pdf(dataBuffer);
	fs.writeFileSync("./output/test.txt", data.text);
	return data;
};

parsePDF(INPUT_URL).then((data: PDFData) => {
    let date: PDFDate = datefinder(data.text)[0];
    var paperRecap: PaperRecap = {
			id: 1,
			url: INPUT_URL,
			title: data.text.trim().split("\n")[0],
			date: {
				string: date.string,
				date: date.date
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

const findKeywords = (text: string): string[] => {
    // const extraction_result = keyword_extractor.extract(text, {
	// 		language: "english",
	// 		remove_digits: true,
	// 		return_chained_words: true,
	// 		return_changed_case: true,
	// 		remove_duplicates: true,
	// 		return_max_ngrams: 50
	// 	});
    // console.log(extraction_result);
    // return extraction_result;
    retext().use(retextPos).use(keywords).process(new VFile(text)).then((file) => {
            if (file ){
                console.log("Keywords:");
                // @ts-ignore
				file.data.keywords.forEach((keyword) => {
					console.log(keyword.matches[0].node.toString());
				});

				console.log();
                console.log("Key-phrases:");
                // @ts-ignore
                
				file.data.keyphrases.forEach((phrase) => {
					console.log(phrase.matches[0].nodes.map((d) => d.toString()).join(""));
				}); 
                }
			
			});
    // const retext = unified().use(englishParser).use(stringify).freeze();

//      retext()
// 				.use(keywords, { maximum: this.state.keywordNum })
// 				.process(vfile(this.state.inputText), (err, file) => {
// 					if (err) {
// 						this.setState({
// 							error: "" + err,
// 						});
// 						return;
// 					}

// 					const keywords = file.data.keywords.map((k) =>
// 						toString(k.matches[0].node)
// 					);

// 					const keyphrases = file.data.keyphrases.map((k) =>
// 						k.matches[0].nodes.map(toString).join("")
// 					);

// 					this.setState({
// 						result: `Keywords: 

// ${keywords.join("\n")}
          
// Key-phrases:

// ${keyphrases.join("\n")}
//           `,
// 					});
// 				});

    return [];
}

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
// const OpenAI = require("openai-api");
// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
