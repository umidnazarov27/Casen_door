export const concepts = [
  {
    id: 'signature', number: '01', name: 'Signature', nameRu: 'Светлая витрина',
    description: 'Самый близкий к текущему сайту: белый фон, чёрные акценты и привычная витрина с настройками справа.',
    detail: 'Классическая компоновка · белый и чёрный · акцент на простоте',
    headline: 'Your kitchen.\nYour way.', intro: 'A space for everyday life, made personal. Choose your layout and the details that feel like home.',
  },
  {
    id: 'architectural', number: '02', name: 'Architectural', nameRu: 'Архитектурная подача',
    description: 'Крупная фотография во всю ширину, тёплая палитра и горизонтальный блок выбора под изображением.',
    detail: 'Панорамная фотография · тёплые оттенки · горизонтальные карточки',
    headline: 'Space for\nthe everyday.', intro: 'Good design begins with the way you live. Explore a kitchen with room for every part of your day.',
  },
  {
    id: 'studio', number: '03', name: 'Studio', nameRu: 'Тёмная студия',
    description: 'Контрастный вариант: тёмная рамка вокруг большого изображения и компактная панель настройки.',
    detail: 'Тёмный графит · большой визуал · компактный интерфейс',
    headline: 'Designed around\nyou.', intro: 'Considered layouts. Thoughtful details. A kitchen that brings your space together.',
  },
] as const;
export type Concept = typeof concepts[number];
