import { Component } from '@angular/core';
import { QuestionserviceService } from '../service/questionservice.service';
import { NumberInput } from '@angular/cdk/coercion';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  public questionlist :any=[];
  public currentquestion :number = 0;
  public points:number =0;
  counter=60;
  correctanswer:number=0;
  incorrectanswer:any=0;
  interval$:any;
  isquizcompleted : boolean = false;
  constructor(private questionservice : QuestionserviceService){}
  getallquestion(){
    this.questionservice.getquestionjson().subscribe(res=>{
      this.questionlist = res.questions;
    })
  }
  ngOnInit(): void{
    this.getallquestion();
    this.startcounter();
  }



  nextquestion(){
    this.currentquestion++;
  }

  previousquestion(){
    this.currentquestion--;
  }
  
  answer(currentqno:number,option:any){
    if(currentqno=== this.questionlist.length){
      this.isquizcompleted= true;
      this.stopcounter();
    }
    if(option.correct){
      this.points = this.points+10;
      this.correctanswer++;
      setTimeout(()=>{
        this.resetcounter();
      this.currentquestion++;
      },1000)
      
    }
    else{
      setTimeout(() => {
        this.currentquestion++;
      this.incorrectanswer++;
      this.resetcounter();
      }, 1000);
      this.points = this.points-10;
      
    }
  }
  startcounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentquestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },600000)
  }
  stopcounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetcounter(){
    this.stopcounter();
    this.counter=60;
    this.startcounter();
  }

  resetquiz(){
    this.resetcounter();
    this.getallquestion();
    this.points=0;
    this.counter=60;
    this.currentquestion=0;
  }
}
