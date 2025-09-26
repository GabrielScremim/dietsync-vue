<template>
    <h1>
        Registrar Treino
    </h1>
    <form @submit.prevent="createTreino">
        <Row>
            <InputData v-model="form.data" />
            <div class="col-lg-4 col-md-6 col-sm-12 my-2 mt-4 pt-2">
                <select class="form-select" v-model="form.tipo">
                    <option value="" disabled>Selecione o tipo de treino</option>
                    <option value="musculacao">Musculação</option>
                    <option value="cardio">
                        Cardio</option>
                    <option value="funcional">Funcional</option>
                </select>
            </div>
            <Input title="Nome do Treino" tipo="nome_treino" valor="text" v-model="form.nome_treino" />
        </Row>
        <div class="row  my-5">
            <div class="col">
                <label for="exercicios" class="form-label">Exercícios (separados por vírgula)</label>
                <textarea type="text" class="form-control" v-model="form.exercicios"></textarea>
            </div>
        </div>

        <Row>
            <Input title="Repetições" v-model="form.repeticoes" tipo="repeticoes" valor="text" />
            <Input title="Séries" v-model="form.series" tipo="series" valor="text" />
            <Input title="Objetivo" v-model="form.objetivo" tipo="objetivo" valor="text" />
            <Input title="Duração" v-model="form.duracao" tipo="duracao" valor="text" />
            <Input title="Frequência" v-model="form.frequencia" tipo="frequencia" valor="text" />

            <div class="col">
                <Input title="Séries" v-model="form.series" tipo="series" valor="text" />
            </div>
        </Row>
        <Button title="Criar Treino" corBtn="success" />
    </form>
</template>


<script setup>
import { ref } from 'vue';

const form = ref({

    data: "",
    tipo: "",
    exercicios: "",
    repeticoes: "",
    series: "",
    objetivo: "",
    duracao: "",
    frequencia: "",
    nome_treino: "",
    dia_treino: "1",
})

const createTreino = async () => {
    try {
        console.log("Dados enviados:", form.value); // Adicione um log para depuração
        const res = await $fetch('http://localhost:3001/criarTreino', {
            method: 'POST',
            body: JSON.stringify(form.value)

        })

        const data = await res.json();
        console.log("Resposta da API: ", data);

        if (res.ok) {
            alert("Treino criado com sucesso");
        } else {
            alert("Erro: " + data.message);
        }
    } catch (error) {
        console.log(err);
        alert("Erro ao conectar com a API.");
    }
}
</script>