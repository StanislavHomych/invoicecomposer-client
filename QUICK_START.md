# 🚀 Швидкий старт для окремого репозиторію

## ✅ Що вже налаштовано:

- ✅ `.gitignore` - ігнорує node_modules, dist, .env файли
- ✅ `.env.example` - приклад environment variables
- ✅ `vercel.json` - конфігурація для Vercel деплою
- ✅ `package.json` - всі необхідні залежності та скрипти
- ✅ `README.md` - оновлена документація
- ✅ `DEPLOY.md` - детальна інструкція для деплою
- ✅ `SETUP_REPO.md` - інструкція для налаштування Git репозиторію

## 📝 Наступні кроки:

### 1. Ініціалізуйте Git репозиторій (якщо ще не зроблено):

```bash
cd client
git init
git add .
git commit -m "Initial commit: Invoice Composer Client"
```

### 2. Створіть репозиторій на GitHub:

1. Перейдіть на https://github.com
2. Натисніть **"New repository"**
3. Введіть назву (наприклад: `invoicecomposer-client`)
4. **НЕ** додавайте README, .gitignore або license
5. Натисніть **"Create repository"**

### 3. Підключіть до GitHub:

```bash
# Замініть YOUR_USERNAME та REPO_NAME на ваші значення
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Або через SSH
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Перевірте
git remote -v
```

### 4. Запуште код:

```bash
git branch -M main
git push -u origin main
```

### 5. Задеплойте на Vercel:

Детальні інструкції дивіться в [DEPLOY.md](./DEPLOY.md)

**Коротко:**
1. Перейдіть на https://vercel.com
2. Імпортуйте ваш GitHub репозиторій
3. Додайте environment variable: `VITE_API_URL=https://your-server-app.vercel.app`
4. Deploy!

## 🔧 Environment Variables

### Для локальної розробки:

Створіть `.env.local`:

```bash
cp .env.example .env.local
```

Або вручну:

```
VITE_API_URL=http://localhost:5001
```

### Для production (Vercel):

Встановіть в Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-server-app.vercel.app
```

## 📚 Додаткова документація

- [README.md](./README.md) - основна документація
- [DEPLOY.md](./DEPLOY.md) - детальна інструкція для деплою
- [SETUP_REPO.md](./SETUP_REPO.md) - налаштування Git репозиторію

## ✅ Готово!

Ваш клієнт готовий до окремого репозиторію та деплою!
