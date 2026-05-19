/** 
 * Represents/builds a weighted graph data structure based on an adjacency list
 * 
*/
class Graph {
    constructor(){
        this.adjacency = {};
    }

     /**
     * Adds a directed edge from one node to another.
     * Creates the source node in the graph if it does not already exist.
     *
     * @param {string} from - The source node.
     * @param {string} to - The destination node.
     */
    addEdge(from, to) {
        if (!this.adjacency[from]){
            this.adjacency[from] = [];
        }
        this.adjacency[from].push(to);

    }

     /**
     * Returns all neighbors of a given node.
     *
     * @param {string} node - The node to look up.
     * @returns {string[]} Array of neighboring nodes, or an empty array if the node has none.
     */
    getNeighbors(node){
        return this.adjacency[node] || [];

    }

    /*
     * Removes all nodes and edges from the graph.
     */
    clear(){
        this.adjacency = {};
    }

     /**
     * Checks whether a node exists in the graph.
     *
     * @param {string} node - The node to check.
     * @returns {boolean} True if the node exists, false otherwise.
     */
    hasNode(node){
        return node in this.adjacency;
    }

     /**
     * Returns all nodes in the graph.
     *
     * @returns {string[]} Array of node identifiers.
     */
    getNodes(){
        return Object.keys(this.adjacency);
    }
}