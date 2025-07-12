import React, { useEffect, useState } from "react";
import "./AnimatedGrid.css";

const GRID_WIDTH = 10;   // columns
const GRID_HEIGHT = 20;  // rows
const BLOCK_COUNT = 8;

const getRandomPositions = () => {
  const positions = new Set();
  while (positions.size < BLOCK_COUNT) {
    const x = Math.floor(Math.random() * GRID_WIDTH);
    const y = Math.floor(Math.random() * GRID_HEIGHT);
    positions.add(`${x}-${y}`);
  }
  return positions;
};

export default function AnimatedGrid() {
  const [activeBlocks, setActiveBlocks] = useState(getRandomPositions());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBlocks(getRandomPositions());
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const cells = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const key = `${x}-${y}`;
      const isActive = activeBlocks.has(key);

      cells.push(
        <div key={key} className="grid-cell">
          {isActive && <div className="colored-block" />}
        </div>
      );
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="grid-wrapper">
        {cells}
      </div>
    </div>
  );
}
