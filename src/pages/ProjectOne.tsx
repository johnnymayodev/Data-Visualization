import "@/styles/ProjectOne.css";

function ProjectOne() {
	return (
		<div id="resume">
			<div id="header">
				<div id="name">
					<h1>Zh Rimel</h1>
					<span>Data Scientist</span>
				</div>
				<div id="info">
					<span>
						Email: <a href="mailto:abc@gmail.com">abc@gmail.com</a>
					</span>
					<span>Web: abc.github.io/abc</span>
					<span>Mobile: 01234567890</span>
				</div>
			</div>
			<div id="body">
				<div className="section">
					<h2>Personal Profile</h2>
					<div className="subsection">
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Veritatis atque harum sint veniam repellendus nihil, aperiam,
							tempora voluptas minus accusantium, ex perspiciatis? Veritatis
							fugiat aliquam similique expedita, ratione quod vel!
						</p>
					</div>
				</div>
				<div className="section">
					<h2>Work Experience</h2>
					<div className="subsection">
						<div className="subsubsection">
							<h3>Job Title at Company (August 2022 - December 2023)</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Asperiores debitis tenetur nihil iure aperiam numquam ipsum eos
								eaque dignissimos molestias? Molestiae labore expedita ipsa,
								nisi hic veritatis quos aspernatur. Ullam.
							</p>
						</div>
						<div className="subsubsection">
							<h3>Job Title 2 at Company 2 (August 2020 - December 2021)</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Asperiores debitis tenetur nihil iure aperiam numquam ipsum eos
								eaque dignissimos molestias? Molestiae labore expedita ipsa,
								nisi hic veritatis quos aspernatur. Ullam.
							</p>
						</div>
					</div>
				</div>
				<div className="section">
					<h2>Key Skills</h2>
					<div className="subsection">
						<ul>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
							<li>A Key Skill</li>
						</ul>
					</div>
				</div>
				<div className="section">
					<h2>Education</h2>
					<div className="subsection">
						<div className="subsubsection">
							<h3>New Jersey Institute of Technology</h3>
							<span>BS in Computer Science</span>
							<span>2018 - 2022</span>
							<span>GPA: 3.9</span>
						</div>
						<div className="subsubsection">
							<h3>New Jersey Institute of Technology</h3>
							<span>MS in Data Science</span>
							<span>2022 - 2023</span>
							<span>GPA: 4.0</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectOne;
