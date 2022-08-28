import { Pipe } from "@angular/core";

@Pipe({name: 'evaluate'})
export class EvaluatePipe {
    transform(expr: string): number {
        try {
            return eval(expr);
        } catch(e) {
            const elements = expr.replace(/\s+/g, " ").split(" ");

            switch(elements[1]) {
                case '+':
                    return Number(elements[0]) + Number(elements[2]);
                case '-':
                    return Number(elements[0]) - Number(elements[2]);
                case '*':
                case 'x':
                case 'X':
                    return Number(elements[0]) * Number(elements[2]);
                case '/':
                    return Number(elements[0]) / Number(elements[2]);
            }
        }
    }
}