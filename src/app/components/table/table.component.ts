import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() classes = '';

  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
