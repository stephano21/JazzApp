export const Endpoints = {
  BaseURL: 'https://1ff0-157-100-113-222.ngrok-free.app',
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
    'https://dmspeapi.rfsdeposito.com': 'Producción',
    'https://dmsperuapi.qa.rfsdeposito.com': 'Desarrollo',
  }[Endpoints.BaseURL] || 'Local';
