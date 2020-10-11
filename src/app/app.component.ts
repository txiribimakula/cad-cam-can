import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  increment: number = 1;
  progress: number = 100;
  finishLimit: number = 0;
  animation: any;

  ngOnInit(): void {
  }

  runSimulation() {
    this.animation = setInterval(() => {
      if(this.progress != this.finishLimit) {
        this.progress -= this.increment;
      }
    }, 50);
  }

  pauseSimulation() {
    clearInterval(this.animation);
  }

  stopSimulation() {
    this.pauseSimulation();
    this.progress = 100;
  }

  rewindSimulation() {
    this.finishLimit = 100;
    this.increment = -1;
  }
}
