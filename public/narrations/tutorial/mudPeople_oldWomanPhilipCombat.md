---
id: mudPeople_oldWomanPhilipCombat
title: Mud people
actors:
    Old woman:
        health: 1-1
        skills:
            aim: 0.8
        inventory:
            weapons:
                Derringer:
                    skill: aim
                    damage: 1-1
                    type: derringer
                    ammunitionType: Bullets
                    ammunition: 1-1
            ammunitions:
                Bullets: 5
    Muddy Philip:
        health: 2-2
        skills:
            stab: 0.2
        inventory:
            weapons:
                Rusty knife:
                    skill: stab
                    type: knife
                    damage: 1-2
actions:
    There was mud everywhere:
        nextSceneId: mudPeople_afterOldWomanPhilipCombat
---
