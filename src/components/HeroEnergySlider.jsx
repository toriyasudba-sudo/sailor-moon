import React, { useState, useEffect } from 'react';
import { ENERGY_TEXTS } from '../constants';
import { Sprite } from './SpriteSheet';

const getHeroAssetKey = (level) => {
  if (level <= 20) return 'hero_e1_puddle';
  if (level <= 40) return 'hero_e2_sleepy';
  if (level <= 60) return 'hero_e3_meh';
  if (level <= 80) return 'hero_e4_ready';
  return 'hero_e5_transform'; 
};

export const HeroEnergySlider = ({ onEnergyConfirm }) => {
  const [energy, setEnergy] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging && onEnergyConfirm) {
      onEnergyConfirm(energy);
    }
  }, [energy, isDragging, onEnergyConfirm]);

  const assetKey = getHeroAssetKey(energy);
  const currentText = ENERGY_TEXTS[energy];

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-pink-100 mt-6">
      
      {/* Вырезанный арт Усаги из твоего листа */}
      <div className="relative w-56 h-56 flex items-center justify-center bg-[#dcd3f8] rounded-3xl mb-6 overflow-hidden shadow-inner border-2 border-indigo-100">
        <Sprite name={assetKey} className="w-48 h-48 transition-all duration-300" />
      </div>

      <div className="text-center w-full min-h-[72px] flex flex-col justify-start">
        <h2 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-1">{energy}%</h2>
        <p className="text-sm font-semibold text-pink-600 transition-all duration-300">«{currentText}»</p>
      </div>

      <div className="w-full mt-3">
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2.5 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
        />
        
        <div className="flex justify-between w-full mt-2 text-xs font-bold text-gray-400">
          <span>😭 10%</span>
          <span>😐 50%</span>
          <span>✨ 100%</span>
        </div>
      </div>
    </div>
  );
};
