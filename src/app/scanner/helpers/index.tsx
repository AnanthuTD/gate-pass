import { message } from "antd";

const setDepartureTime = async (visitor: VisitorTicket) => {
	try {
		const response = await fetch(`scanner/api/?id=${visitor.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			message.success("Marked");
		} else {
			message.error("Failed");
			console.error("Error setting departure time:", response.status);
		}
	} catch (error) {
		console.error("Error setting departure time:", error);
	}
};

export { setDepartureTime };
