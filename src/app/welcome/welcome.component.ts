import { Component ,ViewChild,ElementRef} from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  @ViewChild('name') namekey!: ElementRef;
  startquiz(){
    localStorage.setItem("name",this.namekey.nativeElement.value);
  }
}
