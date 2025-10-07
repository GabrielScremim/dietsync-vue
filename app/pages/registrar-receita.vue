<template>
    <h1>Registrar Receita</h1>
    <form @submit.prevent="createReceita">
        <!-- Nome da Receita -->
        <InputField label="Nome da Receita" name="nome_receita" type="text" placeholder="Digite o nome da receita"
            v-model="form.nome_receita" />

        <!-- Ingredientes -->
        <Row>
            <label for="ingredientes" class="form-label">Ingredientes (separados por vírgulas)</label>
            <textarea class="form-control" v-model="form.ingredientes" rows="4" id="ingredientes"
                placeholder="Ex: arroz, feijão, frango"></textarea>
        </Row>

        <!-- Modo de Preparo -->
        <Row>
            <label for="modo_preparo" class="form-label">Modo de Preparo</label>
            <textarea class="form-control" v-model="form.modo_preparo" rows="4" id="modo_preparo"
                placeholder="Descreva o modo de preparo da receita"></textarea>
        </Row>

        <!-- Valores Nutricionais -->
        <Row>
            <InputField label="Calorias" name="calorias" type="number" placeholder="Ex: 250" v-model="form.calorias" />
            <InputField label="Proteínas" name="proteinas" type="number" placeholder="Ex: 20"
                v-model="form.proteinas" />
            <InputField label="Carboidratos" name="carboidratos" type="number" placeholder="Ex: 35"
                v-model="form.carboidratos" />
            <InputField label="Gordura" name="gordura" type="number" placeholder="Ex: 10" v-model="form.gordura" />
        </Row>

        <!-- Botão -->
        <Button title="Salvar" corBtn="success" />
    </form>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({

    ingredientes: "",
    modo_preparo: "",
    calorias: "",
    proteinas: "",
    carboidratos: "",
    gordura: "",
})

const createReceita = async () => {
    try {
        console.log("Dados enviados", form.value);
        const res = await $fetch('http://localhost:3001/receitas', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5vbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTc1OTUxMDQ4NywiZXhwIjoxNzU5NTE0MDg3fQ.FiHgEs0TKTd9C2VmedAnRJqiaNpGkcaGhdumNpGskoE'
            },
            body: JSON.stringify(form.value)
        });

        const data = await res.json();
        console.log("Resposta da API:", data);

        if (res.ok) {
            alert("Receita criado com sucesso!");
        } else {
            alert("Erro: ", data.message);
        }
    } catch (error) {
        console.log(error);
        alert("Erro ao conectar com a API.")
    }
}
</script>
