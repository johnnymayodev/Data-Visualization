import "@/styles/ProjectSix.css";

import * as d3 from "d3";

import { Component } from "react";
import FileUpload from "../components/CSVUpload";

interface DataPoint {
	Date: string;
	"GPT-4": number;
	Gemini: number;
	"PaLM-2": number;
	Claude: number;
	"LLaMA-3.1": number;
}

interface FormattedDataPoint {
	date: Date | null;
	[key: string]: number | Date | null;
}

interface MiniChartDataPoint {
	date: Date | null;
	value: number;
}

interface ProjectSixProps {}

interface ProjectSixState {
	data: DataPoint[];
}

interface StreamGraphProps {
	csv_data: DataPoint[];
}

interface StreamGraphState {}

class ProjectSix extends Component<ProjectSixProps, ProjectSixState> {
	constructor(props: ProjectSixProps) {
		super(props);
		this.state = {
			data: [
				{
					Date: "2024-01-01",
					"GPT-4": 120,
					Gemini: 20,
					"PaLM-2": 90,
					Claude: 50,
					"LLaMA-3.1": 60,
				},
				{
					Date: "2024-02-01",
					"GPT-4": 130,
					Gemini: 75,
					"PaLM-2": 35,
					Claude: 60,
					"LLaMA-3.1": 70,
				},
				{
					Date: "2024-03-01",
					"GPT-4": 50,
					Gemini: 50,
					"PaLM-2": 95,
					Claude: 65,
					"LLaMA-3.1": 80,
				},
				{
					Date: "2024-04-01",
					"GPT-4": 100,
					Gemini: 65,
					"PaLM-2": 80,
					Claude: 70,
					"LLaMA-3.1": 90,
				},
				{
					Date: "2024-05-01",
					"GPT-4": 60,
					Gemini: 50,
					"PaLM-2": 150,
					Claude: 75,
					"LLaMA-3.1": 100,
				},
				{
					Date: "2024-06-01",
					"GPT-4": 100,
					Gemini: 55,
					"PaLM-2": 60,
					Claude: 80,
					"LLaMA-3.1": 110,
				},
				{
					Date: "2024-07-01",
					"GPT-4": 180,
					Gemini: 50,
					"PaLM-2": 130,
					Claude: 85,
					"LLaMA-3.1": 120,
				},
				{
					Date: "2024-08-01",
					"GPT-4": 190,
					Gemini: 45,
					"PaLM-2": 100,
					Claude: 90,
					"LLaMA-3.1": 130,
				},
				{
					Date: "2024-09-01",
					"GPT-4": 200,
					Gemini: 40,
					"PaLM-2": 50,
					Claude: 95,
					"LLaMA-3.1": 140,
				},
				{
					Date: "2024-10-01",
					"GPT-4": 110,
					Gemini: 135,
					"PaLM-2": 80,
					Claude: 100,
					"LLaMA-3.1": 150,
				},
			],
		};
	}

	set_data = (csv_data: DataPoint[]) => {
		this.setState({ data: csv_data });
	};

	render() {
		return (
			<div>
				<FileUpload set_data={this.set_data} />
				<div className="parent">
					<StreamGraph csv_data={this.state.data} />
				</div>
			</div>
		);
	}
}

class StreamGraph extends Component<StreamGraphProps, StreamGraphState> {
	componentDidMount() {
		this.createStreamgraph();
	}

	componentDidUpdate(prevProps: StreamGraphProps) {
		if (prevProps.csv_data !== this.props.csv_data && this.props.csv_data) {
			this.createStreamgraph();
		}
	}

