import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Spin, Button, message } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

const QrScanner = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
});

const QRScanner = ({ data, setData }) => {
  const [facingMode, setFacingMode] = useState('rear');
  const [loading, setLoading] = useState(false);

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
    setFacingMode((prevFacingMode) => (prevFacingMode === 'rear' ? 'front' : 'rear'));
  };

  const reloadScanner = () => {
    setData(null); // Clear existing data
  };

  useEffect(() => {
    message.destroy();
  }, [data]);

  return (
    <div className="w-full max-w-md text-center">
      <Spin spinning={loading} tip="Loading camera...">
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          facingMode={"rear"}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' , transform:'scaleX(-1)'}}
          delay={500}
          onLoad={() => setLoading(false)} // Set loading to false on successful load
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
      </div>
    </div>
  );
};

export default QRScanner;
