// Dados das imagens (será carregado do JSON)
let portfolioData = [];
let currentFilter = 'all';

// Elementos do DOM
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalType = document.getElementById('modalType');
const closeModal = document.querySelector('.close');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioData();
    setupEventListeners();
    setupSmoothScrolling();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterPortfolio(filter);
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
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

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
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
    const filteredData = currentFilter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.type === currentFilter);
    
    portfolioGrid.innerHTML = '';
    
    filteredData.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Criar item do portfólio
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.setAttribute('data-type', item.type);
    
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
function filterPortfolio(filter) {
    currentFilter = filter;
    renderPortfolio();
}

// Abrir modal da imagem
function openImageModal(item) {
    modalImage.src = item.imageUrl;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = `Data: ${formatDate(item.date)}`;
    modalType.textContent = `Tipo: ${getTypeLabel(item.type)}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeImageModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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