class HarmonicGraph {
    constructor(){
        this.adjacency = {};
    }

    addEdge(from, to) {
        if (!this.adjacency[from]){
            this.adjacency[from] = [];
        }
        this.adjacency[from].push(to);

    }

    getNeighbors(degree){
        return this.adjacency[degree] || [];

    }

    traverse(start, steps) {
        const harmonicPath = [start]
        let current = start;

        for (let i = 0; i < steps; i++) {
            const neighboringNodes = this.getNeighbors(current);
            if (neighboringNodes.length === 0){
                break;
            }
            current = neighboringNodes[Math.floor(Math.random()*neighboringNodes.length)];
            harmonicPath.push(current);
        }

        return harmonicPath;

    }

    buildHarmonicGraph() {
        this.addEdge(1, 2);
        this.addEdge(1, 4);
        this.addEdge(1, 5);
        this.addEdge(1, 6);

        this.addEdge(2, 5);

        this.addEdge(3, 6);

        this.addEdge (4, 5);
        //this.subEdge(4, 5);
        this.addEdge(4, 1);
        
        this.addEdge (5, 1);
        this.addEdge(5, 6);

        this.addEdge(6, 2);
        this.addEdge(6, 4);

        this.addEdge(7, 1);

    }
}