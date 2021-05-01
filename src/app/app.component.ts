import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Student {
  id: number;
  name: string;
  grade: number;
  age: number;
}

const STUDENT_DATA: Student[] = [
  {id: 1, name: 'Max', grade: 3, age: 12 },
  {id: 2, name: 'Mark', grade: 4, age: 14},
  {id: 3, name: 'Kyu', grade: 3.5, age: 5},
  {id: 4, name: 'Ray', grade: 5, age: 7},
  {id: 5, name: 'Eddy', grade: 2.75, age: 12},
  {id: 6, name: 'Brett', grade: 4.25, age: 17},
  {id: 7, name: 'Hamish', grade: 1, age: 8},
  {id: 8, name: 'John', grade: 2.5, age: 11},
  {id: 9, name: 'Sam', grade: 4.5, age: 13},
  {id: 10, name: 'Cas', grade: 3.75, age: 9},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  title = 'angular-material-demo';
  showSidenav = false;
  expansionPanelStep = 0;
  options: string[] = ["Hello", "Hej", "Konnichiwa", "Anioung"];
  objOptions = [
    { name: "obj.Hello" },
    { name: "obj.Hej" },
    { name: "obj.Konnichiwa" },
    { name: "obj.Anioung" }
  ];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  minDate = new Date(1800, 0, 1);
  maxDate = new Date();
  numbers: number[]= [];
  displayedColumns: string[] = ['id', 'name', 'age', 'grade'];
  dataSource = new MatTableDataSource(STUDENT_DATA);

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    for (let i=0; i<500; i++)
      this.numbers.push(i);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  nextStep() {
    this.expansionPanelStep++;
  }

  setStep(step: number) {
    this.expansionPanelStep = step;
  }

  log(message: string) {
    console.log(message);
  }

  selectDisplay(subject) {
    return subject? subject.name : undefined;
  }

  _dateFilter(date: Date) {
    return date.getDay() != 5 && date.getDay() != 4;
  }

  openSnackBar(checked) {
    var message = checked? "unlocked 3rd step" : "3rd step is locked"
    let snackBarRef = this.snackBar.open(message, "dismiss", {duration: 3000});
    snackBarRef.afterDismissed().subscribe(() => {
      console.log("the snackbar was dismissed");
    });
    snackBarRef.onAction().subscribe(() => {
      console.log("the snackbar action was triggered");
    });
  }

  openCostumSnackBar() {
    let snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {duration: 3000});
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {data: {name: "Maxeu", lastName: "Ben"}});
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: " + result);
    })
  }

  logRow(row) {
    console.log(row);
  }

  applyTableFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar-component.html'
})
export class SnackBarComponent {}


import { Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
