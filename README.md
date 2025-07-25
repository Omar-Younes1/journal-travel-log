# Journal / Travel Log

גרסה פחות רשמית ויותר זורמת של ה‑README לפרויקט. אם צריך את הגרסה הרשמית – היא קיימת בגרסאות קודמות; כאן שמים דגש על הסבר ידידותי ומהיר למי שרוצה פשוט להריץ ולבין מה יש.

---

## 🎯 מה זה?

אפליקציית MERN קטנה שמאפשרת לפתוח משתמש, להתחבר ולכתוב רשומות יומן / מסע עם כותרת, תוכן, תאריך, מיקום ותמונת URL. כל משתמש רואה רק את הרשומות שלו.

## ✨ מה עובד כרגע

* הרשמה + התחברות (JWT)
* יצירת רשומה חדשה, רשימת רשומות (ממויין מהחדש לישן)
* צפייה, עריכה, מחיקה
* שדות אופציונליים: מיקום, תמונת URL
* מצב כהה (Dark Mode)
* סיסמאות מוצפנות (bcrypt)
* אינדקס Mongo לביצועים בסיסיים
* מבנה קוד מסודר (routes / models / middleware)

## 🧩 מבנה הפרויקט (תיקיות)

```
journal-travel-log/
  backend/
    server.js
    routes/ (auth, entries)
    models/ (User, Entry)
    middleware/ (jwtAuth)
    .env.example
  frontend/
    src/
      pages/ (...)
      components/ (NavBar, ProtectedRoute)
      context/ (AuthContext)
      services/ (api.js)
      styles/ (ui.css)
    .env.example
```

## 🗄️ מודלי הנתונים בקצרה

**User**: username (unique), passwordHash, timestamps.
**Entry**: user(ref), title, content, date(default now), location?, imageUrl?, timestamps.
אינדקס: `{ user:1, date:-1 }` כדי להביא רשומות משתמש מהר.

## 🔐 אימות ואבטחה בסיסית

* bcrypt לסיסמאות
* JWT עם זמן תפוגה
* בדיקת בעלות לפני עריכה/מחיקה של רשומה
* CORS פתוח ל־localhost בפיתוח

(לעתיד: Helmet, Rate limit, ולידציה קשיחה יותר, Reset Password.)

## 🚀 איך מריצים מקומית

### 1. שכפול

```bash
git clone https://github.com/<USER>/journal-travel-log.git
cd journal-travel-log
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # ערוך URI + JWT_SECRET
npm install
npm run dev
```

### 3. Frontend (חלון אחר)

```bash
cd ../frontend
cp .env.example .env   # בדרך כלל לא צריך לשנות
npm install
npm start
```

### 4. שימוש

פתח דפדפן: [http://localhost:3000](http://localhost:3000)  → הירשם → התחבר → הוסף רשומה.

## 🧪 בדיקה מהירה עם curl (רשות)

```bash
curl http://localhost:5000/api/health
# צריך לקבל {"status":"ok"...}
```

## ⚙️ משתני סביבה (env)

**backend/.env**

```
MONGO_URI=mongodb://localhost:27017/journal-log
JWT_SECRET=משהו_ארוך_אקראי_כאן
PORT=5000
TOKEN_EXPIRES=2h
```

**frontend/.env**

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🛠️ סקריפטים שימושיים

| מיקום    | פקודה         | מה עושה            |
| -------- | ------------- | ------------------ |
| backend  | `npm run dev` | Nodemon לשרת       |
| backend  | `npm start`   | הפעלה רגילה        |
| frontend | `npm start`   | Dev server ל-React |

## 🎨 UX / UI בקטנה

* Grid כרטיסים → מתכווץ למובייל
* מצב כהה עם CSS variables (`data-theme`)
* פוקוס מודגש בטפסים
* כפתורים פשוטים, צבע ראשי יחיד

## 🐞 בעיות שנתקלתי בהן

| בעיה                     | למה קרה                | פתרון                        |
| ------------------------ | ---------------------- | ---------------------------- |
| ERR\_CONNECTION\_REFUSED | השרת לא רץ / פורט שגוי | הפעלת backend + בדיקת health |
| Mongo ECONNREFUSED       | שירות Mongo כבוי       | הפעלת שירות / URI נכון       |
| Username taken (409)     | ניסיון לרשום פעמיים    | לבחור שם אחר                 |
| Token לא נשמר            | לא קראתי setAuthToken  | תיקון AuthContext            |


