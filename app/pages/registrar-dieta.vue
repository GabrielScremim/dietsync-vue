<template>
    <h2>Criar Dieta</h2>
    <form @submit.prevent="createDiet">
        <!-- Campos para editar a dieta -->
        <Row>
            <InputField label="Nome da Dieta" name="nome_dieta" type="text" placeholder="Digite o nome da Dieta"
                v-model="form.nome_dieta" />
            <InputField label="Tipo de Dieta" name="tipo_dieta" type="text" placeholder="Ex: ganho de massa" v-model="form.tipo_dieta" />
            <InputField label="Quantidade" name="quantidade" type="number" placeholder="Ex: 2 (duas vezes ao dia)"
                v-model="form.quantidade" />
        </Row>
        <Row>
            <div class="form-group col">
                <label for="alimentos">Alimentos (separados por vírgula)</label>
                <textarea class="form-control" v-model="form.alimentos" rows="3"
                    placeholder="Digite os alimentos"></textarea>
            </div>
        </Row>
        <Row>
            <InputField label="Calorias" name="calorias" type="number" placeholder="Ex: 20" v-model="form.calorias" />
            <InputField label="Proteínas" name="proteinas" type="number" placeholder="Ex: 2" v-model="form.proteinas" />
            <InputField label="Carboidratos" name="carboidratos" type="number" placeholder="Ex: 21" v-model="form.carboidratos" />
        </Row>
        <Row>
            <InputField label="Gorduras" name="gorduras" type="number" placeholder="Ex: 21" v-model="form.gorduras" />
            <InputData v-model="form.data" />
            <InputField label="Refeição" name="refeicao" type="number" placeholder="Ex: Almoço" v-model="form.refeicao" />
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