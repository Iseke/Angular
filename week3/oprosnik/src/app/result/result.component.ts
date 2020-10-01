import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public questions: object[];
  public results: (number | object)[];
  constructor() {
    this.questions = JSON.parse(localStorage.getItem('questions'))
    this.results = JSON.parse(localStorage.getItem('results'))
  }
  checkAnswer(i, j): number {
    let result = 0
    if(this.questions[i]['type'])
      this.results[i]['forEach'](x => {
        if (!result && x === j)
          result = 1
      })
      if(result)
        this.questions[i]['answer'].forEach(x => {
          if (result !== 2 && x === j)
            result = 2
        });

    else{
      if(this.results[i] === j)
        if(this.questions[i]['answer'] === this.results[i])
          result = 2
        else
          result = 1
      else
        result = 0
    }

    return result

  }
  ngOnInit(): void {
  }

}
