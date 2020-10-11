import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  increment: number = 1;
  finishLimit: number = 0;
  currentElement: any;
  animation: any;

  list = [
    {
      data: "M 100 200 L 200 200",
      progress: 100,
      length: 100
    }
  ];

  ngOnInit(): void {
    this.currentElement = this.list[0];
  }

  playSimulation() {
    this.animation = setInterval(() => {
      if(this.currentElement.progress != this.finishLimit) {
        this.currentElement.progress -= this.increment;
      }
    }, 50);
  }

  pauseSimulation() {
    clearInterval(this.animation);
    this.animation = null;
  }

  stopSimulation() {
    this.pauseSimulation();
    this.currentElement.progress = this.currentElement.length;
  }

  reverseSimulation() {
    if(this.finishLimit == this.currentElement.length) {
      this.finishLimit = 0;
      this.increment = 1;
    } else {
      this.finishLimit = this.currentElement.length;
      this.increment = -1;
    }
  }
}
