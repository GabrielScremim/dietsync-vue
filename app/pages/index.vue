<template>
    <h2>Desenvolvedores</h2>

    <div class="row">
        <div class="col-lg-6 col-sm-12">
            <div class="row text-center">
                <div class="col-md-6 col-sm-12">
                    <div class="card">
                        <div class="img-container">
                            <img src="http://152.67.45.167/img/scremim.jpg" alt="foto perfil">
                        </div>
                        <div class="content">
                            <h2 class="name-profile"> Gabriel Vaz Scremim</h2>
                            <p class="job"> Desenvolvedor</p>
                            <p class="descri">Aluno do curso de Ciência da Computação da UniFil - Londrina e estagiário
                                no IDR-Paraná.</p>
                        </div>
                        <div class="links">
                            <div class="links">
                                <a href="https://www.instagram.com/gabrielscremim/" class="insta" target="blank">
                                    <i class="bi bi-instagram"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/gabriel-vaz-scremim-a37b8b231/" class="linke"
                                    target="blank">
                                    <i class="bi bi-linkedin"></i>
                                </a>
                                <a href="https://github.com/gabrielscremim" class="github" target="blank">
                                    <i class="bi bi-github"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="img-container">
                            <img src="http://152.67.45.167/img/segobi.jpg" alt="foto perfil">
                        </div>
                        <div class="content">
                            <h2 class="name-profile"> Gabriel Segobi de Souza</h2>
                            <p class="job"> Desenvolvedor</p>
                            <p class="descri"> Aluno do curso de Ciência da Computação da UniFil - Londrina.</p>
                            <br>
                        </div>
                        <div class="links">
                            <a href="https://www.instagram.com/gabrielsegobi_/" class="insta" target="blank">
                                <i class="bi bi-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/gabriel-segobi-8a277628b/" class="linke"
                                target="blank">
                                <i class="bi bi-linkedin"></i>
                            </a>
                            <a href="https://github.com/segobinho" class="github" target="blank">
                                <i class="bi bi-github"></i>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-sm-12">
            <h2>Dietas do dia</h2>
            <div v-for="dieta in dietas" :key="dieta.id_dieta" class="list-group mt-4">
                <div class="row">
                    <div class="col-lg-6 col-sm-12">
                        <button class="list-group-item list-group-item-action" @click="toggleCollapse(dieta.id_dieta)">
                            {{ dieta.nome_dieta }}
                        </button>
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
            <p>&nbsp;</p>
            <h2>Treino do dia</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome da Receita</th>
                        <th>Detalhes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="treino in treinos" :key="treino.id">
                        <td>
                            {{ treino.nome_treino }}
                        </td>
                        <td>
                            <NuxtLink :to="`/treinos/${treino.id}`">
                                <Button title="Ver Detalhes" corBtn="success" />
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dietas = ref([])
const treinos = ref([])
const collapsedId = ref(null)

const toggleCollapse = (id) => {
    collapsedId.value = collapsedId.value === id ? null : id
}

const id = 40

onMounted(async () => {
    try {
        const dietasData = await $fetch(`http://localhost:3001/dietas/${id}`)
        const treinosData = await $fetch(`http://localhost:3001/treinos/usuario/${id}`)

        if (Array.isArray(dietasData)) {
            dietas.value = dietasData
        }

        if (Array.isArray(treinosData)) {
            treinos.value = treinosData
        }

        console.log("Treinos carregados:", treinos.value)
    } catch (error) {
        console.error('Erro ao fazer o fetch', error)
    }
})
</script>



<style scoped>
@import url('../assets/css/receba.css');
</style>