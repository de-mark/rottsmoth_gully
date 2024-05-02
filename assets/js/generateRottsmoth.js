const GENERATE_ROTTSMOTH = (protagType, exampleSeries) => {
    let bottleNeckScene = exampleSeries.addNewScene("ACT 1", 
                            "Waking up in the dumps",
                            "One of Rottsmoth Gully's many landfills",
                            `<p>You wake up in a landfill, nearly buried alive in rancid trashbags and decaying organic waste. Although you try to remember how you got here, your mind blanks. Whatever path brought you here, it must have taken place a long time ago because your nose has already adjusted to--what must be--an ungodly stench.</p>

                            <p>The good news is that--other than being covered in all sorts of digestive juices and refuse--your body seems to be perfectly in tact.</p>
                            
                            <p>The bad news is that you have no wallet, you're dressed in your pajamas, and you have no idea where you are.</p>
                            
                            <p>It's a landfill in Rottsmoth Gully, certainly, but there's quite a few of those and they tend to sprawl over the landscape for miles.</p>
                            
                            <p>Navigating your way out of this might be tricky to say the least.</p>
                            
                            <p>Furthermore, it might be the eerie shadows of the desert moon unnerving you, but you suddenly get the feeling that you're being watched by the landfill itself. As if the very cells you're composed of are threatening to betray you to an impossible force of destruction...</p>`);

    let agentStartScene = ADD_AGENT_PROLOG(bottleNeckScene);

    switch(protagType){
        case "agent":
            exampleSeries.setCurrent(agentStartScene);
            break;
        default:
            console.log("Hmm. How'd you get here?");
    }
}

const ADD_AGENT_PROLOG = (bottleNeckScene) => {
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

    exampleSeries.connectScenes(agentStartSceneD0, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.")

    exampleSeries.connectScenes(agentStartSceneP1, bottleNeckScene, "default", "You spend the rest of the day asking questions, but no one seems to have answers.");

    return agentStartScene;
}