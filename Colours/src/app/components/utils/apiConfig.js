const apiUrls = {
  local: "http://localhost:4000",
  production: "https://backend-production-687d.up.railway.app",
  develop:"https://backend-production-d353.up.railway.app"
};

// Exporta ambas URLs y una por defecto (cambia manualmente aquí)
export const API_URL_LOCAL = apiUrls.local;
export const API_URL_PRODUCTION = apiUrls.production;

export default apiUrls.develop; // ← Cambia a .local si necesitas desarrollo
