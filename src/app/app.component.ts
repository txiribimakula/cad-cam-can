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
    this.list[this.index] = this.list[0];
  }

  playSimulation() {
    this.animation = setInterval(() => {
      if(!this.isCurrentLimitReached()) {
        this.list[this.index].progress -= this.increment;
      } else {
        this.setNextElement();
      }
    }, 50);
  }

  pauseSimulation() {
    clearInterval(this.animation);
    this.animation = null;
  }

  stopSimulation() {
    this.pauseSimulation();
    this.list[this.index].progress = this.list[this.index].length;
  }

  reverseSimulation() {
    if(this.isGrowing()) {
      this.finishLimit = 0;
      this.increment = 1;
    } else {
      this.finishLimit = this.list[this.index].length;
      this.increment = -1;
    }
  }

  setNextElement() {
    if(this.isLastElementReached()) {
      this.index++;
    } else {
      this.pauseSimulation();
    }
  }

  isLastElementReached() {
    if(this.isGrowing()) {
      return this.index >= this.list.length - 1;
    } else {
      return this.index <= 0;
    }
  }

  isCurrentLimitReached() {
    if(this.isGrowing()) {
      return this.list[this.index].progress == this.list[this.index].length;
    } else {
      return this.list[this.index].progress == 0;
    }
  }

  isGrowing() {
    return this.increment < 0;
  }
}
