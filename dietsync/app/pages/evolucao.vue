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
            <tr>
                <td>24/08/2025</td>
                <td>69.0</td>
                <td>1.80</td>
                <td>52.0</td>
                <td>
                    <a href="evolucao.php?id_evolucao_excluir={$medicao[' id']}">
                        <Button corBtn="danger">
                            <i class='bi bi-x-circle'></i>
                        </button>
                    </a>
                </td>
            </tr>
            <tr>
                <td>24/09/2025</td>
                <td>71.0</td>
                <td>1.80</td>
                <td>50.0</td>
                <td>
                    <a href="evolucao.php?id_evolucao_excluir={$medicao[' id']}">
                        <Button corBtn="danger">
                            <i class='bi bi-x-circle'></i>
                        </button>
                    </a>
                </td>
            </tr>
        </tbody>
    </Table>

    <h2>Partiu Medir Novamente</h2>

    <form method="post">
        <Row>
            <InputData />
            <Input title="Peso (em kg)" tipo="peso" valor="number" />
            <Input title="Altura (em cm)" tipo="altura" valor="number" />
            <Input title="Cintura (em cm)" tipo="cintura" valor="number" />
        </Row>
        <Button title="Registrar Medição" corBtn="success" />
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Defina a variável que vai armazenar os dados
const data = ref(null);

onMounted(async () => {
    try {
        // Realiza o fetch assim que o componente for montado
        const response = await fetch('http://localhost:3001/evolucaos');
        const result = await response.json();  // Assuming the response is in JSON format
        data.value = result;
        console.log("Resultado do fetch", data.value);
    } catch (error) {
        console.error("Erro ao fazer o fetch:", error);
    }
});
</script>