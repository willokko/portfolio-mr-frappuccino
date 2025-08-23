// Dados das imagens (será carregado do JSON)
let portfolioData = [];
let currentCategory = 'all';

// Elementos do DOM
const portfolioGrid = document.getElementById('portfolioGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalType = document.getElementById('modalType');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImage');


// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    setupEventListeners();
    setupSmoothScrolling();
    setupMobileMenu();
});

// Configurar event listeners
function setupEventListeners() {
    // Categorias
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterPortfolio(category);
            
            // Atualizar botão ativo
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Modal
    closeModal.addEventListener('click', closeImageModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Evento de clique na imagem do modal para abrir em tela cheia
    modalImage.addEventListener('click', openFullscreenModal);

    // Fechar modal com ESC
    document.addEventListener('keydown', handleKeyDown);
}

// Configurar menu mobile
function setupMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

// Configurar scroll suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
}

// Carregar dados do portfólio
async function loadPortfolioData() {
    try {
        // Tentar carregar do arquivo JSON local
        const response = await fetch('portfolio-data.json');
        if (response.ok) {
            portfolioData = await response.json();
        } else {
            // Se não conseguir carregar, usar dados de exemplo
            portfolioData = getSampleData();
        }
        
        renderPortfolio();
    } catch (error) {
        console.log('Usando dados de exemplo:', error);
        portfolioData = getSampleData();
        renderPortfolio();
    }
}

// Dados de exemplo para demonstração
function getSampleData() {
    return [
        {
            id: 1,
            title: "Retrato Digital",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            date: "2024-01-15",
            type: "digital",
            description: "Retrato digital criado com técnicas modernas"
        },
        {
            id: 2,
            title: "Sketch Tradicional",
            imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            date: "2024-01-10",
            type: "traditional",
            description: "Sketch feito a lápis em papel"
        },
        {
            id: 3,
            title: "Ilustração Fantástica",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            date: "2024-01-05",
            type: "digital",
            description: "Criatura fantástica em estilo digital"
        },
        {
            id: 4,
            title: "Estudo de Anatomia",
            imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            date: "2023-12-28",
            type: "sketch",
            description: "Estudo anatômico em carvão"
        },
        {
            id: 5,
            title: "Paisagem Urbana",
            imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            date: "2023-12-20",
            type: "traditional",
            description: "Paisagem urbana em aquarela"
        },
        {
            id: 6,
            title: "Personagem de RPG",
            imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            date: "2023-12-15",
            type: "digital",
            description: "Personagem para jogo de RPG"
        }
    ];
}

// Renderizar portfólio
function renderPortfolio() {
    const filteredData = currentCategory === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.type === currentCategory);
    
    portfolioGrid.innerHTML = '';
    
    filteredData.forEach((item, index) => {
        const portfolioItem = createPortfolioItem(item, index);
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Criar item do portfólio
function createPortfolioItem(item, index) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.setAttribute('data-type', item.type);
    div.style.animationDelay = `${index * 0.1}s`;
    
    const formattedDate = formatDate(item.date);
    
    div.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" class="portfolio-image" loading="lazy">
        <div class="portfolio-info">
            <h3 class="portfolio-title">${item.title}</h3>
            <div class="portfolio-meta">
                <span class="portfolio-date">${formattedDate}</span>
                <span class="portfolio-type">${getTypeLabel(item.type)}</span>
            </div>
        </div>
    `;
    
    // Adicionar event listener para abrir modal
    div.addEventListener('click', () => openImageModal(item));
    
    return div;
}

// Filtrar portfólio
function filterPortfolio(category) {
    currentCategory = category;
    renderPortfolio();
}

// Abrir modal da imagem
function openImageModal(item) {
    modalImage.src = item.imageUrl;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = formatDate(item.date);
    modalType.textContent = getTypeLabel(item.type);
    modalDescription.textContent = item.description || '';
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focar no modal para acessibilidade
    modal.focus();
}

// Abrir modal em tela cheia
function openFullscreenModal() {
    fullscreenImage.src = modalImage.src;
    fullscreenImage.alt = modalImage.alt;
    fullscreenImage.classList.add('zoomIn');
    fullscreenModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Fechar modal em tela cheia
function closeFullscreenModal() {
    fullscreenImage.classList.remove('zoomIn');
    fullscreenImage.classList.add('zoomOut');

    // Espera a animação de zoomOut terminar antes de esconder o modal
    setTimeout(() => {
        fullscreenModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        fullscreenImage.classList.remove('zoomOut');
    }, 300);
}

// Fechar modal
function closeImageModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Adicionar evento de clique no modal fullscreen para fechar
fullscreenModal.addEventListener('click', closeFullscreenModal);

// Prevenir scroll do body quando modal estiver aberto
function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// Função para fechar modal com ESC
function handleKeyDown(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeImageModal();
    }
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Obter label do tipo
function getTypeLabel(type) {
    const labels = {
        'digital': 'Digital',
        'traditional': 'Tradicional',
        'sketch': 'Sketch'
    };
    return labels[type] || type;
}

// Função para adicionar nova imagem (pode ser chamada externamente)
function addNewImage(imageData) {
    portfolioData.push(imageData);
    renderPortfolio();
}

// Função para atualizar dados do portfólio
function updatePortfolioData(newData) {
    portfolioData = newData;
    renderPortfolio();
}

// Expor funções para uso externo
window.PortfolioManager = {
    addNewImage,
    updatePortfolioData,
    filterPortfolio
}; 