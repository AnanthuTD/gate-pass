'use client'
import React, { useState, useRef } from 'react'
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QrReader } from 'react-qr-reader'
import { motion } from 'framer-motion'

const QRScanner = () => {
	const [data, setData] = useState('No result')
	const [facingMode, setFacingMode] = useState('environment')
	const qrRef = useRef(null)

	const handleScan = (result, error) => {
		if (result) {
			setData(result.text)
		}

		if (error) {
			console.error(error)
		}
	}

	const toggleCamera = () => {
		setFacingMode((prevFacingMode) =>
			prevFacingMode === 'environment' ? 'user' : 'environment'
		)
		qrRef.current?.reset()
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.5 } },
	}

	const iconVariants = {
		hover: { scale: 1.1, transition: { duration: 0.3 } },
	}

	return (
		<motion.div
			className="flex flex-col items-center justify-center w-full h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="w-full max-w-md">
				<QrReader
					ref={qrRef}
					onResult={handleScan}
					constraints={{ facingMode }}
					videoId="video"
					scanDelay={500}
					style={{ width: '100%' }}
				/>
				<p className="text-xl mt-4 text-center">{data}</p>
				<div className="flex items-center justify-center w-full mt-4">
					<FontAwesomeIcon
						icon={faCameraRotate}
						className="text-4xl cursor-pointer"
						onClick={toggleCamera}
						variants={iconVariants}
						whileHover="hover"
					/>
					<p className="ml-2">
						Switch Camera ({facingMode === 'environment' ? 'Rear' : 'Front'})
					</p>
				</div>
			</div>
		</motion.div>
	)
}

export default QRScanner