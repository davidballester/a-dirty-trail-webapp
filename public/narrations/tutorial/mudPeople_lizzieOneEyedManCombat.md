---
id: mudPeople_combat
title: Mud people
actors:
    One-eyed man:
        health: 2-2
        skills:
            stab: 0.3
        inventory:
            weapons:
                Hatchet:
                    skill: stab
                    damage: 1-3
                    type: axe
    Big Lizzie:
        health: 4-4
        skills:
            hand-to-hand: 0.3
        inventory:
            weapons:
                Bare hands:
                    skill: hand-to-hand
                    type: fangs
                    damage: 1-2
                    canBeLooted: false
actions:
    '"I could do this all day long!""':
        nextSceneId: mudPeople_afterCombatMinister
---