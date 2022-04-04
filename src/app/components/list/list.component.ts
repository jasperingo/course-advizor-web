import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() data: any[] = [];

  @Input() classes = '';

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    
  }

}
