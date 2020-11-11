---
id: theOldLady
title: The old lady
actions:
    '"I think so."':
        condition:
            hasTrinket: Necklace
        nextSceneId: theOldLadysNecklace
    '"No, sorry," she lied':
        condition:
            hasTrinket: Necklace
        nextSceneId: lieToTheOldLady
    "No, I'm sorry":
        condition:
            doesNotHaveTrinket: Necklace
        nextSceneId: theOldLadysAdvice
---

Further down road there were the ruins of a shrine. They stood on the side of the path. Under its bent roof an old lady sat still. "Is she alive?" asked herself {{playerName}}.

"It is, child," the woman said. "Indeed she is, although there aren't many other things alive around here."

{{playerName}} walked until she was in front of the woman. She wasn't old. She was ancient.

"What are you doing out here?" {{playerName}} asked her.

"I lost something," she said.

"Are you looking for it?"

"No, that would be pointless. It'll come to me. It always does." The woman smiled. Dust fell from the crackings in her skin as she did so. "Tell me, child. Do you have it?"
