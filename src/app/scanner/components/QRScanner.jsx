'use client'
import { useState, useEffect } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import {
    SwapOutlined
} from '@ant-design/icons';

const { Option } = Select;

const App = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [showSelect, setShowSelect] = useState(false);
    const [flipVideo, setFlipVideo] = useState(false); // Initially don't flip the video for the environment camera

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const filteredCameras = devices.filter((device) => device.kind === 'videoinput');
                setCameras(filteredCameras);
                setShowSelect(filteredCameras.length > 2);
                let preferredCamera = filteredCameras.find((camera) => camera.label.toLowerCase().includes('environment'));
                if (!preferredCamera) {
                    preferredCamera = filteredCameras.find((camera) => camera.label.toLowerCase().includes('rear'));
                }
                // setSelectedCamera(preferredCamera ? preferredCamera.deviceId : filteredCameras[0]?.deviceId);
            } catch (error) {
                console.error('Error fetching cameras:', error);
            }
        };

        fetchCameras();
    }, []);

    const handleCameraChange = (value) => {
        setSelectedCamera(value);
        // Check if the selected camera is user-facing, if so, enable video flipping
        const selectedCameraObj = cameras.find((camera) => camera.deviceId === value);
        if (selectedCameraObj && selectedCameraObj.label.toLowerCase().includes('user')) {
            setFlipVideo(true);
        } else {
            setFlipVideo(false);
        }
    };

    const handleSwitchCamera = () => {
        const currentIndex = cameras.findIndex((camera) => camera.deviceId === selectedCamera);
        const nextIndex = (currentIndex + 1) % cameras.length;
        setSelectedCamera(cameras[nextIndex].deviceId);
        // Check if the next camera is user-facing, if so, enable video flipping
        if (cameras[nextIndex].label.toLowerCase().includes('user')) {
            setFlipVideo(true);
        } else {
            setFlipVideo(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <QrScanner
                constraints={selectedCamera ? { deviceId: { exact: selectedCamera } } : { facingMode: 'environment' }}
            onDecode={(result) => console.log(result)}
            onError={(error) => console.log(error?.message)}
            className="border-2 border-gray-300 rounded-lg mr-4"
            style={{ maxWidth: '400px', transform: flipVideo ? 'scaleX(-1)' : 'none' }} // Apply flip only if flipVideo is true
            videoStyle={{ transform: flipVideo ? 'scaleX(-1)' : 'none' }} // Apply flip only if flipVideo is true
            />
            <div className="flex flex-col">
                {showSelect && (
                    <Select
                        value={selectedCamera}
                        onChange={handleCameraChange}
                        className="mb-4"
                        style={{ minWidth: '200px' }}
                    >
                        {cameras.map((camera) => (
                            <Option key={camera.deviceId} value={camera.deviceId}>
                                {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                            </Option>
                        ))}
                    </Select>
                )}
                {cameras.length > 1 && (
                    <FontAwesomeIcon icon={faCameraRotate} onClick={handleSwitchCamera} className="cursor-pointer" />
                )}
                <SwapOutlined />
            </div>
        </div>
    );
};

export default App;
