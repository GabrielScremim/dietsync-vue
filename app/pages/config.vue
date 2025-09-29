<template>
    <h1>Configurações do Sistema</h1>
    <form method="post">
        <Row>
            <Input title="Nome" tipo="nome" valor="text" />
            <Input title="Sobrenome" tipo="sobrenome" valor="text" />
            <Input title="Meta" tipo="meta" valor="text" />
        </Row>
        <Row>
            <div class="col">
                <label for="sexo" class="form-label">Sexo</label>
                <select class="form-select" id="sexo" name="sexo" required>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                </select>
            </div>
            <InputData />
            <Input title="Peso (kg)" tipo="peso" valor="number" />
            <Input title="Altura (m)" tipo="altura" valor="number" />
            <Input title="Email" tipo="email" valor="text" />
        </Row>
    </form>


    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Alterar Senha
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <form class="px-4 py-3" id="senhaForm" method="get">
                <div class="mb-3">
                    <label for="nova_senha" class="form-label">Nova Senha</label>
                    <input type="password" class="form-control" id="nova_senha" name="nova_senha">
                </div>
                <div class="mb-3">
                    <label for="confirmar_senha" class="form-label">Confirmar Senha</label>
                    <input type="password" class="form-control" id="confirmar_senha" name="confirmar_senha">
                    <div id="senhaFeedback" class="invalid-feedback">As senhas não coincidem.</div>
                </div>
                <button type="submit" class="btn btn-primary" onclick="verificarSenhas()">Salvar</button>
            </form>
        </div>
    </div>
    <div class="d-flex bd-highlight mb-3">
        <div class="pt-2 bd-highlight">
            <Button title="Salvar Alterações" corBtn="success" />
        </div>
        <div class="ml-auto p-2 bd-highlight">
            <a href="..\classes\utils\logout">
                <Button title="Logout" corBtn="danger">
                </Button>
            </a>

        </div>
    </div>
</template>

<script setup>
function verificarSenhas() {
    var senha = document.getElementById('nova_senha').value;
    var confirmarSenha = document.getElementById('confirmar_senha').value;
    var senhaFeedback = document.getElementById('senhaFeedback');

    if (senha !== confirmarSenha) {
        senhaFeedback.style.display = 'block';
        document.getElementById('nova_senha').classList.add('is-invalid');
        document.getElementById('confirmar_senha').classList.add('is-invalid');
    } else {
        senhaFeedback.style.display = 'none';
        document.getElementById('nova_senha').classList.remove('is-invalid');
        document.getElementById('confirmar_senha').classList.remove('is-invalid');
        // Aqui você pode adicionar o código para enviar o formulário ou fazer outra coisa após a verificação bem-sucedida
    }
}
</script>