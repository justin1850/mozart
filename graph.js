class Graph {
    constructor(){
        this.adjacency = {};
    }

    addEdge(from, to) {
        if (!this.adjacency[from]){
            this.adjacency[from] = [];
        }
        this.adjacency[from].push(to);

    }

    getNeighbors(node){
        return this.adjacency[node] || [];

    }

    clear(){
        this.adjacency = {};
    }

    hasNode(node){
        return node in this.adjacency;
    }

    getNodes(){
        return Object.keys(this.adjacency);
    }
}