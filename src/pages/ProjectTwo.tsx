import "@/styles/ProjectTwo.css";

import React from "react";

const initialState = {
	name: "Zh Rimel",
	job: "Data Scientist",
	email: "abc@gmail.com",
	web: "abc.github.io/abc",
	phone: "01234567890",

	bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis atque harum sint veniam repellendus nihil, aperiam, tempora voluptas minus accusantium, ex perspiciatis? Veritatis fugiat aliquam similique expedita, ratione quod vel!",

	jobs: [
		{
			title: "Job Title",
			company: "Company",
			start: "August 2022",
			end: "December 2023",
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing " +
				"elit. Asperiores debitis tenetur nihil iure aperiam numquam ipsum " +
				"eos eaque dignissimos molestias? Molestiae labore expedita ipsa, " +
				"nisi hic veritatis quos aspernatur. Ullam.",
		},
		{
			title: "Job Title 2",
			company: "Company 2",
			start: "August 2020",
			end: "December 2021",
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing " +
				"elit. Asperiores debitis tenetur nihil iure aperiam numquam ipsum " +
				"eos eaque dignissimos molestias? Molestiae labore expedita ipsa, " +
				"nisi hic veritatis quos aspernatur. Ullam.",
		},
	],

	skills: [
		"A Key Skill",
		"A Key Skill",
		"A Key Skill",

		"A Key Skill",
		"A Key Skill",
		"A Key Skill",

		"A Key Skill",
		"A Key Skill",
		"A Key Skill",
	],

	education: [
		{
			degree: "BS in Computer Science",
			school: "New Jersey Institute of Technology",
			start: "2018",
			end: "2022",
			gpa: "3.9",
		},
		{
			degree: "MS in Data Science",
			school: "New Jersey Institute of Technology",
			start: "2022",
			end: "2023",
			gpa: "4.0",
		},
	],
};

interface HeaderProps {
	name: string;
	job: string;
	email: string;
	web: string;
	phone: string;
}

interface EducationProps {
	education: Array<{
		school: string;
		degree: string;
		start: string;
		end: string;
		gpa: string;
	}>;
}

interface PersonalProfileProps {
	bio: string;
}

interface SkillsProps {
	skills: string[];
}

interface WorkExperienceProps {
	jobs: Array<{
		title: string;
		company: string;
		start: string;
		end: string;
		description: string;
	}>;
}

const Header: React.FC<HeaderProps> = ({ name, job, email, web, phone }) => {
	return (
		<div className="Header">
			<div className="name">
				<h1>{name}</h1>
				<h2>{job}</h2>
			</div>
			<div className="info">
				<p>{email}</p>
				<p>{web}</p>
				<p>{phone}</p>
			</div>
		</div>
	);
};

const Education: React.FC<EducationProps> = ({ education }) => {
	return (
		<div className="Education">
			<h2>Education</h2>
			<div>
				{education.map((edu, index) => (
					<div key={index}>
						<h3>{edu.school}</h3>
						<p>{edu.degree}</p>
						<p>
							{edu.start} - {edu.end}
						</p>
						<p>GPA: {edu.gpa}</p>
					</div>
				))}
			</div>
		</div>
	);
};

const PersonalProfile: React.FC<PersonalProfileProps> = ({ bio }) => {
	return (
		<div className="PersonalProfile">
			<h2>Personal Profile</h2>
			<div>
				<p>{bio}</p>
			</div>
		</div>
	);
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
	return (
		<div className="Skills">
			<h2>Key Skills</h2>
			<ul>
				{skills.map((skill, index) => (
					<li key={index}>{skill}</li>
				))}
			</ul>
		</div>
	);
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ jobs }) => {
	return (
		<div className="WorkExperience">
			<h2>Work Experience</h2>
			<div>
				{jobs.map((job, index) => (
					<div key={index}>
						<h3>
							{job.title} at {job.company} ({job.start} - {job.end})
						</h3>
						<p>{job.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

interface ProjectTwoState {
	name: string;
	job: string;
	email: string;
	web: string;
	phone: string;
	bio: string;
	jobs: Array<{
		title: string;
		company: string;
		start: string;
		end: string;
		description: string;
	}>;
	skills: string[];
	education: Array<{
		school: string;
		degree: string;
		start: string;
		end: string;
		gpa: string;
	}>;
}

class ProjectTwo extends React.Component<{}, ProjectTwoState> {
	constructor(props: {}) {
		super(props);
		this.state = initialState;
	}

	render() {
		return (
			<div className="App">
				<Header
					name={this.state.name}
					job={this.state.job}
					email={this.state.email}
					web={this.state.web}
					phone={this.state.phone}
				/>
				<div className="container">
					<PersonalProfile bio={this.state.bio} />
					<WorkExperience jobs={this.state.jobs} />
					<Skills skills={this.state.skills} />
					<Education education={this.state.education} />
				</div>
			</div>
		);
	}
}

export default ProjectTwo;
