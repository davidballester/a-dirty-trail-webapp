---
id: theOtherSide_chasedByDogsOnTheRoad
title: The other side
actions:
    The situation was desperate, so {{playerName}} kept on running:
        condition:
            hasFlag: bothCompanionsAlive
        nextSceneId: theOtherSide_roadCloseToTheTower
        sideEffect:
            addFlag: ministerIsDead
    She turned back to help the minister:
        condition:
            hasFlag: bothCompanionsAlive
        nextSceneId: theOtherSide_chasedByDogsOnTheRoadCombat
    '{{playerName}} turned around to face them':
        condition:
            hasNotFlag: bothCompanionsAlive
        nextSceneId: theOtherSide_chasedByDogsOnTheRoadCombat
---

When se had woken up this morning, {{playerName}} had not thought she'd learn so many things in a day. Here's a quick summary:

-   You can develop weird bonds with stragers you meet in a stagecoach.
-   People could live covered in mud.
    {{#if-has-flag "theRoadBoar"}}
-   Boars will attack if desperate enough.
    {{/if-has-flag}}
-   Dogs can easily outrun people.

{{#if-has-flag "bothCompanionsAlive"}}
One of the vicious creatures had reached the minister, who had fallen to the muddy road and was now fighting for his life.

"Do something!" cried Lady Willsbourgh, as she ran for her life.
{{else}}
The dogs were upon them.
{{/if-has-flag}}
