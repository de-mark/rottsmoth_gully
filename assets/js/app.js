const interfaceElement = document.getElementById("main-interface");
const exampleSeries = new DAG("Example Series");

const charPercep = 2;

const generateExampleSeries = () => {
    var sceneOne = exampleSeries.addNewScene("1. Example Title", "Tagline Example", "<p>Scene goes here</p><p>Need to incorporate HTML code.</p>");

    var sceneTwo = exampleSeries.addNewScene("2. More Tests", "Seeing what happens with two", "<p>Also what happenes</p><p>With the HTML, again? I completely forgot to check</p>");
    
    var sceneTwoPointFive = exampleSeries.addNewScene("3. This comes after two", "We'll try and link it to 1 to make sure we get an error", "Hopefully it works okay!");
    
    var alternateSceneTwo = exampleSeries.addNewScene("4. Testing again", "This should be an alternative path to two", "I'm not sure how to visualize this");
    
    console.log("---------------------------------------");
    console.log("Setting start scene to sceneOne");
    exampleSeries.setCurrent(sceneOne);
    
    console.log("---------------------------------------");
    console.log("Adding initial DAG nodes");
    console.log("One to two");
    exampleSeries.connectScenes(sceneOne, sceneTwo, "default", "Go from one to two");
    console.log("Two to two point five");
    exampleSeries.connectScenes(sceneTwo, sceneTwoPointFive, "default", "Go from two to two point five");
    console.log("One to alternative path two");
    exampleSeries.connectScenes(sceneOne, alternateSceneTwo, "perception_high", "[High perception] Advance to alternate path");
    
    // This next attempt should return an error message in the console.
    console.log("---------------------------------------");
    console.log("Attempting to add inverse of first edge; should get an error");
    exampleSeries.connectScenes(sceneTwo, sceneOne);
    
    console.log("---------------------------------------");
    console.log("Attempting to connect the scene after two (two point five) to one, which would give us a cycle; therefore, this should give us an error");
    exampleSeries.connectScenes(sceneTwoPointFive, sceneOne);
    
    
    console.log("---------------------------------------");
    console.log("Checking Kahn topological sort");
    console.log(exampleSeries.kahnTopologicalSort());
}

const nextScene = (nextSceneId) => {
    exampleSeries.setCurrent(nextSceneId);
    displayCurrentScene();
}

const displayCurrentScene = () => {
    interfaceElement.innerHTML = "";
    // REVEALING CURRENT VERTIX AND OPTIONS
    let thisSceneMeta = exampleSeries.getCurrentScene();

    if (thisSceneMeta["error"]){
        interfaceElement.innerHTML = "<b>ERROR</b> Your story is currently empty. Please add some scenes before proceeding";
    } else {
        let thisScene = thisSceneMeta["current"];
        let sceneConnections = thisSceneMeta["connections"];

        let newInterface = document.createElement("div");
        let interfaceHeader = document.createElement("h2");
        interfaceHeader.innerHTML = thisScene.title;
        newInterface.appendChild(interfaceHeader);

        let interfaceSubheader = document.createElement("h5");
        interfaceSubheader.innerHTML = thisScene.location;
        newInterface.appendChild(interfaceSubheader);

        let interfaceSceneDiv = document.createElement("div");
        interfaceSceneDiv.innerHTML = thisScene.scene;
        newInterface.appendChild(interfaceSceneDiv);

        // interfaceElement.innerHTML = `<h2>${thisScene.title}</h2>
        // <h5>${thisScene.location}</h5>
        // <p>${thisScene.scene}</p>`

        if (sceneConnections.length > 0){
            // interfaceElement.innerHTML += `<ol>`
            let interfaceOptionsDiv = document.createElement("div");
            interfaceOptionsDiv.innerHTML = "<h6>Options:</h6>";

            sceneConnections.forEach((c) => {
                if ((c.edgeType == "default") ||
                    (c.edgeType == "perception" && charPercep > 1)){
                        let newOption = document.createElement("div");
                        newOption.innerHTML = c.optionDisplay;
                        newOption.onclick = () => nextScene(c.child);

                        interfaceOptionsDiv.appendChild(newOption);
                        // interfaceElement.innerHTML += `<li onclick="nextScene('${c.child}')">${c.optionDisplay}</li>`
                }
            })
            // interfaceElement.innerHTML += `</ol>`
            newInterface.appendChild(interfaceOptionsDiv);
        }

        interfaceElement.appendChild(newInterface);
    }
}



generateExampleSeries();
displayCurrentScene();


// console.log(exampleSeries.getAllScenePreviews())

// exampleSeries.getAllScenePreviews().forEach((s) => {
//     interfaceElement.innerHTML += `
//     <div class="scene-container">
//         <p><i>${s.id}</i></p>
//         <h3>${s.title}</h3>
//         <h4>${s.tagline}</h4>
//         <p>${s.scene}</p>
//     </div>
//     `
// });



