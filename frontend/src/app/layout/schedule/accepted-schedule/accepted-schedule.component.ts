import { User } from './../../../_models/user';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { ScheduleService } from './../../../services/schedule.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from "moment";
import { debounceTime, distinctUntilChanged, filter, map, mergeMap } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-accepted-schedule',
  templateUrl: './accepted-schedule.component.html',
  styleUrls: ['./accepted-schedule.component.scss']
})
export class AcceptedScheduleComponent implements OnInit {
  formatter = (result: string) => result.toUpperCase();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  ScheduleId: any;
  buttonDisplay = false;
  ScheduleMakeGroup: FormGroup;
  //day2CheckBox:boolean = false;;
  DietPlanGroup: FormGroup;
  dietSubmitted = false;
  displayDietPlan = false;
  displaySubmitbutton = false;
  disaledButton = true;
  dietPlanStatus = false;
  tabTwo = false;
  tabThree = false;
  tabFour = false;
  tabFive = false;
  tabSix = false;
  tabSeven = false;
  submitted = false;
  id: any;
  currentDate: any;
  begginer = false;
  buttonProDisplay = false;
  monthwise = false;
  dayawise = false
  Display = false;
  arrayData: any;
  states = [];
  maxNumber: any;
  selections = ['Months wise', 'Day wise'];
  commonStatus = false;
  ScheduleCategories = ['Normal', 'Advanced'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser);
  }

  ngOnInit() {

    this.ScheduleMakeGroup = this.formBuilder.group({
      id: [''],
      type: [''],
      membershipId: [''],
      date: [''],
      memberName: [''],
      height: [''],
      weight: [''],
      gender: [''],
      instructorName: [''],
      contact: [''],
      endDate: [''],
      dietPlan: [false],
      scheduleCategoryType: ['', Validators.required],
      scheduleName: ['', Validators.required],
      changeStatus: ['', Validators.required],
      BMI: [''],
      note: [''],
      validMonthDay: ['', Validators.max(7)],
      normal: new FormArray([]),
      tickets: new FormArray([]),
      tuesday: new FormArray([]),
      wednesday: new FormArray([]),
      thursday: new FormArray([]),
      friday: new FormArray([]),
      satarday: new FormArray([]),
      sunday: new FormArray([]),
      day2CheckBox: [false], day1checkBox: [''], day2checkBox: [''], day3checkBox: [''], day4checkBox: [''], day5checkBox: [''],
      day6checkBox: ['']
    })

    this.DietPlanGroup = this.formBuilder.group({
      dietPlanId: [''],
      dietPlanName: ['', Validators.required],
      membershipId: [''],
      memberName: [''],
      CreatedName: [''],
      createdContact: [''],
      dietPlanNote: [''],
      intervalNames: new FormArray([]),
    })
    this.loadFormUniqueId();
    this.loadFormData();
    this.loadinstructor();
  }

  get normalSch() { return this.f.normal as FormArray; }
  get f() {
    return this.ScheduleMakeGroup.controls;
  }

  get dietPlan() {
    return this.DietPlanGroup.controls;
  }

  get t() { return this.f.tickets as FormArray; }
  get T() { return this.f.tuesday as FormArray; }
  get W() { return this.f.wednesday as FormArray; }
  get Th() { return this.f.thursday as FormArray; }
  get Fr() { return this.f.friday as FormArray; }
  get S() { return this.f.satarday as FormArray; }
  get Sun() { return this.f.sunday as FormArray; }
  get B() { return this.f.beginner as FormArray; }

  get intervalArray() { return this.dietPlan.intervalNames as FormArray; }





  addIntervals() {
    this.disaledButton = false;
    this.intervalArray.push(this.formBuilder.group({
      intervalName: ['', Validators.required],
      intervalItemArray: this.formBuilder.array([this.getEmbeddedData()])
    }));

    console.log(this.dietPlan.intervalNames.value);

  }
  pushValuetoTable(controls) {

    controls.push(
      this.formBuilder.group({
        foodItemName: ['', Validators.required],
        quantity: ['', Validators.required],
        mearurmentUnit: ['']
      })
    )
    console.log(this.dietPlan.intervalNames.value);
  }

  getEmbeddedData() {
    return this.formBuilder.group({
      foodItemName: ['', Validators.required],
      quantity: ['', Validators.required],
      mearurmentUnit: ['']
    })
  }

  viewDietPlan() {
    const status = this.f.dietPlan.value;
    if (status == true) {
      this.displayDietPlan = true;
      this.displaySubmitbutton = true;
    } else {
      this.displayDietPlan = false;
      this.displaySubmitbutton = false;
      let arr1 = <FormArray>this.DietPlanGroup.controls['intervalNames'];
      arr1.clear();
      this.disaledButton = true;
    }

  }

  preventInput(event) {
    let value = event.target.value;
    if (value >= 7) {
      event.preventDefault();
      this.ScheduleMakeGroup.controls['validMonthDay'].setValue(7);
    }
  }
  changetheButton(data) {
    console.log(data);
    for (let x = 0; x <= 7; x++) {
      switch (data) {
        case `Day-${x}`:

          break;

      }
    }
  }

  changeStatusDayWise() {

  }

  changeStatus(event) {
    let selectedValue = event.target.value;
    switch (selectedValue) {
      case '1: Months wise':
        this.commonStatus = true;
        this.dayawise = false;
        this.monthwise = true;
        break;
      case '2: Day wise':
        this.commonStatus = true;
        this.monthwise = false;
        this.dayawise = true;
        break;
      default:
        this.commonStatus = false;
        this.dayawise = false;
        this.monthwise = false;

    }
  }

  DateCalculator() {
    const dateWiseValue = this.f.changeStatus.value;
    let dm = moment();
    let todayDate = dm.format('L');
    switch (dateWiseValue) {
      case 'Months wise':
        let MonthAsNumber = this.f.validMonthDay.value;
        let addDays = dm.add(MonthAsNumber, 'months');
        let convertDate = addDays.format('L');
        this.ScheduleMakeGroup.controls['endDate'].setValue(convertDate);
        break;
      case 'Day wise':
        let DayAsNumber = this.f.validMonthDay.value;
        let addDaysby = dm.add(DayAsNumber, 'days');
        let convertCurrentDate = addDaysby.format('L');
        this.ScheduleMakeGroup.controls['endDate'].setValue(convertCurrentDate);
        break;

    }
  }

  //loading instructor
  loadinstructor() {
    let data1 = this.currentUserSubject.value;
    this.scheduleService.loadInstrucotrData(data1.user_id)
      .subscribe(
        data => {

          this.ScheduleMakeGroup.controls['instructorName'].setValue(data[0].firstName);
          this.ScheduleMakeGroup.controls['contact'].setValue(data[0].phonenumber);

        }
      )
  }
  //did not input minze Value
  get myInput(): AbstractControl {
    return this.ScheduleMakeGroup.controls['validMonthDay'];
  }

  loadFormUniqueId() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var string_length = 8;
    var id = "NS_" + "";
    var did = "DM_" + "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      id += chars.substring(rnum, rnum + 1);
      this.ScheduleMakeGroup.controls["id"].setValue(id);
    }
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      did += chars.substring(rnum, rnum + 1);
      this.DietPlanGroup.controls["dietPlanId"].setValue(did);
    }


    //Did not input "-" Vaues
    this.myInput.valueChanges
      .subscribe(() => {
        this.myInput.setValue(Math.abs(this.myInput.value), { emitEvent: false });
      });
  }

  loadFormData() {
    let m = moment();
    let DateFormat = m.format('L');

    this.currentDate = DateFormat;
    this.ScheduleMakeGroup.controls['date'].setValue(DateFormat);
    // let currentUser = this.currentUserSubject.value.username;
    this.id = (this.route.snapshot.paramMap.get('id'));
    console.log('load weyan');
    console.log(this.id);

    //Loading relevent
    this.scheduleService.getReleventSchdule(this.id).pipe(
      map(datas => {
        const data = datas[0];
        console.log('response');
        console.log(data);
        this.ScheduleMakeGroup.controls['type'].setValue(data.type);
        this.ScheduleId = data.Sid;
        return data;
      }),
      mergeMap(
        data => this.scheduleService.loadById(data.membershipId)
      )
    ).subscribe(
      response => {
        console.log('load weyan');
        console.log(response);
        this.ScheduleMakeGroup.controls['membershipId'].setValue(response[0].membershipId);
        // this.ScheduleMakeGroup.controls['type'].setValue(response[0].membershipId);
        this.ScheduleMakeGroup.controls['memberName'].setValue(response[0].firstName);
        this.ScheduleMakeGroup.controls['height'].setValue(response[0].Height);
        this.ScheduleMakeGroup.controls['weight'].setValue(response[0].Weight);
        this.ScheduleMakeGroup.controls['gender'].setValue(response[0].gender);
      }

    )

    this.scheduleService.loadInstructor()
      .subscribe(
        response => {
          this.arrayData = response;

          for (var x = 0; x < this.arrayData.length; x++) {
            this.states.push(this.arrayData[x].firstName)
          }
          // this.states = Response.firstName
        }
      )
    // state
  }

  clearTabData() {
    let arr1 = <FormArray>this.ScheduleMakeGroup.controls['tickets'];
    arr1.clear();
    let arr2 = <FormArray>this.ScheduleMakeGroup.controls['normal'];
    arr2.clear();
    let arr3 = <FormArray>this.ScheduleMakeGroup.controls['tuesday'];
    arr3.clear();
    let arr4 = <FormArray>this.ScheduleMakeGroup.controls['wednesday'];
    arr4.clear();
    let arr5 = <FormArray>this.ScheduleMakeGroup.controls['thursday'];
    arr5.clear();
    let arr6 = <FormArray>this.ScheduleMakeGroup.controls['friday'];
    arr6.clear();
    let arr7 = <FormArray>this.ScheduleMakeGroup.controls['satarday'];
    arr7.clear();
    let arr8 = <FormArray>this.ScheduleMakeGroup.controls['sunday'];
    arr8.clear();
  }

  changeScheduleCategoryType(event) {
    let sheduleCat = event.target.value;
    switch (sheduleCat) {
      case '1: Normal':
        this.begginer = true;
        this.Display = false;
        while (this.t.length !== 0) {
          this.t.removeAt(0)
        }
        while (this.T.length !== 0) {
          this.T.removeAt(0)
        }
        while (this.W.length !== 0) {
          this.W.removeAt(0)
        }
        while (this.Th.length !== 0) {
          this.Th.removeAt(0)
        }
        while (this.Fr.length !== 0) {
          this.Fr.removeAt(0)
        }
        while (this.S.length !== 0) {
          this.S.removeAt(0)
        }
        while (this.Sun.length !== 0) {
          this.Sun.removeAt(0)
        }
        while (this.B.length !== 0) {
          this.B.removeAt(0)
        }
        break;
      case '2: Advanced':
        this.begginer = false;
        this.Display = true;
        while (this.normalSch.length !== 0) {
          this.normalSch.removeAt(0)
        }
        break;
      default:
        this.begginer = false;
        this.Display = false;
        while (this.t.length !== 0) {
          this.t.removeAt(0)
        }
        while (this.T.length !== 0) {
          this.T.removeAt(0)
        }
        while (this.W.length !== 0) {
          this.W.removeAt(0)
        }
        while (this.Th.length !== 0) {
          this.Th.removeAt(0)
        }
        while (this.Fr.length !== 0) {
          this.Fr.removeAt(0)
        }
        while (this.S.length !== 0) {
          this.S.removeAt(0)
        }
        while (this.Sun.length !== 0) {
          this.Sun.removeAt(0)
        }
        while (this.B.length !== 0) {
          this.B.removeAt(0)
        }
        while (this.normalSch.length !== 0) {
          this.normalSch.removeAt(0)
        }
    }
  }

  onclickremoveSunday(i) {
    let length = this.Sun.length;
    // console.log(length);
    this.Sun.removeAt(i);
  }


  onClickBeginner(e) {
    this.submitted = false;
    this.normalSch.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required]

    }));

  }
  onclickSunday(e) {
    this.Sun.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      sun_startDate: ['']
    }));
  }

  onclickSat(e) {
    this.S.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      s_startDate: ['']
    }));
  }

  onclickremoveSta(i) {
    let length = this.S.length;
    // console.log(length);
    this.S.removeAt(i);
  }

  onclickFriday(e) {
    this.Fr.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      f_startDate: ['']
    }));
  }

  onclickThursday(e) {
    this.Th.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      th_startDate: ['']
    }));
  }

  onclickwednesday(e) {
    this.W.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      w_startDate: ['']
    }));
  }
  onclickTuesday(e) {
    this.T.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      t_startDate: ['']
    }));
  }
  onClickTickets(e) {
    this.t.push(this.formBuilder.group({
      normalExerciseName: ['', Validators.required],
      normalExerciseRepetition: ['', Validators.required],
      normalExerciseRounds: ['', Validators.required],
      startDate: ['']
    }));
  }
  onclickRemoveThursday(i) {
    let length = this.Th.length;
    // console.log(length);
    this.Th.removeAt(i);
  }

  onclickRemoveFriday(i) {
    let length = this.Fr.length;
    // console.log(length);
    this.Fr.removeAt(i);
  }

  onclickRemovewednesday(i) {
    let length = this.W.length;
    // console.log(length);
    this.W.removeAt(i);
  }
  onclickRemoveTuesday(i) {
    let length = this.T.length;
    // console.log(length);
    this.T.removeAt(i);
  }
  onClickRemoveBeginner(i) {
    this.normalSch.removeAt(i);
  }
  onClickRemove(i) {
    let length = this.t.length;
    // console.log(length);
    this.t.removeAt(i);
  }
  popSubValuetoTable(i, data) {

  }

  popValuetoTable(i) {

    console.log(this.intervalArray.length);
    if (this.intervalArray.length == 1) {
      this.disaledButton = true;
    }
    this.intervalArray.removeAt(i);
  }

  removeIntervals(index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        let arr1 = <FormArray>this.DietPlanGroup.controls['intervalNames'];
        arr1.clear();
        this.disaledButton = true;

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

    // console.log(index)
    // this.intervalArray.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.f.scheduleCategoryType.value == 'Normal') {
      if ((this.displayDietPlan == true && this.dietPlan.intervalNames.value.length == 0) && this.getValidationField('Normal') == true) {
        Swal.fire('Oops...', `Please Create the Schedule steps and intervals`, 'error')
        return
      } else if (this.f.normal.value.length == 0) {
        Swal.fire('Oops...', `Please Create the Schedule steps`, 'error')
        return;
      }
    } else if (this.f.scheduleCategoryType.value == 'Advanced') {
      if ((this.displayDietPlan == true && this.dietPlan.intervalNames.value.length == 0) && this.getValidationField('Advanced') == true) {
        Swal.fire('Oops...', `Please Create the Schedule steps and intervals `, 'error');
        return
      } else if (this.f.tickets.value.length == 0) {
        Swal.fire('Oops...', `Please Create the Schedule steps`, 'error')
        return;
      }
    }

    let sceduleData = {
      id: this.f.id.value,
      type: this.f.type.value,
      membershipId: this.f.membershipId.value,
      date: this.f.date.value,
      memberName: this.f.memberName.value,
      height: this.f.height.value,
      weight: this.f.weight.value,
      gender: this.f.gender.value,
      BMI: this.f.BMI.value,
      instructorId: this.currentUserSubject.value.user_id,
      instructorName: this.f.instructorName.value,
      contact: this.f.contact.value,
      endDate: this.f.endDate.value,
      note: this.f.note.value,
      dietPlan: this.f.dietPlan.value,
      nameOfSchedule: this.f.scheduleName.value,
      changeStatus: this.f.changeStatus.value,
      validMonthDay: this.f.validMonthDay.value,
      tickets: this.f.tickets.value,
      tuesday: this.f.tuesday.value,
      wednesday: this.f.wednesday.value,
      thursday: this.f.thursday.value,
      friday: this.f.friday.value,
      satarday: this.f.satarday.value,
      sunday: this.f.sunday.value,
      ScheduleId: this.ScheduleId,
      scheduleCategoryType: this.f.scheduleCategoryType.value,
      normal: this.f.normal.value

    }
    //dietplan Object
    let dietPlan = {
      dietPlanId: this.dietPlan.dietPlanId.value,
      membershipId: this.f.membershipId.value,
      ScheduleId: this.ScheduleId,
      dietPlanName: this.dietPlan.dietPlanName.value,
      memberName: this.f.memberName.value,
      CreatedName: this.f.instructorName.value,
      createdContact: this.f.contact.value,
      dietPlanNote: this.dietPlan.dietPlanNote.value,
      intervalNames: this.dietPlan.intervalNames.value
    }

    //savingDataObject
    let schduleObject = {
      sceduleData: sceduleData,
      dietPlan: dietPlan
    }
    //submit 
    if (this.ScheduleMakeGroup.valid) {
      this.saveScheduleData(schduleObject);
    } else if (this.ScheduleMakeGroup.valid && this.DietPlanGroup.valid) {
      this.saveScheduleData(schduleObject);
    } else {
      Swal.fire('Oops...', `Form validation failed`, 'error')
    }
    if (this.displayDietPlan == true) {
      //dekama save wenna ona ne
      this.submitted = true;
      this.dietSubmitted = true;
      if (this.dietPlan.intervalNames.value.length == 0) {
        Swal.fire('Oops...', `Please add diet plan intervals😊`, 'error');
        return;
      }
      //       
    }
  }

  //service calling method for the schdeule data
  saveScheduleData(schduleObject) {

    this.scheduleService.insertscheduleDietData(schduleObject)
      .subscribe(
        response => {
          console.log(response);
          if (response == 1) {
            Swal.fire({
              text: 'Schedule Plan create with diet plan successfully Created',
              icon: 'success'
            });
            this.clearTabData();
            this.submitted = false;
            this.router.navigate(['/dashboard']);
          }
        },
        error=>{
          console.log(error);
        },
        ()=>{
          console.log('done')
        })



    //             this.clearTabData();
    //             this.submitted = false;
    //           //  this.ScheduleMakeGroup.reset();
    //           //  this.loadFormUniqueId();
    //             this.router.navigate(['/dashboard']);
    //           }
    //           console.log(response);
    //         }
    //       )}else{
    //         console.log('naha valid')
    //       }
    //     }else{
    //       //normal form eka submitwenwa dietPlanStatus
    //     this.submitted = true;

    //     console.log(sceduleData);


    //     //without the dietplanccc
    //  if(this.ScheduleMakeGroup.valid){

    //     return;
    //     this.scheduleService.createSchedule(sceduleData)
    //     .subscribe(
    //       response=>{
    //         console.log(response);
    //         if(response==1){
    //           Swal.fire({
    //             text: 'Schedule Plan successfully Created',
    //             icon: 'success'
    //           });

    //           this.submitted = false;
    //           this.ScheduleMakeGroup.reset();
    //           this.loadFormUniqueId();
    //           this.clearTabData();
    //           this.router.navigate(['/dashboard']);

    //         }
    //       },
    //     error=>{
    //       console.log(error)
    //     }
    //     )
    //   }
    //   else{
    //     console.log('dasdasas0');
    //   }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  onSubmitDietPlan() {
    this.dietSubmitted = true;

  }

  getValidationField(stringVal) {

    switch (stringVal) {
      case 'Normal':
        if (this.f.normal.value.length == 0) {
          return true;
        }
        return false;
        break;
      case 'Advanced':
        if (this.f.tickets.value.length == 0) {
          return true;
        }
        return false;
        break;
    }

    // if(this.f.normal.value.length >0 || this.f.tickets.value.length >0 || this.f.tuesday.value.length >0 || this.f.normal.value.length >0
    //   ||  )
    return false;
  }

  ValidateCheckBoxDisabality(data) {
    var tabValueControl = data
    switch (data) {
      case 'tab-01':
        if (this.ScheduleMakeGroup.controls.tickets.valid) {
          return true;
        }
        return false;
        break;
      case 'tab-02':
        if (this.ScheduleMakeGroup.controls.tuesday.valid) {
          return true;
        }
        return false;
        break;
      case 'tab-03':
        if (this.ScheduleMakeGroup.controls.wednesday.valid) {
          return true;
        }
        return false;
        break;
      case 'tab-04':
        if (this.ScheduleMakeGroup.controls.thursday.valid) {
          return true;
        }
        return false;
        break;
      case 'tab-05':
        if (this.ScheduleMakeGroup.controls.friday.valid) {
          return true;
        }
        return false;
        break;
    }

  }

  enablitityTabs(data) {
    switch (data) {
      case 'tab-01':
        this.tabTwo = true;
        break;
      case 'tab-02':
        // this.tabTwo = true;
        this.tabThree = true;
        break;
      case 'tab-03':
        this.tabFour = true;
        break;
      case 'tab-04':
        this.tabFive = true;
        break;
      case 'tab-05':
        this.tabSix = true;
        break;
      case 'tab-06':
        this.tabTwo = true;
        break;
      case 'tab-07':
        this.tabTwo = true;
        break;

    }

  }
}
