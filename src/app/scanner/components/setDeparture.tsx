import { Button, message } from "antd";

function SetDeparture({
	visitorId,
	onSuccess,
}: {
	visitorId: number | undefined;
	onSuccess: (visitorId: number | undefined) => {};
}) {
	const setDepartureTime = async () => {
		try {
			const response = await fetch(`scanner/api/?id=${visitorId}`, {
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
			onSuccess(visitorId);
		} catch (error) {
			console.error("Error setting departure time:", error);
		}
	};

	return (
		<Button onClick={() => setDepartureTime()} disabled={!visitorId}>
			Mark Departure
		</Button>
	);
}

export default SetDeparture;
