import { User } from 'src/app/_models';
import { Observable } from 'rxjs';
import { config } from './../config/config';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { purchaserOrderList } from '../_models/item';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http :HttpClient
  ) { }


  generatePurchaseOrderReport(data):Observable<purchaserOrderList[]> {
    return this.http.get<purchaserOrderList[]>(config.PAPYRUS + `/order/poReports/`,  {params:data});
  }

  getUserSummaryReportDetails(data):Observable<any>{
    return this.http.get<any>(config.PAPYRUS + `/users/usersReports/`,  {params:data});
  }

  getItemReport(itemData):Observable<any>{
    return this.http.get<any>(config.PAPYRUS + `/users/item_reports/`,  {params:itemData});
  }

  getGRNReport(grnData):Observable<any>{
    return this.http.get<any>(config.PAPYRUS + `/users/grn_reports/`,  {params:grnData});
  }

}
