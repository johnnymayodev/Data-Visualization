import React, { Component } from "react";

interface FileUploadProps {
	set_data: (data: any[]) => void;
}

interface FileUploadState {
	file: File | null;
	jsonData: any[] | null;
}

interface StockData {
	Date: Date;
	Company: string;
	Open: number;
	High: number;
	Low: number;
	Close: number;
	AdjClose: number;
	Volume: number;
}

class FileUpload extends Component<FileUploadProps, FileUploadState> {
	constructor(props: FileUploadProps) {
		super(props);
		this.state = {
			file: null,
			jsonData: null,
		};
	}

	handleFileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { file } = this.state;

		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const text = e.target?.result as string;
				if (text) {
					const json = this.csvToJson(text);
					this.setState({ jsonData: json });
					this.props.set_data(json);
				}
			};
			reader.readAsText(file);
		}
	};

	csvToJson = (csv: string): StockData[] => {
		const lines = csv.split("\n");
		const headers = lines[0].split(",");
		const result: StockData[] = [];

		for (let i = 1; i < lines.length; i++) {
			const currentLine = lines[i].split(",");
			const obj: Record<string, string> = {};

			headers.forEach((header: string, index: number) => {
				obj[header.trim()] = currentLine[index]?.trim() || "";
			});

			if (Object.keys(obj).length && lines[i].trim()) {
				const parsedObj: StockData = {
					Date: new Date(obj.Date),
					Company: obj.Company,
					Open: parseFloat(obj.Open),
					High: parseFloat(obj.High),
					Low: parseFloat(obj.Low),
					Close: parseFloat(obj.Close),
					AdjClose: parseFloat(obj["Adj Close"]),
					Volume: parseInt(obj.Volume, 10),
				};
				result.push(parsedObj);
			}
		}

		return result;
	};

	render() {
		return (
			<div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
				<h2>Upload a CSV File</h2>
				<form onSubmit={this.handleFileSubmit}>
					<input
						type="file"
						accept=".csv"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							if (event.target.files && event.target.files[0]) {
								this.setState({ file: event.target.files[0] });
							}
						}}
					/>
					<button type="submit">Upload</button>
				</form>
			</div>
		);
	}
}

export default FileUpload;
