import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiServiceService } from '../shared/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  hidden = false;
  formValue!: FormGroup;
  employeeModel: EmployeeModel = new EmployeeModel();
  employees: EmployeeModel[] = [];

  constructor(private formBuilder: FormBuilder, private api: ApiServiceService,
    private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });

    this.getEmployees();
  }
  getEmployees() {
    this.api.getEmployee().subscribe(
      res => {
        this.employees = res;
        console.log(this.employees);
      }
    );
  }

  update() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModel, this.employeeModel.id).subscribe(res => {
      this.toastr.success(res.firstName + " " + res.lastName + " updated", "Employee Update");
      this.formValue.reset();
      let ref = document.getElementById("cancel");
      ref?.click();
      this.getEmployees();
    },
      err => alert("error")
    );

  }

  @Input()
  set event(event: Event) {
    if (event) {
      this.toggle(false);
    }
  }

  toggle(selection: boolean) {
    this.hidden = selection;
  }
  edit(row: any) {
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.employeeModel.id = row.id;
  }
  delete(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      this.toastr.success(row.firstName + " " + row.lastName + " deleted", "Employee Delete");
      this.formValue.reset();
      this.getEmployees();
    },
      err => {
        alert("Error");
      });
  }
  isValid(emp: EmployeeModel): Boolean {
    if (!emp.firstName || emp.firstName.length < 3) {
      alert("firstname not valid");
      return false;
    }
    if (!emp.lastName || emp.lastName.length < 3) {
      alert("lastname not valid");
      return false;
    }
    var pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
    if (!emp.email || !emp.email.match(pattern)) {
      alert("emial not valid");
      return false;
    }
    pattern = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$";
    if (!emp.mobile || !emp.mobile.match(pattern)) {
      alert("mobli not valid");
      return false;
    }
    pattern = "[0-9]";
    if (!emp.salary || !emp.salary.match(pattern)) {
      alert("salary not valid");
      return false;
    }
    return true;
  }
  postEmployeeDetail() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;
    if (!this.isValid(this.employeeModel))
      return;



    this.api.postEmployee(this.employeeModel).subscribe(
      res => {
        this.toastr.success(this.employeeModel.firstName + " " + this.employeeModel.lastName + " deleted", "Employee Delete");

        this.formValue.reset();
        let ref = document.getElementById("cancel");
        ref?.click();
        this.getEmployees();
      },
      error => {
        alert("error");
      }

    );
  }


}
