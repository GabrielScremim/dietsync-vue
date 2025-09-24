<template>
    <h1>Detalhes da Receita</h1>
    <p><strong>Nome da receita:</strong>
        teste
    </p>
    <p><strong>Ingredientes:</strong>
    <ul>
        <li>ingrediente</li>
        <li>Nenhum ingrediente especificado.</li>

    </ul>
    </p>
    <p><strong>Modo de Preparo:</strong>
        Teste
    </p>
    <p><strong>Calorias:</strong>
        Teste
    </p>
    <p><strong>Proteínas:</strong>
        Teste
    </p>
    <p><strong>Carboidratos:</strong>
        Teste
    </p>
    <p><strong>Gordura:</strong>
        Teste
    </p>
    <h1><strong>Receita não encontrada.</strong></h1>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(async () => {
    try {
        // Realiza o fetch assim que o componente for montado
        const { data } = await useFetch('http://localhost:3001/receitas');
        const result = await response.json();  // Assuming the response is in JSON format
        data.value = result;
        console.log("Resultado do fetch", data.value);
    } catch (error) {
        console.error("Erro ao fazer o fetch:", error);

    }
})
</script>