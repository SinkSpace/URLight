console.log('Библиотеки скрипта создания аккаунта загружены');

const joinServer = document.getElementById('joinServer');

joinServer.addEventListener('click', async () => {
    try {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        if (!login || !password) {
            alert('Неверный логин или пароль');
            return;
        }

        const response = await fetch('/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });

        const data = response.json();

        if (data.success) {
            alert(data.message);
        } else {
            alert(data.message);
        }

        if (!response.ok) throw new Error(`${response.status}`);

    } catch (error) {
        console.error(error);
    }
})