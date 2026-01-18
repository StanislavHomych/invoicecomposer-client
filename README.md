# Invoice Composer - Client

Frontend додаток для створення інвойсів.

## 🚀 Швидкий старт

### Встановлення

```bash
npm install
```

### Розробка

```bash
npm run dev
```

Додаток буде доступний на `http://localhost:5173`

### Білд

```bash
npm run build
```

## 📦 Деплой на Vercel

Детальні інструкції дивіться в [DEPLOYMENT_STEPS.md](../DEPLOYMENT_STEPS.md) або [CLIENT_DEPLOY.md](../CLIENT_DEPLOY.md)

### Швидкий деплой

1. Пуште код в GitHub репозиторій
2. Імпортуйте проект в Vercel
3. Додайте environment variable: `VITE_API_URL` (URL вашого серверного додатку)
4. Deploy!

## 🔧 Environment Variables

### Development

Створіть `.env.local`:

```
VITE_API_URL=http://localhost:5001
```

### Production

Встановіть в Vercel Dashboard:

```
VITE_API_URL=https://your-server-app.vercel.app
```

## 📁 Структура проекту

```
client/
├── src/
│   ├── app/          # Redux store, API client, hooks
│   ├── components/   # React компоненти
│   ├── features/    # Redux slices
│   ├── pages/       # Сторінки додатку
│   ├── styles/      # Глобальні стилі
│   └── utils/       # Утиліти
├── public/          # Статичні файли
└── vercel.json      # Vercel конфігурація
```

## 🛠️ Технології

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Styled Components
