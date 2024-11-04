export const Endpoints = {
  //BaseURL: 'https://c875-157-100-111-121.ngrok-free.app',
  BaseURL:'https://jazz-api.up.railway.app',
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
