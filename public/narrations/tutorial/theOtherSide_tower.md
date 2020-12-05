---
id: theOtherSide_tower
title: The other side
actions:
    '"And I can take you there. I think" (_survival (hard)_)':
        check:
            skill: survival
            modifier: -0.2
            success:
                nextSceneId: theOtherSide_pathToTheTower
            failure:
                nextSceneId: theOtherSide_trap
    'It looks dangerous, though':
        nextSceneId: theOtherSide_dogs
---

It was dark now, and the sky was covered with stars. The moon shone bright, luckily, and it was its clear light that showed {{playerName}} the tower.

"Do you see that," she asked.

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"It looks like a crooked tree," said Lady Willsbourgh.

{{#if-has-flag "alys"}}
"You need to review your trees, ma'am," said {{playerName}}.
{{else}}
"You need to review your trees, Lady Willsbourgh," said {{playerName}}.
{{/if-has-flag}}
{{else}}
"I could not see the devil in front of me even if my soul depended on it, child," the minister said.
{{/if-has-not-flag}}

"It's a tower, right there," said {{playerName}}, pointing at a wooden construction among the trees, among the darkness of the woods.
