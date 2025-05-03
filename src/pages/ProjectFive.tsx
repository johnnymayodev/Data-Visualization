import "@/styles/ProjectFive.css";

import * as d3 from "d3";

import { Component } from "react";
import FileUpload from "../components/CSVUpload";

interface Child1Props {
	csv_data: Array<{
		Company: string;
		Date: Date;
		Open: number;
		Close: number;
	}>;
}

interface Child1State {
	company: string;
	selectedMonth: string;
}

class Child1 extends Component<Child1Props, Child1State> {
	state: Child1State = {
		company: "Apple",
		selectedMonth: "November",
	};

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate(prevProps: Child1Props, prevState: Child1State) {
		if (
			prevProps.csv_data !== this.props.csv_data ||
			prevState.company !== this.state.company ||
			prevState.selectedMonth !== this.state.selectedMonth
		) {
			this.drawChart();
		}
	}

	handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ company: event.target.value });
	};

	handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		this.setState({ selectedMonth: event.target.value });
	};

	drawChart() {
		const { csv_data } = this.props;
		const { company, selectedMonth } = this.state;

		// Filter data by selected company and month
		const filteredData = csv_data.filter(
			(d) =>
				d.Company === company &&
				d.Date.getMonth() ===
					new Date(`${selectedMonth} 1, ${d.Date.getFullYear()}`).getMonth()
		);

		// Define SVG canvas dimensions
		const margin = { top: 20, right: 30, bottom: 50, left: 50 },
			width = 600 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		// Clear any existing SVG
		d3.select("#chart").selectAll("*").remove();

		// Create SVG container
		const svg = d3
			.select("#chart")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Tooltip setup
		const tooltip = d3
			.select("#chart")
			.append("div")
			.attr("class", "tooltip")
			.style("position", "absolute")
			.style("background-color", "#fff")
			.style("border", "1px solid #ccc")
			.style("padding", "5px")
			.style("border-radius", "5px")
			.style("pointer-events", "none")
			.style("display", "none");

		// Set up scales
		const x = d3
			.scaleTime()
			.domain(d3.extent(filteredData, (d) => d.Date) as [Date, Date])
			.range([0, width]);

		const y = d3
			.scaleLinear()
			.domain([
				d3.min(filteredData, (d) => Math.min(d.Open, d.Close)) as number,
				d3.max(filteredData, (d) => Math.max(d.Open, d.Close)) as number,
			])
			.range([height, 0]);

		// Define line generators with smooth curves
		const lineOpen = d3
			.line<{ Date: Date; Open: number }>()
			.x((d) => x(d.Date))
			.y((d) => y(d.Open))
			.curve(d3.curveMonotoneX);

		const lineClose = d3
			.line<{ Date: Date; Close: number }>()
			.x((d) => x(d.Date))
			.y((d) => y(d.Close))
			.curve(d3.curveMonotoneX);

		// Append the "Open" price line
		svg
			.append("path")
			.datum(filteredData)
			.attr("fill", "none")
			.attr("stroke", "#b2df8a")
			.attr("stroke-width", 2)
			.attr("d", lineOpen);

		// Append circles for the "Open" price data points
		svg
			.selectAll(".open-circle")
			.data(filteredData)
			.enter()
			.append("circle")
			.attr("class", "open-circle")
			.attr("cx", (d) => x(d.Date))
			.attr("cy", (d) => y(d.Open))
			.attr("r", 5)
			.attr("fill", "#b2df8a")
			.on("mouseover", (event, d) => {
				tooltip
					.style("left", event.pageX + 10 + "px")
					.style("top", event.pageY - 10 + "px")
					.style("display", "inline-block")
					.html(
						`<strong>Date:</strong> ${d.Date.toLocaleDateString()}<br>` +
							`<strong>Open:</strong> $${d.Open.toFixed(2)}<br>` +
							`<strong>Close:</strong> $${d.Close.toFixed(2)}<br>` +
							`<strong>Difference:</strong> $${(d.Close - d.Open).toFixed(2)}`
					);
			})
			.on("mouseout", () => tooltip.style("display", "none"));

		// Append the "Close" price line
		svg
			.append("path")
			.datum(filteredData)
			.attr("fill", "none")
			.attr("stroke", "#e41a1c")
			.attr("stroke-width", 2)
			.attr("d", lineClose);

		// Append circles for the "Close" price data points
		svg
			.selectAll(".close-circle")
			.data(filteredData)
			.enter()
			.append("circle")
			.attr("class", "close-circle")
			.attr("cx", (d) => x(d.Date))
			.attr("cy", (d) => y(d.Close))
			.attr("r", 5)
			.attr("fill", "#e41a1c")
			.on("mouseover", (event, d) => {
				tooltip
					.style("left", event.pageX + 10 + "px")
					.style("top", event.pageY - 10 + "px")
					.style("display", "inline-block")
					.html(
						`<strong>Date:</strong> ${d.Date.toLocaleDateString()}<br>` +
							`<strong>Open:</strong> $${d.Open.toFixed(2)}<br>` +
							`<strong>Close:</strong> $${d.Close.toFixed(2)}<br>` +
							`<strong>Difference:</strong> $${(d.Close - d.Open).toFixed(2)}`
					);
			})
			.on("mouseout", () => tooltip.style("display", "none"));

		// Add axes
		svg
			.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x));
		svg.append("g").call(d3.axisLeft(y));
	}

	render() {
		const companies = ["Apple", "Microsoft", "Amazon", "Google", "Meta"];
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		return (
			<div className="child1">
				<div className="selectors">
					<h3>Select Company</h3>
					<div className="company-selectors">
						{companies.map((company) => (
							<label key={company}>
								<input
									type="radio"
									name="company"
									value={company}
									checked={this.state.company === company}
									onChange={this.handleCompanyChange}
								/>
								{company}
							</label>
						))}
					</div>

					<div className="month-selectors">
						<h3>Select Month</h3>
						<select
							value={this.state.selectedMonth}
							onChange={this.handleMonthChange}
						>
							{months.map((month) => (
								<option key={month} value={month}>
									{month}
								</option>
							))}
						</select>
					</div>
				</div>
				<div id="chart" />
			</div>
		);
	}
}

