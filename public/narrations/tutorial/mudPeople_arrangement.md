---
id: mudPeople_arrangement
title: Mud people
actions:
    '"Yes, I did. And you''re going to love it"':
        nextSceneId: theOtherSide
---

"Listen here, good folks," the minister said. "We don't have anything for you, as you can see. And we are in dire need of refuge."

{{#if-has-not-flag "mudPeople_lizzieOneEyedManLeft"}}
"We have nothing to offer you, strangers," the one-eyed man said.

"Only advice," said the old woman. "Do not venture forward."

"That's not helpful," said {{playerName}}
{{else}}
"There is no refuge for you out here," said the old woman. "Only despair."

"That we have noticed," said {{playerName}}. "Anything more specific?"
{{/if-has-not-flag}}

"The covenant will hunt you down if you dare cross this frontier," said the old woman.

"I don't see a reason why," said Lady Willsbourgh. "We are but travelers looking for lodging to spend the night!"

{{#if-has-not-flag "mudPeople_lizzieOneEyedManLeft"}}
"If you're lucky, they might bury you," said the one-eyed man. "How's that for lodging?" And he laughed, but so did the minister, which ruined it for him.
{{else}}
"Cross at your own risk, but think that the ones you encountered down the road where the lucky ones," said the woman.
{{/if-has-not-flag}}

And with this, they departed.

The minister, Lady Willsbourgh and {{playerName}} were now alone again, and they looked at each other.

"That could have gone worse, I guess," {{playerName}} said.

"Well, let's just say they haven't filled me with optimism as to what we'll find farther ahead," Lady Willsbourgh said.

"If it has a roof, it's fine for me," the minister said. "And if they had something to drink, all the better!"

"Tell me, dear," Lady Wilsbourgh said, looking at {{playerName}}. "Have you found a way across this blockade?"
