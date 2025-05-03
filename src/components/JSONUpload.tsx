import React, { Component } from "react";

interface FileUploadProps {
	set_data: (data: any[]) => void;
}

interface FileUploadState {
	file: File | null;
}

class FileUpload extends Component<FileUploadProps, FileUploadState> {
	constructor(props: FileUploadProps) {
		super(props);
		this.state = {
			file: null,
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
					const json = JSON.parse(text);
					this.props.set_data(json);
				}
			};
			reader.readAsText(file);
		}
	};

	render() {
		return (
			<div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
				<h2>Upload a JSON File</h2>
				<form onSubmit={this.handleFileSubmit}>
					<input
						type="file"
						accept=".json"
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
