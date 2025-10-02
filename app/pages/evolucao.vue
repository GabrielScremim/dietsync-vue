<template>
    <h3>Vamo ver as Medidas Antigas</h3>
    <Table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Peso (kg)</th>
                <th>Altura (m)</th>
                <th>Cintura (cm)</th>
                <th>Excluir</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="evolucao in data" :key="evolucao.id">
                <td>{{ evolucao.data }}</td>
                <td>{{ evolucao.peso }}</td>
                <td>{{ evolucao.altura }}</td>
                <td>{{ evolucao.cintura }}</td>
                <td>
                    <Button corBtn="danger" @click="excluirEvolucao(evolucao.id)">
                        <i class='bi bi-x-circle'></i>
                    </Button>
                </td>
            </tr>
        </tbody>
    </Table>

    <h2>Partiu Medir Novamente</h2>

    <form @submit.submit="criarEvolucao">
        <Row>
            <InputField label="Data" name="data" type="date" placeholder="" v-model="form.data" />
            <InputField label="Peso (em kg)" name="peso" type="number" placeholder="Ex: 68.9" v-model="form.peso" />
            <InputField label="Altura (em cm)" name="altura" type="number" placeholder="Ex: 1.8"
                v-model="form.altura" />
            <InputField label="Cintura (em cm)" name="cintura" type="number" placeholder="Ex: 50.1"
                v-model="form.cintura" />
        </Row>
        <Button title="Registrar Medição" corBtn="success" />
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const form = ref({
    data: "",
    peso: "",
    altura: "",
    cintura: "",
})

const data = ref([]);

const criarEvolucao = async () => {
    try {
        console.log("Dados enviados:", form.value);
        const res = await $fetch('http://localhost:3001/criarEvolucao', {
            method: 'POST',
            body: JSON.stringify(form.value)
        })

        const data = await res.json()
        console.log("Resposta da API:", data);

        if (res.ok) {
            alert("Evolução criada com sucesso!");
        } else {
            alert("Erro:" + data.message);
        }
    } catch (error) {
        console.log(err);
        alert("Erro ao conectar com a API.");
    }
}

onMounted(async () => {
    try {
        // Realiza o fetch assim que o componente for montado
        const response = await fetch('http://localhost:3001/evolucaos');
        const result = await response.json();  // Assuming the response is in JSON format
        data.value = result;
    } catch (error) {
        console.error("Erro ao fazer o fetch:", error);
    }
});

const excluirEvolucao = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta evolução?")) {
        try {
            const res = await fetch(`http://localhost:3001/evolucao/excluir/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                data.value = data.value.filter(e => e.id !== id);
                alert("Evolução excluída com sucesso!");
            } else {
                const erro = await res.json();
                alert("Erro ao excluir: " + erro.message);
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao conectar com a API.");
        }
    }
};

</script>