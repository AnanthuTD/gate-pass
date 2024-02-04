'use client'
import React, { useState, useRef } from "react";
import { Button } from "antd";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
	const [data, setData] = useState("No result");
	const [facingMode, setFacingMode] = useState("environment");
	const qrRef = useRef(null);

	const handleScan = (result, error) => {
		if (result) {
			setData(result.text);
		}

		console.log(error);

		if (error) {
			console.info(error);
		}
	};

	const toggleCamera = () => {
		setFacingMode((prevFacingMode) =>
			prevFacingMode === "environment" ? "user" : "environment"
		);
		qrRef.current?.reset();
	};

	return (
		<div className="container mx-auto my-8 p-8 bg-gray-100 rounded-md shadow-md">
			<QrReader
				ref={qrRef}
				onResult={handleScan}
				constraints={{ facingMode }}
				videoId="video"
				scanDelay={500}
				style={{ width: "100%" }}
			/>
			<p className="text-xl mt-4">{data}</p>
			<Button
				className="mt-4"
				type="primary"
				onClick={toggleCamera}
				size="large"
			>
				Switch Camera ({facingMode === "environment" ? "Rear" : "Front"})
			</Button>
		</div>
	);
};

export default QRScanner;
