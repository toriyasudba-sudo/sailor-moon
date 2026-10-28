import React, { useState } from 'react';
import { ASSET_MAP, ICONS } from '../constants';

export const MainBoard = () => {
  const [mascotState, setMascotState] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState('Подъём, воин. Начнём с самой маленькой миссии.');
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Заварить кофе', priority: 'low', category: 'me', status: 'todo' },
    { id: 2, title: 'Написать структуру БД', priority: 'boss', category: 'work', status: 'todo' },
    { id: 3, title: 'Оплатить интернет', priority: 'high', category: 'money', status: 'todo' }
  ]);

  const handleCompleteTask = (taskId, priority) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    
    const reward = priority === 'boss' ? 40 : priority === 'high' ? 20 : priority === 'medium' ? 10 : 5;
    setMascotState('happy');
    setMascotMessage(`Вот это другое дело! +${reward} семян. Не трать всё на печеньки.`);

    setTimeout(() => {
      setMascotState('idle');
      setMascotMessage('Ждем следующую цель...');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-4 font-sans text-gray-900 pb-20">
      <div className="w-full max-w-md flex flex-col items-center mb-8 relative">
        <div className="w-32 h-32 mb-4 bg-indigo-50 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner overflow-hidden">
           <img src={ASSET_MAP.mascot[mascotState]} alt="Mascot" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
           <span className="text-6xl hidden">{mascotState === 'happy' ? '😻' : mascotState === 'facepalm' ? '🤦‍♀️' : '🐱'}</span>
        </div>
        
        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 text-sm font-medium text-center relative max-w-[80%]">
          {mascotMessage}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-400 mb-2 uppercase tracking-wider text-center">
          Миссии на сегодня
        </h2>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 py-10">Чисто. Иди спать героиней. ✨</div>
        ) : (
          tasks.map(task => (
            <button
              key={task.id}
              onClick={() => handleCompleteTask(task.id, task.priority)}
              className="group bg-white w-full flex items-center justify-between p-4 rounded-2xl shadow-sm border border-transparent hover:border-indigo-100 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-xl bg-gray-50 p-2 rounded-xl">{ICONS[task.category]}</span>
                <span className="font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-gray-50 px-2 py-1 rounded-lg">{ICONS[task.priority]}</span>
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 flex items-center justify-center transition-colors"></div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
