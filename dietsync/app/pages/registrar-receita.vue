<template>
    <!-- <h1>Editar Receita</h1> -->
    <h1>Registrar Receita</h1>
    <form method="POST">
        <Input title="Nome Receita" tipo="nome_receita" valor="text" />
        <Row>
            <label for="ingredientes" class="form-label">Ingredientes (separados por vírgulas)</label>
            <textarea class="form-control" id="ingredientes" name="ingredientes" rows="4"></textarea>
        </Row>
        <Row>
            <label for="modo_preparo" class="form-label">Modo de Preparo</label>
            <textarea class="form-control" id="modo_preparo" name="modo_preparo" rows="4"></textarea>
        </Row>
        <Row>
            <Input title="Calorias" tipo="calorias" valor="number" />
            <Input title="Proteínas" tipo="proteinas" valor="number" />
            <Input title="Carboidratos" tipo="carboidratos" valor="number" />
            <Input title="Gordura" tipo="gordura" valor="number" />
        </Row>
        <Button title="Salvar" corBtn="success" />
    </form>
</template>
