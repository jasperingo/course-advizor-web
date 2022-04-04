import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() data: any[] = [];

  @Input() classes = '';

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  trackById(_: number, item: any) {
    return item.id;
  }

}
