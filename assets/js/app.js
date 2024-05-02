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


// This is used to tell the player whether their stat is high or not
// since in this game 3 is considered high--that's not typically the case
// for these sorts of games.
const isHigh = (statVal) => {
    if (statVal >= 3 ) {
        return "High";
    } else if (statVal >= 2) {
        return "Mid";
    } else {
        return "Low";
    }
}

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
            <p id="char-physique-container"><b>Physique</b> <span id="char-physique-num">${isHigh(protag.physique)}</span></p>
            <p id="char-perception-container"><b>Perception</b> <span id="char-perception-num">${isHigh(protag.perception)}</span></p>
            <p id="char-willpower-container"><b>Willpower</b> <span id="char-willpower-num">${isHigh(protag.willpower)}</span></p>
        </div>
        <hr>
        <div id="character-skills">
            <h6>Skills</h6>
            <div class="char-skills-container">
                <p>${protag.primarySkill}</p>
                <p>${protag.secondarySkill}</p>
        `
        
        if (protag.canUseGun){
            characterPanelElement.innerHTML += "<p>Firearms</p>";
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
        selectButtonContainer.style.fontSize = ".7rem";

        if (c.finishedBeginningRoute) {
            selectButtonContainer.style.backgroundColor = "#800020";
            selectButtonContainer.onclick = () => getCharacterStats(c.backgroundGeneral, c.backgroundSpecific);
            selectButtonContainer.innerHTML = `Select ${c.displayName}`;
        } else {
            selectButtonContainer.innerHTML = `${c.displayName} scenes have not been added yet`;
        }
        
        newContainer.appendChild(selectButtonContainer);

        interfaceElement.appendChild(newContainer);
    }
}

const getCharacterStats = (backgroundBroad, backgroundSpecific) => {
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
    interfaceElement.innerHTML = "<h3>Tell me something about yourself</h3><h6>Adds a new skill to your character</h6>";

    let rowElement = document.createElement("div");
    rowElement.classList.add("row", "align-items-center", "py-3");

    let diverElement = document.createElement("div");
    diverElement.classList.add("col-4", "text-center");
    diverElement.innerHTML = `
    <h5>Diver</h5>
    <p>You come from a long line of divers who--without scuba gear--combed the bottom of the sea for seaweed, shellfish, and oysters. While your friends spent their weekends playing videogames, you were forced to master the art of unassisted ocean diving--perhaps this adventure will make you glad you did.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterName('${backgroundBroad}', '${backgroundSpecific}', ${physique}, ${perception}, ${willpower}, 'diver', 'Diver')">Select <b>Diver</b></button>
    `;

    rowElement.appendChild(diverElement);

    let demolitionElement = document.createElement("div");
    demolitionElement.classList.add("col-4", "text-center");
    demolitionElement.innerHTML = `
    <h5>Demolitions</h5>
    <p>In order to pay your way through college, you took on work with a demolitions crew. You have experience with destroying and breaking down even the strongest of structures--and, on a whim, you brought some tools of the trade with you.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterName('${backgroundBroad}', '${backgroundSpecific}', ${physique}, ${perception}, ${willpower}, 'demo', 'Demolitions')">Select <b>Demolitions</b></button>
    `;

    rowElement.appendChild(demolitionElement);

    let occultElement = document.createElement("div");
    occultElement.classList.add("col-4", "text-center");
    occultElement.innerHTML = `
    <h5>Occult</h5>
    <p>During your college days, you got involved in a really weird cult. You managed to get out, but the experience left a mark on you. You're able to recognize occult symbols, phrases, and partial pantheons.</p>
    <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="getCharacterName('${backgroundBroad}', '${backgroundSpecific}', ${physique}, ${perception}, ${willpower}, 'occult', 'Occult')">Select <b>Occult</b></button>
    `;

    rowElement.appendChild(occultElement);

    interfaceElement.appendChild(rowElement);
}

const getCharacterName = (backgroundBroad, backgroundSpecific, physique, perception, willpower, secondarySkill, secondarySkillDisplay) => {
    let charDetails = CHARACTER_SELECT_JSON.filter(c => c.backgroundSpecific == backgroundSpecific)[0];
    let finPhys = charDetails.getFinalPhysique(physique);
    let finPer = charDetails.getFinalPerception(perception);
    let finWill = charDetails.getFinalWillpower(willpower);

    interfaceElement.innerHTML = `
    <h3>What's your name?</h3>
    <div style="width: 100%; text-align:center">
        <img id="char-profile-pic" src="./assets/imgs/profile_pic_${charDetails.imgName}.png">
        <div class="row d-flex justify-content-evenly py-2">
            <div class="col-3">
                <p><b>Physique</b> ${isHigh(finPhys)} (${finPhys})</p>
            </div>
            <div class="col-3">
                <p><b>Perception</b> ${isHigh(finPer)} (${finPer})</p>
            </div>
            <div class="col-3">
                <p><b>Willpower</b>  ${isHigh(finWill)} (${finWill})</p>
            </div>
        </div>
    </div>
        <div class="row align-items-center py-3">
            <div class="col-2 align-items-center  text-center">
                <h6>Name</h6>
            </div>
            <div class="col-10">
                <input id="character-name-input" type="text" value="Danvers" style="width:100%;background-color: #71797E;border-radius:15px; padding: 5px;border: none" />
            </div>
        </div>
        <div class="row align-tems-center py-3">
            <div class="col-2 align-items-center  text-center">
                <h6>Class</h6>
            </div>
            <div class="col-10">
                <p><b>${charDetails.displayName.toUpperCase()}</b> ${charDetails.description}</p>
            </div>
        </div>
        <div class="row align-tems-center py-3">
            <div class="col-2 align-items-center  text-center">
                <h6>Can Use Firearms?</h6>
            </div>
            <div class="col-10">
                <p>${charDetails.guns ? "Yes" : "No"}</p>
            </div>
        </div>
        <div class="row align-tems-center py-3">
            <div class="col-2 align-items-center  text-center">
                <h6>Skills</h6>
            </div>
            <div class="col-10">
                <p><b>${charDetails.skillName.toUpperCase()}</b> ${charDetails.skillDescription}</p>
                <p><b>${secondarySkillDisplay.toUpperCase()}</b> ${GET_SECONDARY_SKILL_DESCRIPTION(secondarySkill)}</p>
            </div>
        </div>
        <button class="btn btn-dark btn-lg btn-block" style="width:100%; background-color: #800020; font-size: .7rem;" onclick="generateCharacter(${physique}, ${perception}, ${willpower}, '${backgroundBroad}', '${backgroundSpecific}', '${secondarySkill}')">Confirm Character Creation</button>
    `;
}

const generateCharacter = (physique=2,
                           perception=1,
                           willpower=1,
                           backgroundBroad="traveller",
                           backgroundSpecific="vision",
                           secondarySkill="diving") => {
    let name = document.getElementById("character-name-input").value;
    protag.setName(name);
    protag.setStats(physique, perception, willpower);
    protag.setClass(backgroundBroad, backgroundSpecific);
    protag.setSecondarySkill(secondarySkill);
    initCharacterPanel();
    GENERATE_ROTTSMOTH(backgroundSpecific, exampleSeries);
    displayCurrentScene();
}


const nextScene = (nextSceneId) => {
    exampleSeries.setCurrent(nextSceneId);
    displayCurrentScene();
}

const displayCurrentScene = () => {
    interfaceElement.innerHTML = "";
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

        if (sceneConnections.length > 0){
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