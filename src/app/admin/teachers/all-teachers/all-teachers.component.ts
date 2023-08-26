import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { UnsubscribeOnDestroyAdapter } from "@shared/UnsubscribeOnDestroyAdapter";
import { TeachersService } from "./teachers.service";
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { Teachers } from "./teachers.model";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, Observable, map, merge } from "rxjs";

@Component({
  selector: 'app-all-teachers.component',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss'],
})
export class AllTeachersComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'NameSurname',
    'SubCorporationName',
    'actions',
  ];
  teacherService?: TeachersService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Teachers>(true, []);
  id?: number;
  teachers?: Teachers;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teachersService: TeachersService,

    private snackBar: MatSnackBar,
    private router:Router
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };



  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  // addNew() {
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       students: this.students,
  //       action: 'add',
  //     },
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {

  //     console.log("result",result);
      

  //     if (result === 1) {
  //       // After dialog is closed we're doing frontend updates
  //       // For add we're just pushing a new row inside DataServicex
  //       this.studentService?.dataChange.value.unshift(
  //         this.studentsService.getDialogData()
  //       );
  //       this.refresh();
  //       this.showNotification(
  //         'snackbar-success',
  //         'Kayıt başarılı bir şekild eklendi...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  // editCall(row: Students) {
  //   this.id = row.StudentId;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       students: row,
  //       action: 'edit',
  //     },
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     console.log("result",result);

  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.studentService?.dataChange.value.findIndex(
  //         (x) => x.StudentId === this.id
  //       );
  //       // Then you update that record using data from dialogData (values you enetered)
  //       if (foundIndex != null && this.studentService) {
  //         this.studentService.dataChange.value[foundIndex] =
  //           this.studentsService.getDialogData();
  //         // And lastly refresh table
  //         this.refresh();
  //         this.showNotification(
  //           'black',
  //           'Kayıt başarılı bir şekilde güncellendi...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }
  // deleteItem(row: Students) {
  //   console.log("row",row);
    
  //   this.id = row.StudentId;
  //   let tempDirection: Direction;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       const foundIndex = this.studentService?.dataChange.value.findIndex(
  //         (x) => x.StudentId === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       if (foundIndex != null && this.studentService) {
  //         this.studentService.dataChange.value.splice(foundIndex, 1);
  //         this.refresh();
  //         this.showNotification(
  //           'snackbar-danger',
  //           'Delete Record Successfully...!!!',
  //           'bottom',
  //           'center'
  //         );
  //       }
  //     }
  //   });
  // }

  // detailStudent(row:Students){
  //   console.log("row",row);
  //   this.router.navigate(['/admin/students/about-student',row.StudentId]);
  // }



  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {    
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.filteredData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.teacherService?.dataChange.value.splice(index, 1);
      this.refresh();
      this.selection = new SelectionModel<Teachers>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }



  public loadData() {
    this.teacherService = new TeachersService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.teacherService,
      this.paginator,
      this.sort
    );
  }
  // // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.dataSource.filteredData.map((x) => ({
  //       'Roll No': x.rollNo,
  //       Name: x.StudentName,
  //       Department: x,
  //       Gender: x.gender,
  //       Mobile: x.mobile,
  //       Email: x.email,
  //       'Admission Date':
  //         formatDate(new Date(x.date), 'yyyy-MM-dd', 'en') || '',
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Teachers) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}


export class ExampleDataSource extends DataSource<Teachers> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Teachers[] = [];
  renderedData: Teachers[] = [];
  constructor(
    public teacherService: TeachersService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Teachers[]> {
    debugger
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.teacherService.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.teacherService.getAllTeachers();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.teacherService.data
          .slice()
          .filter((teachers: Teachers) => {
            const searchStr = (
              teachers.ExpertId +
              teachers.NameSurname
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    // disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Teachers[]): Teachers[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.ExpertId, b.ExpertId];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
