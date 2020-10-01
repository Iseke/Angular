import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creater',
  templateUrl: './creater.component.html',
  styleUrls: ['./creater.component.scss']
})
export class CreaterComponent implements OnInit {
  public questions: object[];
  public results: (number | object)[];
  private id: number = 1;

  constructor(private router:Router) { 
    this.results = [-1]
    this.questions = [
      {
        id: this.id,
        time: 100,
        quest: 'Question title',
        answers: [{value:'first answer'}, {value:'second answer'}],
        answer: -1,
        type: 0
      },
    ]
  }
  changeQuest(e, index, second, name): void{
    if(name || name === 0)
      this.questions[index][second][name].value = e.target.value
    else
      this.questions[index][second] = e.target.value
  }
  addQuestion(): void{
    this.results.push(-1)
    this.questions.push(
      {
        id: ++this.id,
        time: 100,
        quest: 'Question title',
        answers: [{value:'first answer'}, {value:'second answer'}],
        answer: -1,
        type: 0
      }
    )
  }
  changeType(index): void{
    this.questions[index]['type'] = !!this.questions[index]['type'] ? 0 : 1
    if(this.questions[index]['type']){
      this.questions[index]['answer'] = []
      this.results[index] = this.results[index] === -1 ? [] : [this.results[index]]
    }else{
      this.questions[index]['answer'] = -1
      this.results[index] = this.results[index][0] || this.results[index][0] === 0 ? this.results[index][0] : -1
    }
  }
  changeResult(e, i, j): void{
    e.preventDefault()
    if(typeof this.results[i] === 'object')
      if(this.results[i]['indexOf'](j) !== -1)
        this.results[i]['splice'](this.results[i]['indexOf'](j), 1)
      else
      this.results[i]['push'](j)
    else
      this.results[i] = j
  }
  saveTest(): void{
    let questions = this.questions.map( x => {
      x = {...x, answers: x['answers'].map(element => {
        return element.value
      })}
      return x
    })
    localStorage.setItem('results', JSON.stringify(this.results))
    localStorage.setItem('questions', JSON.stringify(questions))
    this.router.navigate([''])
  }

  ngOnInit(): void {
  }

}
