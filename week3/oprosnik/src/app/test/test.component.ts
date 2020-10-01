import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public globalTime: number;
  public questions: object[];
  public end: boolean = false;
  private inter: any;
  
  constructor(private router:Router) { 
    this.globalTime = localStorage.getItem('time') ? JSON.parse(localStorage.getItem('time')) : 100
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.setIndex({selectedIndex: 0})
    let inter = setInterval(() => {
      this.globalTime -= 0.05
      localStorage.setItem('time', JSON.stringify(this.globalTime))
      if(!this.globalTime){
        clearInterval(inter)
        this.router.navigate(['result'])
      }
    }, 100)
  }

  setIndex(event) {
    let selectedIndex = event.selectedIndex;
    if(this.inter)
      clearInterval(this.inter)
    this.inter = setInterval(() => {
      this.questions[selectedIndex]['time'] -= 0.5
      this.saveHistory()
      if(this.questions[selectedIndex]['time'] <= 0){
        this.questions[selectedIndex]['time'] = 0
        clearInterval(this.inter)
      }
    }, 100)
    this.saveHistory()
  }
  removeTime(index): void {
    this.questions[index]['time'] = 0
    this.saveHistory()
  }
  changeValue(data): void {
    if(this.questions[data.index]['type'])
      if(this.questions[data.index]['answer'].indexOf(data.answer) !== -1)
        this.questions[data.index]['answer'].splice(this.questions[data.index]['answer'].indexOf(data.answer, 1))
      else
        this.questions[data.index]['answer'].push(data.answer)
    else
      this.questions[data.index]['answer'] = data.answer
    this.saveHistory()
  }

  saveHistory(): void {
    if(!this.questions.filter(x => {
      if(x['type'])
        return !x['answer'].length
      else
      return x['answer'] === -1
    }).length)
      this.end = true
    else
      this.end = false
    localStorage.setItem('questions', JSON.stringify(this.questions))
  }

  ngOnInit(): void {
  }

}
