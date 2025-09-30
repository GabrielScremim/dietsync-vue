<template>
    <h1>Editar Treino</h1>

    <form @submit.prevent="atualizarTreino">
        <Row>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <label for="">Tipo de Treino</label>
                <select class="form-select" v-model="exercicio.tipo">
                    <option value="" disabled>Selecione o tipo de treino</option>
                    <option value="musculacao">Musculação</option>
                    <option value="cardio">
                        Cardio</option>
                    <option value="funcional">Funcional</option>
                </select>
            </div>
            <InputField label="Nome do Treino" name="nome_treino" type="text" placeholder=""
                v-model="exercicio.nome_treino" />
        </Row>
        <div class="row  my-5">
            <div class="col">
                <label for="exercicios" class="form-label">Exercícios (separados por vírgula)</label>
                <textarea type="text" class="form-control" v-model="exercicio.exercicios"></textarea>
            </div>
        </div>

        <Row>
            <InputField label="Repetições" name="repeticoes" type="number" placeholder=""
                v-model="exercicio.repeticoes" />
            <InputField label="Séries" name="series" type="number" placeholder="" v-model="exercicio.series" />
            <InputField label="Objetivo" name="objetivo" type="text" placeholder="" v-model="exercicio.objetivo" />
            <InputField label="Duração" name="duracao" type="text" placeholder="" v-model="exercicio.duracao" />
            <InputField label="Frequência" name="frequencia" type="text" placeholder=""
                v-model="exercicio.frequencia" />
        </Row>
        <Button title="Editar Treino" corBtn="success" />
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
console.log(getCurrentDate());  // Exibe a data atual no formato 'YYYY-MM-DD'

const exercicio = ref({
    data: getCurrentDate(),  // Atribui a data de hoje ao campo 'data'
    tipo: "",
    nome_treino: "",
    exercicios: "",
    repeticoes: "",
    series: "",
    objetivo: "",
    duracao: "",
    frequencia: "",
});

const carregarTreino = async () => {
    const id = 40;
    const id_treino = route.params.id;
    console.log(id_treino);
    try {
        const res = await fetch(`http://localhost:3001/treinos/usuario/${id}/treino/${id_treino}`);
        const data = await res.json();
        exercicio.value = data[0]; // pega o objeto em vez do array
    } catch (error) {
        console.error("Erro ao carregar receita:", error);
    }
};

const atualizarTreino = async () => {
    const id_treino = route.params.id;
    const id = 40;

    // Garanta que a data enviada está no formato correto 'YYYY-MM-DD'
    const formattedData = getCurrentDate();
    exercicio.value.data = formattedData;  // Atualizando a data no objeto exercicio antes de enviar

    console.log("Data antes de atualizar:", exercicio.value.data);  // Verificando a data

    try {
        const res = await fetch(`http://localhost:3001/treinos/usuario/${id}/editar/${id_treino}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exercicio.value)  // Enviando a data no formato correto
        });

        if (res.ok) {
            alert("Treino atualizado com sucesso!");
            router.push("/treinos"); // Redireciona para a lista de treinos
        } else {
            alert("Erro ao atualizar treino");
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
};

carregarTreino();
</script>
