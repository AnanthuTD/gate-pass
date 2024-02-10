"use client";
import React, { useState } from "react";
import { Radio } from "antd";
import StudentComponent from "./students/studentDetails";
import VisitorComponent from "./visitors/visitorDetails";

const MainPage: React.FC = () => {
	const [showStudents, setShowStudents] = useState<boolean>(false); // Default to showing students

	const handleToggle = (e: any) => {
		setShowStudents(e.target.value === "students");
	};

	return (
		<div>
			<div className="my-3">
				<Radio.Group
					onChange={handleToggle}
					value={showStudents ? "students" : "visitors"}
					defaultValue="students">
					<Radio.Button value="students">Show Students</Radio.Button>
					<Radio.Button value="visitors">Show Visitors</Radio.Button>
				</Radio.Group>
			</div>
			{showStudents ? <StudentComponent /> : <VisitorComponent />}
		</div>
	);
};

export default MainPage;
