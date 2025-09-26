<template>
    <div class="login-card">
        <div class="login-card-logo">
            <img src="http://152.67.45.167/img/vertical_2.png" alt="logo">
        </div>
        <div class="login-card-header">
            <h1>Criar Conta</h1>
            <div>Preencha os campos para criar uma conta</div>
        </div>
        <form class="login-card-form" @submit.prevent="registerUser">
            <div class="form-item">
                <input type="text" placeholder="Nome" v-model="form.name" autofocus required>
            </div>
            <div class="form-item">
                <input type="text" placeholder="Sobrenome" v-model="form.surname" required>
            </div>
            <div class="form-item">
                <input type="text" placeholder="Meta" v-model="form.meta" required>
            </div>
            <div class="form-item">
                <label for="">Selecione o Sexo</label>
                <select v-model="form.sexo" class="form-select" required>
                    <option value="" disabled selected>Selecione o Sexo</option>
                    <option value="Fem">Feminino</option>
                    <option value="Mas">Masculino</option>
                </select>
            </div>

            <div class="form-item">
                <label for="">Data Nascimento</label>
                <input type="date" placeholder="Data de Nascimento" v-model="form.data_nasc" required>
            </div>
            <div class="form-item">
                <input type="text" placeholder="Peso" v-model="form.peso" required>
            </div>
            <div class="form-item">
                <input type="text" placeholder="Altura" v-model="form.altura" required>
            </div>
            <div class="form-item">
                <input type="text" placeholder="Email" v-model="form.email" required>
            </div>
            <div class="form-item">
                <input type="password" placeholder="Senha" v-model="form.password" required>
            </div>
            <button type="submit">Registrar</button>
        </form>
        <div class="login-card-footer">
            Já tem uma conta? <a href="index.php">Faça login.</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    name: "",
    surname: "",
    meta: "",
    sexo: "",
    data_nasc: "",
    peso: "",
    altura: "",
    email: "",
    password: "",
});

const registerUser = async () => {
    try {
        const res = await fetch("http://localhost:3001/registrarUsuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form.value),
        });

        const data = await res.json();
        console.log("Resposta da API:", data);

        if (res.ok) {
            alert("Uusario cadastrado com sucesso");
        } else {
            alert("Erro: " + data.message);
        }
    } catch (error) {
        console.log(err);
        alert("Erro ao conectar com a API.")
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(to right, #004c2f, #00ffa3);
    display: flex;
    justify-content: center;
    align-items: center;
}


/* Login Card */
.login-card {
    width: 450px;
    background: rgba(255, 255, 255, .5);
    padding: 4rem;
    border-radius: 10px;
    position: relative;
}

.login-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, .15);
    transform: rotate(-6deg);
    border-radius: 10px;
    z-index: -1;
}

/* ---------- */

/* Login Card Logo */
.login-card-logo {
    margin-bottom: 2rem;
}

.login-card-logo img {
    width: 60px;
}

/* ---------- */

/* Login Card Standard */
.login-card-logo,
.login-card-header,
.login-card-footer {
    text-align: center;
}

.login-card a {
    text-decoration: none;
    color: #35339a;
}

.login-card a:hover {
    text-decoration: underline;
}

/* ---------- */

/* Login Card Header */
.login-card-header {
    margin-bottom: 2rem;
}

.login-card-header h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: .5rem;
}

.login-card-header h1+div {
    font-size: calc(1rem * .8);
    opacity: .8;
}

/* ---------- */

/* Login Card Form */
.login-card-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.login-card-form .form-item {
    position: relative;
}

.login-card-form .form-item .form-item-icon {
    position: absolute;
    top: .82rem;
    left: 1.4rem;
    font-size: 1.3rem;
    opacity: .4;
}

.login-card-form .checkbox {
    display: flex;
    align-items: center;
    gap: 7px;
}

.login-card-form .form-item-other {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: calc(1rem * .8);
    margin-bottom: .5rem;
}

/* ---------- */

/* Login Card Footer */
.login-card-footer {
    margin-top: 1.5rem;
    font-size: calc(1rem * .8);
}

/* ---------- */

/* Login Card Form Elements */
.login-card input[type="text"],
.login-card input[type="password"],
.login-card input[type="email"] {
    border: none;
    outline: none;
    background: rgba(255, 255, 255, .3);
    padding: 1rem 1.5rem;
    padding-left: calc(1rem * 3.5);
    border-radius: 100px;
    width: 90%;
    transition: background .5s;
}

.login-card input:focus {
    background: white;
}

.login-card input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: black;
}

.login-card button {
    background: black;
    color: white;
    padding: 1rem;
    border-radius: 100px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: background .5s;
}

.login-card button:hover {
    background-color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
}

/* ---------- */

/* Login Card Social Buttons */
.login-card-social {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    margin-top: 3rem;
}

.login-card-social>div {
    opacity: .8;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: calc(1rem * .8);
}

.login-card-social-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.login-card-social-btns a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 100px;
    transition: all .5s;
}

.login-card-social-btns a:hover {
    background-color: white;
    transform: scale(1.1);
}

/* ---------- */


/* Responsive */
@media (max-width: 768px) {

    body {
        padding: 2rem 0;
    }

    .login-card {
        width: 380px;
        padding: 2rem;
    }

}

/* ---------- */
</style>