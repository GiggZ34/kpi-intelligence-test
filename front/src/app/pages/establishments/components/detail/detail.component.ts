import {Component} from '@angular/core';
import {ApiEstablishmentService} from "../../../../services/apis/api-establishment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IEstablishment} from "../../../../models/data.models";
import {ITableColumn} from "../../../../models/table.models";
import {faFile, faGraduationCap, faRulerCombined, faSchool} from "@fortawesome/free-solid-svg-icons";
import {NavBarModels} from "../../../../models/nav-bar.models";
import type {EChartsCoreOption} from 'echarts/core';

@Component({
  selector: 'page-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  public navBarObjects: NavBarModels[] = [
    {
      title: 'Établissement',
      href: 'establishment',
      icon: faSchool,
    },
    {
      title: 'Projets',
      href: 'projects',
      icon: faRulerCombined,
    },
  ];
  public establishment: IEstablishment | undefined;
  public loading: boolean = true;
  public options: EChartsCoreOption | undefined;
  public routeToProject = (obj: any) => this._router.navigate(['/projects/' + obj.id]);
  public projectColumns: ITableColumn[] = [
    {
      type: 'string',
      title: 'titre',
      field: ["titreoperation"]
    },
    {
      type: 'string',
      title: 'status',
      field: ["etat_d_avancement"]
    },
    {
      type: 'string',
      title: 'Année de livraison',
      field: ["annee_de_livraison"],
      not_exist: 'non livré'
    },
    {
      type: 'action',
      title: 'Ouvrir',
      actions: [{
        icon: faFile,
        title: 'Voir fiche',
        action: this.routeToProject
      }]
    }
  ];
  public pin: any | undefined;
  public establishmentIcon = faGraduationCap;

  private _establishmentId: string | undefined;

  constructor(
    _apiEstablishmentService: ApiEstablishmentService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this._establishmentId = this._route.snapshot.params["establishmentId"];
    _apiEstablishmentService.getEstablishment(this._establishmentId ?? "")
      .then((response) => {
        this.establishment = response;
        if (response.longitude && response.latitude) {
          this.pin = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [response.longitude, response.latitude],
            },
            properties: {Code: response.code, Nom: response.label, Ville: response.city},
          };
        }
      })
      .finally(() => this.loading = false);
  }
}
