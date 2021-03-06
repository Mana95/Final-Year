import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { config } from '../config/config.js';
import { map } from 'rxjs/operators';
import {diet} from 'src/app/_models/diet';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  sharedData :any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   loadMyAllSchedule(id) {
    return this.http.get(config.PAPYRUS+`/shedule/loadMyAllSchedule/${id}`)
   }

   loadExercise(name){
    return this.http.get(config.PAPYRUS+`/shedule/getAllExercise/${name}`)
   }

   saveExercise(data): Observable<any>{
    return this.http.post(config.PAPYRUS+`/shedule/saveExercise/`,data);
   }


   getDietMyPlanID(id): Observable<any> {
    return this.http.get<any>(config.PAPYRUS+`/shedule/getDietMyPlanID/${id}`);
   }
   getDietMyPlan(id): Observable<diet> {
    return this.http.get<diet>(config.PAPYRUS+`/shedule/DietPlangetById/${id}`)
   }
   getById(id) {    
     return this.http.get(config.PAPYRUS+`/shedule/getById/${id}`)
   }
   
   insertscheduleDietData(scheduleData):Observable<any> {
    return this.http.post(config.PAPYRUS+`/shedule/createScheduleAndDiet` , scheduleData);
   }
 

   loadInstrucotrData(id) {
    return this.http.get(config.PAPYRUS+`/shedule/loadInstrucotrData/${id}`)
   }

   loadInstructor() {
    return this.http.get(config.PAPYRUS+`/shedule/loadInstructor`)
   }


   loadById(id) {
     //alert(id);
    return this.http.get(config.PAPYRUS+`/shedule/loadById/${id}`)
   }

  

   getAcceptedSchedule() {
    return this.http.get(config.PAPYRUS+`/shedule/getAcceptedSchedule`)
  }

   RejectRecord(formData , reasonData){
     //console.log(id);
     let data = {
      reasonData:reasonData,
       formData:formData
     }
    return this.http.post(config.PAPYRUS+`/shedule/RejectRecord` , data);
   }
   updateRecord(data) {
    // console.log(data);
     return this.http.post(config.PAPYRUS+`/shedule/updateRecord` , data);
    
   }

   getPendings() {
    return this.http.get<any>(config.PAPYRUS+`/shedule/getPendings`)
   }

   getMySchedule(userId) {
    return this.http.get(config.PAPYRUS+`/shedule/getMySchedule/${userId}`)
   }
  getscedultType() {
    return this.http.get<any>(config.PAPYRUS+`/shedule/getAllSchedule`)
  }

  insertScheduleData(data){
    return this.http.post(config.PAPYRUS+`/shedule/insertData` , data);
  
  }
  checkDateAvalabilty(id ,currentDate){
    return this.http.get(config.PAPYRUS+`/shedule/checkAvalibility/${id},${currentDate}`)
    .pipe(map(data=>{
      return data;
    }))
  }

  getReleventSchdule(id){
    return this.http.get(config.PAPYRUS+`/shedule/loadSchedule/${id}`)
  }


  loadPending(): Observable<any> {
    return this.http.get(config.PAPYRUS+`/shedule/loadPending`)
  }
}
