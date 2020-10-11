import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  progress: number = 100;
  animateGears: any;

  ngOnInit(): void {
  }

  runSimulation() {
    this.animateGears = setInterval(() => {
      if(this.progress > 0) {
        this.progress -= 1;
      }
    }, 50);
  }

  pauseSimulation() {
    clearInterval(this.animateGears);
  }

  stopSimulation() {
    this.pauseSimulation();
    this.progress = 100;
  }
}
