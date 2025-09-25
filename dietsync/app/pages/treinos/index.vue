<template>
    <h1>Treinos Disponíveis</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Nome da Receita</th>
                <th>Detalhes</th>
                <th>Excluir</th>
                <th>Editar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="treino in treinos" :key="treino.id">
                <td>
                    {{ treino.nome_treino }}
                </td>
                <td>
                    <NuxtLink :to="`treinos/${treino.id}`">
                        <Button title="Ver Detalhes" corBtn="success" />
                    </NuxtLink>
                </td>
                <td>
                    <NuxtLink href="#">
                        <Button corBtn="danger">
                            <i class="bi bi-x-circle"></i>
                        </Button>
                    </NuxtLink>
                </td>
                <td>
                    <NuxtLink href="#">
                        <Button corBtn="primary">
                            <i class="bi bi-pencil-square"></i>
                        </Button>
                    </NuxtLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref } from 'vue';
const treinos = ref([]);

const id = 7;
try {
    const { data } = await useFetch(`http://localhost:3001/treinos/usuario/${id}`);
    if (Array.isArray(data.value)) {
        treinos.value = data.value;
    }
} catch (error) {
    console.error("Erro ao fazer o fetch", error);
}
</script>
