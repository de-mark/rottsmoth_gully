/*
    UUIDv4 is super simple. It's randomly generated. The version (4) goes at the end
    of the third group (typically, the version number goes here).

    Defined by RFC 4122 4.4: https://datatracker.ietf.org/doc/html/rfc4122#section-4.4
    */
const generateUUIDv4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class DAGNode {
    constructor (title="New Scene", 
                tagline="Scene Summary",
                location="Location",
                scene="Information about the scene goes here"){
        this.id = generateUUIDv4();
        this.title = title;
        this.tagline = tagline;
        this.location = location;
        this.scene = scene;
    }

    setTitle(newTitle) {
        if (newTitle) {
            this.title = newTitle;
        }
    }

    setTagline(newTagline) {
        if (newTagline){
            this.getTagline = newTagline;
        }
    }

    setLocation(newLocation) {
        if (newLocation){
            this.newLocation = newLocation;
        }
    }

    setScene(newScene) {
        if (newScene) {
            this.scene = newScene;
        }
    }
}

// Need to incorporate edge types, but I want to get the whole thing working first

// ALSO NEED TO MAKE SURE NO CYCLES ARE BEING CREATED OR THAT THE EDGES AREN'T CONSTANTLY BEING ADDED
class DAGEdge {
    constructor(parent=undefined,
                child=undefined,
                edgeType="default",
                optionDisplay="You decide to do a thing."){
        if (parent && child) {
            this.parent = parent;
            this.child = child;
            this.edgeType = edgeType;
            this.optionDisplay = optionDisplay;
        }
    }
}

class DAG {
    constructor () {
        this.currentLoc = undefined;
        this.vertices = [];
        this.edges = [];
    }

    setCurrent(sceneId){
        this.currentLoc = sceneId;
    }

    addNewScene(title=undefined, tagline=undefined, location=undefined, scene=undefined){
        var newScene = new DAGNode();
        
        if (title){
            newScene.setTitle(title);
        }

        if (tagline){
            newScene.setTagline(tagline);
        }

        if (location){
            newScene.setLocation(location);
        }

        if (scene) {
            newScene.setScene(scene);
        }

        this.vertices.push(newScene);

        return newScene.id; 
    }

    getAllSceneOptions(sceneId){
        if (sceneId) {
            let options = this.edges.filter((e) => e.parent == sceneId);
            return options;
        }
    }

    getCurrentScene(){
        if (this.currentLoc) {
            let currentScene = this.vertices.filter((v) => v.id == this.currentLoc);

            if (currentScene.length > 0) {
                currentScene = currentScene[0];
                
                return {
                    "current": currentScene,
                    "connections": this.getAllSceneOptions(this.currentLoc)
                }
            }
        } else {
            return {
                "error":"There currently aren't any scenes in your story!"
            }
        }
        
    }

    checkIfConnectionExists(sceneOneId=undefined, sceneTwoId){
        if (sceneOneId && sceneTwoId){
            // Checking to see if this connection has ALREADY been added
            // or if the reverse connection exists
            // Since this is a DAG, we don't want the reverse combination
            let filteredEdges = this.edges.filter((e) => ((e.parent == sceneOneId) && (e.child == sceneTwoId)) || 
                                                         ((e.parent == sceneTwoId) && (e.child == sceneOneId)));
            
            if (filteredEdges.length != 0) {
                return true;
            }
        }
        
        return false;
    }

    // Followed algorithm instructions on wikipedia:
    // https://en.wikipedia.org/wiki/Topological_sorting
    kahnTopologicalSort(proposedEdges=this.edges){
        let l = [];
        let edgeCopy = [...proposedEdges];
        // We want a list of all the parentless nodes 
        // NOTE: Should this be a set of all the nodes? Not just parents?
        let allParents = new Set(proposedEdges.map((e) => e.parent));
        let allChildren = new Set(proposedEdges.map((e) => e.child));
        let s = [...allParents.difference(allChildren)];
        
        while (s.length > 0) {
            let n = s[0];
            s.splice(0, 1);
            l.push(n);

            for (let e of edgeCopy){
                if (e.parent == n) {
                    let m = e.child;
                    
                    let idx = edgeCopy.indexOf(e);
                    edgeCopy.splice(idx, 1);
                    
                    if (edgeCopy.filter((ed) => ed.child == m).length == 0) {
                        s.push(m);
                    }
                }
            }
        }

        if (edgeCopy.length != 0){
            return -1;
        } else {
            return l;
        }
    }

    // Uses Kahn Topological Sort to see if adding the edge will
    // create a cycle. Since this is a DAG, we don't want cycles.
    checkIfCycleWouldExist(sceneOneId, sceneTwoId){
        let newEdge = new DAGEdge(sceneOneId, sceneTwoId);
        let proposedEdgeSet = this.edges.length > 0 ? [...this.edges] : [];
        proposedEdgeSet.push(newEdge);
        return this.kahnTopologicalSort(proposedEdgeSet) == -1;
    }

    // Adds an edge to our edge collection; verifies that the node
    // (1) isn't already there or (2) will not cause a cycle.
    connectScenes(sceneOneId=undefined, sceneTwoId=undefined, edgeType="default", optionDisplay="You choose to do a thing."){
        let sceneOne = this.getSceneByID(sceneOneId);
        let sceneTwo = this.getSceneByID(sceneTwoId);

        if (!sceneOne || !sceneTwo){
            // If the user didn't provide the ID of a scene, we don't want to add the "connection"
            // since it would corrupt the data
            return;
        } else if (this.checkIfConnectionExists(sceneOneId, sceneTwoId)) {
            // If there's already an edge (or a reverse of this edge) we don't want to add it again
            console.log("We didn't add this because it either it or an inverse version of it already exists");
            return;
        } else if (this.checkIfCycleWouldExist(sceneOneId, sceneTwoId)) {
            // We also use Kahn Topological Sort to check if adding this edge would create a cycle
            // since we don't want a cycle
            console.log("We didn't add this because it would create a cycle");
            return;
        }else {
            let newEdge = new DAGEdge(sceneOneId, sceneTwoId, edgeType, optionDisplay);
            this.edges.push(newEdge);
            console.log(edgeType, "edge between", sceneOneId, "and", sceneTwoId, "successfully added.");
            console.log("Option will display as", optionDisplay);
        }
    }

    getAllScenePreviews(){
        return this.vertices;
    }

    getSceneByID(uuid=undefined){
        if (uuid){
            var filteredVertices = this.vertices.filter((v) => v.id == uuid);

            if (filteredVertices.length == 0) {
                return undefined;
            } else {
                return filteredVertices[0];
            }
        }
    }
}