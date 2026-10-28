import React, { useState, useEffect } from 'react';
import { ENERGY_TEXTS, ASSET_MAP } from '../constants';

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
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 mt-8">
      
      <div className="relative w-56 h-56 flex items-center justify-center bg-gray-50 rounded-2xl mb-8 overflow-hidden transition-colors duration-300">
        <img 
          src={ASSET_MAP.hero[assetKey]} 
          alt={currentText} 
          className="w-48 h-48 object-contain"
          onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
        />
        <div className="hidden flex-col items-center gap-2">
          <span className="text-4xl">
            {energy <= 20 ? '😭' : energy <= 40 ? '🥱' : energy <= 60 ? '😐' : energy <= 80 ? '😤' : '✨'}
          </span>
          <span className="text-xs text-gray-400 font-mono bg-gray-200 px-2 py-1 rounded">
            {assetKey}.png
          </span>
        </div>
      </div>

      <div className="text-center w-full min-h-[80px] flex flex-col justify-start">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{energy}%</h2>
        <p className="text-base font-medium text-gray-500 transition-all duration-300">{currentText}</p>
      </div>

      <div className="w-full mt-4">
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
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
        />
        
        <div className="flex justify-between w-full mt-3 text-xs font-semibold text-gray-400">
          <span>10%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
