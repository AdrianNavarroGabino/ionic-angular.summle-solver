import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  expected: number;
  n1: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  n6: number;

  constructor() {}

  ngOnInit() {
    (async () => {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://summle.net/');
      const text = await response.text();
      text.split("\n").forEach(l => {
        if(l.includes("window.puzzString = ")) {
          const numbers = l.replace(/(\")|;|(window.puzzString = )/g, "").split(",");
          
          this.n1 = Number(numbers[0]);
          this.n2 = Number(numbers[1]);
          this.n3 = Number(numbers[2]);
          this.n4 = Number(numbers[3]);
          this.n5 = Number(numbers[4]);
          this.n6 = Number(numbers[5]);
          this.expected = Number(numbers[6]);
        }
      })
    })();
  }
  

}