interface ProjectFiveState {
	data: Array<{
		"Adj Close": number;
		Close: number;
		High: number;
		Low: number;
		Open: number;
		Volume: number;
		Company: string;
		Date: Date;
	}>;
}

class ProjectFive extends Component<{}, ProjectFiveState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			data: [
				{
					"Adj Close": 176.8,
					Close: 179.7,
					High: 182.94,
					Low: 179.12,
					Open: 182.63,
					Volume: 99310400,
					Company: "Apple",
					Date: new Date("2024-11-02"),
				},
				{
					"Adj Close": 172.1,
					Close: 174.92,
					High: 180.17,
					Low: 174.64,
					Open: 179.61,
					Volume: 94537600,
					Company: "Apple",
					Date: new Date("2024-11-03"),
				},
				{
					"Adj Close": 169.23,
					Close: 172.0,
					High: 175.3,
					Low: 171.64,
					Open: 172.7,
					Volume: 96904000,
					Company: "Apple",
					Date: new Date("2024-11-04"),
				},
				{
					"Adj Close": 169.4,
					Close: 172.17,
					High: 174.14,
					Low: 171.03,
					Open: 172.89,
					Volume: 86709100,
					Company: "Apple",
					Date: new Date("2024-11-05"),
				},
				{
					"Adj Close": 169.41,
					Close: 172.19,
					High: 172.5,
					Low: 168.17,
					Open: 169.08,
					Volume: 89117000,
					Company: "Apple",
					Date: new Date("2024-11-06"),
				},
				{
					"Adj Close": 172.26,
					Close: 175.08,
					High: 175.18,
					Low: 170.82,
					Open: 172.32,
					Volume: 90725000,
					Company: "Apple",
					Date: new Date("2024-11-07"),
				},
				{
					"Adj Close": 172.7,
					Close: 175.53,
					High: 177.18,
					Low: 174.82,
					Open: 176.12,
					Volume: 87762000,
					Company: "Apple",
					Date: new Date("2024-11-08"),
				},
				{
					"Adj Close": 169.41,
					Close: 172.19,
					High: 176.62,
					Low: 171.79,
					Open: 175.78,
					Volume: 90047000,
					Company: "Apple",
					Date: new Date("2024-11-09"),
				},
				{
					"Adj Close": 170.28,
					Close: 173.07,
					High: 173.78,
					Low: 171.09,
					Open: 171.34,
					Volume: 91525000,
					Company: "Apple",
					Date: new Date("2024-11-10"),
				},
				{
					"Adj Close": 167.06,
					Close: 169.8,
					High: 172.54,
					Low: 169.41,
					Open: 171.51,
					Volume: 87030000,
					Company: "Apple",
					Date: new Date("2024-11-11"),
				},
				{
					"Adj Close": 163.55,
					Close: 166.23,
					High: 171.08,
					Low: 165.94,
					Open: 170.0,
					Volume: 88567000,
					Company: "Apple",
					Date: new Date("2024-11-12"),
				},
				{
					"Adj Close": 161.86,
					Close: 164.51,
					High: 169.68,
					Low: 164.18,
					Open: 166.98,
					Volume: 88085000,
					Company: "Apple",
					Date: new Date("2024-11-13"),
				},
				{
					"Adj Close": 159.79,
					Close: 162.41,
					High: 166.33,
					Low: 162.3,
					Open: 164.42,
					Volume: 89617000,
					Company: "Apple",
					Date: new Date("2024-11-14"),
				},
				{
					"Adj Close": 159.02,
					Close: 161.62,
					High: 162.3,
					Low: 154.7,
					Open: 160.02,
					Volume: 90823000,
					Company: "Apple",
					Date: new Date("2024-11-15"),
				},
				{
					"Adj Close": 157.2,
					Close: 159.78,
					High: 162.76,
					Low: 157.02,
					Open: 158.98,
					Volume: 87645000,
					Company: "Apple",
					Date: new Date("2024-11-16"),
				},
				{
					"Adj Close": 157.12,
					Close: 159.69,
					High: 164.39,
					Low: 157.82,
					Open: 163.5,
					Volume: 88735000,
					Company: "Apple",
					Date: new Date("2024-11-17"),
				},
			],
		};
	}

	set_data = (csv_data: any) => {
		this.setState({ data: csv_data });
	};

	render() {
		return (
			<div className="project-five">
				<FileUpload set_data={this.set_data}></FileUpload>
				<div className="parent">
					<Child1 csv_data={this.state.data}></Child1>
				</div>
			</div>
		);
	}
}

export default ProjectFive;
