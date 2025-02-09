import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ComponentsModule} from "../../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxEchartsDirective, NgxEchartsModule, provideEchartsCore} from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import {LabelLayout, UniversalTransition} from "echarts/features";
import { DetailComponent } from './comonents/detail/detail.component';

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
    path: ':projectId',
    component: DetailComponent
  }];


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FontAwesomeModule,
    NgxEchartsModule.forRoot({echarts}),
    NgxEchartsDirective
  ],
  exports: [RouterModule],
  providers: [
    provideEchartsCore({echarts}),
  ],
})
export class ProjectsModule {
}
