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

  playSimulation() {
    this.animation = setInterval(() => {
      if(this.progress != this.finishLimit) {
        this.progress -= this.increment;
      }
    }, 50);
  }

  pauseSimulation() {
    clearInterval(this.animation);
    this.animation = null;
  }

  stopSimulation() {
    this.pauseSimulation();
    this.progress = 100;
  }

  reverseSimulation() {
    if(this.finishLimit == 100) {
      this.finishLimit = 0;
      this.increment = 1;
    } else {
      this.finishLimit = 100;
      this.increment = -1;
    }
  }
}
