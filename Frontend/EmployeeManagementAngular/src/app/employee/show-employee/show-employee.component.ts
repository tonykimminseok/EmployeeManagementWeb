import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css'],
})
export class ShowEmployeeComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeesList: any = [];

  ModalTitle!: string;
  ActivateAddEditEmployeeComp: boolean = false;
  employee: any;

  // this function will execute when show-department component is in scope
  ngOnInit(): void {
    this.refreshEmployeesList();
  }

  addClick(): void {
    this.employee = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'patrick.png',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmployeeComp = true;
  }

  editClick(item: any): void {
    // console.log('edit clicked');
    this.employee = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmployeeComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmployeeComp = false;
    this.refreshEmployeesList();
  }

  refreshEmployeesList() {
    // asynchronous operation
    this.service.getEmployeesList().subscribe((data) => {
      this.EmployeesList = data;
    });
  }
}
