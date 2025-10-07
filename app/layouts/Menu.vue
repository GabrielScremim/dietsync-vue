<template>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
            <div>
                <NuxtLink to="/" class="nav_logo">
                    <img src="http://152.67.45.167/img/vertical_1.png" alt="Logo DietSync" style="height: 50px;">
                </Nuxtlink>

                <div class="nav_list">
                    <NuxtLink to="/" class="nav_link" :class="{ active: $route.path === '/' }">
                        <i class="bi bi-house"></i>
                        <span class="nav_name">Home</span>
                    </NuxtLink>

                    <NuxtLink to="/registrar-dieta" class="nav_link" :class="{ active: $route.path === '/registrar-dieta' }">
                        <i class="bi bi-egg-fried"></i>
                        <span class="nav_name">Registrar Dieta</span>
                    </NuxtLink>

                    <NuxtLink to="/registrar-treino" class="nav_link" :class="{ active: $route.path === '/registrar-treino' }">
                        <i class="bi bi-clipboard-heart"></i>
                        <span class="nav_name">Registrar Treino</span>
                    </NuxtLink>

                    <NuxtLink to="/registrar-receita" class="nav_link" :class="{ active: $route.path === '/registrar-receita' }">
                        <i class="bi bi-clipboard-plus"></i>
                        <span class="nav_name">Registrar Receitas</span>
                    </NuxtLink>

                    <NuxtLink to="/dieta" class="nav_link" :class="{ active: $route.path === '/dieta' }">
                        <i class="bi bi-ui-checks-grid"></i>
                        <span class="nav_name">Dieta</span>
                    </NuxtLink>

                    <NuxtLink to="/treinos" class="nav_link" :class="{ active: $route.path === '/treinos' }">
                        <i class="bi bi-heart-pulse-fill"></i>
                        <span class="nav_name">Treinos</span>
                    </NuxtLink>

                    <NuxtLink to="/evolucao" class="nav_link" :class="{ active: $route.path === '/evolucao' }">
                        <i class="bi bi-graph-up-arrow"></i>
                        <span class="nav_name">Evolução</span>
                    </NuxtLink>

                    <NuxtLink to="/receitas" class="nav_link" :class="{ active: $route.path === '/receitas' }">
                        <i class="bi bi-journal-check"></i>
                        <span class="nav_name">Receitas</span>
                    </NuxtLink>

                    <NuxtLink to="/agradecimentos" class="nav_link" :class="{ active: $route.path === '/agradecimentos' }">
                        <i class="bi bi-hearts"></i>
                        <span class="nav_name">Agradecimentos</span>
                    </NuxtLink>
                </div>
            </div>

            <NuxtLink to="/config/40" class="nav_link" :class="{ active: $route.path === '/config' }">
                <i class="bi bi-gear"></i>
                <span class="nav_name">Configurações</span>
            </NuxtLink>
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
        }
    }
}
</script>