<template>
    <h1>Treinos Disponíveis</h1>

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
            <tr>
                <td>
                    Treino
                </td>
                <td>
                    <NuxtLink to="#">
                        <Button title="Ver Detalhes" corBtn="success" />
                    </NuxtLink>
                </td>
                <td>
                    <NuxtLink href="#">
                        <Button corBtn="danger">
                            <i class="bi bi-x-circle"></i>
                        </Button>
                    </NuxtLink>
                </td>
                <td>
                    <NuxtLink href="#">
                        <Button corBtn="primary">
                            <i class="bi bi-pencil-square"></i>
                        </Button>
                    </NuxtLink>
                </td>
            </tr>
        </tbody>
    </table>
</template>
