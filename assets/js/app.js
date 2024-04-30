const interfaceElement = document.getElementById("main-interface");
const exampleSeries = new DAG("Example Series");


var sceneOne = exampleSeries.addNewScene("Example Title", "Tagline Example", "<p>Scene goes here</p><p>Need to incorporate HTML code.</p>");

var sceneTwo = exampleSeries.addNewScene("More Tests", "Seeing what happens with two", "<p>Also what happenes</p><p>With the HTML, again? I completely forgot to check</p>");

var sceneTwoPointFive = exampleSeries.addNewScene("This comes after two", "We'll try and link it to 1 to make sure we get an error", "Hopefully it works okay!");

console.log("---------------------------------------");
console.log("Adding initial DAG nodes");
exampleSeries.connectScenes(sceneOne, sceneTwo);
exampleSeries.connectScenes(sceneTwo, sceneTwoPointFive);

// This next attempt should return an error message in the console.
console.log("---------------------------------------");
console.log("Attempting to add inverse of first edge; should get an error");
exampleSeries.connectScenes(sceneTwo, sceneOne);

console.log("---------------------------------------");
console.log("Attempting to connect the scene after two (two point five) to one, which would give us a cycle; therefore, this should give us an error");
exampleSeries.connectScenes(sceneTwoPointFive, sceneOne);

interfaceElement.innerHTML = "";

// console.log(exampleSeries.getAllScenePreviews())

exampleSeries.getAllScenePreviews().forEach((s) => {
    interfaceElement.innerHTML += `
    <div class="scene-container">
        <p><i>${s.id}</i></p>
        <h3>${s.title}</h3>
        <h4>${s.tagline}</h4>
        <p>${s.scene}</p>
    </div>
    `
});

console.log(exampleSeries.kahnTopologicalSort());