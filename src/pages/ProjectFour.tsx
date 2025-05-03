import "@/styles/ProjectFour.css";

import * as d3 from "d3";

import { Component } from "react";

interface ProjectFourState {
	wordFrequency: [string, number][];
}

class ProjectFour extends Component<{}, ProjectFourState> {
	constructor(props: {}) {
		super(props);
		this.state = { wordFrequency: [] };
	}

	componentDidMount() {
		this.renderChart();
	}

	componentDidUpdate() {
		this.renderChart();
	}

	getWordFrequency = (text: string): [string, number][] => {
		const stopWords = new Set([
			"the",
			"and",
			"a",
			"an",
			"in",
			"on",
			"at",
			"for",
			"with",
			"about",
			"as",
			"by",
			"to",
			"of",
			"from",
			"that",
			"which",
			"who",
			"whom",
			"this",
			"these",
			"those",
			"it",
			"its",
			"they",
			"their",
			"them",
			"we",
			"our",
			"ours",
			"you",
			"your",
			"yours",
			"he",
			"him",
			"his",
			"she",
			"her",
			"hers",
			"it",
			"its",
			"we",
			"us",
			"our",
			"ours",
			"they",
			"them",
			"theirs",
			"I",
			"me",
			"my",
			"myself",
			"you",
			"your",
			"yourself",
			"yourselves",
			"was",
			"were",
			"is",
			"am",
			"are",
			"be",
			"been",
			"being",
			"have",
			"has",
			"had",
			"having",
			"do",
			"does",
			"did",
			"doing",
			"a",
			"an",
			"the",
			"as",
			"if",
			"each",
			"how",
			"which",
			"who",
			"whom",
			"what",
			"this",
			"these",
			"those",
			"that",
			"with",
			"without",
			"through",
			"over",
			"under",
			"above",
			"below",
			"between",
			"among",
			"during",
			"before",
			"after",
			"until",
			"while",
			"of",
			"for",
			"on",
			"off",
			"out",
			"in",
			"into",
			"by",
			"about",
			"against",
			"with",
			"amongst",
			"throughout",
			"despite",
			"towards",
			"upon",
			"isn't",
			"aren't",
			"wasn't",
			"weren't",
			"haven't",
			"hasn't",
			"hadn't",
			"doesn't",
			"didn't",
			"don't",
			"doesn't",
			"didn't",
			"won't",
			"wouldn't",
			"can't",
			"couldn't",
			"shouldn't",
			"mustn't",
			"needn't",
			"daren't",
			"hasn't",
			"haven't",
			"hadn't",
		]);

		const words = text
			.toLowerCase()
			.replace(/[.,/#!$%^&*;:{}=_`~()]/g, "")
			.replace(/\s{2,}/g, " ")
			.split(" ");

		const filteredWords = words.filter((word) => !stopWords.has(word));

		return Object.entries(
			filteredWords.reduce((freq: { [key: string]: number }, word: string) => {
				freq[word] = (freq[word] || 0) + 1;
				return freq;
			}, {})
		);
	};

	renderChart() {
		const data = this.state.wordFrequency
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5);

		if (!data.length) {
			console.log("No data to display");
			return;
		}

		const xScale = d3
			.scaleLinear()
			.domain([0, data.length])
			.range([0 + 100, 1000 - 100]);

		const fontSizeScale = d3.scaleLinear().domain([0, 1]).range([0, 50]);

		const svg = d3.select(".svg_parent");

		const existingWords = svg.selectAll("g.text-group").data(data);

		existingWords.join(
			(enter) => {
				const g = enter.append("g").attr("class", "text-group");
				g.append("text")
					.text((d) => d[0])
					.attr("font-size", 0)
					.attr("transform", (_, i) => `translate(${xScale(i)}, ${100})`)
					.transition()
					.duration(3000)
					.attr("font-size", (d) => fontSizeScale(d[1] / data[0][1]));
				return g;
			},
			(update) => {
				update
					.select("text")
					.text((d) => d[0])
					.transition()
					.duration(3000)
					.attr("transform", (_, i) => `translate(${xScale(i)}, ${100})`)
					.attr("font-size", (d) => fontSizeScale(d[1] / data[0][1]));
				return update;
			},
			(exit) => exit.remove()
		);
	}

	render() {
		return (
			<div className="parent">
				<div className="child1" style={{ width: 1000 }}>
					<textarea id="input_field" style={{ height: 150, width: 1000 }} />
					<button
						style={{ marginTop: 10, height: 40, width: 1000 }}
						onClick={() => {
							const inputElement = document.getElementById(
								"input_field"
							) as HTMLTextAreaElement;
							if (inputElement) {
								const input_data = inputElement.value;
								this.setState({
									wordFrequency: this.getWordFrequency(input_data),
								});
							}
						}}
					>
						Generate WordCloud
					</button>
				</div>
				<div className="child2">
					<svg
						className="svg_parent"
						style={{ height: 150, width: 1000 }}
					></svg>
				</div>
			</div>
		);
	}
}

export default ProjectFour;
