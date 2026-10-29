import React from 'react';
import { ENERGY_TEXTS } from '../constants';
import { Sprite } from './SpriteSheet';

const getHeroAssetKey = (level) => {
  if (level <= 20) return 'hero_e1_puddle';
  if (level <= 40) return 'hero_e2_sleepy';
  if (level <= 60) return 'hero_e3_meh';
  if (level <= 80) return 'hero_e4_ready';
  return 'hero_e5_transform'; 
};

export const HeroEnergySlider = ({ energy = 50, setEnergy, onApply }) => {
  const assetKey = getHeroAssetKey(energy);
  const currentText = ENERGY_TEXTS[energy];

  const getEffectDescription = (lvl) => {
    if (lvl <= 30) return '💖 Режим бережности: ВСЕ награды ×1.5 за героизм через «не хочу» + откроются микро-шаги спасения!';
    if (lvl <= 70) return '🌙 Стандартный режим: спокойный темп без перегруза.';
    return '🔥 Режим Сейлор-Воина: время закрывать Босс-миссии (+бонус к фокусу)!';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto bg-white/75 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_rgba(236,72,153,0.2)] border-2 border-white mt-4">
      
      <div className="relative w-52 h-52 flex items-center justify-center bg-[#dcd3f8] rounded-3xl mb-4 overflow-hidden shadow-inner border-2 border-white">
        <Sprite name={assetKey} className="w-44 h-44 transition-all duration-300" />
      </div>

      <div className="text-center w-full flex flex-col justify-start">
        <h2 className="text-4xl font-black text-purple-950 tracking-tight mb-1">{energy}%</h2>
        <p className="text-sm font-extrabold text-pink-600 mb-3">«{currentText}»</p>
        
        {/* Плашка объяснения: ЗАЧЕМ нужна эта энергия */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-3 text-xs font-bold text-purple-900 mb-4">
          {getEffectDescription(energy)}
        </div>
      </div>

      <div className="w-full">
        <input
          type="range"
          min="10"
          max="100"
          step="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full h-3 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
        />
        <div className="flex justify-between w-full mt-2 text-xs font-bold text-purple-500">
          <span>😭 10%</span>
          <span>😐 50%</span>
          <span>✨ 100%</span>
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full mt-6 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-black py-3.5 rounded-2xl shadow-lg border-2 border-white active:scale-95 transition-all text-sm"
      >
        Активировать режим ({energy}%) ✨
      </button>
    </div>
  );
};
