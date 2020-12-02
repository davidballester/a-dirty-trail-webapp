---
id: theForest_lostInTheForest
title: The forest
actions:
    '"I might as well just start walking" (_survival_)':
        condition:
            hasNotFlag: theRoadBoar
        check:
            skill: survival
            success:
                nextSceneId: theForest_backToTheRoad
            failure:
                nextSceneId: theForest_theBoar
    'She kept walking':
        condition:
            hasFlag: theRoadBoar
        check:
            skill: survival
            success:
                nextSceneId: theForest_backToTheRoad
            failure:
                nextSceneId: theForest_deadInTheForest
---

{{#if-has-not-flag "theRoadBoar"}}
"Is it me, or is it getting darker?" she said, and her own voice frightened her in the whispering silence of the woods.

It _was_ getting darker. And colder. And {{playerName}} was lost as shit.

"Come on, calm now. Remember what you've read about forests and getting lost." She took a deep breath and look around her, trying to find any landmark that could helper her, but the forest looked the same in all directions, like an Ikea of trees.

"Something about moss growing on the north side, isn't it?" But the trunks of the trees had either no moss or were covered in it, and the rocks were no good either.
{{else}}
"You have to be kidding me," said {{playerName}} when she realized that, no matter where she looked, nothing looked familiar.

"This forest is the worst." It was actually quite nice in the summer time, but that's not something she would consider now.
{{/if-has-not-flag}}