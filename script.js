// Datos de las ideas de negocio
const businessIdeas = [
    {
        id: 1,
        title: "Tienda Online de Productos Ecológicos",
        profile: "Venta de productos orgánicos y sostenibles directamente a consumidores conscientes.",
        skills: ["Marketing digital", "Gestión de inventario", "Conocimiento de productos ecológicos"],
        tips: "Empieza con un nicho específico como cosmética natural o alimentos orgánicos.",
        monetization: "Venta directa, suscripciones, membresías premium",
        category: "alimentacion",
        skillLevel: "principiante",
        investment: "baja"
    },
    {
        id: 2,
        title: "Aplicación de Gestión de Tareas para Equipos",
        profile: "Software que ayuda a equipos remotos a organizar y priorizar tareas colaborativamente.",
        skills: ["Desarrollo de software", "UX/UI Design", "Marketing B2B"],
        tips: "Enfócate en un sector específico como startups o agencias creativas.",
        monetization: "Suscripciones mensuales, versión premium con más funciones",
        category: "tecnologia",
        skillLevel: "avanzado",
        investment: "media"
    },
    {
        id: 3,
        title: "Servicio de Limpieza a Domicilio Premium",
        profile: "Ofrece servicios de limpieza de alta calidad con productos ecológicos y personal capacitado.",
        skills: ["Gestión de equipos", "Atención al cliente", "Logística"],
        tips: "Diferenciate con servicios adicionales como organización de espacios.",
        monetization: "Pago por servicio, contratos mensuales, venta de productos de limpieza",
        category: "servicios",
        skillLevel: "principiante",
        investment: "baja"
    },
    {
        id: 4,
        title: "Plataforma de Cursos Online Especializados",
        profile: "Crea y vende cursos online en un área específica como fotografía, programación o marketing.",
        skills: ["Creación de contenido", "Marketing digital", "Experiencia en el tema"],
        tips: "Empieza con 2-3 cursos bien elaborados antes de expandirte.",
        monetization: "Venta de cursos, membresía ilimitada, certificados pagos",
        category: "educacion",
        skillLevel: "intermedio",
        investment: "media"
    },
    {
        id: 5,
        title: "Consultoría de Marketing para Pequeñas Empresas",
        profile: "Ayuda a negocios locales a mejorar su presencia online y estrategias de marketing.",
        skills: ["Marketing digital", "Análisis de datos", "Comunicación"],
        tips: "Especialízate en un sector como restaurantes o tiendas minoristas.",
        monetization: "Honorarios por proyecto, retainer mensual, comisiones por resultados",
        category: "servicios",
        skillLevel: "intermedio",
        investment: "baja"
    },
    // 95 ideas adicionales seguirían aquí en un proyecto real
    // Solo mostramos 5 como ejemplo
];

// Variables globales
let displayedIdeas = 5;
const ideasPerLoad = 5;
let savedIdeas = JSON.parse(localStorage.getItem('savedIdeas')) || [];

// DOM Elements
const ideasContainer = document.getElementById('ideas-container');
const loadMoreBtn = document.getElementById('load-more');
const categoryFilter = document.getElementById('category');
const skillFilter = document.getElementById('skill');
const investmentFilter = document.getElementById('investment');
const resetFiltersBtn = document.getElementById('reset-filters');

// Mostrar ideas iniciales
function displayIdeas(ideas) {
    ideasContainer.innerHTML = '';
    
    ideas.slice(0, displayedIdeas).forEach(idea => {
        const isSaved = savedIdeas.includes(idea.id);
        
        const ideaCard = document.createElement('div');
        ideaCard.className = 'idea-card';
        ideaCard.innerHTML = `
            <div class="idea-card-header">
                <h3>${idea.title}</h3>
            </div>
            <div class="idea-card-body">
                <div class="idea-card-section">
                    <h4><i class="fas fa-info-circle"></i> Perfil</h4>
                    <p>${idea.profile}</p>
                </div>
                <div class="idea-card-section">
                    <h4><i class="fas fa-tools"></i> Habilidades requeridas</h4>
                    <p>${idea.skills.join(', ')}</p>
                </div>
                <div class="idea-card-section">
                    <h4><i class="fas fa-lightbulb"></i> Consejos</h4>
                    <p>${idea.tips}</p>
                </div>
                <div class="idea-card-section">
                    <h4><i class="fas fa-money-bill-wave"></i> Cómo monetizar</h4>
                    <p>${idea.monetization}</p>
                </div>
                <button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${idea.id}">
                    <i class="fas fa-${isSaved ? 'check' : 'bookmark'}"></i>
                    ${isSaved ? 'Guardado' : 'Guardar Idea'}
                </button>
            </div>
        `;
        
        ideasContainer.appendChild(ideaCard);
    });
    
    // Mostrar u ocultar botón "Cargar más"
    loadMoreBtn.style.display = displayedIdeas >= ideas.length ? 'none' : 'block';
}

// Filtrar ideas
function filterIdeas() {
    const category = categoryFilter.value;
    const skill = skillFilter.value;
    const investment = investmentFilter.value;
    
    return businessIdeas.filter(idea => {
        return (category === 'all' || idea.category === category) &&
               (skill === 'all' || idea.skillLevel === skill) &&
               (investment === 'all' || idea.investment === investment);
    });
}

// Cargar más ideas
function loadMoreIdeas() {
    displayedIdeas += ideasPerLoad;
    displayIdeas(filterIdeas());
}

// Guardar/eliminar idea
function toggleSaveIdea(ideaId) {
    const index = savedIdeas.indexOf(ideaId);
    
    if (index === -1) {
        savedIdeas.push(ideaId);
    } else {
        savedIdeas.splice(index, 1);
    }
    
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
    displayIdeas(filterIdeas());
}

// Resetear filtros
function resetFilters() {
    categoryFilter.value = 'all';
    skillFilter.value = 'all';
    investmentFilter.value = 'all';
    displayedIdeas = ideasPerLoad;
    displayIdeas(businessIdeas);
}

// Event Listeners
loadMoreBtn.addEventListener('click', loadMoreIdeas);
categoryFilter.addEventListener('change', () => {
    displayedIdeas = ideasPerLoad;
    displayIdeas(filterIdeas());
});
skillFilter.addEventListener('change', () => {
    displayedIdeas = ideasPerLoad;
    displayIdeas(filterIdeas());
});
investmentFilter.addEventListener('change', () => {
    displayedIdeas = ideasPerLoad;
    displayIdeas(filterIdeas());
});
resetFiltersBtn.addEventListener('click', resetFilters);

// Delegación de eventos para botones de guardar
ideasContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn') || e.target.closest('.save-btn')) {
        const btn = e.target.classList.contains('save-btn') ? e.target : e.target.closest('.save-btn');
        const ideaId = parseInt(btn.dataset.id);
        toggleSaveIdea(ideaId);
    }
});

// Inicializar
displayIdeas(businessIdeas);