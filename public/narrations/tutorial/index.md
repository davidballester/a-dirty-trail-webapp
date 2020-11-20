---
id: index
title: The stagecoach
player:
    name: The damsel
    health: 8-8
    inventory:
        weapons:
            'Hair clip':
                type: 'knife'
                damage: 1-1
                skill: stab
    skills:
        aim: 0.6
        stab: 0.75
        perception: 0.5
        survival: 0.4
actions:
    '"Please, minister, don''t be rude"':
        sideEffect:
            addFlag: ladyFriend
        nextSceneId: theStagecoach_ladyFriend
    '"I thought she was visiting her grandchildren!"':
        sideEffect:
            addFlag: ministerFriend
        nextSceneId: theStagecoach_ministerFriend
---

The stagecoach rumbled softly over the packed dirt of the path.

"All this movement is making me nauseous," said Lady Willsbourgh, fanning her face furiously, her impossible bun wobbling on top of her head.

"You'll get plenty of fresh air soon enough," said the minister, and burst in laughter. Luckily, **the damsel** thought, he had put out his pipe, because otherwise his breath could have caught fire.

"Aren't you a bit too... festive for a minister?" Lady Willsbourgh asked.

"And aren't you a bit old to be marrying?" the minister responded, laughing again and causing Lady Willsbourgh to open her eyes so wide the damsel thought they could fall out and splash against the stagecoach floor.

"How dare you?" said Lady Willsbourgh with her shrilliest voice.

"I bet I'm not the first one to tell you so," defended himself the minister. "What do you think, young lady?" he asked the damsel sitting by his side.
