import { Component, OnInit } from '@angular/core';
import { gsap } from "gsap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    gsap.to("#test", {duration: 1, x: 100});
  }
}
