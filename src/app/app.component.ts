import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    for (let i=0; i<500; i++)
      this.numbers.push(i);
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
}

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack-bar-component.html'
})
export class SnackBarComponent {}


import { Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
