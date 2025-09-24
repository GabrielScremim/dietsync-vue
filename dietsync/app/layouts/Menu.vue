<template>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
            <div>
                <NuxtLink to="/home" class="nav_logo">
                    <img src="http://152.67.45.167/img/vertical_1.png" alt="Logo DietSync" style="height: 50px;">
                </Nuxtlink>

                <div class="nav_list">
                    <NuxtLink to="/home" class="nav_link">
                        <i class="bi bi-house"></i>
                        <span class="nav_name">Home</span>
                    </Nuxtlink>

                    <NuxtLink to="/registrar-dieta" class="nav_link">
                        <i class="bi bi-egg-fried"></i>
                        <span class="nav_name">Registrar Dieta</span>
                    </Nuxtlink>

                    <NuxtLink to="/registrar-treino" class="nav_link">
                        <i class="bi bi-clipboard-heart"></i>
                        <span class="nav_name">Registrar Treino</span>
                    </Nuxtlink>

                    <NuxtLink to="/registrar-receita" class="nav_link">
                        <i class="bi bi-clipboard-plus"></i>
                        <span class="nav_name">Registrar Receitas</span>
                    </Nuxtlink>
                    <NuxtLink to="/dieta" class="nav_link">
                        <i class="bi bi-ui-checks-grid"></i>
                        <span class="nav_name">Dieta</span>
                    </Nuxtlink>

                    <NuxtLink to="/treinos" class="nav_link">
                        <i class="bi bi-heart-pulse-fill"></i>
                        <span class="nav_name">Treinos</span>
                    </Nuxtlink>

                    <NuxtLink to="/evolucao" class="nav_link">
                        <i class="bi bi-graph-up-arrow"></i>
                        <span class="nav_name">Evolução</span>
                    </Nuxtlink>

                    <NuxtLink to="/receitas" class="nav_link">
                        <i class="bi bi-journal-check"></i>
                        <span class="nav_name">Receitas</span>
                    </Nuxtlink>

                    <NuxtLink to="/agradecimentos" class="nav_link">
                        <i class="bi bi-hearts"></i>
                        <span class="nav_name">Agradecimentos</span>
                    </Nuxtlink>
                </div>
            </div>

            <NuxtLink to="/config" class="nav_link">
                <i class="bi bi-gear"></i>
                <span class="nav_name">Configurações</span>
            </Nuxtlink>
        </nav>
    </div>
</template>

<script>
export default {
    mounted() {
        if (process.client) {
            // Código para mostrar barra de navegação
            const mostrarBarraNavegacao = (toggleId, navId, bodyId, headerId) => {
                const toggle = document.getElementById(toggleId)
                const nav = document.getElementById(navId)
                const bodypd = document.getElementById(bodyId)
                const headerpd = document.getElementById(headerId)

                // Verifique se todos os elementos estão presentes
                if (toggle && nav && bodypd && headerpd) {
                    toggle.addEventListener('click', () => {
                        nav.classList.toggle('show')
                        bodypd.classList.toggle('body-pd')
                        headerpd.classList.toggle('body-pd')
                    })
                } else {
                    console.error('Não foi possível encontrar todos os elementos necessários.');
                }
            }

            mostrarBarraNavegacao('header-toggle', 'nav-bar', 'body-pd', 'header')

            // Código para verificação de senhas
            const verificarSenhas = () => {
                const senha = document.getElementById('nova_senha').value
                const confirmarSenha = document.getElementById('confirmar_senha').value
                const senhaFeedback = document.getElementById('senhaFeedback')

                if (senha !== confirmarSenha) {
                    senhaFeedback.style.display = 'block'
                    document.getElementById('nova_senha').classList.add('is-invalid')
                    document.getElementById('confirmar_senha').classList.add('is-invalid')
                } else {
                    senhaFeedback.style.display = 'none'
                    document.getElementById('nova_senha').classList.remove('is-invalid')
                    document.getElementById('confirmar_senha').classList.remove('is-invalid')
                }
            }

            const novaSenha = document.getElementById('nova_senha')
            const confirmarSenha = document.getElementById('confirmar_senha')

            // Adicionar os listeners se os elementos existirem
            if (novaSenha && confirmarSenha) {
                novaSenha.addEventListener('input', verificarSenhas)
                confirmarSenha.addEventListener('input', verificarSenhas)
            } else {
                console.error('Os campos de senha não foram encontrados.')
            }
        }
    }
}
</script>

<style>
@charset "UTF-8";

:root {
    --header-height: 3rem;
    --nav-width: 68px;
    --first-color: #004c2f;
    --first-color-light: #FFFFFF;
    --second-color: #00ffa3;
    --normal-font-size: 1rem;
    --z-fixed: 100;
}

*,
::before,
::after {
    box-sizing: border-box
}

#body {
    position: relative;
    margin: var(--header-height) 0 0 0;
    padding: 0 1rem;
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    transition: .5s;
}

#main {
    margin-top: 100px;
}

.header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0rem;
    transition: .5s;
    background-color: var(--first-color)
}

.l-navbar {
    position: fixed;
    top: 0;
    left: -30%;
    width: var(--nav-width);
    height: 100vh;
    background-color: var(--first-color);
    padding: .5rem 1rem 0 0;
    transition: .5s;
    z-index: var(--z-fixed);
}

.nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}

.nav_logo,
.nav_link {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    padding: .5rem 0 .5rem 1.5rem;
    text-decoration: none;
}

.nav_logo-name {
    color: var(--first-color-light);
    font-weight: 700
}

.nav_link {
    position: relative;
    color: var(--first-color-light);
    margin-bottom: 10px;
    transition: .3s
}

.nav_link:hover {
    text-decoration: none;
    color: var(--first-color-light);
    background: var(--second-color);
}

.nav_logo:hover {
    text-decoration: none;
    color: var(--first-color-light);
    background: var(--second-color);
}

.show {
    left: 0
}


.body-pd {
    padding-left: calc(var(--nav-width) + 1rem);
}

.active {
    color: var(--second-color);
}

.active::before {
    content: '';
    position: absolute;
    left: 0;
    width: 2px;
    height: 32px;
    background-color: var(--first-color-light)
}

.height-100 {
    height: 100vh
}

.col-3.text-white {
    font-size: 1em;
}

.active {
    background-color: var(--first-color);
    color: white;
}

@media screen and (max-width: 768px) {
    #body {
        margin: calc(var(--header-height) + 1rem) 0 0 0;
        padding-left: calc(var(--nav-width) + 2rem);
    }

    .header {
        height: calc(var(--header-height) + 1rem);
        padding: 0 2rem 0 calc(var(--nav-width) + 2rem);
    }

    .l-navbar {
        left: 0;
        padding: 1rem 1rem 0 0;
    }

    .show {
        width: calc(var(--nav-width) + 156px);
    }

    .body-pd {
        padding-left: calc(var(--nav-width) + 188px);
    }

    #menu {
        margin-right: 20px;
    }
}

@media screen and (min-width: 768px) {
    #body {
        margin: calc(var(--header-height) + 1rem) 0 0 0;
        padding-left: calc(var(--nav-width) + 2rem)
    }

    .header {
        height: calc(var(--header-height) + 1rem);
        padding: 0 2rem 0 calc(var(--nav-width) + 2rem)
    }

    .l-navbar {
        left: 0;
        padding: 1rem 1rem 0 0
    }

    .show {
        width: calc(var(--nav-width) + 156px)
    }

    .body-pd {
        padding-left: calc(var(--nav-width) + 188px)
    }
}
</style>