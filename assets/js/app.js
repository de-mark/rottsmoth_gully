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
    generateExampleSeries(backgroundSpecific);
    displayCurrentScene();
}

const generateExampleSeries = (protagBackground) => {
    let bottleNeckScene = exampleSeries.addNewScene("ACT 1", 
                                                 "Waking up in the dumps",
                                                 "One of Rottsmoth Gully's many landfills",
                                                 `<p>You wake up in a landfill, nearly buried alive in rancid trashbags and decaying organic waste. Although you try to remember how you got here, your mind blanks. Whatever path brought you here, it must have taken place a long time ago because your nose has already adjusted to--what must be--an ungodly stench.</p>

                                                 <p>The good news is that--other than being covered in all sorts of digestive juices and refuse--your body seems to be perfectly in tact.</p>
                                                 
                                                 <p>The bad news is that you have no wallet, you're dressed in your pajamas, and you have no idea where you are.</p>
                                                 
                                                 <p>It's a landfill in Rottsmoth Gully, certainly, but there's quite a few of those and they tend to sprawl over the landscape for miles.</p>
                                                 
                                                 <p>Navigating your way out of this might be tricky to say the least.</p>
                                                 
                                                 <p>Furthermore, it might be the eerie shadows of the desert moon unnerving you, but you suddenly get the feeling that you're being watched by the landfill itself. As if the very cells you're composed of are threatening to betray you to an impossible force of destruction...</p>`);

    let agentStartScene = exampleSeries.addNewScene("PROLOGUE", 
                                                 "Agent asks around in diner", 
                                                 "Rottsmoth Diner", 
                                                 `<p>Agent orders coffee in the Rottsmoth Diner. The waiter is kind at first, but quickly sours as it becomes clear that the Agent wants more than food.</p>

                                                 <p>The Agent shows the waiter pictures of occult symbols that were found at the crime scenes of the gruesome serial murders that they're investigating.</p>
                                                 
                                                 <p>The agent asks if the waiter knows anything about the symbols.</p>
                                                 
                                                 <p>The waiter turns the question around on the Agent, asking why the Agent thinks they'd know anything about the symbols. He points out that you don't end up as a waiter in a desolate town like Rottsmoth Gully if you've got an ounce of intelligence in you or a PhD tucked away in your back pocket.</p>`);

    let agentStartSceneC0 = exampleSeries.addNewScene("PROLOGUE", 
                                                 "Agent asks around in diner - Cult", 
                                                 "Rottsmoth Diner", 
                                                 `<p>The waiter is shocked that you know this and becomes uneasy. He asks if you’re “One of them” and you admit that you used to be, but you’re not anymore. This seems to calm him down a little, but you can see him glancing to the corner of the diner occasionally. The cult’s eyes and ears are here, it seems.</p>

                                                 <p>You don’t look up or around the restaurant. After all, you had to play Watcher during your time in the cult and you know the lengths you went to in order to avoid being seen.</p>

                                                 <p>The waiter explains that he just saw the symbols lying around town and thought they were cool. That’s all. He doesn’t know anything about any murders or religious sects. He refills your coffee a bit too quickly and pretends to bus the same three counters repeatedly.</p>`);

    let agentStartSceneC1 = exampleSeries.addNewScene("PROLOGUE", 
                                                "Agent asks around in diner - Cult & High Perception", 
                                                "Rottsmoth Diner", 
                                                `<p>You notice the haggard looking homeless woman in the corner booth sorting through a bag of the diner’s recyclables. She lifts up a plastic coffee creamer bottle as if to check the recycling number etched into the bottom, but her eyes use the opportunity to sneak a glance at you.
                                                You take your coffee and pie over to her table and ask if she’s enjoying the show.</p>

                                                <p>For a moment, it seems like she’s going to deny your conclusion. Instead, she chastises you, saying that if you used to be “One of us” then you should know better to go around asking questions. You explain that asking questions is the best way to get a Watcher’s attention.</p>

                                                <p>This catcher her off-guard.</p>

                                                <p>She takes a moment to look over the pictures you’ve brought over with you and frowns.
                                                “It’s our symbols,” she admits. “But it’s not us.”</p>

                                                <p>You explain this confused you as well. Normally these symbols mark the homes of respected cult members to invite all sorts of otherworldly spirits in. However, the murderer used them as a calling card for murder.</p>

                                                <p>Have the symbols ever been used for anything other than otherworldly hospitality? Like possession or ritual sacrifice, for instance?</p>

                                                <p>The Watcher thinks about this for a moment, then shakes their head. They’re not sure. Maybe it’s just some punk who thought the symbols were interesting. Maybe it’s a coincidence.</p>

                                                <p>You finish your meal and she gathers up her bag of recyclable plastics. The look she gives you when she leaves, however, seems to indicate that she knows more than she’s letting on. And what she knows, worries her.</p>`);

    let agentStartSceneC2 = exampleSeries.addNewScene("PROLOGUE", 
                                                "Agent asks around in diner - Cult; No Perception", 
                                                "Rottsmoth Diner", 
                                                `<p>The coffee is good and the pie is fresh, but you’re unable to spot the Watcher and the poor waiter seems to be growing more uncomfortable with every second you spend in the restaurant. The moment you take a sip of your coffee, he runs over to refill your cup.</p>

                                                <p>It seems he might not have believed you mention of breaking ties with the cult.</p>

                                                <p>Hmm.</p>`);

    let agentStartSceneP1 = exampleSeries.addNewScene("PROLOGUE", 
                                                "Agent asks around in diner - No Cult; High Perception", 
                                                "Rottsmoth Diner", 
                                                `<p>The waiter is intrigued that you noticed this, too. He shows you his necklace and bracelet and explains that they’re of symbols that he’s seen around the town as well. They’re cool symbols, but, if they mean anything, the waiter’s not sure what that is. Furthermore, he’s not even sure the symbols are native to Rottsmoth. On a trip to see his boyfriend in Europe last summer, for example, he saw similar symbols covering the walls in an older corner of the city.</p>

                                                <p>You explain your theory that the symbols belong to some ancient religious sect since historians have seen a smattering of the symbols in old ruins all over the world. Imagine that, the waiter remarks. He immediately switches the subject to his desire to save up money to study history at university. He’s always been passionate about “old stuff”, he explains. He refills your cup and has more to say about the subject, but you’re not listening.</p>

                                                <p>Out of the corner of your eye, you notice a homeless woman sneaking out of the diner. You noticed her glancing your way once or twice before, but now she goes out of her way to pretend to ignore you.</p>

                                                <p>You notice a familiar symbol patched on to her jacket.</p>

                                                <p>When you attempt to throw some money on the table and rush out after her, however, the waiter makes a show of suggesting different desserts and specials. By the time you’ve waved him off, the woman is nowhere to be seen.</p>`);

    let agentStartSceneD0 = exampleSeries.addNewScene("PROLOGUE", 
                            "Agent asks around in diner - Default", 
                            "Rottsmoth Diner", 
                            `<p>The waiter gives you a long look and eventually decides that you mean what you say. You’re not singling him out. He sighs, refills your coffee, and kindly recommends that you keep quiet about this sort of thing.</p>

                            <p>HYPOTHETICALLY if there was a relationship between this symbol and Rottsmoth Gully—WHICH HE’S NOT SAYING THERE IS—and if there are serial murderers hiding out in the town—WHICH THERE AREN’T—it might not be wise to go around asking questions about them without knowing a little bit more about who they are.<p>

                            <p>All hypothetical, of course, because he doesn’t know anything about the symbol or the serial murders—you understand.
                            The coffee is good and the pie is fresh, but you get the sense that someone in the diner is keeping a close eye on you afterwards. Every time you look up, however, there’s no one looking your way.
                            Hmm.</p>`);
    

    exampleSeries.connectScenes(agentStartScene, agentStartSceneD0, "default", "Calm the waiter down. You're asking this question of EVERYONE you meet in Rottsmoth Gully--not just him.");
    
    exampleSeries.connectScenes(agentStartScene, agentStartSceneC0, "is_occult", "<b>[OCCULT]</b> Explain that the symbols in the picture belong to the same religious sect as the symbol on the waiter's necklace and bracelet.");

    exampleSeries.connectScenes(agentStartSceneC0, agentStartSceneC1, "perception_mid", "<b>[PERCEPTION MID]</b> Take your coffee and pie over to the corner booth to confront the Watcher.");

    exampleSeries.connectScenes(agentStartSceneC1, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.")

    exampleSeries.connectScenes(agentStartSceneC0, agentStartSceneC2, "default", "Finish your meal while keeping a close eye on the diner and its occupants.");

    exampleSeries.connectScenes(agentStartSceneC2, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.")

    exampleSeries.connectScenes(agentStartScene, agentStartSceneP1, "perception_mid", "<b>[PERCEPTION MID]</b> You've seen this symbol lurking about the town in odd places, so you're curious if it's part of the town or its history.");

    // exampleSeries.connectScenes(agentStartScene, agentStartSceneD0, "default", "Calm the waiter down. You're asking this question of EVERYONE you meet in Rottsmoth Gully--not just him.");

    exampleSeries.connectScenes(agentStartSceneD0, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.")

    exampleSeries.connectScenes(agentStartSceneP1, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.");

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("THIS SHOULD NOT WORK BECAUSE IT WILL ADD A CYCLE");
    exampleSeries.connectScenes(bottleNeckScene, agentStartScene, "default", "Break the code");


    switch(protagBackground){
        case "agent":
            exampleSeries.setCurrent(agentStartScene);
            break;
        default:
            console.log("Hmm. How'd you get here?");
    }
}

const nextScene = (nextSceneId) => {
    exampleSeries.setCurrent(nextSceneId);
    displayCurrentScene();
}

const displayCurrentScene = () => {
    interfaceElement.innerHTML = "";
    let thisSceneMeta = exampleSeries.getCurrentScene();

    console.log(thisSceneMeta);
    console.log(exampleSeries.vertices);

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



// generateExampleSeries();