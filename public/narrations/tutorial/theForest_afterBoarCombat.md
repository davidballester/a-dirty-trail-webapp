---
id: theForest_afterBoarCombat
title: The forest
actions:
    '"Hello? Lady Willsbourgh! Minister?"':
        nextSceneId: theForest_backToTheRoad
    '"Come on, you can do this. Just find the damn blockade" (_survival_)':
        check:
            skill: survival
            success:
                nextSceneId: theForest_blockadeFound
            failure:
                nextSceneId: theForest_deadInTheForest
        sideEffect:
            addFlag: theRoadBoar
---

Feeling like a powerful caveman after defeating such a magnificent beast in the middle of the woods, {{playerName}} found the effect of the adrenaline wearing off, the cold beginning to settle again in her bones, and the forest looking as foreign as ever.

So the boar was dead and she was still lost.
