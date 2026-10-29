import React, { useState } from 'react';
import { Sprite, TarotCardSprite, TAROT_CARDS } from './SpriteSheet';

export const GachaPackReveal = ({ balance = 150, onSpend, onEarn, collectedIds = [], onCollect, onClose }) => {
  const [view, setView] = useState('pack'); // 'pack' | 'album'
  const [step, setStep] = useState('idle'); // 'idle' | 'opening' | 'revealed'
  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);

  const handleBuyPack = () => {
    if (balance < 100) return;
    if (onSpend) onSpend(100);
    setStep('opening');
    setFlippedIndex([]);

    setTimeout(() => {
      const picked = Array.from({ length: 3 }, () => {
        const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
        const isDupe = collectedIds.includes(card.id);
        return { ...card, isDupe };
      });
      setCards(picked);
      setStep('revealed');
    }, 650);
  };

  const handleFlip = (index) => {
    if (flippedIndex.includes(index)) return;
    setFlippedIndex(prev => [...prev, index]);

    const card = cards[index];
    if (card.isDupe) {
      if (onEarn) onEarn(25);
    } else {
      if (onCollect) onCollect(card.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 px-4 pb-28 text-purple-950">
      
      {/* Верхний переключатель: Открыть бустер / Альбом 32 карт */}
      <div className="w-full max-w-md flex bg-white/60 backdrop-blur-md p-1 rounded-2xl mb-5 border-2 border-white shadow-sm">
        <button
          onClick={() => setView('pack')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${view === 'pack' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow' : 'text-purple-800'}`}
        >
          ✨ Открыть Пак
        </button>
        <button
          onClick={() => setView('album')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${view === 'album' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow' : 'text-purple-800'}`}
        >
          📖 Коллекция ({collectedIds.length}/32)
        </button>
      </div>

      {/* РЕЖИМ 1: БУСТЕР */}
      {view === 'pack' && (
        <div className="w-full max-w-md flex flex-col items-center justify-center flex-1">
          {step !== 'revealed' ? (
            <div className="flex flex-col items-center bg-white/65 backdrop-blur-md p-6 rounded-3xl border-2 border-white shadow-[0_10px_35px_rgba(236,72,153,0.25)] w-full">
              <div className={`w-48 h-52 mb-5 bg-[#dcd3f8] rounded-3xl p-3 flex items-center justify-center shadow-inner border-2 border-white transition-transform duration-300 ${step === 'opening' ? 'animate-bounce scale-110' : ''}`}>
                <Sprite name="card_pack" className="w-40 h-40" />
              </div>

              <h3 className="text-lg font-black text-purple-950 mb-1">Звёздный Таро-Бустер</h3>
              <p className="text-xs font-semibold text-pink-600 mb-5 text-center">
                Внутри 3 случайные карточки из 32 артов Сейлор Мун!
              </p>

              <button 
                onClick={handleBuyPack}
                disabled={step === 'opening' || balance < 100}
                className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-black text-base shadow-lg active:scale-95 transition-all disabled:opacity-50 border-2 border-white"
              >
                {step === 'opening' ? 'Лунная призма, откройся...' : 'Открыть за 100 🌙'}
              </button>
              <p className="text-purple-700 mt-3 text-xs font-extrabold">Твой баланс: {balance} 🌙</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-purple-950 text-lg font-black mb-4 text-center bg-white/70 px-4 py-1.5 rounded-full border border-white">
                Тапни по картам, чтобы перевернуть! ✨
              </h2>
              
              <div className="grid grid-cols-3 gap-2.5 w-full">
                {cards.map((card, idx) => {
                  const isFlipped = flippedIndex.includes(idx);
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleFlip(idx)}
                      className="relative aspect-[1/1.55] w-full cursor-pointer active:scale-95 transition-all"
                    >
                      {isFlipped ? (
                        <div className="w-full h-full rounded-2xl bg-amber-50 p-1 flex flex-col items-center justify-between border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] relative overflow-hidden">
                          <TarotCardSprite col={card.col} row={card.row} className="w-full h-full rounded-xl" />
                          {card.isDupe && (
                            <span className="absolute top-1.5 right-1.5 bg-pink-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
                              +25🌙
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-[#dcd3f8] p-1.5 border-2 border-white shadow-lg flex items-center justify-center">
                          <Sprite name="card_back" className="w-full h-full rounded-xl" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {flippedIndex.length === 3 && (
                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setStep('idle')}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black px-6 py-3 rounded-2xl shadow-lg border-2 border-white active:scale-95 transition-all text-xs"
                  >
                    Открыть ещё 🌙
                  </button>
                  <button 
                    onClick={() => setView('album')}
                    className="bg-white text-purple-900 font-black px-5 py-3 rounded-2xl shadow border border-pink-200 active:scale-95 transition-all text-xs"
                  >
                    В коллекцию 📖
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* РЕЖИМ 2: АЛЬБОМ ВСЕХ 32 КАРТОЧЕК */}
      {view === 'album' && (
        <div className="w-full max-w-md grid grid-cols-3 gap-2.5">
          {TAROT_CARDS.map((card) => {
            const unlocked = collectedIds.includes(card.id);
            return (
              <div 
                key={card.id}
                className={`aspect-[1/1.55] rounded-2xl p-1 border-2 transition-all relative overflow-hidden ${unlocked ? 'bg-amber-50 border-yellow-300 shadow-md' : 'bg-white/40 border-white/60 opacity-60'}`}
              >
                {unlocked ? (
                  <TarotCardSprite col={card.col} row={card.row} className="w-full h-full rounded-xl" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                    <span className="text-2xl mb-1 opacity-50">🔒</span>
                    <span className="text-[10px] font-bold text-purple-800 leading-tight">{card.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
