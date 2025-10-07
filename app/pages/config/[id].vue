<template>
    <h1>Configurações do Sistema</h1>
    <form @submit.prevent="alterUser">
        <Row>
            <InputField label="Nome" name="nome" type="text" placeholder="" v-model="user.name" />
            <InputField label="Sobrenome" name="sobrenome" type="text" placeholder="" v-model="user.sobrenome" />
            <InputField label="Meta" name="meta" type="text" placeholder="" v-model="user.meta" />
        </Row>
        <Row>
            <div class="col">
                <label for="sexo" class="form-label">Sexo</label>
                <select class="form-select" id="sexo" name="sexo" v-model="user.sexo">
                    <option value="Fem">Feminino</option>
                    <option value="Mas">Masculino</option>
                </select>
            </div>
            <InputData />
            <InputField label="Peso (kg)" name="peso" type="number" placeholder="" v-model="user.peso" />
            <InputField label="Altura (m)" name="altura" type="number" placeholder="" v-model="user.altura" />
            <InputField label="Email" name="email" type="email" placeholder="" v-model="user.email" />
        </Row>
    </form>


    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Alterar Senha
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <form class="px-4 py-3" id="senhaForm" method="get">
                <div class="mb-3">
                    <label for="nova_senha" class="form-label">Nova Senha</label>
                    <input type="password" class="form-control" id="nova_senha" name="nova_senha">
                </div>
                <div class="mb-3">
                    <label for="confirmar_senha" class="form-label">Confirmar Senha</label>
                    <input type="password" class="form-control" id="confirmar_senha" name="confirmar_senha">
                    <div id="senhaFeedback" class="invalid-feedback">As senhas não coincidem.</div>
                </div>
                <button type="submit" class="btn btn-primary" onclick="verificarSenhas()">Salvar</button>
            </form>
        </div>
    </div>
    <div class="d-flex bd-highlight mb-3">
        <div class="pt-2 bd-highlight">
            <Button title="Salvar Alterações" corBtn="success" />
        </div>
        <div class="ml-auto p-2 bd-highlight">
            <a href="..\classes\utils\logout">
                <Button title="Logout" corBtn="danger">
                </Button>
            </a>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

function verificarSenhas() {
    var senha = document.getElementById('nova_senha').value;
    var confirmarSenha = document.getElementById('confirmar_senha').value;
    var senhaFeedback = document.getElementById('senhaFeedback');

    if (senha !== confirmarSenha) {
        senhaFeedback.style.display = 'block';
        document.getElementById('nova_senha').classList.add('is-invalid');
        document.getElementById('confirmar_senha').classList.add('is-invalid');
    } else {
        senhaFeedback.style.display = 'none';
        document.getElementById('nova_senha').classList.remove('is-invalid');
        document.getElementById('confirmar_senha').classList.remove('is-invalid');
        // Aqui você pode adicionar o código para enviar o formulário ou fazer outra coisa após a verificação bem-sucedida
    }
}

const user = ref({
    name: "",
    sobrenome: "",
    meta: "",
    peso: "",
    data: "",
    altura: "",
    email: ""
})

// Buscar receita pelo ID
const carregarDados = async () => {
    const id = route.params.id;
    console.log("id", id);
    try {
        const res = await fetch(`http://localhost:3001/usuarios/${id}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5vbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTc1OTg1ODc4OSwiZXhwIjoxNzU5ODYyMzg5fQ.Pl2RMHAMnWV25zKYfVm8EW4rXeZPK3LhRN76cdD0GNE'
            }
        });
        const data = await res.json();
        user.value = data;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
};

// Atualizar receita
const atualizarDados = async () => {
    const id = route.params.id;
    try {
        const res = await fetch(`http://localhost:3001/receitas/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(receita.value)
        });

        if (res.ok) {
            alert("Usuario atualizado com sucesso!");
            router.push(`/config/${id}`); // redireciona para lista de receitas
        } else {
            alert("Erro ao atualizar Usuario");
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
};

carregarDados();
</script>