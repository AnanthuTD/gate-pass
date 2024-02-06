'use client'
import React, { useState, useEffect } from 'react';
import jsQR from 'jsqr';

const NewQRScanner = ({ onDataFound }) => {
    const [stream, setStream] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setDevices(videoDevices);

                let deviceId = null;

                // Find the deviceId for the selected device or default to the first available video device
                if (selectedDeviceId) {
                    deviceId = selectedDeviceId;
                } else if (videoDevices.length > 0) {
                    deviceId = videoDevices[0].deviceId;
                }

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId }
                });

                setStream(stream);
            } catch (error) {
                console.error('Failed to access camera:', error);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [selectedDeviceId]);

    useEffect(() => {
        if (!stream) return;

        const video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute('playsinline', 'true');

        // Wait for metadata to load then play
        video.onloadedmetadata = () => {
            video.play();
        };

        // Append video element to the DOM
        document.getElementById('qr-video-container').innerHTML = ''; // Clear previous video
        document.getElementById('qr-video-container').appendChild(video);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const frameRate = 1000 / 30; // Adjust frame rate as needed

        const scanQRCode = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
                onDataFound(code.data);
            }
        };

        const intervalId = setInterval(scanQRCode, frameRate);
 
        return () => {
            clearInterval(intervalId);
            video.srcObject = null;
        };
    }, [stream, onDataFound]);

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    return (
        <div>
            <div>
                <label htmlFor="camera-select">Select Camera:</label>
                <select id="camera-select" className='text-black' value={selectedDeviceId || ''} onChange={handleDeviceChange}>
                    <option value="">Select Camera</option>
                    {devices.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${devices.indexOf(device) + 1}`}
                        </option>
                    ))}
                </select>
            </div>
            <div id="qr-video-container" />
        </div>
    );
};

export default NewQRScanner;

