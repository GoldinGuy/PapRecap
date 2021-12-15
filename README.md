# 📝 PapRecap: Scientific Paper/Article Summarizer

Summarize articles using the power of GPT-3 and NLP. 

Simply add a pdf file-path or file URL, and Paprecap extracts the following information: 

```typescript
export interface PaperRecap {
	id: number;
	title: string;
	date: PDFDate;
	authors: string[];
	abstract: string;
	keywords: string[];
	url: string;
	summary: string;
	pdf: PDFMetaData;
}
```

You will need to add your OPENAI GPT-3 key either to a .env file or replace the **OPENAI_API_KEY** var. 

Sample output for the GPT-3 Paper:

```js
{
  id: 1,
  url: './pdfs/gpt-3.pdf',
  title: 'Language Models are Few-Shot Learners',
  date: { string: '22 Jul 2020', date: 2020-07-22T00:00:00.000Z },
  authors: [],
  abstract: '\n' +
    'Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training\n' +
    'on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic\n' +
    'in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of\n' +
    'thousands of examples. By contrast, humans can generally perform a new language task from only\n' +
    'a few examples or from simple instructions – something which current NLP systems still largely\n' +
    'struggle to do.  Here we show that scaling up language models greatly improves task-agnostic,\n' +
    'few-shot performance, sometimes even reaching competitiveness with prior state-of-the-art fine-\n' +
    'tuning approaches. Specifically, we train GPT-3, an autoregressive language model with 175 billion\n' +
    'parameters, 10x more than any previous non-sparse language model, and test its performance in\n' +
    'the few-shot setting.  For all tasks, GPT-3 is applied without any gradient updates or fine-tuning,\n' +
    'with tasks and few-shot demonstrations specified purely via text interaction with the model. GPT-3\n' +
    'achieves strong performance on many NLP datasets, including translation, question-answering, and\n' +
    'cloze tasks, as well as several tasks that require on-the-fly reasoning or domain adaptation, such as\n' +
    'unscrambling words, using a novel word in a sentence, or performing 3-digit arithmetic. At the same\n' +
    'time, we also identify some datasets where GPT-3’s few-shot learning still struggles, as well as some\n' +
    'datasets where GPT-3 faces methodological issues related to training on large web corpora. Finally,\n' +
    'we find that GPT-3 can generate samples of news articles which human evaluators have difficulty\n' +
    'distinguishing from articles written by humans. We discuss broader societal impacts of this finding\n' +
    'and of GPT-3 in general.',
  keyterms: [
    'model',
    'GPT-3',
    'task',
    'Language Models',
    'examples',
    'datasets',
    'words',
    'Figure',
    'dataset example',
    'few-shot'
  ],
  summary: " I want to train a neural network to learn a language from scratch, without any hand-engineered features or task-specific training data.  we train a language model with 175 billion parameters, and it works well for a few-shot task.  GPT-3 is a strong general-purpose NLP model that can learn from few examples.  I'm a big fan of GPT-3. I think it's a great paper, and I'm glad it's getting so much attention.",
  pdf: {
    pageCount: 75,
    creationDate: 'D:20200724000408Z',
    modDate: 'D:20200724000408Z',
    formatVersion: '1.5',
    version: '1.10.100'
  }
}```