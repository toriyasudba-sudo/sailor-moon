import React, { useState } from 'react';
import { ICONS } from '../constants';

// Встроенная векторная Луна + поддержка твоего спрайт-листа
const LunaAvatar = ({ state, onPet }) => {
  // Позиции на твоем общем листе (если положишь его как /public/assets/sheet.jpg)
  const spritePos = {
    idle: '10% 38%',
    happy: '30% 38%',
    facepalm: '50% 38%',
    sigh: '70% 38%',
    sleep: '90% 38%'
  };

  return (
    <div 
      onClick={onPet}
      className="relative w-36 h-36 rounded-full bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 p-1 shadow-[0_0_25px_rgba(99,102,241,0.35)] cursor-pointer active:scale-95 transition-all select-none flex items-center justify-center overflow-hidden border-2 border-indigo-300/40"
      title="Погладить Луну"
    >
      {/* Звездная пыль на фоне */}
      <span className="absolute top-3 left-5 text-[10px] text-yellow-200 opacity-60 animate-pulse">✦</span>
      <span className="absolute bottom-5 right-4 text-xs text-pink-200 opacity-60 animate-pulse">★</span>

      {/* Векторная черная кошка Луна с полумесяцем */}
      <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md">
        {/* Ушки */}
        <polygon points="28,48 18,15 48,35" fill="#1e1b2e" />
        <polygon points="29,44 22,22 43,36" fill="#f472b6" opacity="0.6" />
        <polygon points="92,48 102,15 72,35" fill="#1e1b2e" />
        <polygon points="91,44 98,22 77,36" fill="#f472b6" opacity="0.6" />
        
        {/* Голова */}
        <circle cx="60" cy="64" r="34" fill="#1e1b2e" />
        
        {/* Золотой полумесяц во лбу */}
        <path d="M55,39 A7,7 0 1,0 65,39 A5.5,5.5 0 1,1 55,39 Z" fill="#facc15" />

        {/* Глаза в зависимости от стейта */}
        {state === 'happy' ? (
          <>
            <path d="M40,62 Q46,53 52,62" stroke="#facc15" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M68,62 Q74,53 80,62" stroke="#facc15" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </>
        ) : state === 'sigh' || state === 'facepalm' ? (
          <>
            <line x1="38" y1="60" x2="52" y2="62" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <line x1="82" y1="60" x2="68" y2="62" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="46" cy="62" rx="5.5" ry="7" fill="#dc2626" />
            <circle cx="44" cy="59" r="2" fill="#ffffff" />
            <ellipse cx="74" cy="62" rx="5.5" ry="7" fill="#dc2626" />
            <circle cx="72" cy="59" r="2" fill="#ffffff" />
          </>
        )}

        {/* Носик и рот */}
        <polygon points="58,71 62,71 60,74" fill="#f472b6" />
        {state === 'happy' ? (
          <path d="M53,75 Q60,83 67,75" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M55,77 Q60,74 65,77" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Усики */}
        <line x1="16" y1="64" x2="32" y2="67" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="72" x2="32" y2="71" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="104" y1="64" x2="88" y2="67" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="104" y1="72" x2="88" y2="71" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Бейдж эмоции */}
      <span className="absolute bottom-1 right-3 text-lg">
        {state === 'happy' ? '💖' : state === 'facepalm' ? '🤦‍♀️' : state === 'sigh' ? '😮‍💨' : '🌙'}
      </span>
    </div>
  );
};

export const MainBoard = ({ seeds = 120, setSeeds }) => {
  // Стейты Тамагочи Луны
  const [mascotState, setMascotState] = useState('idle');
  const [mascotMessage, setMascotMessage] = useState('Подъём, воин! Впиши миссию или покорми меня печенькой 🌙');
  const [hunger, setHunger] = useState(70); // Сытость Луны
  const [mood, setMood] = useState(85);     // Настроение Луны
  const [streak, setStreak] = useState(3);  // Серия дней

  // Вкладки доски: 'today' (Миссии на ночь) или 'backlog' (Лунная свалка)
  const [boardTab, setBoardTab] = useState('today');

  // Поля для создания новой задачи
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCategory, setNewCategory] = useState('me');

  // Список задач
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Заварить вкусный кофе', priority: 'low', category: 'me', status: 'today' },
    { id: 2, title: 'Погладить и покормить Луну', priority: 'medium', category: 'home', status: 'today' },
    { id: 3, title: 'Разобрать идеи в голове', priority: 'boss', category: 'work', status: 'backlog' }
  ]);

  // 1. Добавление задачи (Brain Dump)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      category: newCategory,
      status: boardTab // падает туда, где сейчас открыто
    };

    setTasks(prev => [created, ...prev]);
    setNewTitle('');
    setMascotState('happy');
    setMascotMessage(
      boardTab === 'backlog' 
        ? 'Спрятала в Лунную свалку! Разберем, когда будут силы ✨' 
        : 'Новая миссия принята! Во имя Луны!'
    );
  };

  // 2. Выполнение задачи
  const handleCompleteTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    const reward = task.priority === 'boss' ? 40 : task.priority === 'high' ? 20 : task.priority === 'medium' ? 10 : 5;
    
    if (setSeeds) setSeeds(prev => prev + reward);
    setHunger(prev => Math.min(100, prev + 10));
    setMood(prev => Math.min(100, prev + 15));

    setMascotState('happy');
    setMascotMessage(`Вот это другое дело! +${reward} 🌟 семян, не трать всё на печеньки.`);
  };

  // 3. Кормление Луны (Тамагочи)
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

  // 4. Погладить Луну
  const handlePetLuna = () => {
    setMood(prev => Math.min(100, prev + 5));
    setMascotState('happy');
    setMascotMessage('Мур-мяу! Я в тебя верю, даже если ты сегодня лужа слёз 🌙');
  };

  // 5. Кнопка СДВГ-спасения «Усаги устала»
  const handleUsagiTired = () => {
    const todayTasks = tasks.filter(t => t.status === 'today');
    if (todayTasks.length <= 1) {
      setMascotState('sigh');
      setMascotMessage('Тут и так почти пусто! Сделай один микро-шаг и иди отдыхать.');
      return;
    }
    // Оставляем только 1 самую легкую задачу, остальное в свалу
    const firstId = todayTasks[0].id;
    setTasks(prev => prev.map(t => (t.status === 'today' && t.id !== firstId) ? { ...t, status: 'backlog' } : t));
    setMascotState('sigh');
    setMascotMessage('Лунная призма переносит дедлайны! Оставила тебе ровно 1 задачу. Не геройствуй 💖');
  };

  const visibleTasks = tasks.filter(t => t.status === boardTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-pink-50/30 to-white flex flex-col items-center pt-4 px-4 font-sans text-gray-900 pb-28">
      
      {/* Верхний статус-бар экономики */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 bg-white/80 backdrop-blur px-4 py-2.5 rounded-2xl shadow-sm border border-pink-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <span className="text-xs font-bold text-gray-600">Серия: {streak} дн.</span>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          <span className="text-sm">🌟</span>
          <span className="text-sm font-extrabold text-indigo-900">{seeds}</span>
        </div>
      </div>

      {/* 1. ТАМАГОЧИ-КОМПАНЬОН ЛУНА */}
      <div className="w-full max-w-md bg-white rounded-3xl p-4 shadow-sm border border-pink-100/80 mb-5 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full">
          <LunaAvatar state={mascotState} onPet={handlePetLuna} />

          {/* Параметры Тамагочи */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">Хранительница Луна</span>
              <span className="text-[10px] text-gray-400">тапни на кошку</span>
            </div>

            {/* Шкала сытости */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-0.5">
                <span>🍪 Сытость</span>
                <span>{hunger}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300" style={{ width: `${hunger}%` }} />
              </div>
            </div>

            {/* Шкала настроения */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-0.5">
                <span>💖 Вайб</span>
                <span>{mood}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300" style={{ width: `${mood}%` }} />
              </div>
            </div>

            {/* Кнопки взаимодействия с тамагочи */}
            <div className="flex gap-2 mt-1">
              <button 
                onClick={handleFeedLuna}
                className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold py-1.5 px-2 rounded-xl border border-pink-200 active:scale-95 transition-all"
              >
                🍪 Покормить (15 🌟)
              </button>
              <button 
                onClick={handleUsagiTired}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-1.5 px-2.5 rounded-xl border border-indigo-200 active:scale-95 transition-all"
                title="Оставить только 1 задачу на сегодня"
              >
                😭 Я устала
              </button>
            </div>
          </div>
        </div>

        {/* Реплика Луны */}
        <div className="w-full mt-3 bg-indigo-50/60 px-4 py-2.5 rounded-2xl border border-indigo-100 text-xs font-medium text-indigo-950 text-center">
          «{mascotMessage}»
        </div>
      </div>

      {/* 2. ФОРМА ВВОДА ЗАДАЧ (Чтоб сразу было где писать!) */}
      <form onSubmit={handleAddTask} className="w-full max-w-md bg-white p-3.5 rounded-3xl shadow-sm border border-gray-100 mb-5">
        <div className="flex gap-2 mb-2.5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={boardTab === 'today' ? "Впиши миссию на сегодня..." : "Скинь мысль в Лунную свалку..."}
            className="flex-1 bg-gray-50 text-sm px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-2xl text-sm shadow-md active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        {/* Выбор приоритета и категории */}
        <div className="flex justify-between items-center text-xs px-1">
          <div className="flex gap-1">
            {['low', 'medium', 'high', 'boss'].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setNewPriority(p)}
                className={`px-2 py-1 rounded-lg border transition-all ${newPriority === p ? 'bg-indigo-100 border-indigo-400 scale-105' : 'bg-gray-50 border-transparent opacity-60'}`}
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
                className={`px-2 py-1 rounded-lg border transition-all ${newCategory === c ? 'bg-pink-100 border-pink-400 scale-105' : 'bg-gray-50 border-transparent opacity-60'}`}
              >
                {ICONS[c]}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* 3. ПЕРЕКЛЮЧАТЕЛЬ: МИССИИ ДНЯ / ЛУННАЯ СВАЛКА */}
      <div className="w-full max-w-md flex bg-gray-100 p-1 rounded-2xl mb-4">
        <button
          onClick={() => setBoardTab('today')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${boardTab === 'today' ? 'bg-white text-indigo-900 shadow-sm' : 'text-gray-500'}`}
        >
          ⚡ Миссии на ночь ({tasks.filter(t => t.status === 'today').length})
        </button>
        <button
          onClick={() => setBoardTab('backlog')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${boardTab === 'backlog' ? 'bg-white text-indigo-900 shadow-sm' : 'text-gray-500'}`}
        >
          🌙 Спит под луной ({tasks.filter(t => t.status === 'backlog').length})
        </button>
      </div>

      {/* 4. СПИСОК ЗАДАЧ */}
      <div className="w-full max-w-md flex flex-col gap-2.5">
        {visibleTasks.length === 0 ? (
          <div className="text-center bg-white/60 rounded-3xl py-10 px-4 border border-dashed border-gray-200">
            <div className="text-3xl mb-2">✨🌙✨</div>
            <div className="text-sm font-bold text-gray-600">Чисто. Даже я удивлена!</div>
            <div className="text-xs text-gray-400 mt-1">Впиши новую миссию сверху или иди спать героиней.</div>
          </div>
        ) : (
          visibleTasks.map(task => (
            <div
              key={task.id}
              className="bg-white w-full flex items-center justify-between p-3.5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all"
            >
              <div className="flex items-center gap-3 text-left flex-1">
                <span className="text-lg bg-gray-50 p-2 rounded-xl">{ICONS[task.category]}</span>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{task.title}</div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                    <span>Приоритет: {ICONS[task.priority]}</span>
                    {boardTab === 'backlog' && (
                      <button 
                        onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'today' } : t))}
                        className="text-indigo-500 underline font-semibold"
                      >
                        Взять на сегодня →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCompleteTask(task)}
                className="w-8 h-8 rounded-full bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 flex items-center justify-center font-bold text-sm active:scale-90 transition-all"
                title="Выполнить во имя Луны!"
              >
                ✓
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

