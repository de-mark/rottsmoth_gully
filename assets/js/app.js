const interfaceElement = document.getElementById("main-interface");
const exampleSeries = new DAG("Example Series");


exampleSeries.addNewScene("Example Title", "Tagline Example", "<p>Scene goes here</p><p>Need to incorporate HTML code.</p>");

exampleSeries.addNewScene("More Tests", "Seeing what happens with two", "<p>Also what happenes</p><p>With the HTML, again? I completely forgot to check</p>");

interfaceElement.innerHTML = "";

// console.log(exampleSeries.getAllScenePreviews())

exampleSeries.getAllScenePreviews().forEach( (s) => {

    interfaceElement.innerHTML += `
    <div>
        <p><i>${s.id}</i></p>
        <h3>${s.title}</h3>
        <h4>${s.tagline}</h4>
        <p>${s.scene}</p>
    </div>
    `
});