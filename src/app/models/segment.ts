import { Point } from './point';

export class Segment {
    initialPoint: Point;
    finalPoint: Point;
    
    constructor(initialPoint: Point, finalPoint: Point) {
        this.initialPoint = initialPoint;
        this.finalPoint = finalPoint;        
    }
}