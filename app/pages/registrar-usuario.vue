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
            Já tem uma conta? <a href="/login">Faça login.</a>
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
        const res = await $fetch("http://localhost:3001/registrarUsuario", {
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

<style scoped>
@import url('../assets/css/style1.css');
</style>