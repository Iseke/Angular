import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  
  @Input()
    type: number = 0;
  @Input()
    value: number;
  @Input()
    title: string;
  @Input()
    i: number;
  @Input()
    time: number;
  @Input()
    childs: (number | string)[];

  @Output() changeValue = new EventEmitter<object>();


  
  constructor() { 
    // let inter = setInterval(() => {
    //   this.time -= 0.5
    //   if(!this.time)
    //     clearInterval(inter)
    // }, 100)
  }
  onClick(e, index): void {
    e.preventDefault()
    if(this.time)
      this.changeValue.emit({answer: index, index: this.i});
  }
  ngOnInit(): void {
  }

}
