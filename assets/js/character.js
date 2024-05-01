class character {
    constructor(name=undefined,
                backgroundBroad=undefined,
                backgroundSpecific=undefined,
                physique=undefined,
                perception=undefined,
                willpower=undefined,
                secondarySkill=undefined
                ){
        this.name = name;
        this.health = 10;
        this.sanity = 10;
        this.physique = physique;
        this.perception = perception;
        this.willpower = willpower;
        // occult - demolitions - diving
        this.secondarySkill = secondarySkill;
        this.secondarySkillDescription = secondarySkill == "occult" ? "During your college days, you got involved in a really weird cult. You managed to get out, but the experience left a mark on you. You're able to recognize occult symbols, phrases, and partial pantheons." :
                                        secondarySkill == "demolitions" ? "In order to pay your way through college, you took on work with a demolitions crew. You have experience with destroying and breaking down even the strongest of structures--and, on a whim, you brought some tools of the trade with you." :
                                        
                                        "You come from a long line of divers who--without scuba gear--combed the bottom of the sea for seaweed, shellfish, and oysters. While your friends spent their weekends playing videogames, you were forced to master the art of unassisted ocean diving--perhaps this adventure will make you glad you did."
        switch (backgroundBroad) {
            case "federal":
                if (backgroundSpecific == "tax"){
                    this.background = "IRS Agent";
                    this.tagline = "You followed the reek of fraudulent numbers, falsified tax documents, and economic anomalies all the way to Rottsmoth Gully Industrial...";
                    this.primarySkill = "Finance";
                    this.primarySkillDescription = "Knowledgable about all things financial. You've spent years following the economic goings-on of Rottsmoth Gully and understand its systems on a deeper level than its inhabitants let on.";
                    this.canUseGun = false;
                } else {
                    this.background = "FBI Agent";
                    this.tagline = "After years of investigations, interrogations, and interstate travel, you've managed to track a group of depraved serial murderers down to Rottsmoth Gully...";
                    this.primarySkill = "Classified";
                    this.primarySkillDescription = "After years of cultivating relationships and climbing federal ranks, you have immediate access to the wealth of information collected by the government and the support of various government workers.";
                    this.canUseGun = true;
                }
                break;
            case "engineer":
                if (backgroundSpecific == "environmental"){
                    this.background = "Environmental Engineer";
                    this.tagline = "When you were hired by Rottsmoth Gully Industrial to investigate alternative waste management strategies, you initially thought it was a dream come true...";
                    this.primarySkill = "Scientist";
                    this.primarySkillDescription = "Dedicating those long, sleepless nights to studying everything from geology to chemistry to microbiology and everything inbetween has finally paid off. You're able to notice things about the environment of Rottsmoth Gully that others may not."
                    this.canUseGun = false;
                } else {
                    this.background = "Electrical Engineer";
                    this.tagline = "You came to Rottsmoth Gully after the war to get away from people, figuring there would always be work for someone with your skillset...";
                    this.primarySkill = "Technician";
                    this.primarySkillDescription = "Ever since you were a kid, you were ripping things apart and piecing them back together in unique ways. The war took this resourcefulness and refined it into an art. You're able to understand and tamper with technology and systems to get what you want."
                    this.canUseGun = true;
                }
                break;
            case "criminal":
                if (backgroundSpecific == "thief"){
                    this.background = "Thief";
                    this.tagline = "It was supposed to be a simple museum heist. Then the patron disappeared before you could deliver the artifact--which turned out to be cursed. Now, you're blacking up and waking up in Rottsmoth Gully of all places, wondering how you got there...";
                    this.primarySkill = "Slippery";
                    this.primarySkillDescription = "Locked doors and zipped pockets may be an obstacle for some, but not you. You've mastered the art of manipulation, subterfuge, and infiltration."
                    this.canUseGun = false;
                } else {
                    this.background = "Enforcer";
                    this.tagline = "Rottsmoth Gully has been a hideaway for your syndicate for ages. Its various waste management facilities provide ample opportunity for corpse disposal, stolen goods stashing, and scavenging.";
                    this.primarySkill = "Intimidate";
                    this.primarySkillDescription = "Behind you stands the support and firepower of an entire crime syndicate. You're not afraid of anyone--you're the one everyone is afraid of. Even the most confident individuals tend to wither when you throw your weight around."
                    this.canUseGun = true;
                }
                break;
            default:
                this.background = "Traveller";
                this.tagline = "For the last few months, you've had non-stop nightmares about the world's final days and an otherworldy, eldritch creature sleeping beneath mountains of trash. Research into the landscape of these nightmares led you to Rottsmoth Gully...";
                this.primarySkill = "Visions";
                this.primarySkillDescription = "Dream and reality have begun to blur for you. You're able to see beyond the physical and can pick up on possible pasts and futures.";
                this.canUseGun = false;
        }

        // After switch
    }
}