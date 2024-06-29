/* import VisitorForm from "../components/visitorForm";

const Home = () => {
	return (
		<div style={{ display: "flex", height: "100%" }}>
			<div
				style={{
					flex: "1 1 50%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src="/college.jpg"
					alt="College"
					style={{
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "cover",
						borderRadius: "8px",
					}}
				/>
			</div>

			<main
				className="flex flex-col relative overflow-hidden"
				style={{
					flex: "1 1 50%",
					paddingLeft: "16px",
					display: "flex",
					flexDirection: "column",
					overflowY: "auto", // Added to make only this container scrollable
					height: "100%", // Ensures the scrollable area takes full height
				}}
			>
				<section
					id="visitorsForm"
					className="container mx-auto w-full py-2"
				>
					<VisitorForm />
				</section>
			</main>
		</div>
	);
};

export default Home;
 */
import VisitorForm from "../components/visitorForm";

const Home = () => {
	return (
		<div className="flex h-full">
			<div className="hidden md:flex md:flex-1 md:justify-center md:items-center">
				<img
					src="/college.jpg"
					alt="College"
					className="max-w-full max-h-full object-cover rounded-lg"
				/>
			</div>

			<main className="flex flex-1 flex-col relative overflow-hidden pl-4 md:pl-4 h-full overflow-y-auto">
				<section id="visitorsForm" className="container mx-auto w-full py-2">
					<VisitorForm />
				</section>
			</main>
		</div>
	);
};

export default Home;
