import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {FilterAttributeModel} from "./list-filter.models";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {QueryParamsService} from "../../services/urls/query-params.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'com-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrl: './list-filter.component.scss'
})
export class ListFilterComponent implements AfterViewInit, OnDestroy {
  @Input()
  get attribute(): FilterAttributeModel {
    return this._attribute;
  }

  set attribute(new_attribute: FilterAttributeModel) {
    if (!new_attribute) {
      return ;
    }
    this._attribute = new_attribute;
    if (new_attribute.search) {
      this.form.setControl("search", new FormControl(""));
    }
    if (new_attribute.choice) {
      this.form.setControl(new_attribute.choice.url_name, new FormControl(""));
    }
    if (new_attribute.multi_choices) {
      this.form.setControl(new_attribute.multi_choices.url_name, new FormControl([]));
    }
    this._subscribeFormGroup();
  }

  public form: FormGroup = new FormGroup({});

  private _attribute: FilterAttributeModel = {search: false};
  private _updateFilterTimeoutId: any | null = null;
  private _subscription: Subscription = new Subscription();

  constructor(_queryParamsService: QueryParamsService, private _route: ActivatedRoute) {
    this._subscription.add(this.form.valueChanges.subscribe((value) => {
      if (this._updateFilterTimeoutId) {
        clearTimeout(this._updateFilterTimeoutId);
      }
      this._updateFilterTimeoutId = setTimeout(() => {
        _queryParamsService.setFilter(value);
        this._updateFilterTimeoutId = null;
      }, 1000);
    }));
  }

  private _subscribeFormGroup(): void {
    this._subscription.add(
      this._route.queryParams.subscribe((params) => {
        for (const line of Object.entries(params)) {
          if (
            this.attribute.search && line[0] === "search"
            && line[1] !== this.form.controls["search"].value
          ) {
            this.form.controls["search"].patchValue(line[1]);
          }
          else if (
            line[0] === this.attribute.choice?.url_name
            && line[1] !== this.form.controls[this.attribute.choice?.url_name].value
          ) {
            this.form.controls[this.attribute.choice?.url_name].patchValue(line[1]);
          }
          else if (
            line[0] === this.attribute.multi_choices?.url_name
            && line[1] !== this.form.controls[this.attribute.multi_choices?.url_name].value
          ) {
            this.form.controls[this.attribute.multi_choices.url_name].patchValue(line[1]);
          }
        }
      }));
  }

  ngAfterViewInit() {
    import('flowbite').then((Flowbite) => {
      Flowbite.initDropdowns();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
