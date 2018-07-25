import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {RestService, WebSocketService} from '../../../../services/';
import { T } from '../../../../translate-marker';
import {
  FieldConfig
} from '../../../common/entity/entity-form/models/field-config.interface';
import { regexValidator } from '../../../common/entity/entity-form/validators/regex-validation';

@Component({
  selector : 'app-bootenv-rename',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class BootEnvironmentRenameComponent {

  protected route_success: string[] = [ 'system', 'bootenv' ];
  protected editCall = 'bootenv.update';
  protected pk: any;
  protected isNew = false;
  protected isEntity = true;
  protected entityForm: any;

  protected fieldConfig: FieldConfig[];

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected rest: RestService, protected ws: WebSocketService) {}

  preInit(entityForm: any) {
    this.route.params.subscribe(params => {
      this.pk = params['pk'];
      this.fieldConfig = [
        {
          type: 'input',
          name: 'name',
          placeholder: T('Name'),
          tooltip: T('Rename the existing boot environment.'),
          validation : [ regexValidator(/^[^\/ *\'"?@!#$%^&()+=~<>;`\\]+$/)],
          required: true
        },
      ];
    });
    this.entityForm = entityForm;
  }
  afterInit(entityForm: any) {
    entityForm.submitFunction = this.submitFunction;
  }
  submitFunction(entityForm){
    const payload = {};
    payload['name'] = entityForm.name;
    return this.ws.call('bootenv.update', [this.pk, payload]);
  }
}