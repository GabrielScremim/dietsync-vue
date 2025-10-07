<template>
    <h2>Receitas Disponíveis</h2>
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
                    <Button corBtn="danger" @click="ExcluirReceita(receita.id_receitas)">
                        <i class="bi bi-x-circle"></i>
                    </Button>
                </td>
                <td>
                    <NuxtLink :to="`/receitas/editar/${receita.id_receitas}`">
                        <button type="submit" class="btn btn-primary"><i class="bi bi-pencil-square"></i></button>
                    </NuxtLink>
                </td>
            </tr>
        </tbody>
    </Table>

</template>

<script setup>
import { ref, onMounted } from 'vue';
const receitas = ref([]); // Aqui vamos guardar as receitas

try {
    const { data } = await useFetch('http://localhost:3001/receitas', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5vbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsImlhdCI6MTc1OTUxMDQ4NywiZXhwIjoxNzU5NTE0MDg3fQ.FiHgEs0TKTd9C2VmedAnRJqiaNpGkcaGhdumNpGskoE'
        }
    }
    );

    // Atualiza a variável reativa com as receitas recebidas
    if (Array.isArray(data.value)) {
        receitas.value = data.value;
    }
} catch (error) {
    console.error("Erro ao fazer o fetch:", error);
}

const ExcluirReceita = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta Receita?")) {
        try {
            const res = await fetch(`http://localhost:3001/receita/excluir/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                data.value = data.value.filter(e => e.id !== id);
                alert("Receita excluída com sucesso!");
            } else {
                const erro = await res.json();
                alert("Erro ao excluir: " + erro.message);
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao conectar com a API.");
        }
    }
}
</script>
