---
id: theForest
title: The forest
actions:
    She looked for the blockade (_perception_):
        check:
            skill: perception
            success:
                nextSceneId: theForest_blockadeFound
            failure:
                nextSceneId: theForest_lostInTheForest
    She lowered herself to the crevice (_survival - **dangerous**_):
        check:
            skill: survival
            modifier: 0.3
            success:
                nextSceneId: theForest_crevice
            failure:
                nextSceneId: theForest_creviceFall
---

{{#if-has-not-flag "theForestSecondAttempt"}}
It was still three hours or so until sunset, yet a few steps into the woods it was already dark. Surely, the fog didn't help, and {{playerName}} was chilled to the bone.

The thicket was dense and it was hard to advance. At her left, {{playerName}} could see the blockade, dark and ominous. The whole forest seemed to whisper now, but those were not nice whispers, like the ones you get from the friendly voices in your head, telling you to stay positive or complimenting your cooking when nobody else does so. These were dark whispers, the kind of whispers that invite you to order more fries even if you know you're already full and it will just make you feel miserable tonight.

{{playerName}} reached a crevice. It wasn't too deep, and she could even see the bottom, all covered in dead leaves and branches. The kind of crevice where, if your ball falls, you just go and say you've lost it.

"If this goes below the blockade, we might be able to cross to the other side safely," said {{playerName}}. But then she looked to her left, and found the blockade was no longer there.
{{else}}
She went on through the thicket, for she knew the drill. This time, she really focused on not letting the blockade dissappear on her left.

But on a forest like that one, dense and dark, that was a hard thing to do, so next thing she knew, she had found the crevice again, and the blockade was not there.
{{/if-has-not-flag}}
