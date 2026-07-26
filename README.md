# Trader's Coin 🪙

**Author: ALIAKSANDR LEMESHAU (LANEX)** · © 2026

Telegram Mini App для трейдера в момент неопределённости: золотая 3D-монета «BUY 🐂 / SELL 🐻» на фоне живого свечного графика биткоина. Тап — монета подбрасывается, и судьба решает за тебя.

**Live:** https://lanexxxx1955-creator.github.io/

## Фичи

- Реалистичная золотая монета с гравюрным рельефом, рифлёным гуртом и бегущим бликом
- Анимированный свечной график BTC на canvas
- Рандомный результат 50/50, счётчики BUY/SELL, история бросков
- Telegram WebApp API: fullscreen, тема, тактильный отклик (haptics)
- Монетизация: реферальная CTA-карточка WhiteBird (прозрачно подписана в интерфейсе)

## Структура

- `main` — опубликованный standalone-билд (`index.html`), раздаётся через GitHub Pages
- `dev` — полный React + TypeScript + Vite исходник для разработки

## Разработка (ветка dev)

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # → dist/
```
