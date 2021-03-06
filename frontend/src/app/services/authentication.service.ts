import { Injectable } from '@angular/core';
import { config } from '../config/config.js';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cart } from '../_models/cart.js';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public cartItemsSubject:BehaviorSubject<Cart>;
  public cartItemsUser:Observable<Cart>;

  private currentMembershipSubject: BehaviorSubject<any>;
  public currentMembership: Observable<any>;

  constructor(

    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentMembershipSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('membership')));
    this.currentMembership = this.currentMembershipSubject.asObservable();

   

    this.cartItemsSubject = new BehaviorSubject<Cart>(
      JSON.parse(localStorage.getItem("cartObject"))
  )
  this.cartItemsUser  = this.cartItemsSubject.asObservable();

 
  }

  
  public get cartDataValue(){
   //onsole.log(this.cartItemsSubject.value)
    return this.cartItemsSubject.value;
  }

  public get currentUserValue() {
    //console.log('HIDHSDHSDSADSA')
   // console.log(this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }
  

  public get currentMembershipValue() {
    return this.currentMembershipSubject.value;
  }

  changePassword(body):Observable<any>{
    return this.http.patch(config.PAPYRUS+`/users/changepassword/`,body)
  }

  checkMembership(objectData):Observable<any>{
    return this.http.get(config.PAPYRUS+`/users/checkMembership/${objectData}`)
  
  }
  getMembershipTypByCatagory(event){
    return this.http.get(config.PAPYRUS+`/users/getMembershipTypByCatagory/${event}`)
  }
  getReleventMembshipStatusData(email) {
    return this.http.get(config.PAPYRUS+`/users/getReleventMembshipStatusData/${email}`)
  }
  getReleventMembshipStatusDataPending(email) {
    return this.http.get(config.PAPYRUS+`/users/getReleventMembshipStatusDataPending/${email}`)
  }
  updateActiveIncativeStatusMembership(data) {
    return this.http.patch(config.PAPYRUS+`/users/updateActiveIncativeStatusMembership`, {data})
  }
  updateSupplierDelettion(data) {
    return this.http.patch(config.PAPYRUS+`/users/deleteSupplierData`, {data})
  }

  updateSupplier(updateSupplier , userData){
    return this.http.patch(config.PAPYRUS+`/users/updateSupplierData`, {updateSupplier , userData})

  }
  updateMembershipCardStatus(data){
    return this.http.post(config.PAPYRUS+`/users/updateMembershipCardStatus`, data)
  }

  getReleventUserData(id){
      return this.http.get(config.PAPYRUS+`/users/getReleventUserData/${id}`)
  }
  updateIstructor(data ,UserData):Observable<any>{
    return this.http.patch(config.PAPYRUS+`/users/updateinstructor`,{data ,UserData})
  }
  updateMembershipReciptDetails(data)
{
  return this.http.post(config.PAPYRUS+`/users/updateMembershipReciptDetails`,data)
}
  getInstructorById(id) {
    return this.http.get(config.PAPYRUS+`/users/getByIdInstructor/${id}`)
  }
  getAllMembership(){
    return this.http.get(config.PAPYRUS+`/users/getAllMembership`)
  }
  getInvoiceData(id):Observable<any>{
    
    return this.http.get(config.PAPYRUS+`/users/getInvoiceData/${id}`)
  }

  responseAllInstructorData() {
    return this.http.get(config.PAPYRUS+`/users/responseAllInstructorData`)
  }



  autoUpdateStatus() {
    return this.http.get(config.PAPYRUS+`/users/autoUpdate`)
  }

  saveMembership(data){
    //console.log(data);
    return this.http.post(config.PAPYRUS+`/users/savemember`,data)
  }

  saveMembershipReciptDetails(data){
    return this.http.post(config.PAPYRUS+`/users/saveMembershipReciptDetails`,data)
  }

  findCustomer(data){
    return this.http.get(config.PAPYRUS+`/users/findCustomer/${data}`)
  }
  saveInstrutor(data ,UserData):Observable<any>{
    return this.http.post(config.PAPYRUS+`/users/instructor`,{data ,UserData})
  }
  updateRole(data) {
    return this.http.post(config.PAPYRUS+`/users/updateRole`,data)
  }
  getReleventRoledata(data){
    return this.http.get(config.PAPYRUS+`/users/getreleventRoleData/${data}`)
  }
  getRelventCustomer(data){
    return this.http.get(config.PAPYRUS+`/users/getreleventCustomerData/${data}`)
  }

  getAllSchedule() {
    return this.http.get(config.PAPYRUS+`/users/getAllSchedule`)
  }


  saveScheduleType(body){
   
    return this.http.post(config.PAPYRUS+`/users/saveScheduleType`,body)
  }

  inActiveScheduleType(id){
    var body = '';
    return this.http.patch(config.PAPYRUS+`/users/inActiveScheduleType/${id}`,body)
  }

  patchScheduleType(data){
    return this.http.patch(config.PAPYRUS+`/users/patchScheduleType`,data)
  }

  updateStatus(body) {
    return this.http.post(config.PAPYRUS+`/users/updateStatus`,body)
  } 

  getByPendingMembership() {
    return this.http.get(config.PAPYRUS+`/users/pendingMembership`)
  }


  
  insertMembershipToUser(body):Observable<any> {
    return this.http.post(config.PAPYRUS+`/users/insertMembershipUser`,body)
  }

  saveInsertMembershipDetails(membershipbody ,UserDatabody):Observable<any> {
    return this.http.post(config.PAPYRUS+`/users/insertMembership`,{membershipbody ,UserDatabody})
  }


  
  getAllMembershipType() {
    return this.http.get(config.PAPYRUS+`/users/getAllMembershipType`)
  }
  updateMembership(body) {
    return this.http.patch(config.PAPYRUS +`/users/updateMembership`, body);
  }
  insertMembershipTypeData(body) {
    return this.http.post(config.PAPYRUS +`/users/saveMembershiptypeData`, body);
  }
  
  ValidPasswordToken(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/valid-password-token`, body);
  }
  newPassword(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/new-password`, body);
  }

 requestReset(body): Observable<any> {
    return this.http.post(config.PAPYRUS +`/users/req-reset-password`, body);
  }
  getReleventSuppliers(data): Observable<any> {
    return this.http.get(config.PAPYRUS+`/users/getreleventData/${data}`)
  }


  getSubCatNames(data) {
    return this.http.get(config.PAPYRUS+`/users/subCatGetting/${data}`)
  }

  getAllSuppliers() {
    return this.http.get(config.PAPYRUS+`/users/allSuppliers`)
  }


  getGroupName() {
    
    return this.http.get(config.PAPYRUS+`/users/groupNames`);

  }
  GroupCreation(groupParam) {
    alert(JSON.stringify(groupParam));
    return this.http.post<any>(config.PAPYRUS+ `/users/groupCreation`, groupParam);

  }
  getAllGroup() {
    return this.http.get(config.PAPYRUS+`/users/groups`);
  }

  getAllUsers() {
  
    return this.http.get(config.PAPYRUS+`/users/u`);
  
  }
  getAllRole() {
    return this.http.get(config.PAPYRUS+`/users/roles`);
  
  }
  getRoleUser(roleData) { 
    console.log(roleData);
    return this.http.get(config.PAPYRUS+`/users/userRoles/${roleData}`);
  }

  deleteRecord(idData){
    // let userRecord = idData.id
    //           alert(userRecord)
      return this.http.post<any>(config.PAPYRUS +`/users/d/` ,idData)
 

  }

  registerCustomer(data ,userParam) :Observable<any>{
    
    return this.http.post<any>(config.PAPYRUS+ `/users/cusCreation`, {data ,userParam})
    
  }
  registerSupplier (sup_data ,UserData ,mailData ):Observable<any> {
    return this.http.post<any>(config.PAPYRUS+ `/users/supCreation`,{sup_data ,UserData ,mailData})
  }

  checkNICNumber(nicNo: string): Observable<any>{
    return this.http.post<any>(config.PAPYRUS+`/users/checkNIC`,{nicNo})
 }


  login(email: string, password: string): Observable<any> {
   // console.log('Authentication' + firstName + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { email, password })
     .pipe(map(user => {
       console.log(user);
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
     
         this.currentUserSubject.next(user);
       }

       return user;
     }));
  }

  register(userParam): Observable<any> {
    //methin thamai call karala thiyenne back end ekata 
   // alert(userParam.username);
        //  console.log (userParam );
          return this.http.post<any>(config.PAPYRUS+`/users/signUp`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }
       userCreationPub(data): Observable<any> {
        return this.http.post<any>(config.PAPYRUS+ `/users/userCreationPub`, data)
       }
       SendSupplierMail(mailData): Observable<any>{
        return this.http.post<any>(config.PAPYRUS+ `/users/supplierMail`, mailData)
       }



       userCreation(UserCreationParam): Observable<any> {
        // alert("here is the service");
        return this.http.post<any>(config.PAPYRUS+ `/users/UserCreation`, UserCreationParam)

      }
      EmployeeCreate(UserCreationParam ,UserData): Observable<any> {
       let objectData = JSON.stringify(UserCreationParam);
      // console.log(objectData);
         return this.http.post<any>(config.PAPYRUS+ `/users/EmployeeCreation`, {UserCreationParam ,UserData})

      }


      roleCreation(UserRole): Observable<any> {
        
        return this.http.post<any>(config.PAPYRUS+ `/roles/roleCreation`, UserRole);

      }

      //user get by Id
      getById(id: any): Observable<User> {
          return this.http.get<any>(config.PAPYRUS+`/users/userById/${id}`);
        }

        //Update user
        updateUser(UserParamUpdate , userData): Observable<any> {
        
          return this.http.put<User>(config.PAPYRUS+`/users/userUpdate`, {UserParamUpdate , userData})
        }

        //Get Group data by id 

        LoadGroupData(groupid): Observable<any> {
       
          return this.http.get<any>(config.PAPYRUS+`/users/getId/${groupid}`);

        }

        logout(): void {
          // remove user from local storage to log user out
          // var currentUser = this.currentUserSubject.value
          // if(currentUser.role == 'Member'){
          //   let data = {
          //     customerID: currentUser.user_id,
          //     email :currentUser.email

          //   }
          //     this.updateMembershipCardStatus(data)
          //     .subscribe(
          //       response=>{
          //        // console.log(response)
          //       }
          //     )
          // }
          localStorage.removeItem('currentUser');
          localStorage.removeItem('cartObject');
          localStorage.removeItem('membership');
          this.currentUserSubject.next(null);
        }

        deleteCartItem(data): void{
        var cartdata = this.cartItemsSubject.value;

          if(cartdata!=undefined){
           
          }
          localStorage.removeItem('cartObject');

        }

        loadProfileData(id) {
      
          return this.http.get<any>(config.PAPYRUS+`/users/loadProfileData/${id}`);
        }
      
        getReleventType(event){
          return this.http.get<any>(config.PAPYRUS+`/users/getReleventType/${event}`);
        }

        inActiveMembership(memberhipData) {
          return this.http.patch(config.PAPYRUS+`/users/membershipInactive/` ,memberhipData);  
        }

        deleteInstructorData(data){
          return this.http.patch(config.PAPYRUS+`/users/instrucotrInactive/` ,data);  
        }


        getReleventActivationOfEmployee(status){
          return this.http.get(config.PAPYRUS+`/users/getReleventActivationOfEmployee/${status}`);  
        
        }

        saveComments(data){
            return this.http.post<any>(config.PAPYRUS+ `/users/saveComment`, data);
        }

        updateInvoice(data){
          return this.http.post<any>(config.PAPYRUS+ `/users/updateInvoice`, data);
        }

        loadCommentDataForId(id){
          return this.http.get(config.PAPYRUS+`/users/getCommentData/${id}`);  
        }

        loadAllinvoiceData() {
          return this.http.get(config.PAPYRUS+`/users/loadAllinvoiceData`);  
        }


        getMembershipById(id) {
          return this.http.get(config.PAPYRUS+`/users/getMembershipById/${id}`);  
        }

        validateOldPassword(text) : Observable<any>{
          return this.http.get(config.PAPYRUS+`/users/validateOldPassword/`,{params:text});  
        }
}





