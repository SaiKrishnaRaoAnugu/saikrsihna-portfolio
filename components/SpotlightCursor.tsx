'use client';

import useSpotlightEffect from '../hooks/use-spotlight';

const SpotlightCursor = ({ config = {}, className = '', ...rest }: any) => {
  const spotlightConfig = {
    radius: 220,
    brightness: 0.18,
    color: '#ffffff',
    smoothing: 0.12,
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
