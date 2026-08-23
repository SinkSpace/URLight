// импорты
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();

console.log('Библиотеки загружены');

// инициализация сервера
app.use = express.json;
app.use(express.static('public'));

console.log('Сервер инициализирован');

// запуск сервера

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/crmsink.ru-0001/fullchain.pem')
}).listen(443, () => {
    console.log('Сертификаты установлены, сервер запущен');
});