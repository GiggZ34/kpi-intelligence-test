import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from "./map/map.component";
import {MapService} from "./map/services/map.service";
import {ListFilterComponent} from "./list-filter/list-filter.component";
import {AppbarComponent} from "./appbar/appbar.component";
import { TableComponent } from './table/table.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ListInCardComponent } from './list-in-card/list-in-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RouterLink} from "@angular/router";
import { RankedCardComponent } from './ranked-card/ranked-card.component';



@NgModule({
  declarations: [
    MapComponent,
    ListFilterComponent,
    AppbarComponent,
    TableComponent,
    ListInCardComponent,
    NavBarComponent,
    RankedCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLink
  ],
    exports: [
        MapComponent,
        AppbarComponent,
        TableComponent,
        ListInCardComponent,
        ListFilterComponent,
        NavBarComponent,
        RankedCardComponent,
    ],
  providers: [MapService],
})
export class ComponentsModule { }
