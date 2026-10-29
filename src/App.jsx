import React, { useState, useEffect } from 'react';
import { MainBoard } from './components/MainBoard';
import { HeroEnergySlider } from './components/HeroEnergySlider';
import { GachaPackReveal } from './components/GachaPackReveal';
import { DICTIONARY } from './constants';

export const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tgUser, setTgUser] = useState(null);
  const [lang, setLang] = useState('ru');
  const [seeds, setSeeds] = useState(300);
  const [energy, setEnergy] = useState(50);
  const [collectedIds, setCollectedIds] = useState(['c_0_0', 'c_3_2']);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      tg.ready();
      tg.expand();
      const user = tg.initDataUnsafe.user;
      setTgUser(user);
      setLang(user.language_code === 'ru' ? 'ru' : 'en'); 
    } else {
      setTgUser({ id: 123456, first_name: 'Усаги' });
      setLang('ru');
    }
  }, []);

  const t = DICTIONARY[lang] || DICTIONARY.en;

  const handleCollectCard = (cardId) => {
    setCollectedIds(prev => prev.includes(cardId) ? prev : [...prev, cardId]);
  };

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #ffd6ec 0%, #e8d5ff 35%, #c9eaff 70%, #ffd6ec 100%)'
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-pink-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-10 w-64 h-64 bg-sky-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-purple-300/40 rounded-full blur-3xl" />
        <span className="absolute top-12 right-8 text-2xl opacity-40">🌙</span>
        <span className="absolute top-1/2 left-6 text-xl opacity-40">✨</span>
        <span className="absolute bottom-28 right-10 text-2xl opacity-40">💖</span>
      </div>

      <main className="flex-1 overflow-y-auto pb-20 relative z-10">
        {activeTab === 'tasks' && (
          <MainBoard 
            user={tgUser} 
            lang={lang} 
            seeds={seeds} 
            setSeeds={setSeeds} 
            energy={energy}
            onGoEnergy={() => setActiveTab('energy')}
          />
        )}
        
        {activeTab === 'energy' && (
          <div className="flex items-center justify-center min-h-full px-4">
            <HeroEnergySlider 
              energy={energy} 
              setEnergy={setEnergy} 
              onApply={() => setActiveTab('tasks')} 
            />
          </div>
        )}
        
        {activeTab === 'gacha' && (
          <GachaPackReveal 
            balance={seeds} 
            onSpend={(amt) => setSeeds(prev => Math.max(0, prev - amt))}
            onEarn={(amt) => setSeeds(prev => prev + amt)}
            collectedIds={collectedIds}
            onCollect={handleCollectCard}
            onClose={() => setActiveTab('tasks')} 
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t-2 border-white px-8 py-2.5 flex justify-between items-center z-40 pb-safe shadow-[0_-8px_25px_rgba(236,72,153,0.2)] rounded-t-3xl">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'tasks' ? 'text-pink-600 scale-110' : 'text-purple-400'}`}
        >
          <span className="text-xl">🌙</span>
          <span className="text-[11px] font-black">{t.tab_tasks}</span>
        </button>

        <button 
          onClick={() => setActiveTab('energy')}
          className={`flex flex-col items-center gap-0.5 -mt-6 transition-all ${activeTab === 'energy' ? 'text-pink-600 scale-110' : 'text-purple-400'}`}
        >
          <div className="bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-sky-400 p-3.5 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] text-white mb-0.5 border-2 border-white">
            ✨
          </div>
          <span className="text-[11px] font-black">{t.tab_energy}</span>
        </button>

        <button 
          onClick={() => setActiveTab('gacha')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'gacha' ? 'text-pink-600 scale-110' : 'text-purple-400'}`}
        >
          <span className="text-xl">🃏</span>
          <span className="text-[11px] font-black">{t.tab_gacha}</span>
        </button>
      </nav>
    </div>
  );
};
