import React, { useState, useEffect } from 'react';
import { MainBoard } from './components/MainBoard';
import { HeroEnergySlider } from './components/HeroEnergySlider';
import { GachaPackReveal } from './components/GachaPackReveal';
import { DICTIONARY } from './constants';

export const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tgUser, setTgUser] = useState(null);
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg && tg.initDataUnsafe?.user) {
      tg.ready();
      tg.expand();
      const user = tg.initDataUnsafe.user;
      setTgUser(user);
      setLang(user.language_code === 'ru' ? 'ru' : 'en'); 
    } else {
      setTgUser({ id: 123456, first_name: 'Dev' });
      setLang('ru');
    }
  }, []);

  const t = DICTIONARY[lang] || DICTIONARY.en;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'tasks' && <MainBoard user={tgUser} lang={lang} />}
        
        {activeTab === 'energy' && (
          <div className="flex items-center justify-center h-full">
            <HeroEnergySlider onEnergyConfirm={(val) => console.log('Энергия:', val)} />
          </div>
        )}
        
        {activeTab === 'gacha' && (
          <GachaPackReveal balance={350} onClose={() => setActiveTab('tasks')} />
        )}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-40 pb-safe">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <span className="text-2xl">📋</span>
          <span className="text-xs font-bold">{t.tab_tasks}</span>
        </button>

        <button 
          onClick={() => setActiveTab('energy')}
          className={`flex flex-col items-center gap-1 -mt-6 ${activeTab === 'energy' ? 'text-indigo-600 scale-110' : 'text-gray-400'}`}
        >
          <div className="bg-indigo-500 p-3 rounded-full shadow-lg text-white mb-1">✨</div>
          <span className="text-xs font-bold">{t.tab_energy}</span>
        </button>

        <button 
          onClick={() => setActiveTab('gacha')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'gacha' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <span className="text-2xl">🃏</span>
          <span className="text-xs font-bold">{t.tab_gacha}</span>
        </button>
      </nav>
    </div>
  );
};
