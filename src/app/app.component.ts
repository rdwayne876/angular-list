import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
 
export class AppComponent {
  title = 'angular-list';

  // @ViewChild(MatSort) sort: MatSort

  

  itemForm!: FormGroup

  items: any[] = []
  total: number = 0

  displayedColumns: string[] = [ 'Name', 'Quantity', 'Price', 'Total']
  dataSource = this.items

  constructor( private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      Name: [ '', Validators.required],
      Quantity: [ '', Validators.required],
      Price: [ '', Validators.required]
    })
  }

  ngAfterViewInit(){
  }

  addItem() {
    if( this.itemForm.valid){
      // this.items.push(this.itemForm.value)
      console.log(this.items);
    }
    this.onAdd()
  }

  onAdd(){
    let model = this.itemForm.value
    this.dataSource.push(model)
    this.dataSource = [...this.dataSource]
    this.dataSource.sort(function( a, b){
      let x = a.Name.toLowerCase()
      let y = b.Name.toLowerCase()
      if( x < y) { return -1}
      if( x > y) { return 1}
      return 0
    })
    this.getTotal()
  }

  getTotal() {
    this.total = this.dataSource.reduce(( accumulator, obj) =>  accumulator + ( obj.Price * obj.Quantity), 0)
    console.log(this.total);
  }

}
