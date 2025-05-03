import "@/styles/Project.css";

import * as d3 from "d3";

import { Component } from "react";

interface TipData {
	tip: number;
	total_bill: number;
	day: string;
}

interface ProjectThreeState {
	data: TipData[];
}

class ProjectThree extends Component<{}, ProjectThreeState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		d3.csv("/data/tips.csv", (data: any) => {
			return {
				tip: parseFloat(data.tip),
				total_bill: parseFloat(data.total_bill),
				day: data.day,
			};
		})
			.then((data: TipData[]) => {
				this.setState({ data });
			})
			.catch((error: Error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<Child1 data={this.state.data} />
					<Child2 data={this.state.data} />
				</div>
			</div>
		);
	}
}

interface Child1Props {
	data: TipData[];
}

class Child1 extends Component<Child1Props> {
	constructor(props: Child1Props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {
		const data = this.props.data;

		// set the dimensions and margins of the graph
		const margin = { top: 50, right: 50, bottom: 60, left: 20 };
		const w = 500 - margin.left - margin.right;
		const h = 300 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		const container = d3
			.select(".child1")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.select(".g_1")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Add Labels
		container
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - h / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Tip");

		container
			.append("text")
			.attr("y", h + margin.top - 20)
			.attr("x", w / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Total Bill");

		// title
		container
			.append("text")
			.attr("x", w / 2)
			.attr("y", 0 - margin.top / 2)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("text-decoration", "underline")
			.text("Total Bill vs.Average Tip");

		// Add X axis
		const x_data = data.map((item: TipData) => item.total_bill);
		const x_scale = d3
			.scaleLinear()
			.domain([0, d3.max(x_data) as number])
			.range([margin.left, w]);

		container
			.selectAll(".x_axis_g")
			.data([0])
			.join("g")
			.attr("class", "x_axis_g")
			.attr("transform", `translate(0, ${h})`)
			.call(d3.axisBottom(x_scale) as any);

		// Add Y axis
		const y_data = data.map((item: TipData) => item.tip);
		const y_scale = d3
			.scaleLinear()
			.domain([0, d3.max(y_data) ?? 0])
			.range([h, 0]);

		container
			.selectAll(".y_axis_g")
			.data([0])
			.join("g")
			.attr("class", "y_axis_g")
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y_scale) as any);

		// Add dots
		container
			.selectAll("circle")
			.data(data)
			.join("circle")
			.attr("cx", (d: TipData) => x_scale(d.total_bill))
			.attr("cy", (d: TipData) => y_scale(d.tip))
			.attr("r", 3)
			.style("fill", "#69b3a2");
	}

	render() {
		return (
			<svg className="child1">
				<g className="g_1"></g>
			</svg>
		);
	}
}

interface Child2Props {
	data: TipData[];
}

class Child2 extends Component<Child2Props> {
	constructor(props: Child2Props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate() {
		const data = this.props.data;

		// set the dimensions and margins of the graph
		const margin = { top: 50, right: 10, bottom: 50, left: 25 };
		const w = 500 - margin.left - margin.right;
		const h = 300 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		const container = d3
			.select(".child2")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.select(".g_2")
			.attr("transform", `translate(${margin.left}, ${margin.top})`);

		// Add Labels
		container
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - h / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Average Tip");

		container
			.append("text")
			.attr("y", h + margin.top - 30)
			.attr("x", w / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Day");

		// title
		container
			.append("text")
			.attr("x", w / 2)
			.attr("y", 0 - margin.top / 2)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("text-decoration", "underline")
			.text("Average Tip by Day");

		// Add X axis (Saturday, Sunday, Thursday, and Friday)
		const x_data = data.map((item: TipData) => item.day);
		const x_scale = d3
			.scaleBand()
			.domain([...new Set(x_data)])
			.range([margin.left, w]);

		container
			.selectAll(".x_axis_g")
			.data([0])
			.join("g")
			.attr("class", "x_axis_g")
			.attr("transform", `translate(0, ${h})`)
			.call(d3.axisBottom(x_scale) as any);

		// Add Y axis (Average tip for that day)
		const y_data = [...new Set(x_data)].map(
			(day) =>
				d3.mean(
					data.filter((item) => item.day === day).map((item) => item.tip)
				) ?? 0
		);
		const y_scale = d3
			.scaleLinear()
			.domain([0, d3.max(y_data) ?? 0])
			.range([h, 0]);

		container
			.selectAll(".y_axis_g")
			.data([0])
			.join("g")
			.attr("class", "y_axis_g")
			.attr("transform", `translate(${margin.left}, 0)`)
			.call(d3.axisLeft(y_scale) as any);

		// Add bars
		const gap = 30;
		container
			.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: TipData) => (x_scale(d.day) || 0) + gap / 2)
			.attr("y", (d: TipData) =>
				y_scale(
					d3.mean(
						data.filter((item) => item.day === d.day).map((item) => item.tip)
					) || 0
				)
			)
			.attr("width", x_scale.bandwidth() - gap)
			.attr(
				"height",
				(d: TipData) =>
					h -
					y_scale(
						d3.mean(
							data.filter((item) => item.day === d.day).map((item) => item.tip)
						) || 0
					)
			)
			.style("fill", "#69b3a2");
	}

	render() {
		return (
			<svg className="child2">
				<g className="g_2"></g>
			</svg>
		);
	}
}

export default ProjectThree;

// class Child2 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidUpdate() {
//     var data = this.props.data;

//     // set the dimensions and margins of the graph
//     var margin = { top: 50, right: 10, bottom: 50, left: 25 },
//       w = 500 - margin.left - margin.right,
//       h = 300 - margin.top - margin.bottom;

//     // append the svg object to the body of the page
//     var container = d3
//       .select(".child2")
//       .attr("width", w + margin.left + margin.right)
//       .attr("height", h + margin.top + margin.bottom)
//       .select(".g_2")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     // Add Labels
//     container
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - h / 2)
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Average Tip");

//     container
//       .append("text")
//       .attr("y", h + margin.top - 30)
//       .attr("x", w / 2)
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .text("Day");

//     // title
//     container
//       .append("text")
//       .attr("x", w / 2)
//       .attr("y", 0 - margin.top / 2)
//       .attr("text-anchor", "middle")
//       .style("font-size", "16px")
//       .style("text-decoration", "underline")
//       .text("Average Tip by Day");

//     // Add X axis (Saturday, Sunday, Thursday, and Friday)
//     const x_data = data.map((item) => item.day);
//     const x_scale = d3
//       .scaleBand()
//       .domain([...new Set(x_data)])
//       .range([margin.left, w]);

//     container.selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

//     // Add Y axis (Average tip for that day)
//     const y_data = [...new Set(x_data)].map((day) => d3.mean(data.filter((item) => item.day === day).map((item) => item.tip)));
//     const y_scale = d3
//       .scaleLinear()
//       .domain([0, d3.max(y_data)])
//       .range([h, 0]);

//     container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

//   }

//   render() {
//     return (
//       <svg className="child2">
//         <g className="g_2"></g>
//       </svg>
//     );
//   }
// }
