import { EditUserComponent } from './edit-user.component';
import { PageHeaderModule } from './../../../shared/modules/page-header/page-header.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserRoutingModule } from './edit-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EditUserComponent , EditModalComponent],
  imports: [
    CommonModule ,PageHeaderModule ,EditUserRoutingModule , FormsModule, NgbModule ,ReactiveFormsModule
  ]
})
export class EditUserModule { }
