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

  DepartmentIdFilter: string = '';
  DepartmentNameFilter: string = '';
  DepartmentListWithoutFilter: any = [];

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
    // console.log('edit clicked');
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
      this.DepartmentListWithoutFilter = data;
    });
  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentsList = this.DepartmentListWithoutFilter.filter(function (
      el: any
    ) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop: any, asc: any) {
    this.DepartmentsList = this.DepartmentListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
