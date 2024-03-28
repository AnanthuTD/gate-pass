import VisitorForm from "../components/visitorForm";

const Home = () => {
	return (
		<main className="flex flex-col relative overflow-hidden">
			<section
				id="visitorsForm"
				className="container mx-auto w-full py-2"
				>
					<VisitorForm />
			</section>
		</main>
	);
};

export default Home;
