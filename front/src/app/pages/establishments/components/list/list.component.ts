import {Component} from '@angular/core';
import {IEstablishment} from "../../../../models/data.models";
import {FilterAttributeModel} from "../../../../components/list-filter/list-filter.models";
import {ApiEstablishmentService} from "../../../../services/apis/api-establishment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiCityService} from "../../../../services/apis/api-city.service";
import {ICardData} from "../../../../models/card.models";
import {faLocation} from "@fortawesome/free-solid-svg-icons";
import {QueryParamsService} from "../../../../services/urls/query-params.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  routeToObjSheet = (obj: IEstablishment) => {
    this.router.navigate([obj.code], {relativeTo: this.route});
  }

  focusOnEstablishment = (obj: any) => {
    this._queryParamsService.setFilter({"focusOn": obj.code});
  }


  public cardData: ICardData =
    {
      title: 'Liste des établissements',
      idField: 'code',
      titleField: 'label',
      descriptionField: 'city',
      addData: [{
        type: "field",
        title: "Nombre de projets",
        field: 'project_count'
      },
        {
          type: "button",
          title: "Localiser",
          icon: faLocation,
          action: this.focusOnEstablishment
        }
      ],
      actionClick: this.routeToObjSheet
    };
  public data: IEstablishment[] = [];
  public establishments_geojson: any[] = [];
  public focused_geojson: any | undefined;
  public establishmentFocused: string | undefined
  public loading: boolean = false;
  public lastPage: boolean = false;
  public filterAttribute: FilterAttributeModel = {
    search: true,
    choice: {
      title: 'Statut',
      url_name: 'status',
      choices: [
        "Etudes et diagnostics",
        "Sélection mandataire",
        "Sélection entreprise",
        "Etude de maîtrise d'œuvre",
        "En Chantier",
        "Opération livrée",
        "Suspendue",
        "Abandonné"
      ]
    }
  };

  private pageCount = 1;
  private params: any | undefined;

  constructor(
    private _apiEstablishmentService: ApiEstablishmentService,
    apiCityService: ApiCityService,
    private _queryParamsService: QueryParamsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe(params => {
      this.params = params;
      this.establishmentFocused = params['focusOn'];
      this._apiEstablishmentService.getEstablishments(this.params)
        .then((data) => {
          this.data = data.results;
          this.pageCount = data.current;
          this.lastPage = data.next === null;
          this._setGeoJSON(data.results);
        })
        .finally(() => this.loading = false);
    })
  }

  private _setGeoJSON(data: IEstablishment[]) {
    this.establishments_geojson = data.map(establishment => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [establishment.longitude, establishment.latitude],
        },
        properties: {id: establishment.code, title: establishment.label, city: establishment.city},
      }
    });
    const data_filter_by_focused = data
      .filter(establishment => establishment.code === this.establishmentFocused)
      .map(establishment => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [establishment.longitude, establishment.latitude],
          },
          properties: {Code: establishment.code, Nom: establishment.label, Ville: establishment.city},
        }
      });
    this.focused_geojson = data_filter_by_focused.length ? data_filter_by_focused[0] : undefined;
  }

  async nextPage() {
    this.loading = true;
    ++this.pageCount;
    this._apiEstablishmentService.getEstablishments({...this.params, page: this.pageCount})
      .then((data) => {
        this.data = this.data.concat(data.results);
        this.lastPage = data.next === null;
        this._setGeoJSON(this.data);
      })
      .finally(() => this.loading = false);
  }
}
