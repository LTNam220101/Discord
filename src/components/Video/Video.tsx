import React, { useRef, useEffect } from 'react';

interface VideoProps {
  stream: MediaStream;
}

const Video: React.FC<VideoProps> = ({ stream, ...rest }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video style={{ width: '100%', maxHeight: 800 }} ref={videoRef} {...rest} />
  );
};

export default Video;
