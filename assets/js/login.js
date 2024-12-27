document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://groove-industrial-api.vercel.app/api/api_buscar_login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const result = await response.json();

        if (result.status === 'success') {
            window.location.href = result.redirect;
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Erro ao realizar login. Tente novamente.');
    }
});
