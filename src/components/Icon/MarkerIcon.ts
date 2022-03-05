import L from "leaflet";

export class MarkerDivIcon extends L.DivIcon {
  options: L.DivIconOptions = {
    className: "custom-div-icon",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -25],
    shadowUrl: `/images/marker-shadow.png`,
    shadowAnchor: [13, 28],
  };

  constructor(color: string, icon: string) {
    super();
    this.options.html = `<div style='background-color:${color};' class='marker-pin'></div><span class="material-icons">${icon}</span>`;
  }
}
