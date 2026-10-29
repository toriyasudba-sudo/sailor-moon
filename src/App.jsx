import React, { useState, useEffect } from 'react';
import { MainBoard } from './components/MainBoard';
import { HeroEnergySlider } from './components/HeroEnergySlider';
import { GachaPackReveal } from './components/GachaPackReveal';
import { DICTIONARY } from './constants';

export const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tgUser, setTgUser] = useState(null);
  const [lang, setLang] = useState('ru');
  const [seeds, setSeeds] = useState(150); // Общий баланс звездных семян

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

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'tasks' && (
          <MainBoard user={tgUser} lang={lang} seeds={seeds} setSeeds={setSeeds} />
        )}
        
        {activeTab === 'energy' && (
          <div className="flex items-center justify-center min-h-full px-4">
            <HeroEnergySlider onEnergyConfirm={(val) => console.log('Энергия:', val)} />
          </div>
        )}
        
        {activeTab === 'gacha' && (
          <GachaPackReveal 
            balance={seeds} 
            onSpend={() => setSeeds(prev => Math.max(0, prev - 100))}
            onClose={() => setActiveTab('tasks')} 
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur border-t border-pink-100 px-8 py-2.5 flex justify-between items-center z-40 pb-safe shadow-lg">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'tasks' ? 'text-indigo-600 scale-105' : 'text-gray-400'}`}
        >
          <span className="text-xl">🌙</span>
          <span className="text-[11px] font-bold">{t.tab_tasks}</span>
        </button>

        <button 
          onClick={() => setActiveTab('energy')}
          className={`flex flex-col items-center gap-0.5 -mt-5 ${activeTab === 'energy' ? 'text-pink-600 scale-110' : 'text-gray-400'}`}
        >
          <div className="bg-gradient-to-tr from-indigo-600 to-pink-500 p-3 rounded-full shadow-md text-white mb-0.5 border-2 border-white">
            ✨
          </div>
          <span className="text-[11px] font-bold">{t.tab_energy}</span>
        </button>

        <button 
          onClick={() => setActiveTab('gacha')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'gacha' ? 'text-indigo-600 scale-105' : 'text-gray-400'}`}
        >
          <span className="text-xl">🃏</span>
          <span className="text-[11px] font-bold">{t.tab_gacha}</span>
        </button>
      </nav>
    </div>
  );
};
