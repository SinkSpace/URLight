// импорты
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

console.log('Библиотеки загружены');

// инициализация сервера
app.use(express.json());
app.use(express.static('public'));

console.log('Сервер инициализирован');

// отправка веб-страниц

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    console.log('Главная страница отправлена');
});

// запуск сервера

app.listen(80, () => {
    console.log('Сервер запущен');
})

/*https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru/fullchain.pem')
}).listen(443, () => {
    console.log('Сертификаты установлены, сервер запущен');
});*/