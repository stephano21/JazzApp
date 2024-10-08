export const Endpoints = {
  BaseURL: 'https://4d64-157-100-111-126.ngrok-free.app',
  BaseApi: '/api',
  login: '/auth/login/',
  register: '/auth/register/',
  Token: '/auth/refresh/',
  Poligonos: '/geolotes/',
  perfil: '/auth/porfile/',
  Lectura: '/lecturas/',
  Plantas: '/plantas/',
  Task: '/Task',
};
//TODO: modificar esoto
export const checkEnviroment =
  {
    'https://jazz-api.up.railway.app': 'Producción',
    'https://dmsperuapi.qa.rfsdeposito.com': 'Desarrollo',
  }[Endpoints.BaseURL] || 'Local';
