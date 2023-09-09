import React, { useEffect, useState } from 'react';

const LineCount: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const spanHeight = 24; // ? 24px.
  const lines = Math.round(windowHeight / spanHeight);
  // ? rounds to ensure that 'line' is always an integer.
  // !important to prevent >>RangeError: Invalid array length<<

  console.log(Array.from(Array(lines).keys()));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <div className="line-count">
      {Array.from(Array(lines).keys()).map((line) => (
        <span key={line} className="line-count__line">
          {line + 1}
        </span>
      ))}
    </div>
  );
};

export default LineCount;
