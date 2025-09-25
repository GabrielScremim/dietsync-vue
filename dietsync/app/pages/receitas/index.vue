<template>
    <h2>Receitas Disponíveis</h2>
    <form method="GET" action="">
        <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">
                <!-- Formulário de filtro e pesquisa -->
                <label for="filtroReceita">Filtrar por:</label>
                <select name="filtroReceita" id="filtroReceita" class="form-select">
                    <option value="todas">
                        Todas as Receitas
                    </option>
                    <option value="MinhasReceitas">
                        Minhas Receitas
                    </option>
                </select>
            </div>
            <div class="col">
                <Button title="Aplicar Filtro" corBtn="success" />
            </div>
        </div>
    </form>

    <Table>
        <thead>
            <tr>
                <th>Nome da Receita</th>
                <th>Detalhes</th>
                <th>Excluir</th>
                <th>Editar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="receita in receitas" :key="receita.id">
                <td>{{ receita.nome_receita }}</td>
                <td>
                    <NuxtLink :to="`/receitas/${receita.id_receitas}`">
                      <Button title="Ver Detalhes" corBtn="success" />
                    </NuxtLink>
                </td>
                <td>
                    <form method="get" action="">
                        <input type="hidden" name="id_excluir_receita" value="' . $receita['id_receitas'] . '">
                        <button type="submit" class="btn btn-danger">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </form>
                </td>
                <td>
                    <a href="registrar-receita">
                        <button type="submit" class="btn btn-success"><i class="bi bi-pencil-square"></i></button>
                    </a>
                </td>
            </tr>
        </tbody>
    </Table>

</template>

<script setup>
import { ref, onMounted } from 'vue';
const receitas = ref([]); // Aqui vamos guardar as receitas

try {
    const { data } = await useFetch('http://localhost:3001/receitas');
    console.log("Resultado do fetch", data.value);

    // Atualiza a variável reativa com as receitas recebidas
    if (Array.isArray(data.value)) {
        receitas.value = data.value;
    }
} catch (error) {
    console.error("Erro ao fazer o fetch:", error);
}
</script>
