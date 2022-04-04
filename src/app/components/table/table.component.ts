import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() data: any[] = [];

  @Input() classes = '';

  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;

  trackById(_: number, item: any) {
    return item.id;
  }
}
