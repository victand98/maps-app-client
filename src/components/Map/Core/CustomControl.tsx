import classNames from "classnames";
import L from "leaflet";
import React from "react";
import ReactDOM from "react-dom";

interface Props {
  position: L.ControlPosition;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

export const CustomControl = (props: Props): JSX.Element => {
  const [container, setContainer] = React.useState<any>(
    document.createElement("div")
  );
  const positionClass =
    (props.position && POSITION_CLASSES[props.position]) ||
    POSITION_CLASSES.topright;

  React.useEffect(() => {
    const targetDiv = document.getElementsByClassName(positionClass);
    setContainer(targetDiv[0]);
  }, [positionClass]);

  const controlClass = classNames("leaflet-control", props.className);

  const controlContainer = (
    <div className={controlClass} style={props.style}>
      {props.children}
    </div>
  );

  L.DomEvent.disableClickPropagation(container);

  return ReactDOM.createPortal(controlContainer, container);
};
