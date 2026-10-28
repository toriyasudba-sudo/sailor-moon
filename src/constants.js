export const ENERGY_TEXTS = {
  10: 'Усаги хочет спать',
  20: 'Лужа слёз, но дышим',
  30: 'Ещё пять минуточек',
  40: 'Встала. Это уже подвиг',
  50: 'Режим «и так сойдёт»',
  60: 'Бантики на месте',
  70: 'Пахнет героизмом',
  80: 'Звёздная энергия пошла',
  90: 'Почти трансформация',
  100: 'Лунная диадема, в бой'
};

const ASSET_BASE = '/assets';

export const ASSET_MAP = {
  hero: {
    hero_e1_puddle: `${ASSET_BASE}/hero_e1_puddle.png`,
    hero_e2_sleepy: `${ASSET_BASE}/hero_e2_sleepy.png`,
    hero_e3_meh: `${ASSET_BASE}/hero_e3_meh.png`,
    hero_e4_ready: `${ASSET_BASE}/hero_e4_ready.png`,
    hero_e5_transform: `${ASSET_BASE}/hero_e5_transform.png`
  },
  mascot: {
    idle: `${ASSET_BASE}/mascot_idle.png`,
    happy: `${ASSET_BASE}/mascot_happy.png`,
    facepalm: `${ASSET_BASE}/mascot_facepalm.png`,
    sigh: `${ASSET_BASE}/mascot_sigh.png`,
    sleep: `${ASSET_BASE}/mascot_sleep.png`
  }
};

export const ICONS = {
  low: '🌙', medium: '⭐', high: '🔥', boss: '👑',
  work: '💼', home: '🏠', me: '💖', family: '👨‍👩‍👧', study: '📚', money: '💰'
};

export const DICTIONARY = {
  ru: {
    tab_tasks: 'Миссии',
    tab_energy: 'Энергия',
    tab_gacha: 'Гача'
  },
  en: {
    tab_tasks: 'Missions',
    tab_energy: 'Energy',
    tab_gacha: 'Gacha'
  }
};
