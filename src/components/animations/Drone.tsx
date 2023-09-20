import React, { useState, useEffect, useRef } from 'react';
import droneFile from '../../assets/images/gif/drone.gif';
import '../../styles/animations/Drone.scss';

const Drone: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [firstMove, setFirstMove] = useState(false);
  const drone = useRef<HTMLImageElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);
  const rotationSensitivity = 1;

  useEffect(() => {
    if (firstMove) {
      if (drone.current) {
        drone.current.classList.add('drone-fade-in');
        drone.current.addEventListener('animationend', () => {
          if (drone.current) {
            drone.current.classList.remove('drone-fade-in');
            drone.current.classList.add('text-hue-rotate');
            drone.current.style.opacity = '1';
          }
        });
      }
    }
  }, [firstMove]);

  useEffect(() => {
    const handleMouseMove = (move: MouseEvent) => {
      if (!firstMove) setFirstMove(true);

      const rotation = (move.clientX - lastPosition.current.x) * rotationSensitivity;
      lastPosition.current.x = move.clientX;

      const dampingFactor = 0.1; // *damping effect for smoother rotation.
      const smoothedRotation = currentRotation.current
        + (rotation - currentRotation.current) * dampingFactor;

      currentRotation.current = smoothedRotation;

      if (drone.current) {
        const maxRotation = 160; // *max to right.
        const minRotation = -260; // *min to left.
        const limitedRotation = Math.min(
          maxRotation,
          Math.max(minRotation, smoothedRotation),
        );

        drone.current.style.transform = `rotate(${limitedRotation}deg)`;
      }

      setPosition({
        x: move.clientX,
        y: move.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position, firstMove]);

  return (
    <img
      src={droneFile}
      alt=""
      ref={drone}
      className="drone"
      style={{
        // * 180px subtracted to place the drone to the top-left of the cursor.
        top: `calc(${position.y}px - 180px)`,
        left: `calc(${position.x}px - 180px)`,
        transform: 'rotate(0deg)',
      }}
    />
  );
};

export default Drone;
