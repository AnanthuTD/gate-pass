"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import VisitorForm from "./components/visitorForm";
import { ConfigProvider, theme } from "antd";

const { darkAlgorithm } = theme;

const Home = () => {
	const [navHeight, setNavHeight] = useState("80px"); // Default height

	useEffect(() => {
		const calculateNavHeight = () => {
			const navElement = document.querySelector("nav");
			if (navElement) {
				const height = navElement.offsetHeight;
				setNavHeight(`${height}px`); // Set the height with "px"
			}
		};

		calculateNavHeight(); // Initial calculation

		window.addEventListener("resize", calculateNavHeight);

		return () => {
			window.removeEventListener("resize", calculateNavHeight);
		};
	}, []);

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<main className="flex flex-col relative overflow-hidden">
			{/* Navigation */}
			<nav className="bg-blue-500 p-4 text-white fixed z-20 top-0 w-full">
				<div className="container mx-auto flex justify-between items-center">
					<div>
						<span className="text-lg font-bold">
							MES COLLEGE MARAMPALLY
						</span>
					</div>
					<div>
						<span className="text-lg font-bold">Your App Name</span>
					</div>
				</div>
			</nav>

			{/* Buttons Section */}
			<section
				className="container mx-auto w-full relative z-10"
				style={{
					background: `url('./college.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: `calc(100vh - ${parseFloat(navHeight)}px)`, // Adjusted height
					marginTop: `${parseFloat(navHeight)}px`,
				}}>
				<div className="flex justify-around items-center h-full">
					<Link
						href="#studentsForm"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer h-fit">
						Students
					</Link>
					<Link
						href="#visitorsForm"
						className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer h-fit">
						Visitors
					</Link>
				</div>
			</section>

			{/* Students Form Section */}
			<section
				id="studentsForm"
				className="container mx-auto w-full"
				style={{
					minHeight: `calc(100vh - ${parseFloat(navHeight)}px)`, // Adjusted height
					marginTop: `${parseFloat(navHeight)}px`,
				}}>
				student
			</section>

			{/* Visitors Form Section */}
			<section
				id="visitorsForm"
				className="container mx-auto w-full"
				style={{
					minHeight: `calc(100vh - ${parseFloat(navHeight)}px)`, // Adjusted height
					marginTop: `${parseFloat(navHeight)}px`,
				}}>
				<ConfigProvider theme={{ algorithm: darkAlgorithm }}>
					<VisitorForm />
				</ConfigProvider>
			</section>
		</main>
	);
};

export default Home;
