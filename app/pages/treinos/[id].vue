<template>
    <div v-if="error">Erro ao buscar treino: {{ error.message }}</div>
    <div v-else-if="treino">
        <ul>
            <li><strong>{{ treinoData.nome_treino }}</strong>
            </li>
            <li><strong>Objetivo: </strong>{{ treinoData.objetivo }}
            </li>
            <li><strong>Duração: </strong>{{ treinoData.duracao }}
            </li>
            <li><strong>Frequência: </strong>{{ treinoData.frequencia }}
            </li>
            <li><strong>Exercícios:</strong>
                <ol>
                    <li v-for="(treinoData, index) in treinoData.exercicios.split(',')" :key="index">
                        {{ treinoData.trim() }}
                    </li>
                </ol>
            </li>
            <li><strong>Série: </strong>{{ treinoData.series }}</li>
            <li><strong>Repetição: </strong>{{ treinoData.repeticoes }}</li>
            <li><strong>Tipo: </strong>{{ treinoData.tipo }}</li>
            <li><strong>Data do Treino: </strong>{{ treinoData.data }}</li>
        </ul>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = 40;
const id_treino = route.params.id;
const { data: treino, error } = await useFetch(`http://localhost:3001/treinos/usuario/${id}/treino/${id_treino}`);

// Verifique se treino está sendo corretamente atribuído (é um array com 1 item).
const treinoData = treino.value?.[0];  // Acessa o primeiro item do array

const exercicios = computed(() => {
    try {
        return treinoData?.exercicios ? JSON.parse(treinoData.exercicios) : []
    } catch (e) {
        return []
    }
});

</script>
