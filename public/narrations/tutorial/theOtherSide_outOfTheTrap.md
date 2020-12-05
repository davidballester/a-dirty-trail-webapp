---
id: theOtherSide_outOfTheTrap
title: The other side
actions:
    The walked through the woods:
        nextSceneId: theTower
---

Watching {{playerName}} climb out of the whole would have been a feast for the eyes. Such grace, such swiftness. She got out and with the same boldness and sportsmanship, got to the ground and help {{#if-has-flag "bothCompanionsAlive"}}the others{{else}}her companion{{/if-has-flag}} out.

"And now, to the tower," {{playerName}} said.

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"Trying not to fall again, with God's help," said Lady Willsbourgh.

{{#if-has-not-flag "ministerIsDead"}}
"And a pair of eyes," added the minister.
{{/if-has-not-flag}}
{{else}}
"Let's see if we make it in one piece," the minister said."
{{/if-has-not-flag}}
