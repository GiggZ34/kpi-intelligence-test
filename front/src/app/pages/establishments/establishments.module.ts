import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxEchartsDirective, NgxEchartsModule, provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {LabelLayout, UniversalTransition} from "echarts/features";
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  LegendComponent,
  CanvasRenderer]);

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':establishmentId',
    component: DetailComponent,
  }];

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FontAwesomeModule,
    NgxEchartsModule.forRoot({ echarts }),
    NgxEchartsDirective
  ],
  exports: [RouterModule],
  providers: [
    provideEchartsCore({ echarts }),
  ],
})
export class EstablishmentsModule { }
