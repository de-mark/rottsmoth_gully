const GET_SECONDARY_SKILL_DESCRIPTION = (secondarySkill) => {
    return secondarySkill == "diver" ? `You come from a long line of divers who--without scuba gear--combed the bottom of the sea for seaweed, shellfish, and oysters. While your friends spent their weekends playing videogames, you were forced to master the art of unassisted ocean diving--perhaps this adventure will make you glad you did.` :
           secondarySkill == "demo" ? `In order to pay your way through college, you took on work with a demolitions crew. You have experience with destroying and breaking down even the strongest of structures--and, on a whim, you brought some tools of the trade with you.` :
           `During your college days, you got involved in a really weird cult. You managed to get out, but the experience left a mark on you. You're able to recognize occult symbols, phrases, and partial pantheons.`
}

const CHARACTER_SELECT_JSON = [
    {
        "displayName":"The IRS Agent",
        "finishedBeginningRoute":false,
        "imgName":"tax",
        "description":"You followed the reek of fraudulent numbers, falsified tax documents, and economic anomalies all the way to Rottsmoth Gully Industrial...",
        "stats": "+2 Perception",
        "guns": "No",
        "skillName":"Finance",
        "skillDescription": "Knowledgable about all things financial. You've spent years following the economic goings-on of Rottsmoth Gully and understand its systems on a deeper level than its inhabitants let on.",
        "backgroundGeneral": "federal",
        "backgroundSpecific": "tax",
        "getFinalPhysique": (d) => d + 0,
        "getFinalPerception": (d) => d + 2,
        "getFinalWillpower": (d) => d + 0 
    },
    {
        "displayName":"The FBI Agent",
        "finishedBeginningRoute":true,
        "imgName":"agent",
        "description":"After years of investigations, interrogations, and interstate travel, you've managed to track a group of depraved serial murderers down to Rottsmoth Gully...",
        "stats": "+1 Physique",
        "guns": "Yes",
        "skillName":"Classified",
        "skillDescription": "After years of cultivating relationships and climbing federal ranks, you have immediate access to the wealth of information collected by the government and the support of various government workers.",
        "backgroundGeneral": "federal",
        "backgroundSpecific": "agent",
        "getFinalPhysique": (d) => d + 1,
        "getFinalPerception": (d) => d + 0,
        "getFinalWillpower": (d) => d + 0
    },
    {
        "displayName":"The Environmental Engineer",
        "finishedBeginningRoute":false,
        "imgName":"environment",
        "description":"When you were hired by Rottsmoth Gully Industrial to investigate alternative waste management strategies, you initially thought it was a dream come true...",
        "stats": "+1 Perception; +1 Willpower",
        "guns": "No",
        "skillName":"Scientist",
        "skillDescription": "Dedicating those long, sleepless nights to studying everything from geology to chemistry to microbiology and everything inbetween has finally paid off. You're able to notice things about the environment of Rottsmoth Gully that others may not.",
        "backgroundGeneral": "engineer",
        "backgroundSpecific": "environment",
        "getFinalPhysique": (d) => d + 0,
        "getFinalPerception": (d) => d + 1,
        "getFinalWillpower": (d) => d + 1
    },
    {
        "displayName":"The Electrical Engineer",
        "finishedBeginningRoute":false,
        "imgName":"electrical",
        "description":"You came to Rottsmoth Gully after the war to get away from people, figuring there would always be work for someone with your skillset...",
        "stats": "+1 Willpower",
        "guns": "Yes",
        "skillName":"Technician",
        "skillDescription": "Ever since you were a kid, you were ripping things apart and piecing them back together in unique ways. The war took this resourcefulness and refined it into an art. You're able to understand and tamper with technology and systems to get what you want.",
        "backgroundGeneral": "engineer",
        "backgroundSpecific": "electrical",
        "getFinalPhysique": (d) => d + 0,
        "getFinalPerception": (d) => d + 0,
        "getFinalWillpower": (d) => d + 1
    },
    {
        "displayName":"The Thief",
        "finishedBeginningRoute":false,
        "imgName":"thief",
        "description":"It was supposed to be a simple museum heist. Then the patron disappeared before you could deliver the artifact--which turned out to be cursed. Now, you're blacking up and waking up in Rottsmoth Gully of all places, wondering how you got there...",
        "stats": "+1 Physique; +1 Perception",
        "guns": "No",
        "skillName":"Slippery",
        "skillDescription": "Locked doors and zipped pockets may be an obstacle for some, but not you. You've mastered the art of manipulation, subterfuge, and infiltration.",
        "backgroundGeneral": "criminal",
        "backgroundSpecific": "thief",
        "getFinalPhysique": (d) => d + 1,
        "getFinalPerception": (d) => d + 1,
        "getFinalWillpower": (d) => d + 0
    },
    {
        "displayName":"The Enforcer",
        "finishedBeginningRoute":false,
        "imgName":"enforcer",
        "description":"Rottsmoth Gully has been a hideaway for your syndicate for ages. Its various waste management facilities provide ample opportunity for corpse disposal, stolen goods stashing, and scavenging.",
        "stats": "+1 Physique",
        "guns": "Yes",
        "skillName":"Intimidation",
        "skillDescription": "Behind you stands the support and firepower of an entire crime syndicate. You're not afraid of anyone--you're the one everyone is afraid of. Even the most confident individuals tend to wither when you throw your weight around.",
        "backgroundGeneral": "criminal",
        "backgroundSpecific": "enforcer",
        "getFinalPhysique": (d) => d + 1,
        "getFinalPerception": (d) => d + 0,
        "getFinalWillpower": (d) => d + 0
    },
    {
        "displayName":"The Vision-Wracked Traveller",
        "finishedBeginningRoute":false,
        "imgName":"vision",
        "description":"For the last few months, you've had non-stop nightmares about the world's final days and an otherworldy, eldritch creature sleeping beneath mountains of trash. Research into the landscape of these nightmares led you to Rottsmoth Gully...",
        "stats": "+2 Perception",
        "guns": "No",
        "skillName":"Visions",
        "skillDescription": "Dream and reality have begun to blur for you. You're able to see beyond the physical and can pick up on possible pasts and futures.",
        "backgroundGeneral": "traveller",
        "backgroundSpecific": "vision",
        "getFinalPhysique": (d) => d + 0,
        "getFinalPerception": (d) => d + 2,
        "getFinalWillpower": (d) => d + 0
    },
    {
        "displayName":"The Antiquarian",
        "finishedBeginningRoute":false,
        "imgName":"antiquarian",
        "description":"Over the years, you've found more ancient artifacts and lost occult knowledge crammed into the Rottsmoth Gully dumpsters, junkyards, and MRFs than others have found over the past centuries in tombs and lost cities...",
        "stats": "+1 Perception",
        "guns": "Yes",
        "skillName":"Appraise",
        "skillDescription": "Since your business is unearthing hidden artifacts and historical knowledge, you're able to see it lurking in plain sight. You're also able to pick up on historical and anthropological cues from residents and town alike.",
        "backgroundGeneral": "traveller",
        "backgroundSpecific": "antiquarian",
        "getFinalPhysique": (d) => d + 0,
        "getFinalPerception": (d) => d + 1,
        "getFinalWillpower": (d) => d + 0
    }
];