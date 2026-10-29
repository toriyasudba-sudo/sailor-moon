import React from 'react';
import sheetUrl from '../sheet.jpg';

// Точные координаты всех элементов на листе (в процентах от 1408x768)
const SPRITES = {
  // 1. Усаги (5 уровней энергии, без нижних подписей)
  hero_e1_puddle:    { x: 2.3,  y: 2.5, w: 17.5, h: 26.5 },
  hero_e2_sleepy:    { x: 21.8, y: 2.5, w: 17.5, h: 26.5 },
  hero_e3_meh:       { x: 41.2, y: 2.5, w: 17.5, h: 26.5 },
  hero_e4_ready:     { x: 60.5, y: 2.5, w: 17.5, h: 26.5 },
  hero_e5_transform: { x: 79.8, y: 2.5, w: 18.2, h: 26.5 },

  // 2. Кошка Луна (5 стейтов тамагочи)
  mascot_idle:       { x: 3.5,  y: 35.0, w: 15.0, h: 27.5 },
  mascot_happy:      { x: 22.8, y: 35.0, w: 15.0, h: 27.5 },
  mascot_facepalm:   { x: 41.8, y: 35.0, w: 15.0, h: 27.5 },
  mascot_sigh:       { x: 61.2, y: 35.0, w: 15.0, h: 27.5 },
  mascot_sleep:      { x: 79.5, y: 36.5, w: 17.5, h: 25.5 },

  // 3. Карточки Воинов и бустер
  card_moon:         { x: 2.3,  y: 69.8, w: 7.7,  h: 22.7 },
  card_mars:         { x: 10.8, y: 69.8, w: 7.7,  h: 22.7 },
  card_mercury:      { x: 19.2, y: 69.8, w: 7.7,  h: 22.7 },
  card_jupiter:      { x: 27.6, y: 69.8, w: 7.7,  h: 22.7 },
  card_venus:        { x: 35.8, y: 69.8, w: 7.7,  h: 22.7 },
  card_back:         { x: 45.8, y: 69.8, w: 7.6,  h: 22.7 },
  card_pack:         { x: 54.4, y: 69.2, w: 14.2, h: 23.8 },
};

export const Sprite = ({ name, className = '' }) => {
  const s = SPRITES[name] || SPRITES.mascot_idle;
  
  const bgWidth = (100 / s.w) * 100;
  const bgHeight = (100 / s.h) * 100;
  const posX = (s.x / (100 - s.w)) * 100;
  const posY = (s.y / (100 - s.h)) * 100;

  return (
    <div
      className={`bg-no-repeat select-none shrink-0 ${className}`}
      style={{
        backgroundImage: `url(${sheetUrl})`,
        backgroundSize: `${bgWidth}% ${bgHeight}%`,
        backgroundPosition: `${posX}% ${posY}%`,
      }}
    />
  );
};
