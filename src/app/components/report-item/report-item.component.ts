import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Report';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {

  @Input() item!: Report;

  showModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
