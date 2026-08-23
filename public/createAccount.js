console.log('Библиотеки скрипта создания аккаунта загружены');

const registerServer = document.getElementById('registerServer');

registerServer.addEventListener('click', async () => {
    try {
        const login = document.getElementById('login').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordRepeat = document.getElementById('passwordRepeat').value;

        if (!login || !email || !password || !passwordRepeat) {
            alert('Заполните все поля');
            return;
        }

        if (password == passwordRepeat) {
            const response = await fetch('/api/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    email: email,
                })
            });

            const data = response.json();

            if (data.success) {
                const responses = await fetch('/api/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: login,
                        email: email,
                        password: password,
                    })
                })
            } else {
                alert(data.message);
            }

            if (!response.ok) throw new Error(`${response.status}`);
        } else {
            alert('Пароли не совпадают');
            return;
        }
    } catch (error) {
        console.error(error);
    }
})