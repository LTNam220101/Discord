import React, { useRef, useEffect } from 'react';
// import { VideoProps } from './VideoInterface';
import { StreamOptions } from 'stream';
import { VideoProps } from './VideoInterface';


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
