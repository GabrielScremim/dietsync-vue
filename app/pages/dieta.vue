<template>
    <div>
        <h2>Plano de Refeições do Dia</h2>

        <div v-for="dieta in dietas" :key="dieta.id_dieta" class="list-group mt-4">
            <div class="row align-items-center">
                <div class="col-lg-3 col-sm-12">
                    <button class="list-group-item list-group-item-action" @click="toggleCollapse(dieta.id_dieta)">
                        {{ dieta.nome_dieta }}
                    </button>
                </div>

                <div class="col-lg-2 col-sm-12 d-flex gap-2 mt-2 mt-lg-0">
                    <!-- botão Excluir chama método Vue -->
                    <button @click="excluirDieta(dieta.id_dieta)" class="btn btn-danger">
                        Excluir
                    </button>

                    <!-- editar continua abrindo outra página (se quiser usar rota Nuxt, troque por <NuxtLink>) -->
                    <a :href="'Registrar-dieta.php?id_editar_dieta=' + dieta.id_dieta"
                        class="btn btn-success">
                        Editar
                    </a>
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
                        <li>
                            <strong>Alimentos:</strong>
                            <ul v-if="dieta.alimentos">
                                <li v-for="(alimento, index) in (dieta.alimentos || '').split(',')" :key="index">
                                    {{ alimento.trim() }}
                                </li>
                            </ul>
                            <span v-else>Nenhum alimento informado</span>
                        </li>
                        <li><strong>Quantidade:</strong> {{ dieta.quantidade }}</li>
                        <li><strong>Observações:</strong> {{ dieta.observacoes }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-if="dietas.length === 0" class="alert alert-warning mt-4">
            Nenhuma dieta encontrada para hoje.
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const dietas = ref([]);
const collapsedId = ref(null);
const userId = 40; // ajuste para pegar dinamicamente se precisar

const toggleCollapse = (id) => {
    collapsedId.value = collapsedId.value === id ? null : id;
};

onMounted(async () => {
    try {
        const { data, error } = await useFetch(`http://localhost:3001/dietas/${userId}`);
        if (error.value) {
            console.error("Erro na API:", error.value);
            return;
        }
        // se a API devolver um array de dietas:
        dietas.value = Array.isArray(data.value) ? data.value : [];
    } catch (err) {
        console.error("Erro ao carregar dietas:", err);
    }
});

const excluirDieta = async (idDieta) => {
    const ok = confirm("Tem certeza que deseja excluir esta dieta?");
    if (!ok) return;

    try {
        const res = await fetch(`http://localhost:3001/dietas/excluir/${idDieta}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        if (!res.ok) {
            // exibe a mensagem enviada pelo servidor (se houver)
            throw new Error(json.message || "Erro ao excluir dieta");
        }

        // atualiza lista local (sem recarregar a página)
        dietas.value = dietas.value.filter(d => d.id_dieta !== idDieta);

        // fecha collapse se estava aberto
        if (collapsedId.value === idDieta) collapsedId.value = null;

        alert(json.message || "Dieta excluída com sucesso!");
    } catch (err) {
        console.error("Erro ao excluir dieta:", err);
        alert("Erro ao excluir dieta: " + (err.message || ""));
    }
};
</script>
