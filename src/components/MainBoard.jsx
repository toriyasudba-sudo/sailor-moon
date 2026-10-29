import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Sprite } from './SpriteSheet';

const LunaAvatar = ({ state, onPet }) => {
  const spriteMap = {
    idle: 'mascot_idle',
    happy: 'mascot_happy',
    facepalm: 'mascot_facepalm',
    sigh: 'mascot_sigh',
    sleep: 'mascot_sleep'
  };

  return (
    <div 
      onClick={onPet}
      className="relative w-32 h-32 rounded-3xl bg-[#dcd3f8] p-1.5 shadow-[0_8px_25px_rgba(236,72,153,0.28)] cursor-pointer active:scale-95 transition-all select-none flex items-center justify-center overflow-hidden border-2 border-white"
      title="Погладить Луну"
    >
      <Sprite name={spriteMap[state] || 'mascot_idle'} className="w-28 h-28" />
      <span className="absolute top-1.5 right-2 text-xs animate-pulse">✨</span>
    </div>
  );
};

export const MainBoard = ({ seeds = 150, setSeeds }) => {
  const [mascotState, setMascotState] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState('Подъём, воин! Впиши миссию или покорми меня печенькой 🌙');
  const [hunger, setHunger] = useState(70);
  const [mood, setMood] = useState(85);
  const [streak] = useState(3);

  const [boardTab, setBoardTab] = useState('today');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCategory, setNewCategory] = useState('me');

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Заварить вкусный кофе', priority: 'low', category: 'me', status: 'today' },
    { id: 2, title: 'Погладить и покормить Луну', priority: 'medium', category: 'home', status: 'today' },
    { id: 3, title: 'Разобрать идеи в голове', priority: 'boss', category: 'work', status: 'backlog' }
  ]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      category: newCategory,
      status: boardTab
    };
    setTasks(prev => [created, ...prev]);
    setNewTitle('');
    setMascotState('happy');
    setMascotMessage(
      boardTab === 'backlog' 
        ? 'Спрятала в Лунную свалку! Разберем, когда будут силы ✨' 
        : 'Новая миссия принята! Во имя Луны! 💖'
    );
  };

  const handleCompleteTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    const reward = task.priority === 'boss' ? 40 : task.priority === 'high' ? 20 : task.priority === 'medium' ? 10 : 5;
    if (setSeeds) setSeeds(prev => prev + reward);
    setHunger(prev => Math.min(100, prev + 10));
    setMood(prev => Math.min(100, prev + 15));
    setMascotState('happy');
    setMascotMessage(`Вот это другое дело! +${reward} 🌟 семян, не трать всё на печеньки.`);
  };

  const handleFeedLuna = () => {
    if (seeds < 15) {
      setMascotState('facepalm');
      setMascotMessage('Не хватает семян на печеньку (нужно 15 🌟). Закрой хотя бы одну задачу!');
      return;
    }
    if (setSeeds) setSeeds(prev => prev - 15);
    setHunger(prev => Math.min(100, prev + 25));
    setMood(prev => Math.min(100, prev + 20));
    setMascotState('happy');
    setMascotMessage('Мррр... Вкусная лунная печенька! Силы восстановлены 💖');
  };

  const handlePetLuna = () => {
    setMood(prev => Math.min(100, prev + 5));
    setMascotState('happy');
    setMascotMessage('Мур-мяу! Я в тебя верю, даже если ты сегодня лужа слёз 🌙');
  };

  const handleUsagiTired = () => {
    const todayTasks = tasks.filter(t => t.status === 'today');
    if (todayTasks.length <= 1) {
      setMascotState('sigh');
      setMascotMessage('Тут и так почти пусто! Сделай один микро-шаг и иди отдыхать.');
      return;
    }
    const firstId = todayTasks[0].id;
    setTasks(prev => prev.map(t => (t.status === 'today' && t.id !== firstId) ? { ...t, status: 'backlog' } : t));
    setMascotState('sigh');
    setMascotMessage('Лунная призма переносит дедлайны! Оставила тебе ровно 1 задачу. Не геройствуй 💖');
  };

  const visibleTasks = tasks.filter(t => t.status === boardTab);

  return (
    <div className="min-h-screen flex flex-col items-center pt-4 px-4 font-sans text-purple-950 pb-28">
      
      {/* Верхний статус-бар */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 bg-white/65 backdrop-blur-md px-4 py-2.5 rounded-3xl shadow-[0_4px_20px_rgba(236,72,153,0.15)] border border-white/80">
        <div className="flex items-center gap-2">
          <span className="text-lg">💖</span>
          <span className="text-xs font-extrabold text-pink-700">Серия: {streak} дн.</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-pink-100 to-purple-100 px-3.5 py-1 rounded-full border border-white shadow-inner">
          <span className="text-sm">🌙</span>
          <span className="text-sm font-black text-purple-900">{seeds}</span>
        </div>
      </div>

      {/* 1. ТАМАГОЧИ ЛУНА */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-[0_10px_30px_rgba(216,180,254,0.35)] border-2 border-white mb-5 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full">
          <LunaAvatar state={mascotState} onPet={handlePetLuna} />

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-purple-900 uppercase tracking-wider">✨ Луна</span>
              <span className="text-[10px] font-bold text-pink-500">погладь меня</span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-purple-700 mb-0.5">
                <span>🍪 Сытость</span>
                <span>{hunger}%</span>
              </div>
              <div className="w-full h-2.5 bg-pink-100/80 rounded-full overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 transition-all duration-300" style={{ width: `${hunger}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold text-purple-700 mb-0.5">
                <span>💎 Магия</span>
                <span>{mood}%</span>
              </div>
              <div className="w-full h-2.5 bg-purple-100/80 rounded-full overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-300 transition-all duration-300" style={{ width: `${mood}%` }} />
              </div>
            </div>

            <div className="flex gap-1.5 mt-1">
              <button 
                onClick={handleFeedLuna}
                className="flex-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-[11px] font-extrabold py-1.5 px-2 rounded-2xl shadow-sm active:scale-95 transition-all"
              >
                🍪 Кормить (15)
              </button>
              <button 
                onClick={handleUsagiTired}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-[11px] font-extrabold py-1.5 px-2.5 rounded-2xl border border-white active:scale-95 transition-all"
              >
                😭 Устала
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mt-3 bg-gradient-to-r from-pink-50/90 via-purple-50/90 to-indigo-50/90 px-4 py-2.5 rounded-2xl border border-white text-xs font-bold text-purple-900 text-center shadow-inner">
          «{mascotMessage}»
        </div>
      </div>

      {/* 2. ПОЛЕ ВВОДА МИССИЙ */}
      <form onSubmit={handleAddTask} className="w-full max-w-md bg-white/70 backdrop-blur-md p-3.5 rounded-3xl shadow-[0_8px_25px_rgba(236,72,153,0.15)] border-2 border-white mb-5">
        <div className="flex gap-2 mb-2.5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={boardTab === 'today' ? "✨ Впиши миссию во имя Луны..." : "🌙 Скинь мысль в Лунную свалку..."}
            className="flex-1 bg-white/90 text-sm font-medium text-purple-950 placeholder-purple-400 px-4 py-2.5 rounded-2xl border border-pink-200 focus:outline-none focus:border-pink-400"
          />
          <button 
            type="submit"
            className="bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-500 text-white font-black px-4 py-2.5 rounded-2xl text-base shadow-md active:scale-95 transition-all border border-white"
          >
            ＋
          </button>
        </div>

        <div className="flex justify-between items-center text-xs px-1">
          <div className="flex gap-1">
            {['low', 'medium', 'high', 'boss'].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setNewPriority(p)}
                className={`px-2 py-1 rounded-xl border transition-all ${newPriority === p ? 'bg-pink-100 border-pink-400 scale-110 shadow-sm' : 'bg-white/50 border-transparent opacity-60'}`}
              >
                {ICONS[p]}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            {['work', 'home', 'me', 'study', 'money'].map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setNewCategory(c)}
                className={`px-2 py-1 rounded-xl border transition-all ${newCategory === c ? 'bg-purple-100 border-purple-400 scale-110 shadow-sm' : 'bg-white/50 border-transparent opacity-60'}`}
              >
                {ICONS[c]}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* 3. ВКЛАДКИ */}
      <div className="w-full max-w-md flex bg-white/50 backdrop-blur p-1 rounded-2xl mb-4 border border-white">
        <button
          onClick={() => setBoardTab('today')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${boardTab === 'today' ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm' : 'text-purple-700'}`}
        >
          ⚡ Миссии на ночь ({tasks.filter(t => t.status === 'today').length})
        </button>
        <button
          onClick={() => setBoardTab('backlog')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${boardTab === 'backlog' ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm' : 'text-purple-700'}`}
        >
          🌙 Спит под луной ({tasks.filter(t => t.status === 'backlog').length})
        </button>
      </div>

      {/* 4. СПИСОК МИССИЙ */}
      <div className="w-full max-w-md flex flex-col gap-2.5">
        {visibleTasks.length === 0 ? (
          <div className="text-center bg-white/60 backdrop-blur rounded-3xl py-10 px-4 border-2 border-dashed border-pink-200">
            <div className="text-3xl mb-2">💖🌙✨</div>
            <div className="text-sm font-extrabold text-purple-900">Чисто! Даже я удивлена!</div>
            <div className="text-xs font-medium text-pink-600 mt-1">Впиши новую миссию или иди спать героиней.</div>
          </div>
        ) : (
          visibleTasks.map(task => (
            <div
              key={task.id}
              className="bg-white/75 backdrop-blur-md w-full flex items-center justify-between p-3.5 rounded-2xl shadow-sm border-2 border-white hover:border-pink-300 transition-all"
            >
              <div className="flex items-center gap-3 text-left flex-1">
                <span className="text-lg bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-2xl border border-white shadow-inner">
                  {ICONS[task.category]}
                </span>
                <div>
                  <div className="font-bold text-sm text-purple-950">{task.title}</div>
                  <div className="text-[11px] font-semibold text-purple-500 flex items-center gap-2 mt-0.5">
                    <span>Сила: {ICONS[task.priority]}</span>
                    {boardTab === 'backlog' && (
                      <button 
                        onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'today' } : t))}
                        className="text-pink-600 underline font-bold"
                      >
                        Взять на сегодня →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCompleteTask(task)}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 text-white border-2 border-white shadow-md flex items-center justify-center font-black text-sm active:scale-90 transition-all"
                title="Во имя Луны!"
              >
                ★
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
