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
      className="relative w-32 h-32 rounded-3xl bg-[#dcd3f8] p-2 shadow-inner cursor-pointer active:scale-95 transition-all select-none flex items-center justify-center overflow-hidden border-2 border-indigo-200"
    >
      <Sprite name={spriteMap[state] || 'mascot_idle'} className="w-28 h-28" />
    </div>
  );
};
