import {StyleSheet} from 'react-native';
import { Background } from '../screens/Background';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

/*export const colores = {
  darkTransparent: 'rgba(0,0,0,0.5)',
  darkLoader: 'rgba(0,0,0,0.75)',
  whiteTransparent: 'rgba(255,255,255,0.8)',
  blanco: '#ffffff',
  primario: '#075F9D',
  primarioclaro: '#e5f5ff',
  secundario: '#f7aa21',
  negro: '#000000',
  plomo: 'grey',
  plomoclaro: '#ededed80',
  rojo: '#eb4034',
  azul: '#075F9D',
  azulClaro:'#C7E4FF',
  verde: '#16c40c',
  rojoClaro:'#FFE7E7',
  accent : '#4CAF50',
};*/
export const colores = {
  darkTransparent: 'rgba(0,0,0,0.5)',
  darkLoader: 'rgba(0,0,0,0.75)',
  whiteTransparent: 'rgba(255,255,255,0.8)',
  primary: '#075F9D',       // Primary color
  secondary: '#F0A500',     // Secondary color
  accent: '#1CB5E0',        // Accent color
  background: '#F5F5F5',    // Background color
  textPrimary: '#FFFFFF',   // Primary text color
  textSecondary: '#404040', // Secondary text color
  success: '#4CAF50',       // Success color
  error: '#E53935',         // Error color
  inactive: '#A9A9A9',
  black: '#000000',
  inactiveLight: '#ededed80',
  primaryLight:'#C7E4FF',
};

export const iconos = {
  IonicIcons: {
    albums: 'albums-outline',
    advertencia: 'warning-outline',
    archivo: 'archive-outline',
    favorito: 'heart',
    logout: 'log-out-outline',
    meta: 'golf-outline',
    papel: 'reader-outline',
    calificacion: 'ribbon-outline',
    abajo: 'chevron-down-outline',
    abajoAlt: 'caret-down',
    basura: 'trash-outline',
    mas: 'add-circle-outline',
    documento: 'document-attach-outline',
    documentos: 'documents',
    imagen: 'image-outline',
    ojo: 'eye-outline',
    ojotachado: 'eye-off-outline',
    camara: 'camera-outline',
    visto: 'checkmark-outline',
    lupa: 'search-outline',
    carrito: 'cart-outline',
    atras: 'chevron-back-outline',
    home: 'home-outline',
    perfil: 'person-outline',
    tarjeta: 'wallet-outline',
    pedido: 'reader-outline',
    resetPass: 'lock-open-outline',
    recuperar: 'help-circle-outline',
    login: 'log-in-outline',
    datos: 'document-text-outline',
    whatsapp: 'logo-whatsapp',
    menos: 'remove-outline',
    equis: 'close-outline',
    menu: 'menu-outline',
    lista: 'list-outline',
    reloj: 'alarm-outline',
    ubicacion: 'navigate-outline',
    carro: 'car-sport-outline',
    tendencia: 'trending-up-outline',
    estrella: 'star',
    recargar: 'reload-outline',
    arriba: 'chevron-up-outline',
    arribaAlt: 'caret-up',
    campana: 'notifications',
    crear: 'create-outline',
    candadoAbierto: 'lock-open-outline',
    cajaDocumento: 'file-tray-full-outline',
    wifi: 'wifi-outline',
    flash: 'flash-outline',
    linterna: 'flashlight',
    hombre: 'man',
    clip: 'clipboard-outline',
    recibo: 'receipt',
    deshacer: 'arrow-undo',
    celular: 'cellular',
    libro: 'book-outline',
    usuario: 'person-circle-outline'
  },
  FontAwsome: {
    usuario: 'user-o',
    direccion: 'address-card',
    derecha: 'angle-right',
  },
  FontAwsome5: {hospital: 'hospital'},
  Feather: {
    ojo: 'eye',
    ojoCerrado: 'eye-off',
    candado: 'lock',
  },
  MaterialCommunityIcons: {
    ambulancia: 'ambulance',
    pulso: 'pulse',
  },
};

export const styles = StyleSheet.create({
  /**
   * @View
   */
  globalmargin: {
    flex: 1,
    padding: 10,
  },
  centerItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * @Menu
   */
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
  },

  menuText: {
    color: colores.background,
    fontSize: 16,
  },
  /**
   * @Avatar
   */
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  /**
   * @TextInput
   */
  inputField: {
    marginVertical: 5,
    marginHorizontal: 5,
    color: 'white',
    width: '80%',
    borderRadius: 12,
  },
  inputFieldAlert: {
    color: 'white',
    borderRadius: 12,
    width: '100%',

    marginVertical: 5,
  },
  inputFieldText: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: colores.background,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  /**
   * @Selector
   */
  selector: {
    margin: 5,
    backgroundColor: colores.background
    ,
    borderWidth: 0.3,
    borderColor: colores.primary,
    borderRadius: 25,
  },
  sombra: {
    backgroundColor: colores.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
  },
  /**
   * @TextButton
   */
  textButton: {
    color: colores.textPrimary,
    fontSize: 15,
    margin: '4%',
    fontWeight:'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  textButtonBold: {
    color: colores.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
    padding: '5%',
    minWidth: 50,
    textAlign: 'center',
  },
  textAlertButton: {
    color: colores.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
    padding: '5%',
    minWidth: 50,
    textAlign: 'center',
  },
  /**
   * @Text
   */
  textTitle: {
    color: colores.textPrimary,
    fontSize: 18,
  },
  textBold: {
    color: colores.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  textData: {
    color: colores.primary,
    fontWeight: '400',
    fontSize: 14,
  },
});
