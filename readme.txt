# Geo Shape Boom

A small PixiJS-based game with procedural shape spawning, physics system, and reactive UI store.

---

## Requirements

Before running this project, make sure you have installed:

- **Node.js** >= 18 (recommended 20 LTS)
- **npm** >= 9
- Modern browser (Chrome / Firefox / Edge latest)

---

## Tech Stack

- Vite (^8)
- TypeScript (~6)
- PixiJS (^8.17.1)
- EventEmitter3 (^5)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/geo_shape_boom.git
cd geo_shape_boom

## ПОЯСНЕННЯ:

Створив 3 сцени: Game, Home i Loader (при 100% стоїть 1сек затримка). Останню додав НАВМИСНО, хоча тут вона не потрібна - просто хотів показати таку можливість можу реалізувати.
Окрім спрайтів, бекграундів і т.д., завантажив ще й шрифти (для титулки і для регулярного викор.)
Для переходу між сценами створив менеджер сцен.
Текстури вантажаться у кеш і знищуються під кожну сцену.
Кнопки створені частково за доп спрайтів, частково за доп тексту.
Всі фігури - це форми із одного спрайт ассета. Зробив НАВМИСНО аби реалізувати pooling.
Можна було робити простіше - через Graphics, але я НАВМИСНО зробив це аби показати, що я можу ну і Graphics - важча
Також я створив Stores, один з яких лишив не використаним, (варто було б видалити?) оскільки він для загальних штук. Тут вирішив це вже не чіпати. Але лишив.
Створено Shapes store, Phisics store і Game store (об"єднаноо у Root store)
Також використовую єдиний eventbus для подій (дод ліба встановлена).
Поміняв іконку гри в браузрі.
Респонсів не додавав, але додав певний ресайз функціонал.