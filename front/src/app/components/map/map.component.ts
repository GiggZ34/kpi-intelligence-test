import * as M from "maplibre-gl";
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MapService } from './services/map.service';
import {ILocation} from "../../models/data.models";
import {Subscription} from "rxjs";

@Component({
  selector: 'com-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @Input()
  get points_geojson(): ILocation[] {return this._points_geojson;}
  set points_geojson(new_objects: ILocation[]) {
    this._points_geojson = new_objects;
    this._mapService.setPointsData(new_objects);
  }

  @Input()
  get focused_geojson(): ILocation {return this._focused_geojson;}
  set focused_geojson(new_object: ILocation) {
    this._focused_geojson = new_object;
    if (new_object) {
      this._mapService.setFocusedData(this._focused_geojson);
    }
  }

  @Input()
  get default_zoom(): number {return this._mapService.default_zoom;}
  set default_zoom(new_zoom: number) {this._mapService.default_zoom = new_zoom;}


  public map: M.Map | undefined;

  private _points_geojson: any[] = [];
  private _focused_geojson: any | undefined;
  private _subscription: Subscription = new Subscription();

  constructor(private _mapService: MapService) { }

  ngOnInit(): void {
    this._subscription.add(this._mapService.mapInstance.subscribe(map => {
      if (!map) return;

      this.map = map;
      this._mapService.setPointsData(this.points_geojson);
      this._mapService.setFocusedData(this.focused_geojson);
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._mapService.destroyMap();
  }

  public moveHandler = () => {
    this.map?.getCenter();
    this.map?.getZoom();
  };

  async ngAfterViewInit(): Promise<void> {
    this._mapService.createMap(this.mapContainer.nativeElement);

      if (this.map)
        this.map.on('moveend', this.moveHandler);
  }
}
