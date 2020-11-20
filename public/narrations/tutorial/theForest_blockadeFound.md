---
id: theForest_blockadeFound
title: The forest
actions:
    She looked for the crevice again (_perception_):
        condition:
            hasNotFlag: theForestSecondAttempt
        check:
            skill: perception
            success:
                nextSceneId: theForest_creviceAndBlockade
            failure:
                nextSceneId: theForest_lostInTheForest
    This time, she followed the crevice:
        condition:
            hasFlag: theForestSecondAttempt
        nextSceneId: theForest_creviceAndBlockade
---

She went back, and then discovered she was not sure where back was. Or where the road was. Or if it was day or night.

"There is no reason to panic," she said to herself. "The demons are not around." For some reason, suddenly thinking about demons did not make her feel calmer, and she started to stride through the thicket.

But there it was, just in front of her, the blockade, tall and menacing, but still familiar, like uncle Bob.
