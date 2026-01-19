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

### Швидкий деплой

1. Пуште код в GitHub репозиторій
2. Імпортуйте проект в Vercel
3. Додайте environment variable: `VITE_API_URL` (URL вашого серверного додатку)
4. Deploy!

### Детальна інструкція

1. **Створіть проект на Vercel:**
   - Перейдіть на https://vercel.com
   - Імпортуйте ваш GitHub репозиторій
   - Framework Preset: **Vite** (визначиться автоматично)
   - Root Directory: залиште порожнім

2. **Налаштуйте Environment Variables:**
   ```
   VITE_API_URL=https://your-server-app.vercel.app
   ```
   ⚠️ Замініть на URL вашого серверного додатку

3. **Deploy!**
   - Vercel автоматично виконає build при кожному push в main branch

## 🔧 Environment Variables

### Development

Створіть `.env.local` (скопіюйте з `.env.example`):

```bash
cp .env.example .env.local
```

Або створіть вручну:

```
VITE_API_URL=http://localhost:5001
```

### Production

Встановіть в Vercel Dashboard → Settings → Environment Variables:

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
├── vercel.json      # Vercel конфігурація
└── .env.example     # Приклад environment variables
```

## 🛠️ Технології

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Styled Components

## 📝 Примітки

- Для локальної розробки використовується Vite proxy (налаштовано в `vite.config.ts`)
- Для production встановіть `VITE_API_URL` з URL вашого серверного додатку
- SPA роутинг налаштовано через `vercel.json`
