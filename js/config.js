// F&K Webdesign - Frontend Konfiguration
// ========================================

const CONFIG = {
  // Backend API URL
  // Für lokale Entwicklung: 'http://localhost:3000'
  // Für Produktion: URL zu deinem gehosteten Backend
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://www.fkwebdesign.de', // HIER DEINE BACKEND-URL EINTRAGEN!
  
  // API Endpunkte
  ENDPOINTS: {
    CONTACT: '/api/contact',
    HEALTH: '/api/health'
  }
};

// Export für andere Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}


