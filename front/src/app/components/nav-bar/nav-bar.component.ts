import {Component, Input, OnInit} from '@angular/core';
import {NavBarModels} from '../../models/nav-bar.models';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { Location } from '@angular/common';
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite';

@Component({
  selector: 'com-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  @Input()
  get navBarObjects(): NavBarModels[] {return this._navBarObjects;}
  set navBarObjects(navBarObjects: NavBarModels[]) {this._navBarObjects = navBarObjects;}

  public backIcon = faArrowLeft;

  private _navBarObjects: NavBarModels[] = [];

  constructor(private _location: Location) {
  }

  ngOnInit() {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  }

  goBack() {
    this._location.back();
  }
}
