import React, { useState } from 'react';
import { Sprite } from './SpriteSheet';

const WARRIORS = [
  { key: 'card_moon', title: 'Сейлор Мун', rarity: 'holo' },
  { key: 'card_mars', title: 'Сейлор Марс', rarity: 'rare' },
  { key: 'card_mercury', title: 'Сейлор Меркурий', rarity: 'common' },
  { key: 'card_jupiter', title: 'Сейлор Юпитер', rarity: 'rare' },
  { key: 'card_venus', title: 'Сейлор Венера', rarity: 'holo' },
];

export const GachaPackReveal = ({ balance = 150, onSpend, onClose }) => {
  const [step, setStep] = useState('idle');
  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);

  const handleBuyPack = () => {
    if (balance < 100) return;
    if (onSpend) onSpend();
    setStep('opening');

    setTimeout(() => {
      // Выбираем 3 случайные карточки из 5 воинов
      const picked = Array.from({ length: 3 }, () => {
        const w = WARRIORS[Math.floor(Math.random() * WARRIORS.length)];
        return { ...w, isDupe: Math.random() < 0.35 };
      });
      setCards(picked);
      setStep('revealed');
    }, 700);
  };

  const handleFlip = (index) => {
    if (!flippedIndex.includes(index)) {
      setFlippedIndex(prev => [...prev, index]);
    }
  };

  return (
    <div className="fixed inset-0 bg-indigo-950/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      
      {step !== 'revealed' && (
        <div className="flex flex-col items-center">
          <div className={`w-56 h-56 mb-6 bg-[#dcd3f8] rounded-3xl p-4 flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.4)] border-2 border-pink-300 transition-transform duration-300 ${step === 'opening' ? 'animate-bounce scale-110' : ''}`}>
            <Sprite name="card_pack" className="w-44 h-44" />
          </div>

          <button 
            onClick={handleBuyPack}
            disabled={step === 'opening' || balance < 100}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-4 rounded-full font-extrabold text-base shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {step === 'opening' ? 'Лунная призма, откройся...' : 'Открыть бустер за 100 🌟'}
          </button>
          <p className="text-pink-200 mt-3 text-xs font-semibold">Твой баланс: {balance} 🌟</p>
          <button onClick={onClose} className="mt-6 text-white/50 text-xs underline">Вернуться к миссиям</button>
        </div>
      )}

      {step === 'revealed' && (
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-white text-xl font-extrabold mb-6 text-center">
            Тапни по картам, чтобы перевернуть! ✨
          </h2>
          
          <div className="flex justify-center gap-3 w-full">
            {cards.map((card, idx) => {
              const isFlipped = flippedIndex.includes(idx);
              
              return (
                <div 
                  key={idx} 
                  onClick={() => handleFlip(idx)}
                  className="relative w-28 h-44 cursor-pointer active:scale-95 transition-all"
                >
                  {isFlipped ? (
                    <div className="w-full h-full rounded-2xl bg-[#dcd3f8] p-1.5 flex flex-col items-center justify-between border-2 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                      <Sprite name={card.key} className="w-full h-full rounded-xl" />
                      {card.isDupe && (
                        <span className=" -mt-3 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                          Дубль +20🌟
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-[#dcd3f8] p-1.5 border-2 border-indigo-300 shadow-lg flex items-center justify-center">
                      <Sprite name="card_back" className="w-full h-full rounded-xl" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {flippedIndex.length === 3 && (
            <button 
              onClick={onClose}
              className="mt-10 bg-white text-indigo-950 font-extrabold px-6 py-3 rounded-full shadow-lg active:scale-95 transition-all"
            >
              Забрать в коллекцию 💖
            </button>
          )}
        </div>
      )}
    </div>
  );
};
