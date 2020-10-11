import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  increment: number = 1;
  finishLimit: number = 0;
  index: number = 0;
  animation: any;
  speedMultiplier: number = 1;

  list = [
    {
      data: "M 10 200 L 110 200",
      progress: 100,
      length: 100
    },
    {
      data: "M 110 200 L 210 200",
      progress: 100,
      length: 100
    }
  ];

  ngOnInit(): void {
  }

  playSimulation() {
    this.animation = setInterval(() => {
      this.applyIncrement(this.getIncrement());
    }, 1);
  }

  applyIncrement(increment: number) {
    if(!this.isCurrentLimitReached(increment)) {
      this.list[this.index].progress -= increment;
    } else {
      var partialIncrement: number;
      if(this.isGrowing()) {
        partialIncrement = this.list[this.index].progress;
        this.list[this.index].progress = 0;
      } else {
        partialIncrement = this.list[this.index].length - this.list[this.index].progress;
        this.list[this.index].progress = this.list[this.index].length;
      }
      this.setNextElement();
      if(partialIncrement != 0) {
        this.applyIncrement(partialIncrement);
      }
    }
  }

  pauseSimulation() {
    clearInterval(this.animation);
    this.animation = null;
  }

  stopSimulation() {
    this.pauseSimulation();
    this.list.forEach(element => {
      if(this.isGrowing()) {
        element.progress = element.length;
        this.index = 0;
      } else {
        element.progress = 0;
        this.index = this.list.length - 1;
      }
    });
  }

  reverseSimulation() {
    if(this.isGrowing()) {
      this.finishLimit = this.list[this.index].length;
      this.increment = -1;
    } else {
      this.finishLimit = 0;
      this.increment = 1;
    }
  }

  fasterSimulation() {
    this.speedMultiplier *= 1.1;
  }

  slowerSimulation() {
    this.speedMultiplier /= 1.1;
  }

  setNextElement() {
    if(this.isLastElementReached()) {
      if(this.isGrowing()) {
        this.index++;
      } else {
        this.index--;
      }
    } else {
      this.pauseSimulation();
    }
  }

  isLastElementReached() {
    if(this.isGrowing()) {
      return this.index <= 0;
    } else {
      return this.index >= this.list.length - 1;
    }
  }

  isCurrentLimitReached(increment: number) {
    if(this.isGrowing()) {
      return (this.list[this.index].progress - increment) < 0;
    } else {
      return (this.list[this.index].progress - increment) > this.list[this.index].length;
    }
  }

  isGrowing() {
    return this.increment > 0;
  }

  getIncrement() {
    return this.increment * this.speedMultiplier;
  }
}