	createStreamgraph() {
		const { csv_data: data } = this.props;
		if (!data) return;

		d3.select("#streamgraph").selectAll("*").remove();
		d3.select("#legend").selectAll("*").remove();
		d3.select(".tooltip").remove();

		const margin = { top: 20, right: 20, bottom: 40, left: 20 };
		const width = 600 - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		const modelColorMap: Record<string, string> = {
			"GPT-4": "#e41a1c",
			Gemini: "#377eb8",
			"PaLM-2": "#4daf4a",
			Claude: "#984ea3",
			"LLaMA-3.1": "#ff7f00",
		};

		const parseDate = d3.timeParse("%Y-%m-%d");
		const formattedData: FormattedDataPoint[] = data.map((d) => ({
			date: parseDate(d.Date),
			"GPT-4": +d["GPT-4"],
			Gemini: +d.Gemini,
			"PaLM-2": +d["PaLM-2"],
			Claude: +d.Claude,
			"LLaMA-3.1": +d["LLaMA-3.1"],
		}));

		const stack = d3
			.stack<FormattedDataPoint>()
			.keys(Object.keys(modelColorMap))
			.offset(d3.stackOffsetWiggle);
		const stackedData = stack(formattedData);

		const xScale = d3
			.scaleTime()
			.domain(d3.extent(formattedData, (d) => d.date) as [Date, Date])
			.range([margin.left, width - margin.right]);

		const yScale = d3
			.scaleLinear()
			.domain([
				d3.min(stackedData, (layer) => d3.min(layer, (d) => d[0])) as number,
				d3.max(stackedData, (layer) => d3.max(layer, (d) => d[1])) as number,
			])
			.range([height - margin.bottom, margin.top]);

		const area = d3
			.area<d3.SeriesPoint<FormattedDataPoint>>()
			.x((d) => xScale(d.data.date as Date))
			.curve(d3.curveCardinal)
			.y0((d) => yScale(d[0]))
			.y1((d) => yScale(d[1]));

		const svg = d3
			.select("#streamgraph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const tooltip = d3.select("body").append("div").attr("class", "tooltip");

		svg
			.selectAll(".layer")
			.data(stackedData)
			.join("path")
			.attr("class", "layer")
			.attr("d", area)
			.attr("fill", (d) => modelColorMap[d.key] || "#ccc")
			.attr("opacity", 0.8)
			.on("mouseover", (_, d) => {
				tooltip.style("display", "block");
				const modelKey = d.key;
				const miniChartData: MiniChartDataPoint[] = formattedData.map(
					(data) => ({
						date: data.date,
						value: data[modelKey as keyof FormattedDataPoint] as number,
					})
				);

				renderMiniBarChart(
					miniChartData,
					modelKey,
					tooltip,
					modelColorMap[modelKey]
				);
			})
			.on("mousemove", function (event) {
				tooltip
					.style("left", `${event.pageX + 15}px`)
					.style("top", `${event.pageY + 15}px`);
			})
			.on("mouseout", function () {
				tooltip.style("display", "none");
				tooltip.selectAll("*").remove();
			});

		const renderMiniBarChart = (
			data: MiniChartDataPoint[],
			modelKey: string,
			tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>,
			color: string
		) => {
			tooltip.selectAll("*").remove();

			tooltip.append("h4").text(modelKey).style("margin", "0 0 10px 0");

			const miniWidth = 200;
			const miniHeight = 150;
			const miniMargin = { top: 10, right: 10, bottom: 30, left: 30 };

			const miniSvg = tooltip
				.append("svg")
				.attr("width", miniWidth + miniMargin.left + miniMargin.right)
				.attr("height", miniHeight + miniMargin.top + miniMargin.bottom)
				.append("g")
				.attr("transform", `translate(${miniMargin.left},${miniMargin.top})`);

			const xMiniScale = d3
				.scaleBand<Date>()
				.domain(data.map((d) => d.date as Date))
				.range([0, miniWidth])
				.padding(0.2);

			const yMiniScale = d3
				.scaleLinear()
				.domain([0, d3.max(data, (d) => d.value) as number])
				.nice()
				.range([miniHeight, 0]);

			miniSvg
				.selectAll(".bar")
				.data(data)
				.join("rect")
				.attr("class", "bar")
				.attr("x", (d) => xMiniScale(d.date as Date) || 0)
				.attr("y", (d) => yMiniScale(d.value))
				.attr("width", xMiniScale.bandwidth())
				.attr("height", (d) => miniHeight - yMiniScale(d.value))
				.attr("fill", color);

			const xAxis = d3
				.axisBottom(xMiniScale)
				.tickFormat((d: Date) => d3.timeFormat("%b")(d));
			miniSvg
				.append("g")
				.attr("transform", `translate(0,${miniHeight})`)
				.call(xAxis)
				.selectAll("text")
				.style("text-anchor", "middle")
				.attr("dx", "-0.5em")
				.attr("dy", "0.5em");

			miniSvg
				.select(".x-axis")
				.selectAll(".tick:last-child text")
				.style("display", "none");

			const yAxis = d3.axisLeft(yMiniScale).ticks(8);
			miniSvg.append("g").call(yAxis);
		};

		const xAxis = d3
			.axisBottom(xScale)
			.ticks(d3.timeMonth)
			.tickFormat(d3.timeFormat("%b") as any);

		svg
			.append("g")
			.attr("class", "x-axis")
			.attr("transform", `translate(0,${height + 5})`)
			.call(xAxis);

		const legendContainer = d3.select("#legend");
		const legend = legendContainer
			.selectAll(".legend-item")
			.data(Object.entries(modelColorMap).reverse())
			.join("div")
			.attr("class", "legend-item");

		legend.append("div").style("background-color", ([, color]) => color);

		legend.append("span").text(([key]) => key);
	}

	render() {
		return (
			<div className="Child1">
				<div id="streamgraph" />
				<div id="legend" />
			</div>
		);
	}
}

export default ProjectSix;
