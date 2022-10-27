import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  constructor(private service: SharedService) {}

  @Input() employee: any;
  EmployeeId!: string;
  EmployeeName!: string;
  Department!: string;
  DateOfJoining!: string;
  PhotoFileName!: string;
  PhotoFilePath!: string;

  DepartmentNamesList: any = [];

  ngOnInit(): void {
    this.loadDepartmentNamesList();
  }

  loadDepartmentNamesList(): void {
    this.service.getAllDepartmentNames().subscribe((data) => {
      this.DepartmentNamesList = data;
    });

    this.EmployeeId = this.employee.EmployeeId;
    this.EmployeeName = this.employee.EmployeeName;
    this.Department = this.employee.Department;
    this.DateOfJoining = this.employee.DateOfJoining;
    this.PhotoFileName = this.employee.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
  }

  addEmployee(): void {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee(): void {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any): void {
    let file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }
}
