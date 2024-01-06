class GraphEditor{
    constructor(canvas, graph){
        this.canvas = canvas;
        this.graph = graph;

        this.selectedPoint = null;
        this.hoveredPoint = null;
        this.dragging = null;
        this.mouse = null;

        this.context = this.canvas.getContext("2d");

        this.#addEventListeners();
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));

        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));

        this.canvas.addEventListener("contextmenu",(event) => { event.preventDefault(); });

        this.canvas.addEventListener("mouseup",() => { this.dragging = false; })
    }

    #selectPoint(point){
        if(this.selectedPoint) {
            this.graph.tryAddSegment(new Segment(this.selectedPoint, point));
        }
        this.selectedPoint = point;
    }

    #removePoint(point){
        this.graph.removePoint(point);
        this.selectedPoint = null;
        if(this.selectedPoint == point){
            this.selectedPoint = null;
        }
        this.hoveredPoint = null;
    }

    #handleMouseDown(event){
         //right click
         if(event.button === 2) {
            if(this.selectedPoint) {
                this.selectedPoint = null;
            } else if(this.hoveredPoint) {
                this.#removePoint(this.hoveredPoint);
            }
        }

        // left click
        if(event.button === 0 ) {                
            if(this.hoveredPoint){
                this.#selectPoint(this.hoveredPoint);
                this.dragging = true;
                return;
            }

            this.graph.addPoint(this.mouse);
            this.#selectPoint(this.mouse);
            this.hoveredPoint = this.mouse;
        }
    }

    #handleMouseMove(event){
        this.mouse = new Point(event.offsetX, event.offsetY);
            this.hoveredPoint = getNearestPoint(this.mouse, this.graph.points, 30);
            if(this.dragging) {
                this.selectedPoint.x = this.mouse.x;
                this.selectedPoint.y = this.mouse.y;
            }
    }

    display(){
        this.graph.draw(this.context);
        if(this.hoveredPoint){
            this.hoveredPoint.draw(this.context,{fill:true})
        }
        if(this.selectedPoint) {
            const intent = this.hoveredPoint ? this.hoveredPoint : this.mouse;
            new Segment(this.selectedPoint, intent).draw(this.context, { dash: [3,3] });
            this.selectedPoint.draw(this.context, { outline:true });
        }
    }
}