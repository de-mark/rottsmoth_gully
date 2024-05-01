const interfaceElement = document.getElementById("main-interface");
const characterPanelElement = document.getElementById("character-panel");
const exampleSeries = new DAG("Example Series");
const protag = new Protagonist();

// LIST OF EDGETYPES:
// --------------------------------------------
// can_use_gun

// is_scientist
// is_technician
// is_slippery
// is_intimidate
// is_vision
// is_appraise
// is_finance
// is_classified

// low_sanity
// high_sanity

// is_diver
// is_occult
// is_demo

// perception_high >= 3
// perception_mid  >= 2

// physique_high >= 3
// physique_mid >= 2

const initCharacterPanel = () => {
    characterPanelElement.innerHTML = `
    <div class="text-center">
        <img id="char-profile-pic" src="./assets/imgs/profile_pic_${protag.background}.png">
    </div>
    <div>
        <div class="text-center">
            <h4 id="char-name">${protag.name.toUpperCase()}</h3>
            <h6 id="char-type">${protag.backgroundDisplay}</h5>
        </div>
        <div id="char-health-container" class="bar-background">
            <div id="char-health-interior" class="bar-foreground"><p><span id="char-health-num">${protag.currHealth}/${protag.maxHealth}</span> Health</p></div>
        </div>
        <div id="char-sanity-container" class="bar-background">
            <div id="char-sanity-interior" class="bar-foreground"><p><span id="char-sanity-num">${protag.currSanity}/${protag.maxSanity}</span> Sanity</p></div>
        </div>
        <div class="char-stats-container">
            <p id="char-physique-container"><b>Physique</b> <span id="char-physique-num">${protag.physique}</span></p>
            <p id="char-perception-container"><b>Perception</b> <span id="char-perception-num">${protag.perception}</span></p>
            <p id="char-willpower-container"><b>Willpower</b> <span id="char-willpower-num">${protag.willpower}</span></p>
        </div>
        <hr>
        <div id="character-skills">
            <h6>Skills</h6>
            <div class="char-skills-container">
                <p>${protag.primarySkill}</p>
                <p>${protag.secondarySkill}</p>
        `
        
        if (protag.canUseGun){
            characterPanelElement.innerHTML += "<p>Trained in firearms</p>";
        }


        characterPanelElement.innerHTML += `</div>
    </div>`
}

const getCharacterBackground = () => {
    interfaceElement.innerHTML = "<h3>What brings you to Rottsmoth Gully?</h3>";

    for (let c of CHARACTER_SELECT_JSON) {
        let newContainer = document.createElement("div");
        newContainer.classList.add("row", "align-items-center", "py-3");
        
        let charIconContainer = document.createElement("div");
        charIconContainer.classList.add("col-4", "text-center");
        charIconContainer.innerHTML = `
            <img id="char-profile-pic" src="./assets/imgs/profile_pic_${c.imgName}.png">
            <h5>${c.displayName}</h5>`;

        newContainer.appendChild(charIconContainer);
        
        let charDescContainer = document.createElement("div");
        charDescContainer.classList.add("col-8");
        charDescContainer.innerHTML = `
                <p>${c.description}</p>
                <hr>
                <p><b>Stats:</b> ${c.stats}</p>
                <p><b>Trained in Firearms:</b> ${c.guns}</p>
                <p><b>Skill: ${c.skillName}</b> ${c.skillDescription}</p>
        `;

        newContainer.appendChild(charDescContainer);

        let selectButtonContainer = document.createElement("button");
        selectButtonContainer.classList.add("btn", "btn-dark", "btn-lg", "btn-block");
        selectButtonContainer.style.backgroundColor = "#800020";
        selectButtonContainer.style.fontSize = ".7rem";

        selectButtonContainer.onclick = () => getCharacterStats(c.backgroundGeneral, c.backgroundSpecific);
        selectButtonContainer.innerHTML = `Select ${c.displayName}`;
        newContainer.appendChild(selectButtonContainer);

        interfaceElement.appendChild(newContainer);
    }
}

