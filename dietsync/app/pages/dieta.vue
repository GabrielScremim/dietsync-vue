<template>
    <h2>Plano de Refeições do Dia</h2>

    <div v-for="dieta in dietas" :key="dieta.id_dieta" class="list-group mt-4">
        <div class="row">
            <div class="col-lg-3 col-sm-12">
                <button class="list-group-item list-group-item-action" @click="toggleCollapse(dieta.id_dieta)">
                    {{ dieta.nome_dieta }}
                </button>
            </div>
            <div class="col-lg-1 col-sm-12">
                <a :href="'dieta.php?id_excluir=' + dieta.id_dieta" class="btn btn-danger btn-sm ml-2">Excluir</a>
            </div>
            <div class="col-lg-1">
                <a :href="'Registrar-dieta.php?id_editar_dieta=' + dieta.id_dieta"
                    class="btn btn-success btn-sm ml-2">Editar Dieta</a>
            </div>
        </div>

        <!-- Collapse controlado por Vue -->
        <div v-show="collapsedId === dieta.id_dieta" class="w-100 mt-2">
            <div class="card card-body">
                <ul>
                    <li><strong>Nome da Dieta:</strong> {{ dieta.nome_dieta }}</li>
                    <li><strong>Tipo de Dieta:</strong> {{ dieta.tipo_dieta }}</li>
                    <li><strong>Calorias:</strong> {{ dieta.calorias }}</li>
                    <li><strong>Proteínas:</strong> {{ dieta.proteinas }}</li>
                    <li><strong>Carboidratos:</strong> {{ dieta.carboidratos }}</li>
                    <li><strong>Gorduras:</strong> {{ dieta.gorduras }}</li>
                    <li><strong>Alimentos:</strong>
                        <ul>
                            <li v-for="(alimento, index) in dieta.alimentos.split(',')" :key="index">
                                {{ alimento.trim() }}
                            </li>
                        </ul>
                    </li>
                    <li><strong>Quantidade:</strong> {{ dieta.quantidade }}</li>
                    <li><strong>Observações:</strong> {{ dieta.observacoes }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const dietas = ref([]);
const collapsedId = ref(null);

// Toggle do collapse
const toggleCollapse = (id) => {
    collapsedId.value = collapsedId.value === id ? null : id;
};

// ID do usuário
const id = 40;

// Carrega dados da API
try {
    const { data } = await useFetch(`http://localhost:3001/dietas/${id}`);
    if (Array.isArray(data.value)) {
        dietas.value = data.value;
    }
} catch (error) {
    console.log("Erro ao fazer o fetch", error);
}
</script>
