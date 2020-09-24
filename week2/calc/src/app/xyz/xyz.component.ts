import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.scss']
})

export class XyzComponent implements OnInit {
  public numbers: (number | string)[];
  public top_operations: string[];
  public operations: string[];
  public memory: string[];
  // tslint:disable-next-line:variable-name
  public mem_data: number[];
  // tslint:disable-next-line:variable-name
  public show_mem: boolean;
  public history: string[];
  // tslint:disable-next-line:variable-name
  public show_his: boolean;
  public data: any;
  public chislo: any;
  public oper: string;
  public finish: any;

  constructor() {
    this.numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, '+/-', 0, '.'];
    // @ts-ignore
    this.top_operations = [['C', 'del', '√'], ['^', '1/x', '%']];
    this.operations = ['/', '*', '+', '-'];
    this.memory = ['MC', 'MR', 'M+', 'M-', 'MS', 'M↓'];
    this.mem_data = [];
    this.show_mem = false;
    this.history = [];
    this.show_his = false;
    this.data = '';
    this.finish = '';
  }
  changeCurrentMem(index): void {
    this.mem_data.splice(0, 0, this.mem_data[index]);
    this.mem_data.splice(index + 1, 1);
  }
  memoryOperations(mem): void {
    switch (mem){
      case 'MC': this.mem_data = []; break;
      case 'MR': if (this.mem_data.length){
        this.data = this.mem_data[0];
      }          break;
      case 'M+': if (this.mem_data.length){
        this.mem_data[0] += parseFloat(this.data);
      }          break;
      case 'M-': if (this.mem_data.length){
        this.mem_data[0] -= parseFloat(this.data);
      }          break;
      case 'MS': this.mem_data.splice(0, 0, parseFloat(this.finish) || parseFloat(this.data) || 0); break;
      case 'M↓': this.show_mem = !this.show_mem; break;
    }
  }
  changeData(operation): void {
    // tslint:disable-next-line:radix
    this.show_his = false;
    this.show_mem = false;
    if (operation === '√'){
      this.finish = Math.sqrt(this.data);
      this.history.push('√ ' + this.data + ' = ' + this.finish);
      this.data = '';
    }else if (operation === '+/-'){
      this.data *= -1;
    } else if (operation === '1/x'){
      this.finish = 1 / (this.data || 1);
      this.data = '';
    } else if (!isNaN(parseFloat(operation))){
      this.data += String(operation);
      this.finish = '';
    }
    else{
      if (operation === 'C'){
        this.finish = '';
        this.data = '';
      }
      if (operation === '.'){
        this.data += '.';
      }
      else if (operation === 'del'){
        this.data = this.data.slice(0, this.data.length - 1);
      }
      else if (operation === '='){
        if (this.data) {
          if (!this.chislo) {
            this.finish = this.data;
          }
          else {
            this.finish = checkOper(this.oper, this.chislo, parseFloat(this.data));
          }
          this.history.push(
            (this.chislo ? this.chislo + ' ' : '')
            + (this.oper ? this.oper + ' ' : '')
            + this.data + ' = ' + this.finish);
        }
        else {
          this.finish = this.chislo;
        }
        this.data = '';
        this.chislo = 0;
        this.oper = '';
      }
      else{
        if (this.chislo) {
          // tslint:disable-next-line:no-bitwise
          if (this.data) {
            // tslint:disable-next-line:no-bitwise
            this.history.push(this.chislo + ' ' + this.oper + ' ' +  parseFloat(String(this.data | this.finish)));
            // tslint:disable-next-line:no-bitwise
            this.chislo = checkOper(this.oper, this.chislo, parseFloat(String(this.data | this.finish)));
          }
        }
        else {
          // tslint:disable-next-line:no-bitwise
          this.chislo = this.data ? this.data :  this.finish;
        }
        this.oper = String(operation);
        this.data = '';
        this.finish = '';
      }
    }
  }
  ngOnInit(): void {
  }

}

const checkOper = (oper, first, ...numbers) => {
  let result = parseFloat(first);
  switch (oper){
    case '*': for (const numb of numbers) { result *= parseFloat(numb); } break;
    case '/': for (const numb of numbers) { result /= parseFloat(numb); } break;
    case '%': for (const numb of numbers) { result %= parseFloat(numb); } break;
    case '-': for (const numb of numbers) { result -= parseFloat(numb); } break;
    case '+': for (const numb of numbers) { result += parseFloat(numb); } break;
    case '^': for (const numb of numbers) { result = Math.pow(result, numb); } break;
  }
  return result;
};
