---
id: theOtherSide_towerOutOfSight
title: The other side
actions:
    She tried to find the tower before advancing (_-1 health_):
        nextSceneId: theTower
        sideEffect:
            modifyHealth: -1
    She pushed through (_survival_):
        check:
            skill: survival
            success:
                nextSceneId: theTower
            failure:
                nextSceneId: theOtherSide_ravine
---

It was pitch black in the woods nows. The starts above tilted between the branches, and it was freezing. They shivered and hugged themselves as they walked, but it was not enough.

"Where is that damned tower?" {{playerName}} said.

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"I thought you were the one guiding us there," Lady Willsbourgh said.

"Thanks for reminding me."
{{else}}
"Well, this whole thing was your idea, so you better know the answer," the minister said.

"My idea?"

"Mine finished when the stagecoach crashed," the minister said, laughing. "I would have stayed there and, I don't know, died of exposure or something."
{{/if-has-not-flag}}
