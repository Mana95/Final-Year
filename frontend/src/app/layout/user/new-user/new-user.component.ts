import { GymAdapterClass } from './../../../common-class/gym-adapterClass';
import { UserRegistrationStatus } from 'src/app/_models/user';
import { config } from './../../../config/config';
import { FileUploader } from 'ng2-file-upload';
import { User } from './../../../_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import {} from '../../../../../../backend/uploads'
import * as moment from "moment";
import { Observable, merge, forkJoin } from 'rxjs';
import { switchMap, map, catchError, flatMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MessageAlertDisplay } from 'src/app/common-class/message-alert-display';
@Component({
  selector: 'app-new-user',

  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userRegisterFrom: FormGroup;
  //Alert message
  alertDisplayUser = false;
  alertDisplay = false;

  submitted = false;
  loading = false;
  removeUpload: boolean = false;
  editFile: boolean = true;
  buttonStatus = false
  imageErrorMessage = false;

  @Input() isChecked = false;

  error = '';
  locaionPath: any;

  userId: any;
  FormValue: any;
  userRole: any;
  CurrentDate: any;
  imageData: any;
  newImage:any;
  imageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  oldImageUrl: any = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
  profileUrl :any = '../../../../../../backend/uploads/E_BFZXF5AP/0.jpg';
  day:any;
  dateFieldValid = false;

  user = new User();
  constructor(
    private sanitizer:DomSanitizer,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {

   };

  Url:any;
  pdfSrc : '/backend/uploads/E_P3IB1U2R'
  ngOnInit() {

    this.loadData();
    
    //let Phonenumber = "^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$"
    
    this.Url = this.sanitizer.bypassSecurityTrustUrl(this.pdfSrc);

    ///bypassSecurityTrustResourceUrl
  }
  //validation the phone number
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }

  }

  loadData() {
    this.userRegisterFrom = this.formBuilder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      birth: [''],
      age: ['', [Validators.required , Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)]],
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      Emergency: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      address: ['', Validators.required],
      description: [''],
      gender:[''],
      document:['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      })
    this.user.active = false;

    let currentDates = moment().subtract(10, "days").calendar();
    this.CurrentDate = currentDates;

    //Id Gen
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "E_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.userRegisterFrom.controls["id"].setValue(id);

    }
  }




  

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  //
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  get f() {

    return this.userRegisterFrom.controls;

  }

  uploadFile(event) {


    const fileEvnet = event.target.files[0];
    if(fileEvnet){
      this.buttonStatus = true;
    }
    console.log(fileEvnet);
    this.newImage = fileEvnet;
 
    const uploadData = new FormData();
    let fileItem = this.uploader.queue;
    // uploadData.append('file', fileItem);
    this.imageData = event.value;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.FormValue = uploadData;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        if(this.imageUrl != this.oldImageUrl ){ this.imageErrorMessage = false;}
        this.userRegisterFrom.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
        return true;
    }
    else {
        return false;
    }
}
onKey(event){
//  GymAdapterClass.getNicNumber(nic);
 
  let NICNo  = event.target.value;
  ///console.log(event.target.value);
  var dayText = 0;
  var year = "";
  var month = "";

  var gender = "";

    // Year
    if (NICNo.length == 10) {
      year = "19" + NICNo.substr(0, 2);
      dayText = parseInt(NICNo.substr(2, 3));
    //  console.log(year);
     // console.log(dayText);
  } else {
      year = NICNo.substr(0, 4);
      dayText = parseInt(NICNo.substr(4, 3));
    //  console.log(year);
   //   console.log(dayText);
  }
    // Gender
    if (dayText > 500) {
      gender = "Female";
      dayText = dayText - 500;
  } else {
      gender = "Male";
  }
  // Day Digit Validation
  if (dayText < 1 && dayText > 366) {
//onsole.log("Invalid ID");
}else{
   //Month
   if (dayText > 335) {
   this.day = dayText - 335;
    month = "December";
   // console.log(month);
}
else if (dayText > 305) {
   this.day = dayText - 305;
    month = "November";
}
else if (dayText > 274) {
   this.day = dayText - 274;
    month = "October";
}
else if (dayText > 244) {
   this.day = dayText - 244;
    month = "September";
}
else if (dayText > 213) {
   this.day = dayText - 213;
    month = "Auguest";
}
else if (dayText > 182) {
   this.day = dayText - 182;
    month = "July";
}
else if (dayText > 152) {
   this.day = dayText - 152;
    month = "June";
}
else if (dayText > 121) {
   this.day = dayText - 121;
    month = "May";
}
else if (dayText > 91) {
   this.day = dayText - 91;
    month = "April";
}
else if (dayText > 60) {
   this.day = dayText - 60;
    month = "March";
}
else if (dayText < 32) {
    month = "January";
   this.day = dayText;
}
else if (dayText > 31) {
   this.day = dayText - 31;
    month = "Febuary";
}
      if(this.f.age.valid){
        this.dateFieldValid = true;
      }else {
        this.dateFieldValid = false;
      }
      let birthday = year+ "-" + month + "-" + this.day
      this.userRegisterFrom.controls['birth'].setValue(birthday);
      this.userRegisterFrom.controls['gender'].setValue(gender);
}
  
}

  onSubmit(content ,contentDone) {
    this.submitted = true;
    this.loading = true;
    const formData = new FormData();
    //let fileItem = this.uploader.queue[0]._file;
   formData.append('file',  this.newImage);

    let UserData = {
      user_id: this.f.id.value,
      username: this.f.username.value,
      firstName: this.f.username.value,
      role: "User",
      email: this.f.email.value,
      active: true,
      password: this.f.password.value,
      nicNumber:this.f.age.value

    };
  
    //When for validation save data
      if(this.userRegisterFrom.valid &&  this.imageUrl != '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png'){
        //Insertion of Employee
    let UserCreationParam = {
      id: this.f.id.value,
      image: this.newImage.name,
      email: this.f.email.value,
      birth: this.f.birth.value,
      nicNumber: this.f.age.value,
      firstName: this.f.firstName.value,
      username: this.f.username.value,
      lastName: this.f.lastName.value,
      password: this.f.password.value,
      phonenumber: this.f.phonenumber.value,
      Emergency: this.f.Emergency.value,
      role: 'User',
      imagePath: this.imageUrl,
      address: this.f.address.value,
      description: this.f.description.value,
      active: true,
      gender:this.f.gender.value,
      date: this.CurrentDate
    }
     
 this.authenticationService.EmployeeCreate(UserCreationParam , UserData)
 .subscribe(
   result=>{
      if(result.errorStatus == false){
        // Swal.fire({
        //   text: result.errorMessage,
        //   icon: 'success'
        // });
        MessageAlertDisplay.SuccessToastMessage(result.errorMessage);    
        this.imageUrl = '../../../../assets/default-avatar-de27c3b396a84cb2b365a787c1a77cbe.png';
        this.submitted = false;
        this.userRegisterFrom.reset();
        this.loadData();

      } 
   },error=>{
      if(error.error !=undefined && error.error.message.errorStatus == true){
        if(error.error.message.errorMessage.length >0){
        if(error.error.message.errorMessage.length==1){
          var result = error.error.message.errorMessage
          Swal.fire('Oops...', `${error.error.message.errorMessage[0]} already inserted`, 'error');
        }else if(error.error.message.errorMessage.length==2){
          Swal.fire('Oops...', `${error.error.message.errorMessage[0]} and ${error.error.message.errorMessage[1]} already inserted`, 'error');
        }else if(error.error.message.errorMessage.length==3){
          
          Swal.fire('Oops...', `${error.error.message.errorMessage[0]},${error.error.message.errorMessage[1]} and ${error.error.message.errorMessage[2]} already inserted`, 'error');
        
        }else {
          Swal.fire('Oops...', `${error.error.message.errorMessage}`, 'error');
       
        }
      }
      }
      console.log(error);

   }
 )
} else{
      this.imageErrorMessage = true;
      Swal.fire('Oops...', `Something went wrong.form Validated failed!`, 'error')
    }

  }
  //response function for the API
  funcA(response1  ,content ,contentDone){
      if(response1 == UserRegistrationStatus.DUPLICATEEMAIL){
        this.alertDisplayUser = false; 
        this.alertDisplay = true;
         
      }else if(response1 == UserRegistrationStatus.DUPLICATEUSER){
        this.alertDisplay = false;
        this.alertDisplayUser = true;
      }else if(response1 == UserRegistrationStatus.SUCCESS){
        alert('done');
        this.userRegisterFrom.reset();
      }
  }

  

  checkBoxValue(data) {
  //  alert(data.value);

  }

  uploadImage(data: FormData, uniqueId): Observable<any> {
    // tslint:disable-next-line:no-debugger
    //alert("This is the " + data);
    return this.http.post<any>(config.PAPYRUS + `/upload/${uniqueId}`, data);

  }

}
