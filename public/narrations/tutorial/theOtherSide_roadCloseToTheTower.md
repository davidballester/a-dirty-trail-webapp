---
id: theOtherSide_roadCloseToTheTower
title: The other side
actions:
    It was not easy (_perception_):
        check:
            skill: perception
            success:
                nextSceneId: theTower
            failure:
                nextSceneId: theOtherSide_dogsInTheWoods
---

The tower loomed among the trees, with dots of light all over it, like giant fireflies.

{{#if-has-flag "ministerIsDead"}}
"This is awful," Lady Willsbough said, stopping to catch some breath.

"Things are not great," {{playerName}} replied. "But we have to look at the bright side."

"Which is...?"

{{playerName}} shrugged. "I don't have all the answers, miss."
{{else}}
"There it is," the minister said, pointing.

"Thanks for stating the obvious," replied {{playerName}}.

"Oh, are we doing this now? Are we going to fight?"

"Probably not the best moment, I guess."

More dogs barked now, approaching.

"Yeah, probably not."
{{/if-has-flag}}

"Come on, we have to get there," {{playerName}} said, as she ventured into the thicket, trying to keep the blobs of light in sight among the darkness.
