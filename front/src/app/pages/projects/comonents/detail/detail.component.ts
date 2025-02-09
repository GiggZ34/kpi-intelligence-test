import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faChartSimple, faJugDetergent, faRulerCombined} from "@fortawesome/free-solid-svg-icons";
import {IProject} from "../../../../models/data.models";
import {ApiProjectService} from "../../../../services/apis/api-project.service";
import {NavBarModels} from "../../../../models/nav-bar.models";
import type {EChartsCoreOption} from "echarts/core";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  public navBarObjects: NavBarModels[] = [
    {
      title: 'Project',
      href: 'project',
      icon: faRulerCombined,
    },
    {
      title: 'détail',
      href: 'detail',
      icon: faJugDetergent,
    },
    {
      title: 'KPI',
      href: 'kpi',
      icon: faChartSimple,
    },
  ];
  public project: IProject | undefined;
  public kpi: any | undefined;
  public loading: boolean = true;
  public pin: any | undefined;
  public projectIcon = faRulerCombined;

  private _projectId: string | undefined;

  constructor(
    _apiProjectService: ApiProjectService,
    private _route: ActivatedRoute,
  ) {
    this._projectId = this._route.snapshot.params["projectId"];
    _apiProjectService.getProject(this._projectId ?? "")
      .then((response) => {
        this.project = response;
        if (response.establishment?.longitude && response.establishment?.latitude) {
          this.pin = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [response.establishment?.longitude, response.establishment?.latitude],
            },
            properties: {Code: response.establishment?.code, Nom: response.establishment?.label, Ville: response.establishment?.city},
          };
        }
      })
      .finally(() => this.loading = false);
    _apiProjectService.getKpi(this._projectId ?? "")
      .then((response) => {
        this.kpi = response;
      })
  }

  _option_planned_budget() {
    return
  }

  options_by_category(value: number | undefined, kpi_category: any, label: string): EChartsCoreOption {
    return <EChartsCoreOption>{
      title: [
        {
          text: label
        }
      ],
      legend: {
        data: ['projet', 'valeur moyenne', 'valeur médiane'],
        align: 'left',
      },
      tooltip: {
      trigger: 'axis',
        axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        return params
          .map((p: any) => `<strong>${p.seriesName}:</strong> ${p.value.toFixed(2)} millions €`)
          .join('<br/>');
      }
    },

    xAxis: {
        type: 'category',
        silent: false,
        splitLine:{ show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false }
      },
      yAxis: {
        name: 'Montant (Millions €)',
        nameLocation: 'middle',
        nameGap: 35,
        axisLine: { show: true },
        axisTick: { show: true }
      },
      series: [
        {
          name: 'projet',
          type: 'bar',
          data: [value ?? .0],
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: 'valeur moyenne',
          type: 'bar',
          data: [kpi_category.median_value],
          animationDelay: (idx: number) => idx * 10 + 100,
        },
        {
          name: 'valeur médiane',
          type: 'bar',
          data: [kpi_category.average_value],
          animationDelay: (idx: number) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

}
