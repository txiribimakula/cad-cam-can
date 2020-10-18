import { Component, OnInit } from '@angular/core';

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
  speedTypeMultiplier: number;

  parts = [
    {
      data: "M 50 200 L 150 200 150 250 250 250 250 50 50 50 50 200",
      color: "yellow"
    },
    {
      data: "M 500 400 L 550 400 550 450 500 450 500 400",
      color: "yellow"
    }
  ];

  machinings = [
    {
      data: "M 10 510 L 50 200",
      progress: 312.569992,
      length: 312.569992,
      color: "green",
      thickness: 2,
      speed: 5
    },
    {
      data: "M 50 200 L 150 200 150 250 250 250 250 50 50 50 50 200",
      progress: 800,
      length: 800,
      color: "red",
      thickness: 3,
      speed: 1
    },
    {
      data: "M 50 200 L 500 400",
      progress: 492.44289,
      length: 492.44289,
      color: "green",
      thickness: 2,
      speed: 5
    },
    {
      data: "M 500 400 L 550 400 550 450 500 450 500 400",
      progress: 200,
      length: 200,
      color: "red",
      thickness: 3,
      speed: 1
    }
  ];

  ngOnInit(): void {
  }

  playSimulation() {
    this.speedTypeMultiplier = this.machinings[this.index].speed;
    this.animation = setInterval(() => {
      this.applyIncrement(this.getIncrement());
    }, 1);
  }

  applyIncrement(increment: number) {
    if (!this.isCurrentLimitReached(increment)) {
      this.machinings[this.index].progress -= increment;
    } else {
      var partialIncrement: number;
      if (this.isGrowing()) {
        partialIncrement = increment - this.machinings[this.index].progress;
        this.machinings[this.index].progress = 0;
      } else {
        partialIncrement = increment + (this.machinings[this.index].length - this.machinings[this.index].progress);
        this.machinings[this.index].progress = this.machinings[this.index].length;
      }
      this.setNextElement();
      if (partialIncrement != 0) {
        if(!this.isLastElementReached()) {
          this.applyIncrement(partialIncrement);
        }
      }
    }
  }

  pauseSimulation() {
    clearInterval(this.animation);
    this.animation = null;
  }

  stopSimulation() {
    this.pauseSimulation();
    this.machinings.forEach(element => {
      if (this.isGrowing()) {
        element.progress = element.length;
        this.index = 0;
      } else {
        element.progress = 0;
        this.index = this.machinings.length - 1;
      }
    });
  }

  reverseSimulation() {
    if (this.isGrowing()) {
      this.finishLimit = this.machinings[this.index].length;
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
    if (!this.isLastElementReached()) {
      if (this.isGrowing()) {
        this.index++;
      } else {
        this.index--;
      }
      this.speedTypeMultiplier = this.machinings[this.index].speed;
    } else {
      this.pauseSimulation();
    }
  }

  isLastElementReached() {
    if (this.isGrowing()) {
      return this.index >= this.machinings.length - 1;
    } else {
      return this.index <= 0;
    }
  }

  isCurrentLimitReached(increment: number) {
    if (this.isGrowing()) {
      return (this.machinings[this.index].progress - increment) < 0;
    } else {
      return (this.machinings[this.index].progress - increment) > this.machinings[this.index].length;
    }
  }

  isGrowing() {
    return this.increment > 0;
  }

  getIncrement() {
    return this.increment * this.speedMultiplier * this.speedTypeMultiplier;
  }
}
