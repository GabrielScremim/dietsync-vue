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
                    <div class="col-lg-2 col-sm-12">
                        <nuxt-link :to="dieta.id_dieta">
                            <Button title="Excluir" corBtn="danger" />
                        </nuxt-link>
                    </div>
                    <div class="col-lg-2">
                        <nuxt-link :to="dieta.id_dieta">
                            <Button title="Editar Dieta" corBtn="primary" />
                        </nuxt-link>
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
                            <NuxtLink :to="`/treinos/${treino.id}`">
                                <Button title="Ver Detalhes" corBtn="success" />
                            </NuxtLink>
                        </td>
                        <td>
                            <NuxtLink :to="`/treinos/${treino.id}/excluir`">
                                <Button corBtn="danger">
                                    <i class="bi bi-x-circle"></i>
                                </Button>
                            </NuxtLink>
                        </td>
                        <td>
                            <NuxtLink :to="`/treinos/${treino.id}/editar`">
                                <Button corBtn="primary">
                                    <i class="bi bi-pencil-square"></i>
                                </Button>
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;

    height: 100hv;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    width: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    border-color: #00ffa3;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.177);
}

.img-container {
    width: 100%;
    height: 250px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    overflow: hidden;

}

.img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #2348ce;
}

.content {
    padding: 24 px 16px;
}

.name-profile {
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 4px;
}

.job {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #00ffa3;
    text-transform: uppercase;
    margin-bottom: 20px;
}

.descri {
    font-size: 14px;
    letter-spacing: 1px;
    color: rgb(0, 0, 0);

}

.links {
    width: 100%;
    display: flex;
    height: 0;
    border-top: 1px solid #00ffa3;
    transition: height 0.3s ease;
}

.card:hover .links {
    height: 65px;
}

.links .insta {
    --color: rgb(255, 216, 63);
}

.links .linke {
    --color1: #0e76a8;
}

.links .github {
    --color2: rgb(230, 237, 243);
}

.links>a {
    font-size: 20px;
    padding-block: 20px;
    color: black;
    flex: 1;
}

.links>a:not(:last-child) {
    border-right: 1px solid #00ffa3;
}

.links>.insta:hover {
    background-color: var(--color);


}

.links>.linke:hover {
    background-color: var(--color1);


}

.links>.github:hover {
    background-color: var(--color2);
}

.hero-text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
}

.news-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    /* Adiciona espaÃ§o para evitar que o conteÃºdo toque a borda */
}

.news-item {
    background-color: #004c2f;
    color: #00ffa3;
    border: 1px solid #2661c6;
    border-radius: 4px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 0 0 250px;
    /* Define a largura fixa de cada item */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.noticia {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    /* Ajuste conforme necessÃ¡rio */
    color: #00ffa3;
}

.noticia h1 {
    margin-top: 10px;
    margin: 0;
    font-size: 2em;
    text-align: center;
    color: #00ffa3;
}

.news-item img {
    width: 100%;
    height: 150px;
    /* Define a altura fixa para todas as imagens */
    object-fit: cover;
    /* Garante que a imagem se ajuste bem ao contÃªiner */
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
}

.news-item h2 {
    font-size: 1.1rem;
    /* Diminui um pouco o tamanho da fonte */
    margin: 0 0 0.5rem;
    text-align: center;
    /* Centraliza o tÃ­tulo */
}

.news-item p {
    font-size: 0.9rem;
    /* Diminui um pouco o tamanho da fonte */
    margin: 0 0 1rem;
    text-align: center;
    /* Centraliza a descriÃ§Ã£o */
}
</style>