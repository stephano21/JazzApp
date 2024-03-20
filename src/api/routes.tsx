export const Endpoints = {
  BaseURL: 'https://1dfe-157-100-158-182.ngrok-free.app',
  BaseApi: '/api',
  login: '/auth/login/',
  register: '/auth/register/',
  Token: '/auth/refresh/',
  Poligonos: '/geolotes/',
  perfil: '/auth/porfile/',
  Lectura: '/lecturas/',
  Plantas: '/plantas/',
};
//TODO: modificar esoto
export const checkEnviroment =
  {
    'https://dmspeapi.rfsdeposito.com': 'Producción',
    'https://dmsperuapi.qa.rfsdeposito.com': 'Desarrollo',
  }[Endpoints.BaseURL] || 'Local';