const getCharacterStats = (backgroundBroad, backgroundSpecific) => {
    // console.log("CHECKING TO SEE WHAT WE GET");
    // console.log("BACKGROUND BROAD", backgroundBroad);
    // console.log("BACKGROUND SPECIFIC", backgroundSpecific);

    interfaceElement.innerHTML = "<h3>What's your greatest Strength?</h3><h6>Adds one point to the selected stat</h6>";

    let rowElement = document.createElement("div");
    rowElement.classList.add("row", "align-items-center", "py-3");

    let physiqueElement = document.createElement("div");
    physiqueElement.classList.add("col-4", "text-center");
    physiqueElement.innerHTML = `
    <h5>Physique</h5>
    <p>Determines your ability to lift heavy objects, move in an agile manner, and accomplish all feats realated to physical prowess.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterSecondSkill('${backgroundBroad}', '${backgroundSpecific}', 2, 1, 1)">Select <b>Physique</b></button>
    `;


    rowElement.appendChild(physiqueElement);

    let perceptionElement = document.createElement("div");
    perceptionElement.classList.add("col-4", "text-center");
    perceptionElement.innerHTML = `
    <h5>Perception</h5>
    <p>Your aptitude for noticing subtle and hidden details in your surroundings and in conversations with other people.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterSecondSkill('${backgroundBroad}', '${backgroundSpecific}', 1, 2, 1)">Select <b>Perception</b></button>
    `;


    rowElement.appendChild(perceptionElement);

    let willpowerElement = document.createElement("div");
    willpowerElement.classList.add("col-4", "text-center");
    willpowerElement.innerHTML = `
    <h5>Willpower</h5>
    <p>The ability to perservere in the midst of adversity. Provides defense against mental assaults and sanity drains.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterSecondSkill('${backgroundBroad}', '${backgroundSpecific}', 1, 1, 2)">Select <b>Willpower</b></button>
    `;


    rowElement.appendChild(willpowerElement);

    interfaceElement.appendChild(rowElement);
}

const getCharacterSecondSkill = (backgroundBroad, backgroundSpecific, physique, perception, willpower) => {
    console.log("CHECKING TO SEE WHAT WE GET");
    console.log("BACKGROUND BROAD", backgroundBroad);
    console.log("BACKGROUND SPECIFIC", backgroundSpecific);
    console.log("PHYSIQUE", physique);
    console.log("PERCEPTION", perception);
    console.log("WILLPOWER", willpower);
}

const getCharacterName = (backgroundBroad, backgroundSpecific, physique, perception, willpower, secondarySkill) => {

}

const generateCharacter = (name="Danvers", 
                           physique=2,
                           perception=1,
                           willpower=1,
                           backgroundBroad="traveller",
                           backgroundSpecific="vision",
                           secondarySkill="diving") => {
    protag.setName(name);
    protag.setStats(physique, perception, willpower);
    protag.setClass(backgroundBroad, backgroundSpecific);
    protag.setSecondarySkill(secondarySkill);
    initCharacterPanel();
}

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
    exampleSeries.connectScenes(sceneOne, alternateSceneTwo, "perception_high", "<b>[High perception]</b> Advance to alternate path");
    
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
            interfaceOptionsDiv.classList.add("main-interface-options");
            interfaceOptionsDiv.innerHTML = "<h6>Options:</h6>";

            sceneConnections.forEach((c) => {
                if ((c.edgeType == "default") ||
                    (c.edgeType == "is_finance" && protag.primarySkill == "Finance") ||
                    (c.edgeType == "is_classified" && protag.primarySkill == "Classified") ||
                    (c.edgeType == "is_scientist" && protag.primarySkill == "Scientist") ||
                    (c.edgeType == "is_technician" && protag.primarySkill == "Technician") ||
                    (c.edgeType == "is_slippery" && protag.primarySkill == "Slippery") ||
                    (c.edgeType == "is_initimidate" && protag.primarySkill == "Intimidate") ||
                    (c.edgeType == "is_vision" && protag.primarySkill == "Visions") ||
                    (c.edgeType == "is_appraise" && protag.primarySkill == "Appraise") || 
                    (c.edgeType == "can_use_gun" && protag.canUseGun) ||
                    (c.edgeType == "is_diver" && protag.secondarySkill == "Diving") ||
                    (c.edgeType == "is_demo" && protag.secondarySkill == "Demolitions") ||
                    (c.edgeType == "is_occult" && protag.secondarySkill == "Occult") ||
                    (c.edgeType == "low_sanity"  && protag.currSanity <= 4) ||
                    (c.edgeType == "high_sanity" && protag.currSanity >= 6) ||
                    (c.edgeType == "perception_high" && protag.perception >= 3) ||
                    (c.edgeType == "perception_mid" && protag.perception >= 2) ||
                    (c.edgeType == "physique_high" && protag.physique >= 3) ||
                    (c.edgeType == "physique_mid" && protag.physique >= 2) ||
                    (c.edgeType == "willpower_high" && protag.perception >= 3) ||
                    (c.edgeType == "willpower_mid" && protag.perception >= 2)
                    ){
                        let newOption = document.createElement("div");
                        newOption.innerHTML = `▶ ${c.optionDisplay}`;
                        newOption.onclick = () => nextScene(c.child);

                        interfaceOptionsDiv.appendChild(newOption);
                }
            })
            newInterface.appendChild(interfaceOptionsDiv);
        }

        interfaceElement.appendChild(newInterface);
    }
}



generateExampleSeries();
// generateCharacter();
// displayCurrentScene();

