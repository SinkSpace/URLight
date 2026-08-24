// импорты
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

const pool = require('./db.js');

// инициализация сервера
app.use(express.json());
app.use(express.static('public'));

// отправка веб-страниц

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'join.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// пост-запрос

app.post('/api/check', (req, res) => {
    const { email, login } = req.body;
    try {
        const check = pool.query("SELECT COUNT(*) FROM users WHERE email = ? OR login = ?", [email, login]);

        if (check) {
            res.json({
                success: false,
                message: 'Пользователь существует',
            });
        } else {
            res.json({
                success: true,
                message: 'Пользователя можно регистрировать',
            });
        }

    } catch (error) {
        console.log(error);
    }
})

app.post('/api/create', (req, res) => {
    const { email, login, password } = req.body;
    try {
        pool.query(`INSERT INTO users (email, login, password) VALUES ('${email}', '${login}', '${password}')`);
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/join', (req, res) => {
    const { login, password } = req.body;
    try {
        const check = pool.query('SELECT password FROM users WHERE login = $1', [login]);
        const passwordBase = check.rows[0]?.password || null;
        if (password == passwordBase) {
            res.json({
                success: true,
                message: 'Авторизация успешна',
            });
        } else {
            res.json({
                success: false,
                message: 'Неверное имя пользователя или пароль',
            });
        }
    } catch (error) {
        console.log(error);
    }
});

// запуск сервера

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru/fullchain.pem')
}, app).listen(443, () => {
    console.log('Сертификаты установлены, сервер запущен');
});