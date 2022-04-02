import { Step } from "react-joyride";

export const indexSteps: Step[] = [
  {
    target: ".leaflet-control-zoom",
    title: "Niveles de zoom",
    content:
      "Utiliza estos botones para controlar el nivel de zoom dentro del mapa",
    disableBeacon: true,
  },
  {
    target: ".savetiles",
    title: "Descarga de mapas",
    content:
      "Con estos controles puedes descargar la región del mapa que se encuentra ahora en tu pantalla, y asi siempre tenerla cuando te encuentres Offline. También puedes eliminar todos los datos antes guardados",
  },
  {
    target: ".navbar-control",
    title: "Menú lateral",
    content:
      "Puedes acceder a un menú rápido para navegar entre las demás páginas del sitio",
    placement: "left",
  },
  {
    target: ".route-control",
    title: "Navegación",
    content:
      "Empieza una nueva ruta. Sigue el control de tu maratón de bicicleta",
    placement: "left",
  },
  {
    target: ".locate-control",
    title: "Tu ubicación",
    content:
      "Siempre que lo necesites puedes ver tu ubicación actual para verificar tu distancia con los puntos y ciclovías del mapa",
    placement: "top",
  },
  {
    target: ".tour-control",
    title: "Buscar Ayuda",
    content:
      "Puedes volver a realizar este Tour cuando lo necesites. Solamente pulsa aquí",
    placement: "left",
  },
];
