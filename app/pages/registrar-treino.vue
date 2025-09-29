<template>
    <h1>
        Registrar Treino
    </h1>
    <form @submit.prevent="createTreino">
        <Row>
            <InputData v-model="form.data" />
            <div class="col-lg-4 col-md-6 col-sm-12">
                <label for="">Tipo de Treino</label>
                <select class="form-select" v-model="form.tipo">
                    <option value="" disabled>Selecione o tipo de treino</option>
                    <option value="musculacao">Musculação</option>
                    <option value="cardio">
                        Cardio</option>
                    <option value="funcional">Funcional</option>
                </select>
            </div>
            <InputField label="Nome do Treino" name="nome_treino" type="text" placeholder="Ex: Treino de Perna"
                v-model="form.nome_treino" />
        </Row>
        <div class="row  my-5">
            <div class="col">
                <label for="exercicios" class="form-label">Exercícios (separados por vírgula)</label>
                <textarea type="text" class="form-control" v-model="form.exercicios"></textarea>
            </div>
        </div>

        <Row>
            <InputField label="Repetições" name="repeticoes" type="number" placeholder="Ex: 12"
                v-model="form.repeticoes" />
            <InputField label="Séries" name="series" type="number" placeholder="Ex: 4" v-model="form.series" />
            <InputField label="Objetivo" name="objetivo" type="text" placeholder="Ex: Treino de Perna"
                v-model="form.objetivo" />
            <InputField label="Duração" name="duracao" type="text" placeholder="Ex: 30 min" v-model="form.duracao" />
            <InputField label="Frequência" name="frequencia" type="text" placeholder="Ex: 3 (três vezes na semana)"
                v-model="form.frequencia" />
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