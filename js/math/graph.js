class Graph {
    constructor(points=[], segments=[]) {
        this.points = points;
        this.segments = segments;
    }

    addPoint(point) {
        this.points.push(point);
    }

    containsPoint(point) {
        return this.points.find((p) => { return p.equals(point) } );
    }

    tryAddPoint(point){
        if(!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    removePoint(point){
        const segments = this.getSegmentsWithPoint(point);

        for (const segment of segments) {
            this.removeSegment(segment);
        }

        this.points.splice(this.points.indexOf(point),1);
    }

    addSegment(segment){
        this.segments.push(segment);
    }

    containsSegment(segment) {
        return this.segments.find((s) => { return s.equals(segment) });
    }

    tryAddSegment(segment){
        if(!segment.point1.equals(segment.point2) && !this.containsSegment(segment)) {
            this.addSegment(segment);
            return true;
        }
        return false;
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment),1);
    }

    getSegmentsWithPoint(point) {
        return this.segments.filter((s)=>{ return s.includes(point) });
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(context) {
        for(const segment of this.segments) {
            segment.draw(context);
        }

        for(const point of this.points) {
            point.draw(context);
        }
    }
}