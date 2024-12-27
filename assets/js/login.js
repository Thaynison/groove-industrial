document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessageDiv = document.getElementById('error-message');

    function showMessage(message, type = 'danger') {
        errorMessageDiv.textContent = message;
        errorMessageDiv.className = `alert alert-${type}`;
        errorMessageDiv.classList.remove('d-none');
    }

    if (!email || !password) {
        showMessage('Por favor, preencha todos os campos.');
        return;
    }

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
            showMessage(result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Ocorreu um erro ao processar o login. Tente novamente.');
    }
});
