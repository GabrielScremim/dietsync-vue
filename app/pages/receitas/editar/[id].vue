<template>
    <div class="container">
        <h2>Editar Receita</h2>
        <form @submit.prevent="atualizarReceita">
            <!-- Nome da Receita -->
            <InputField label="Nome da Receita" name="nome_receita" type="text" placeholder="Digite o nome da receita"
                v-model="receita.nome_receita" />

            <!-- Ingredientes -->
            <Row>
                <label for="ingredientes" class="form-label">Ingredientes (separados por vírgulas)</label>
                <textarea class="form-control" v-model="receita.ingredientes" rows="4" id="ingredientes"
                    placeholder="Ex: arroz, feijão, frango"></textarea>
            </Row>

            <!-- Modo de Preparo -->
            <Row>
                <label for="modo_preparo" class="form-label">Modo de Preparo</label>
                <textarea class="form-control" v-model="receita.modo_preparo" rows="4" id="modo_preparo"
                    placeholder="Descreva o modo de preparo da receita"></textarea>
            </Row>

            <!-- Valores Nutricionais -->
            <Row>
                <InputField label="Calorias" name="calorias" type="number" placeholder="Ex: 250"
                    v-model="receita.calorias" />
                <InputField label="Proteínas" name="proteinas" type="number" placeholder="Ex: 20"
                    v-model="receita.proteinas" />
                <InputField label="Carboidratos" name="carboidratos" type="number" placeholder="Ex: 35"
                    v-model="receita.carboidratos" />
                <InputField label="Gordura" name="gordura" type="number" placeholder="Ex: 10"
                    v-model="receita.gordura" />
            </Row>

            <!-- Botão -->
            <Button title="Editar" corBtn="success" />
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const receita = ref({
    nome_receita: "",
    ingredientes: "",
    modo_preparo: "",
    calorias: "",
    proteinas: "",
    carboidratos: "",
    gordura: "",
});

// Buscar receita pelo ID
const carregarReceita = async () => {
    const id = route.params.id;
    console.log(id);
    try {
        const res = await fetch(`http://localhost:3001/receitas/${id}`);
        const data = await res.json();
        receita.value = data;
    } catch (error) {
        console.error("Erro ao carregar receita:", error);
    }
};

// Atualizar receita
const atualizarReceita = async () => {
    const id = route.params.id;
    try {
        const res = await fetch(`http://localhost:3001/receitas/editar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(receita.value)
        });

        if (res.ok) {
            alert("Receita atualizada com sucesso!");
            router.push("/receitas"); // redireciona para lista de receitas
        } else {
            alert("Erro ao atualizar receita");
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
};

carregarReceita();
</script>
