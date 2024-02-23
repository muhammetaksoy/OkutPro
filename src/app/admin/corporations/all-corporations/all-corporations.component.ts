import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddCorporationDialogComponent } from './dialogs/add-corporation-dialog/add-corporation-dialog.component';
import { CorporationService } from './corporations.service';
import { AllCorporations } from './all-corporations.model';

@Component({
  selector: 'app-all-corporations',
  templateUrl: './all-corporations.component.html',
  styleUrls: ['./all-corporations.component.scss'],
})
export class AllCorporationsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  filterToggle = false;
  displayedColumns = [
    'CorporationName',
    'BaseAddress',
    'PhoneNumber',
    'Email',
    'actions'
  ];
  exampleDatabase?: CorporationService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<AllCorporations>(true, []);
  id?: number;
  teachers?: AllCorporations;
  constructor(
    public httpClient: HttpClient,
    public corporationService: CorporationService,
    public router:Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

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
  toggleStar(row: AllCorporations) {
    console.log(row);
  }

  refresh() {
    this.loadData();
  }

  // detailTeacher(row:AllCorporations){
  //   console.log("row",row);
  //   this.router.navigate(['/admin/teachers/about-teacher',row.ExpertId]);
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


  addCredit() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddCorporationDialogComponent, {
      data: {
        teachers: AllCorporations,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log("result",result);
      
      if (result === 1) {
        this.corporationService?.dataChange.value.unshift(
          this.corporationService.getDialogData()
        );
        this.refresh();
        this.showNotification(
          'snackbar-success',
          'kredi başarılı bir şekilde eklendi...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  public loadData() {
    this.exampleDatabase = new CorporationService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
}
export class ExampleDataSource extends DataSource<AllCorporations> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: AllCorporations[] = [];
  renderedData: AllCorporations[] = [];
  constructor(
    public exampleDatabase: CorporationService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AllCorporations[]> {
    // Listen for AllCorporations changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCorporations();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((staffAttendance: AllCorporations) => {
            const searchStr = (
              staffAttendance.CorporationId+
              staffAttendance.CorporationName +
              staffAttendance.PhoneNumber
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
  sortData(data: AllCorporations[]): AllCorporations[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'ExpertId':
          [propertyA, propertyB] = [a.CorporationId, b.CorporationId];
          break;
        case 'NameSurname':
          [propertyA, propertyB] = [a.CorporationName, b.CorporationName];
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
