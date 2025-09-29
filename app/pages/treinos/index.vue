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
                    <Button @click="excluirTreino(treino.id)" corBtn="danger">
                        <i class="bi bi-x-circle"></i>
                    </Button>
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

const id = 40;
onMounted(async () => {
    try {
        const { data } = await useFetch(`http://localhost:3001/treinos/usuario/${id}`);
        if (Array.isArray(data.value)) {
            treinos.value = data.value;
        }
    } catch (error) {
        console.error("Erro ao fazer o fetch", error);
    }
});

const excluirTreino = async (idTreino) => {
    console.log(idTreino)

    const ok = confirm("Tem certeza que deseja excluir este treino?");
    if (!ok) return;

    try {
        const res = await fetch(`http://localhost:3001/treinos/usuario/${id}/excluir/${idTreino}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message || "Erro ao excluir treino");
        }

        treinos.value = treinos.value.filter(d => d.id !== idTreino);

        alert(json.message || "Treino excluída com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir treino:", err);
        alert("Erro ao excluir treino: " + (err.message || ""));
    }
}
</script>
