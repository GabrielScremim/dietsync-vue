<template>
    <h2>Criar Dieta</h2>
    <form @submit.prevent="salvarDieta">
        <!-- Campos para editar a dieta -->
        <Row>
            <Input title="Nome da Dieta" tipo="nome_dieta" valor="text" />
            <Input title="Tipo de Dieta" tipo="tipo_dieta" valor="text" />
            <Input title="Quantidade" tipo="quantidade" valor="text" />
        </Row>
        <Row>
            <div class="form-group col">
                <label for="alimentos">Alimentos (separados por vírgula)</label>
                <textarea class="form-control" id="alimentos" name="alimentos" rows="3"
                    placeholder="Digite os alimentos"></textarea>
            </div>
        </Row>
        <Row>
            <Input title="Calorias" tipo="calorias" valor="text" />
            <Input title="Proteínas" tipo="proteinas" valor="text" />
            <Input title="Carboidratos" tipo="carboidratos" valor="text" />
        </Row>
        <Row>
            <Input title="Gorduras" tipo="gorduras" valor="text" />
            <InputData />
            <Input title="Refeição" tipo="refeicao" valor="text" />
        </Row>
        <Row>
            <div class="form-group col">
                <label for="observacoes">Observações</label>
                <textarea class="form-control" id="observacoes" name="observacoes" rows="3"
                    placeholder="Digite as observações"></textarea>
            </div>
        </Row>
        <Button title="Criar Dieta" corBtn="success" />
    </form>
</template>

<script>
import { ref } from 'vue'

const form = ref({
    nome_dieta: '',
    tipo_dieta: '',
    quantidade: '',
    calorias: '',
    proteinas: '',
    carboidratos: '',
    gorduras: '',
    data: '',
    refeicao: '',
    alimentos: '',
    observacoes: ''
})

const salvarDieta = async () => {
    try {
        const res = await $fetch('/api/dieta', {
            method: 'POST',
            body: form.value
        })
        alert(res.message)
        console.log(res.data)
    } catch (err) {
        console.error('Erro ao salvar dieta:', err)
    }
}
</script>