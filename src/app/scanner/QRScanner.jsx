'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Spin, Button, message, Select } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const QrScanner = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
});

const { Option } = Select;

const QRScanner = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleScan = (result) => {
    console.log(result);
    if (result) {
      setData(result.text);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
    message.error('Failed to access the camera. Please allow camera access and reload the page.');
  };

  const toggleCamera = () => {
    setSelectedDevice(null); // Reset selected device when toggling camera
  };

  useEffect(() => {
    const enumerateDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error enumerating devices:', error);
      }
    };
    enumerateDevices();
  }, []);

  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  return (
    <div className="w-full max-w-md text-center">
      <Spin spinning={loading} tip="Loading camera...">
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          facingMode={selectedDevice ? { exact: selectedDevice } : 'environment'}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', transform: 'scaleX(-1)' }}
          delay={500}
          onLoad={() => setLoading(false)} // Set loading to false on successful load
          chooseDeviceId={(videoDevices, allDevices) => {
            if (videoDevices.length > 0) {
              return videoDevices[0].deviceId;
            } else if (allDevices.length > 0) {
              return allDevices[0].deviceId;
            } else {
              return null;
            }
          }}
        />
      </Spin>

      {!data && (
        <p className="text-xl mt-4">
          No QR code detected. Please scan a valid QR code.
        </p>
      )}

      <div className="flex justify-center mt-4">
        <Button
          type="primary"
          shape="round"
          icon={<CameraOutlined />}
          size="large"
          className="mr-2"
          onClick={toggleCamera}
        >
          Switch Camera
        </Button>
        <Select value={selectedDevice} onChange={handleDeviceChange} style={{ width: 200 }}>
          {devices.map((device) => (
            <Option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${devices.indexOf(device) + 1}`}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default QRScanner;
