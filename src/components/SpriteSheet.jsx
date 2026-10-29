import React from 'react';
import sheetUrl from '../sheet.jpg';
import cardsUrl from '../cards.png';

const SPRITES = {
  // 1. Усаги (5 уровней энергии)
  hero_e1_puddle:    { x: 2.3,  y: 2.5, w: 17.5, h: 26.5 },
  hero_e2_sleepy:    { x: 21.8, y: 2.5, w: 17.5, h: 26.5 },
  hero_e3_meh:       { x: 41.2, y: 2.5, w: 17.5, h: 26.5 },
  hero_e4_ready:     { x: 60.5, y: 2.5, w: 17.5, h: 26.5 },
  hero_e5_transform: { x: 79.8, y: 2.5, w: 18.2, h: 26.5 },

  // 2. Настоящая милая Кошка Луна из листа!
  mascot_idle:       { x: 3.5,  y: 35.0, w: 15.0, h: 27.5 },
  mascot_happy:      { x: 22.8, y: 35.0, w: 15.0, h: 27.5 },
  mascot_facepalm:   { x: 41.8, y: 35.0, w: 15.0, h: 27.5 },
  mascot_sigh:       { x: 61.2, y: 35.0, w: 15.0, h: 27.5 },
  mascot_sleep:      { x: 79.5, y: 36.5, w: 17.5, h: 25.5 },

  // 3. Бустер и рубашка
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

// Нарезчик для твоего нового пака из 32 карт (сетка 8 колонок x 4 ряда)
const COL_X = [1.4, 13.5, 25.6, 37.7, 51.3, 63.4, 75.5, 87.6];
const ROW_Y = [2.2, 26.5, 50.8, 75.1];
const CARD_W = 11.0;
const CARD_H = 22.8;

export const TarotCardSprite = ({ col, row, className = '' }) => {
  const x = COL_X[col] ?? COL_X[0];
  const y = ROW_Y[row] ?? ROW_Y[0];

  const bgWidth = (100 / CARD_W) * 100;
  const bgHeight = (100 / CARD_H) * 100;
  const posX = (x / (100 - CARD_W)) * 100;
  const posY = (y / (100 - CARD_H)) * 100;

  return (
    <div
      className={`bg-no-repeat select-none shrink-0 ${className}`}
      style={{
        backgroundImage: `url(${cardsUrl})`,
        backgroundSize: `${bgWidth}% ${bgHeight}%`,
        backgroundPosition: `${posX}% ${posY}%`,
      }}
    />
  );
};

// Полный каталог всех 32 карточек с твоего листа
export const TAROT_CARDS = [
  // Ряд 1
  { id: 'c_0_0', col: 0, row: 0, title: 'Сейлор Мун', rarity: 'holo' },
  { id: 'c_1_0', col: 1, row: 0, title: 'Сейлор Меркурий', rarity: 'rare' },
  { id: 'c_2_0', col: 2, row: 0, title: 'Сейлор Марс', rarity: 'rare' },
  { id: 'c_3_0', col: 3, row: 0, title: 'Сейлор Юпитер', rarity: 'rare' },
  { id: 'c_4_0', col: 4, row: 0, title: 'Вместе мы сильнее', rarity: 'holo' },
  { id: 'c_5_0', col: 5, row: 0, title: 'Усаги Цукино', rarity: 'common' },
  { id: 'c_6_0', col: 6, row: 0, title: 'Мамору Чиба', rarity: 'common' },
  { id: 'c_7_0', col: 7, row: 0, title: 'Королева Серенити', rarity: 'holo' },
  // Ряд 2
  { id: 'c_0_1', col: 0, row: 1, title: 'Сейлор Венера', rarity: 'rare' },
  { id: 'c_1_1', col: 1, row: 1, title: 'Сейлор Уранус', rarity: 'rare' },
  { id: 'c_2_1', col: 2, row: 1, title: 'Сейлор Нептун', rarity: 'rare' },
  { id: 'c_3_1', col: 3, row: 1, title: 'Сейлор Плуто', rarity: 'rare' },
  { id: 'c_4_1', col: 4, row: 1, title: 'Принцесса Серенити', rarity: 'holo' },
  { id: 'c_5_1', col: 5, row: 1, title: 'Королева Берил', rarity: 'rare' },
  { id: 'c_6_1', col: 6, row: 1, title: 'Четыре Короля', rarity: 'common' },
  { id: 'c_7_1', col: 7, row: 1, title: 'Маленькая Леди', rarity: 'common' },
  // Ряд 3
  { id: 'c_0_2', col: 0, row: 2, title: 'Сейлор Сатурн', rarity: 'holo' },
  { id: 'c_1_2', col: 1, row: 2, title: 'Такседо Маск', rarity: 'rare' },
  { id: 'c_2_2', col: 2, row: 2, title: 'Чибиуса', rarity: 'common' },
  { id: 'c_3_2', col: 3, row: 2, title: 'Луна', rarity: 'rare' },
  { id: 'c_4_2', col: 4, row: 2, title: 'Сейлор Чиби Мун', rarity: 'rare' },
  { id: 'c_5_2', col: 5, row: 2, title: 'Сейлор Гвардианы', rarity: 'holo' },
  { id: 'c_6_2', col: 6, row: 2, title: 'Сейлор Старлайтс', rarity: 'rare' },
  { id: 'c_7_2', col: 7, row: 2, title: 'Пегас', rarity: 'holo' },
  // Ряд 4
  { id: 'c_0_3', col: 0, row: 3, title: 'Артемис', rarity: 'common' },
  { id: 'c_1_3', col: 1, row: 3, title: 'Сейлор Кристалл', rarity: 'holo' },
  { id: 'c_2_3', col: 2, row: 3, title: 'Серебряный Кристалл', rarity: 'holo' },
  { id: 'c_3_3', col: 3, row: 3, title: 'Лунный Жезл', rarity: 'rare' },
  { id: 'c_4_3', col: 4, row: 3, title: 'Кинмоку', rarity: 'common' },
  { id: 'c_5_3', col: 5, row: 3, title: 'Домашний Мамору', rarity: 'common' },
  { id: 'c_6_3', col: 6, row: 3, title: 'Превращение', rarity: 'holo' },
  { id: 'c_7_3', col: 7, row: 3, title: 'Лунный Свет', rarity: 'common' },
];
