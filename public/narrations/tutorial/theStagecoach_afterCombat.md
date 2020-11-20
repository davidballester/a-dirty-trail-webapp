---
id: theStagecoach_afterCombat
title: The stagecoach
actions:
    '"It''ll be sunset before she figures it out, minister"':
        nextSceneId: theStagecoach_nowWhat
        sideEffect:
            addFlag: theStagecoach_ministerExplanation
    '"He''s had a severe case of bullet to the chest"':
        nextSceneId: theStagecoach_nowWhat
---

{{#if-has-flag "alys"}}"Well done, my dear,"{{else}}"Well done, mylady,"{{/if-has-flag}} the minister said, hoping out of the stagecoach and almost losing his balance.

"You gave those thugs a lesson they won't easily forget," Lady Willsbourgh said, getting out of the stagecoach too, and {{playerName}} worried about what kind of memories could dead bodies hold, but shook it off.

"Give me that," she said as she took the flask from the minister's trembling hand and emptied it.

"What happend to the poor driver?" Lady Willsbourgh asked, looking at him, fallen on the dirt of the road not two steps from her.

"He's embarked for the longest journey, I'm afraid," the minister said, taking the flask {{playerName}} now gave back and looking at how sadly empty it was.

"What do you mean, minister?" Lady Willsbourgh asked.

"The poor fellow has gone to meet his maker," the minister answered again.

"His parents?" Lady Willsbourgh's confusion was just increasing at this point.
