import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import maplibregl, * as M from 'maplibre-gl'
import {BehaviorSubject} from 'rxjs';
import {AddLayerObject} from "maplibre-gl";
import {QueryParamsService} from "../../../services/urls/query-params.service";

@Injectable({
  providedIn: "any"
})
export class MapService {
  private mapInstance$ = new BehaviorSubject<M.Map | undefined>(undefined);
  public mapInstance = this.mapInstance$.asObservable();

  public popup = new M.Popup({
    closeButton: false,
    closeOnClick: false,
  });
  private _default_zoom: number = 12;

  private points_source: any | undefined;
  private focused_source: any | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _queryParamsService: QueryParamsService) {}

  get default_zoom(): number {return this._default_zoom;}
  set default_zoom(value: number) {
    this._default_zoom = value;
    this.map?.zoomTo(value);
  }

  public get map(): M.Map | undefined {
    return this.mapInstance$.value;
  }

  public set map(newMapInstance: M.Map | undefined) {
    if (newMapInstance)
      this.mapInstance$.next(newMapInstance);
  }

  public async createMap(mapCntr?: HTMLElement) {
    const mapInstance = new M.Map(<M.MapOptions>{
      container: mapCntr,
      center: [2.3522, 48.8566],
      zoom: this.default_zoom,
      minZoom: 5,
      maxZoom: 18,
      pitch: 0,
      antialias: true,
      hash: true,
      attributionControl: false,
      interactive: true,
      style: {
        "version": 8,
        "sources": {
          "osm-tiles": {
            "type": "raster",
            "tiles": [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            "tileSize": 256
          }
        },
        "layers": [
          {
            "id": "osm-tiles-layer",
            "type": "raster",
            "source": "osm-tiles"
          }
        ]
      },
    });

    mapInstance.on("load", async () => {
      await this._loadImage(mapInstance, "pin", "assets/pin.png");
      this.points_source = this._createSource(mapInstance, 'points-source');
      this._createLayer(mapInstance, {
        'id': 'points-layer',
        'type': 'circle',
        'source': 'points-source',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#1E3A8A'
        }
      });
      this._addEvent(mapInstance, "points-layer");

      this.focused_source = this._createSource(mapInstance, 'focused-source');
      this._createLayer(mapInstance, {
        "id": 'focused-layer',
        "type": 'symbol',
        "source": 'focused-source',
        "layout": {
          'icon-image': 'pin',
          'icon-size': 0.1,
          'icon-anchor': 'bottom',
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'text-font': ['Noto Sans Bold'],
        },
      });
      mapInstance.zoomTo(this.default_zoom);
      this.map = mapInstance;
    });
  }

  public destroyMap(): void {
    const currentMap = this.mapInstance$.value;
    if (currentMap) {
      currentMap.remove();
      this.mapInstance$.next(undefined);
    }
  }

  public setPointsData(geoJSON_data: any) {
    if (!this.points_source || !geoJSON_data)
      return;
    this.points_source.setData({'type': 'FeatureCollection', 'features': geoJSON_data});
  }

  public setFocusedData(geoJSON_data: any) {
    if (!this.focused_source || !geoJSON_data)
      return;
    this.map?.flyTo({center: geoJSON_data.geometry.coordinates});
    this.focused_source.setData({'type': 'FeatureCollection', 'features': [geoJSON_data]});

  }

  private async _loadImage(mapInstance: M.Map, title: string, path: string) {
    const img = await mapInstance.loadImage(path);
    img ? mapInstance.addImage(title, img.data) : null;
  }

  private _createSource(mapInstance: M.Map, source: string) {
    mapInstance.addSource(source, {'type': 'geojson', 'data': {'type': 'FeatureCollection', 'features': []}});
    return mapInstance.getSource(source);
  }

  private _createLayer(mapInstance: M.Map, layer_setup: AddLayerObject) {
    mapInstance.addLayer(layer_setup);
  }

  private _addEvent(mapInstance: M.Map, layer: string) {
    mapInstance.on("mouseenter", layer, (e) => {
      if (!e.features || e.features.length === 0) {
        console.warn("No features found.")
        return ;
      }
      mapInstance.getCanvas().style.cursor = 'pointer';

      // @ts-ignore
      let coordinates: [number, number] = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;
      const description = `
        <h3>${properties["title"]}</h3>
        <p>
            <span>${properties["city"]}</span>
            <span>${properties["id"]}</span>
        </p>
      `;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // this.popup.setLngLat(coordinates).setHTML(description).addTo(mapInstance);
    });

    mapInstance.on("mouseleave", layer, (e) => {
      mapInstance.getCanvas().style.cursor = '';
      this.popup.remove();
    });

    mapInstance.on("click", layer, (e) => {
      // @ts-ignore
      this._queryParamsService.setFilter({"focusOn": e.features[0].properties["id"]});
    });
  }
}
