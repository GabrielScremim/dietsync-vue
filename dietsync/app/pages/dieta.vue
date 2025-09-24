<template>
    <div class="container" id="main">
        <h2>Plano de Refeições do Dia</h2>
        <div class="list-group mt-4">
            <strong>
                <a href="#" class="list-group-item list-group-item-action" data-toggle="collapse">
                </a>
                <!-- Adicionando o botão de exclusão -->
                <a href="dieta.php?id_excluir=<?= $dieta['id_dieta'] ?>" class="btn btn-danger btn-sm ml-2">Excluir</a>
                <a href="Registrar-dieta.php?id_editar_dieta=<?= $dieta['id_dieta'] ?>"
                    class="btn btn-success btn-sm ml-2">Editar Dieta</a>
            </strong>
            <div class="collapse w-100" id="<?= $dieta['refeicao'] ?>">
                <div class="card card-body">
                    <ul>
                        <li><strong>Data da Dieta:</strong>
                            teste
                        </li>
                        <li><strong>Nome da Dieta:</strong>
                            teste
                        </li>
                        <li><strong>Tipo de Dieta:</strong>
                            teste
                        </li>
                        <li><strong>Calorias:</strong>
                            teste
                        </li>
                        <li><strong>Proteínas:</strong>
                            teste
                        </li>
                        <li><strong>Carboidratos:</strong>
                            teste
                        </li>
                        <li><strong>Gorduras:</strong>
                            teste
                        </li>
                        <li>
                            <strong>Alimentos:</strong>
                        </li>
                        <li><strong>Quantidade:</strong>
                            teste
                        </li>
                        <li><strong>Observações:</strong>
                            teste
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
