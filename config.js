// Configurações do Portfólio Artístico
// Edite este arquivo para personalizar seu site

const PORTFOLIO_CONFIG = {
    // Informações pessoais
    artist: {
        name: "Artista",
        title: "Portfólio Artístico",
        description: "Artista apaixonado por criar e compartilhar minha visão única através de desenhos e ilustrações.",
        about: [
            "Artista apaixonado por criar e compartilhar minha visão única através de desenhos e ilustrações.",
            "Cada peça conta uma história e representa um momento de inspiração.",
            "Minhas obras abrangem diferentes estilos e técnicas, desde sketches rápidos até ilustrações digitais elaboradas."
        ]
    },

    // Redes sociais
    social: {
        instagram: {
            username: "mr.frappuccino",
            url: "https://instagram.com/mr.frappuccino",
            display: true
        },
        // Adicione outras redes sociais aqui
        // twitter: {
        //     username: "seu_usuario",
        //     url: "https://twitter.com/seu_usuario",
        //     display: false
        // }
    },

    // Configurações do portfólio
    portfolio: {
        // Tipos de arte disponíveis
        artTypes: {
            digital: {
                label: "Digital",
                color: "#667eea",
                description: "Arte digital criada com ferramentas digitais"
            },
            traditional: {
                label: "Tradicional",
                color: "#764ba2",
                description: "Arte criada com materiais tradicionais"
            },
            sketch: {
                label: "Sketch",
                color: "#f093fb",
                description: "Esboços e estudos rápidos"
            }
        },

        // Configurações de exibição
        display: {
            itemsPerPage: 12,
            showDate: true,
            showType: true,
            showDescription: false,
            enableFilters: true,
            enableModal: true
        }
    },

    // Configurações visuais
    theme: {
        colors: {
            primary: "#667eea",
            secondary: "#764ba2",
            accent: "#f093fb",
            background: "#fafafa",
            text: "#333333",
            textLight: "#666666"
        },
        fonts: {
            primary: "Inter, sans-serif",
            secondary: "Georgia, serif"
        },
        animations: {
            enable: true,
            duration: "0.3s",
            easing: "ease"
        }
    },

    // Configurações de SEO
    seo: {
        title: "Portfólio Artístico - Desenhos e Ilustrações",
        description: "Portfólio de arte digital e tradicional com desenhos, ilustrações e sketches criativos.",
        keywords: "arte, portfólio, desenhos, ilustrações, sketches, artista, digital, tradicional",
        author: "Artista",
        ogImage: "https://exemplo.com/og-image.jpg"
    },

    // Configurações de performance
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        preloadCritical: true
    }
};

// Função para aplicar configurações
function applyConfig() {
    // Aplicar título da página
    document.title = PORTFOLIO_CONFIG.seo.title;
    
    // Aplicar nome do artista
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.textContent = PORTFOLIO_CONFIG.artist.title;
    }
    
    // Aplicar descrição do herói
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = `Bem-vindo ao meu mundo artístico`;
    }
    
    // Aplicar descrição sobre
    const aboutTexts = document.querySelectorAll('.about-text p');
    if (aboutTexts.length >= 2) {
        aboutTexts[0].textContent = PORTFOLIO_CONFIG.artist.about[0];
        aboutTexts[1].textContent = PORTFOLIO_CONFIG.artist.about[1];
    }
    
    // Aplicar configurações de redes sociais
    if (PORTFOLIO_CONFIG.social.instagram.display) {
        const instagramLinks = document.querySelectorAll('.social-link.instagram');
        instagramLinks.forEach(link => {
            link.href = PORTFOLIO_CONFIG.social.instagram.url;
            const usernameSpan = link.querySelector('span') || link;
            usernameSpan.textContent = `@${PORTFOLIO_CONFIG.social.instagram.username}`;
        });
    }
    
    // Aplicar cores do tema
    const root = document.documentElement;
    root.style.setProperty('--primary-color', PORTFOLIO_CONFIG.theme.colors.primary);
    root.style.setProperty('--secondary-color', PORTFOLIO_CONFIG.theme.colors.secondary);
    root.style.setProperty('--accent-color', PORTFOLIO_CONFIG.theme.colors.accent);
}

// Aplicar configurações quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
} else {
    applyConfig();
}

// Exportar configurações para uso global
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG; 