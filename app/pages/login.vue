<template>
    <div class="login-card-container">
        <div class="login-card">
            <div class="login-card-logo">
                <h2>Regressiva para o GTA VI</h2>
                <iframe id="online-alarm-kur-iframe"
                    src="https://embed-countdown.onlinealarmkur.com/pt/#2026-05-26T00:00:00@America%2FSao_Paulo"
                    width="360" height="80" style="display: block; margin: 0px auto; border: 0px;"></iframe>
                <a href="https://www.greenfoot.org/scenarios/31251" target="_blank" class="corner-link"> <img
                        src="http://152.67.45.167/img/vertical_2.png" alt="logo"> </a>
            </div>
            <div class="login-card-header">
                <h1>Entrar</h1>
                <div>Faça login para usar a plataforma</div>
            </div>
            <form class="login-card-form" method="post">
                <div class="form-item">
                    <input type="text" name="email" placeholder="Email" id="emailForm" autofocus required>
                </div>
                <div class="form-item">
                    <input type="password" name="password" placeholder="Senha" id="password" required>
                </div>
                <div class="form-item-other">
                    <div class="checkbox">
                        <input type="checkbox" id="rememberMeCheckbox" name="remember" checked>
                        <label for="rememberMeCheckbox">Lembrar de mim</label>
                    </div>
                    <a href="/recuperar-senha">Esqueci minha senha!</a>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <div class="login-card-footer">
                <p>Total de acessos: </p>
                Não tem uma conta? <a href="/registrar-usuario">Crie uma conta como usuário</a>
                <p>Uma empresa do Grupo SPWN</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/css/style1.css');
</style>
