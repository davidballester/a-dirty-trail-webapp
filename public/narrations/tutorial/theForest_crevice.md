---
id: theForest_crevice
title: The forest
actions:
    With her bare hands, she tore apart and made way (_survival_):
        condition:
            doesNotHaveTrinket: Tusk
        check:
            skill: survival
            success:
                nextSceneId: theForest_throughTheCrevice
            failure:
                nextSceneId: theForest_throughTheCreviceWounded
    '"Hey, I can use that **tusk** I got"':
        condition:
            hasTrinket: Tusk
        nextSceneId: theForest_throughTheCrevice
---

{{#if-has-not-flag "theForestSafeCreviceDescending"}}
Her shoes were not the kind of shoes you would wear for a stroll through the woods, but there she weas, looking for surfaces and rocks she could trust. And somehow, she did it.
{{else}}
{{#if-has-flag "theForestCreviceFall"}}
She let herself slide through a steep slope, feeling like a child for a second. A child lost in the woods, hunted by shadows and seriously convinced hypothermia was settling in.
{{else}}
The depths of the crevice welcomed her with a mushy carpet of dead leaves, and on she went.
{{/if-has-flag}}
{{/if-has-not-flag}}

Not far, she saw the blockade above the crevice, and below, a thick wall of roots and fallen logs and rocks. Certainly not a welcoming passage.
