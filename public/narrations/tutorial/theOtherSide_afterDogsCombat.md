---
id: theOtherSide_afterDogsCombat
title: The other side
actions:
    She followed the road back to where they first saw the tower:
        nextSceneId: theOtherSide_chasedByDogsOnTheRoad
    She ventured into the woods to lose the dogs:
        nextSceneId: theOtherSide_dogsInTheWoods
---

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"Those beastly things," said Lady Willsbourgh. "They should have been tamed when they were pups."

{{#if-has-not-flag "ministerIsDead"}}
"I feel personally attacked by that comment," said the minister, and laughed.
{{/if-has-not-flag}}
{{else}}
"You see, now it was justified," said the minister.
{{/if-has-not-flag}}

{{playerName}} was about to say something, but more barks filled the air around her. For a second, she thought it was the souls of the dogs she had just slaughtered, coming to haunt her, but they were far too real.

{{#if-has-not-flag "ministerIsDead"}}
"More are coming," shouted the minister. "We have to go!"
{{else}}
"Oh, dear," Lady Willsbourgh said. "Not more of those things."
{{/if-has-not-flag}}

"Run!" {{playerName}} shouted, and so she did.

{{#if-has-not-flag "ladyWillsbourghIsDead"}}
"But, where?" cried Lady Willsbourgh.

{{#if-has-not-flag "ministerIsDead"}}
"To that tower thing," the minister said, trying to keep up with them.
{{else}}
"To the tower," {{playerName}} replied.
{{/if-has-not-flag}}
{{else}}
"To that tower thing," the minister said, trying to keep up with them.
{{/if-has-not-flag}}
