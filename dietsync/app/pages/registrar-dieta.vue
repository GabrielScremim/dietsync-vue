<template>
    <h2>Criar Dieta</h2>
    <form @submit.prevent="createDiet">
        <!-- Campos para editar a dieta -->
        <Row>
            <Input title="Nome da Dieta" v-model="form.nome_dieta" tipo="nome_dieta" valor="text" />
            <Input title="Tipo de Dieta" v-model="form.tipo_dieta" tipo="tipo_dieta" valor="text" />
            <Input title="Quantidade" v-model="form.quantidade" tipo="quantidade" valor="text" />
        </Row>
        <Row>
            <div class="form-group col">
                <label for="alimentos">Alimentos (separados por vírgula)</label>
                <textarea class="form-control" v-model="form.alimentos" rows="3"
                    placeholder="Digite os alimentos"></textarea>
            </div>
        </Row>
        <Row>
            <Input title="Calorias" v-model="form.calorias" tipo="calorias" valor="text" />
            <Input title="Proteínas" v-model="form.proteinas" tipo="proteinas" valor="text" />
            <Input title="Carboidratos" v-model="form.carboidratos" tipo="carboidratos" valor="text" />
        </Row>
        <Row>
            <Input title="Gorduras" v-model="form.gorduras" tipo="gorduras" valor="text" />
            <InputData v-model="form.data" />
            <Input title="Refeição" v-model="form.refeicao" tipo="refeicao" valor="text" />
        </Row>
        <Row>
            <div class="form-group col">
                <label for="observacoes">Observações</label>
                <textarea class="form-control" v-model="form.observacoes" rows="3"
                    placeholder="Digite as observações"></textarea>
            </div>
        </Row>
        <Button title="Criar Dieta" corBtn="success" />
    </form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
    nome_dieta: "",
    tipo_dieta: "",
    calorias: "",
    proteinas: "",
    carboidratos: "",
    gorduras: "",
    data: "",
    refeicao: "",
    quantidade: "",
    alimentos: "",
    observacoes: "",
})

const createDiet = async () => {
    try {
        console.log("Dados enviados:", form.value); // Adicione um log para depuração
        const res = await $fetch('http://localhost:3001/criarDieta', {
            method: 'POST',
            body: JSON.stringify(form.value)
        })

        const data = await res.json();
        console.log("resposta da API: ", data);

        if (res.ok) {
            alert("Dieta criado com sucesso");
        } else {
            alert("Erro: " + data.message);
        }
    } catch (err) {
        console.log(err);
        alert("Erro ao conectar com a API.");
    }
}
</script>