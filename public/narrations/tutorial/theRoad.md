---
id: theRoad
title: The road
actions:
    'She looked for the water stream':
        check:
            skill: perception
            modifier: -0.05
            success:
                nextSceneId: theRoad_thePond
            failure:
                nextSceneId: theRoad_theBushes
    'She kept going (-1 hitpoints)':
        nextSceneId: theOldLady
        sideEffect:
            modifyHealth: -1
---

A dirty trail extended into the distance. {{playerName}} strode along it, leaving deep footprints on the mud. Despite the humid air and the dark clouded sky, she felt **thirsty**. As the walk went on and on, she was **parched**.

At the other side of the stooped trees and the thorn bushes, {{playerName}} heard the sound of **a stream**. From then on, all she could think of was **fresh water** cleansing her dry throat and washing away the sticky blood on her hands.
