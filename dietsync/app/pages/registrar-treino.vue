<template>
        <h1>
            Registrar Treino
        </h1>
        <form method="POST">
            <Row >
                <InputData />
                <div class="col-lg-4 col-md-6 col-sm-12 my-2 mt-4 pt-2">
                    <select class="form-select" id="tipo" name="tipo">
                        <option value="" disabled>Selecione o tipo de treino</option>
                        <option value="musculacao">Musculação</option>
                        <option value="cardio">
                            Cardio</option>
                        <option value="funcional">>Funcional</option>
                    </select>
                </div>
                <Input title="Nome do Treino" tipo="nome_treino" valor="text" />
            </Row>
            <div class="row  my-5">
                <div class="col">
                    <label for="exercicios" class="form-label">Exercícios (separados por vírgula)</label>
                    <textarea type="text" class="form-control" id="exercicios" name="exercicios"></textarea>
                </div>
            </div>

            <Row >
                <Input title="Repetições" tipo="repeticoes" valor="text" />
                <Input title="Séries" tipo="series" valor="text" />
                <Input title="Objetivo" tipo="objetivo" valor="text" />
                <Input title="Duração" tipo="duracao" valor="text" />
                <Input title="Frequência" tipo="frequencia" valor="text" />

                <div class="col">
                    <label for="series" class="form-label">Séries</label>
                    <input type="text" class="form-control" id="series" name="series" value="">
                </div>
            </Row>
            <Button title="Criar Treino" corBtn="success"/>
        </form>
</template>


<script>
import InputData from '~/components/InputData.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
</script>