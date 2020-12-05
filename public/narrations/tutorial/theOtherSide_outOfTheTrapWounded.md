---
id: theOtherSide_outOfTheTrapWounded
title: The other side
actions:
    The walked through the woods (_-1 health_):
        nextSceneId: theTower
        sideEffect:
            modifyHealth: -1
---

It took more than one try. And a couple more falls. It was not easy, or painless, but she got out.

Once outside of the hole, it was so cold she started to miss being down below.

"Now, I'll help you out," she said, as she lowered herself on the ground and reached out.

{{#if-has-not-flag "ministerIsDead"}}
The minister was quite heavy, which didn't surprise anyone. {{playerName}} had to hold tight to the ground to help him out, and her shoulder almost popped out, but she managed to help him out.
{{/if-has-not-flag}}
{{#if-has-not-flag "ladyWillsbourghIsDead"}}
Lady Willsbourgh hat fell to the bottom when {{playerName}} raised her out.

"I'll have to get someone to fetch that once we're out of this little adventure of ours," she said.
{{/if-has-not-flag}}

The tower was not far ahead, so they wiped the dirt out of their clothes the best they could and got going.
