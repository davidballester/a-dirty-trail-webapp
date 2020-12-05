---
id: theOtherSide_bottomOfTrapPerceptionFailure
title: The other side
actions:
    'She climbed the dirt walls powered by rage (_survival (hard)_)':
        check:
            skill: survival
            modifier: -0.1
            success:
                nextSceneId: theOtherSide_outOfTheTrap
            failure:
                nextSceneId: theOtherSide_outOfTheTrapWounded
---

{{playerName}} looked all around, but it was getting dark, and in the bottom of a hole, there's not much to find.

"Whoever dug this must have got out somehow," {{playerName}} said, all detectively.

{{#if-has-not-flag "ministerIsDead"}}
"A ladder, genius," the minister said. He had sat down and was looking at the sky, not desperate, just waiting.

"That... sounds about right," {{playerName}} sighed.
{{else}}
"You mean someone did this?" Lady Willsbourgh asked. "On purpose?"

"How else do you think this hole appeared here?"

"Moles, maybe." {{playerName}} could not help but laugh. "I'm not a forest person, you see," Lady Willsbourgh said, quite offended.
{{/if-has-not-flag}}

"Only sheer will power will get me out of here, then," {{playerName}} sait to herself.
