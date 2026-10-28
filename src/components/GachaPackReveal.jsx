import React, { useState } from 'react';

const mockOpenPack = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 'moon_holo', warrior: 'moon', rarity: 'holo', isDupe: false },
        { id: 'mars_rare', warrior: 'mars', rarity: 'rare', isDupe: true },
        { id: 'mercury_common', warrior: 'mercury', rarity: 'common', isDupe: false }
      ]);
    }, 800);
  });
};

export const GachaPackReveal = ({ balance = 150, onClose }) => {
  const [step, setStep] = useState('idle');
  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);

  const handleBuyPack = async () => {
    if (balance < 100) return;
    setStep('opening');
    const drawnCards = await mockOpenPack();
    setCards(drawnCards);
    setStep('revealed');
  };

  const handleFlip = (index) => {
    if (!flippedIndex.includes(index)) {
      setFlippedIndex(prev => [...prev, index]);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      
      {step !== 'revealed' && (
        <div className="flex flex-col items-center">
          <div className={`w-48 h-64 mb-8 transition-transform duration-300 ${step === 'opening' ? 'animate-pulse scale-110' : ''}`}>
            <div className="w-full h-full bg-indigo-500 rounded-xl border-4 border-indigo-300 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] relative overflow-hidden">
               <span className="text-6xl absolute z-10">🌙</span>
               <div className="text-xs text-white/50 mt-20 font-mono">card_pack.png</div>
            </div>
          </div>

          <button 
            onClick={handleBuyPack}
            disabled={step === 'opening' || balance < 100}
            className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {step === 'opening' ? 'Трансформация...' : 'Открыть за 100 🌟'}
          </button>
          <p className="text-white/60 mt-4 text-sm">Ваш баланс: {balance} 🌟</p>
        </div>
      )}

      {step === 'revealed' && (
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-white text-2xl font-bold mb-8 text-center animate-fade-in">
            Тапни, чтобы открыть!
          </h2>
          
          <div className="flex justify-center gap-3 w-full perspective-1000">
            {cards.map((card, idx) => {
              const isFlipped = flippedIndex.includes(idx);
              
              return (
                <div 
                  key={idx} 
                  onClick={() => handleFlip(idx)}
                  className={`relative w-28 h-40 cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : 'hover:-translate-y-2'}`}
                >
                  <div className={`absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center backface-hidden bg-gray-100 border-2 ${card.rarity === 'holo' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' : card.rarity === 'rare' ? 'border-purple-400' : 'border-gray-300'}`}
                       style={{ transform: 'rotateY(180deg)' }}>
                    <span className="text-xs font-mono text-gray-500 p-2 text-center">
                      card_{card.warrior}_{card.rarity}.png
                    </span>
                    {card.isDupe && (
                      <span className="absolute -bottom-3 bg-white text-xs px-2 py-1 rounded-full shadow-sm text-gray-800 border border-gray-100">
                        Дубль (+🌟)
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 w-full h-full bg-indigo-600 rounded-xl border-2 border-indigo-400 flex items-center justify-center backface-hidden shadow-lg">
                    <span className="text-4xl text-indigo-300 opacity-50">🌙</span>
                  </div>
                </div>
              );
            })}
          </div>

          {flippedIndex.length === 3 && (
            <button 
              onClick={onClose}
              className="mt-12 text-white/80 underline decoration-white/30 hover:text-white transition-colors"
            >
              Забрать в коллекцию
            </button>
          )}
        </div>
      )}
    </div>
  );
};
