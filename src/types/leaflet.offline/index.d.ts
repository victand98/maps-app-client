// Type definitions for non-npm package leaflet-offline 1.1
// Project: https://github.com/robertomlsoares/leaflet-offline#readme
// Definitions by: BETOXL <https://github.com/BETOXL>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import * as L from "leaflet";
import { FeatureCollection } from "geojson";

declare module "leaflet" {
  class TileLayerOffline extends L.TileLayer {
    constructor(urlTemplate: string, options?: TileLayerOptions);
    createTile(coords: object, done: L.DoneCallback): HTMLElement;
    setDataUrl(coords: object): Promise<string>;
    _getStorageKey(coords: object): string;
    getTileUrls(bounds: L.LatLngBounds, zoom: number): any;
  }

  namespace tileLayer {
    function offline(url: string, options?: TileLayerOptions): TileLayerOffline;
  }

  class ControlSaveTiles extends L.Control {}

  namespace control {
    function savetiles(
      baseLayer: TileLayerOffline,
      options?: ControlSaveOptions
    ): ControlSaveTiles;

    interface ControlSaveOptions {
      confirm: (layer: any, successcallback: () => any) => void;
      confirmRemoval: (layer: any, successcallback: () => any) => void;
      zoomlevels: number[];
      position: L.ControlOptions["position"];
      saveText: string;
      rmText: string;
    }
  }

  export type tileInfo = {
    key: string;
    url: string;
    urlTemplate: string;
    x: number;
    y: number;
    z: number;
    createdAt: number;
  };

  class TileManager {
    getStorageLength(): Promise<number>;
    getStorageInfo(urlTemplate: string): Promise<tileInfo[]>;
    downloadTile(tileUrl: string): Promise<Blob>;
    saveTile(tileInfo: tileInfo, blob: Blob): Promise<IDBValidKey>;
    getTileUrl(urlTemplate: string, data: any): string;
    getTilePoints(area: Bounds, tileSize: Point): Point[];
    getStoredTilesAsJson(
      layer: GridLayer,
      tiles: tileInfo[]
    ): FeatureCollection;
    removeTile(key: string): Promise<void>;
    getBlobByKey(key: string): Promise<Blob>;
    truncate(): Promise<void>;
  }

  export interface LeafletEvent {
    _tilesforSave: any[];
    lengthSaved: number;
    lengthToBeSaved: number;
  }
}
