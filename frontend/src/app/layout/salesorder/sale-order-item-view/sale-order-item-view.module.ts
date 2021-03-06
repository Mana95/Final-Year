import { ChildboxComponent } from './../Comment_templates/childbox/childbox.component';
import { ReplyCommentComponent } from './../Comment_templates/reply-comment/reply-comment.component';
import { SaleOrderItemViewComponent } from './sale-order-item-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleOrderItemViewRoutingModule } from './sale-order-item-view-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from '../Comment_templates/comment/comment.component';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [SaleOrderItemViewComponent ,CommentComponent ,ReplyCommentComponent , ChildboxComponent],
  imports: [
    CommonModule ,SaleOrderItemViewRoutingModule ,NgbModule ,ReactiveFormsModule ,NgxStarRatingModule , FormsModule
  ]
})
export class SaleOrderItemViewModule { }
