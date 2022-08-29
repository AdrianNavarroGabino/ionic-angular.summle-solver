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
  path: string[];
  showProgress: boolean = false;

  constructor() {}

  ngOnInit() {

    (async () => {
      const response = await fetch("https://cors-anywhere.herokuapp.com/corsdemo?accessRequest=5217e26f73c495f35b51892ba6949fb7a20f5bd16240f460087b5f8bf705b471");
      console.log(response.text());
    })();

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

  solveClick() {
    if(!(this.expected && this.n1 && this.n2 && this.n3 && this.n4 && this.n5 && this.n6)) {
      return;
    }
    this.showProgress = true;
    this.path = null;

    setTimeout(() => {
      const numbers: number[] = [this.n1, this.n2, this.n3, this.n4, this.n5, this.n6];
      let maxSteps = 3;

      while(!this.path && maxSteps < 6) {
        this.solveSummle(this.expected, numbers, maxSteps);
        maxSteps++;
      }

      this.showProgress = false;
    }, 1);
  }
  
  solveSummle(expected, numbers, maxSteps = 0, steps = 0, path = [], result = 0) {
    if(result == expected && (!maxSteps || path.length == maxSteps)) {
        this.path = path;
    }

    if(steps < 5 && result != expected) {
        for(let i = 0; i < numbers.length; i++) {
            for(let j = 0; j < numbers.length; j++) {
                if(j !== i) {
                    const suma = numbers[i] + numbers[j]
                    const numbersSuma = [...numbers].filter((_, ind) => i !== ind && j !== ind);
                    numbersSuma.push(suma);
                    const pathSuma = [...path];
                    pathSuma.push(`${numbers[i]} + ${numbers[j]}`);
                    this.solveSummle(expected, numbersSuma, maxSteps, steps + 1, pathSuma, suma);

                    const resta = numbers[i] - numbers[j];
                    if(resta > 0) {
                        const numbersResta = [...numbers].filter((_, ind) => i !== ind && j !== ind);
                        numbersResta.push(resta);
                        const pathResta = [...path];
                        pathResta.push(`${numbers[i]} - ${numbers[j]}`);
                        this.solveSummle(expected, numbersResta, maxSteps, steps + 1, pathResta, resta);
                    }

                    const multiplicacion = numbers[i] * numbers[j];
                    const numbersMultiplicacion = [...numbers].filter((_, ind) => i !== ind && j !== ind);
                    numbersMultiplicacion.push(multiplicacion);
                    const pathMultiplicacion = [...path];
                    pathMultiplicacion.push(`${numbers[i]} * ${numbers[j]}`);
                    this.solveSummle(expected, numbersMultiplicacion, maxSteps, steps + 1, pathMultiplicacion, multiplicacion);

                    const division = numbers[i] / numbers[j];
                    if(division % 1 === 0) {
                        const numbersDivision = [...numbers].filter((_, ind) => i !== ind && j !== ind);
                        numbersDivision.push(division);
                        const pathDivision = [...path];
                        pathDivision.push(`${numbers[i]} / ${numbers[j]}`);
                        this.solveSummle(expected, numbersDivision, maxSteps, steps + 1, pathDivision, division);
                    }
                }
            }
        }
    }
}
}
