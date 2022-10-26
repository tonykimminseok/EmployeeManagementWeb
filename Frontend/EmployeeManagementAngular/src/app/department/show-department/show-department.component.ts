import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css'],
})
export class ShowDepartmentComponent implements OnInit {
  constructor(private service: SharedService) {}

  DepartmentsList: any = [];

  ModalTitle!: string;
  ActivateAddEditDepartmentComp: boolean = false;
  department: any;

  // this function will execute when show-department component is in scope
  ngOnInit(): void {
    this.refreshDepartmentsList();
  }

  addClick(): void {
    this.department = {
      DepartmentId: 0,
      DepartmentName: '',
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepartmentComp = true;
  }

  editClick(item: any): void {
    console.log('edit clicked');
    this.department = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepartmentComp = true;
  }

  closeClick() {
    this.ActivateAddEditDepartmentComp = false;
    this.refreshDepartmentsList();
  }

  refreshDepartmentsList() {
    // asynchronous operation
    this.service.getDepartmentsList().subscribe((data) => {
      this.DepartmentsList = data;
    });
  }
}
