---
id: theOtherSide_lookForTheTowerAfterDogs
title: The other side
actions:
    They tried to keep the lights in sight (_perception_):
        check:
            skill: perception
            success:
                nextSceneId: theTower
            failure:
                nextSceneId: theOtherSide_towerOutOfSight
---

They undid their steps and got back to where they could see the tower from the road.

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"Well, I must admit I don't look forward to getting there," Lady Willsbourgh said.

{{#if-has-not-flag "ministerIsDead"}}
"You're more than welcome to stay here in the road all night, milady," the minister said, and chuckled.
{{else}}
"It can't be worse than staying here," {{playerName}} said, honoring what a teacher had told her fifteen years ago when she had made up all the answers on an exam she had not studied for. "You're terrible at guessing what you don't know," Mr. Frankl had said. And boy, was he right.
{{else}}
"That looks welcoming," the minister said, looking at the darkness that surrounded the whole forest.
{{/if-has-not-flag}}

The tower had now lighted up, and it looked like a giant fireflies hive.
