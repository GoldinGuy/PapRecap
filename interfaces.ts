export interface PaperRecap {
    id: number;
    title: string;
    date: string;
    authors: string[];
    abstract: string;
    keywords: string[];
    url: string;
    summary: string;
    pdf: PDFMetaData;
}

export interface PDFMetaData {
	pageCount: number;
	creationDate: string;
	modDate: string;
	formatVersion: string;
	version: string;
}

export interface PDFData {
	numpages: number;
	numrender: number;
	info: {
		PDFFormatVersion: string;
		IsAcroFormPresent: false;
		IsXFAPresent: false;
		Title: string;
		Author: string;
		Subject: string;
		Keywords: string;
		Creator: string;
		Producer: string;
		CreationDate: string;
		ModDate: string;
        Trapped: { name: string; };
	};
	metadata: any;
	text: string;
	version: string;
}