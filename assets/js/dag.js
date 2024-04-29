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
                scene="Information about the scene goes here"){
        this.id = generateUUIDv4();
        this.title = title;
        this.tagline = tagline;
        this.scene = scene;
    }

    // GETTERS & SETTERS

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

    setScene(newScene) {
        if (newScene) {
            this.scene = newScene;
        }
    }
}

// Need to incorporate edge types, but I want to get the whole thing working first

// ALSO NEED TO MAKE SURE NO CYCLES ARE BEING CREATED OR THAT THE EDGES AREN'T CONSTANTLY BEING ADDED
class DAGEdge {
    constructor(start=undefined,
                end=undefined){
        if (start && end) {
            this.start = start;
            this.end = end;
        }
    }
}

class DAG {
    constructor (seriesName="Untitled Series") {
        this.seriesName = seriesName;
        this.vertices = [];
        this.edges = [];
    }

    addNewScene(title=undefined, tagline=undefined, scene=undefined){
        var newScene = new DAGNode();
        
        if (title){
            newScene.setTitle(title);
        }

        if (tagline){
            newScene.setTagline(tagline);
        }

        if (scene) {
            newScene.setScene(scene);
        }

        this.vertices.push(newScene);
    }

    getAllScenePreviews(){
        return this.vertices;
    }

    getSceneInformation(uuid=undefined){
        if (uuid){
            var filteredVertices = this.vertices.filter((v) => v.getId() == uuid);

            if (filteredVertices.length == 0) {
                return undefined;
            } else {
                return filteredVertices[0];
            }
        }
    }
}