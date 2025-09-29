<template>
    <div>
        <div v-if="pending">Carregando receita...</div>
        <div v-else-if="error">Erro ao buscar receita: {{ error.message }}</div>
        <div v-else-if="receita">
            <h2>{{ receita.nome_receita }}</h2>
            <p><strong>Ingredientes:</strong></p>
            <ul>
                <li v-for="(item, i) in ingredientes" :key="i">
                    {{ item }}
                </li>
            </ul>
            <p><strong>Modo de preparo:</strong> {{ receita.modo_preparo }}</p>
            <p><strong>Calorias:</strong> {{ receita.calorias }}</p>
            <p><strong>Proteínas:</strong> {{ receita.proteinas }}</p>
            <p><strong>Carboidratos:</strong> {{ receita.carboidratos }}</p>
            <p><strong>Gordura:</strong> {{ receita.gordura }}</p>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const { data: receita, pending, error } = await useFetch(
    `http://localhost:3001/receitas/${id}`
)

// transforma ingredientes em array (se vier como string JSON)
const ingredientes = computed(() => {
    try {
        return receita.value?.ingredientes
            ? JSON.parse(receita.value.ingredientes)
            : []
    } catch (e) {
        return []
    }
})
</script>
