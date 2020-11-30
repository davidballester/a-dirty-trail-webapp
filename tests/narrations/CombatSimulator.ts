import {
    CombatSceneEngine,
    Narration,
    Scene,
    SceneTemplateResolver,
} from 'a-dirty-trail/build';
import AI from './AI';
import instrumentScene from './instrument';

class CombatSimulator {
    async simulate(
        combat: Scene,
        narration: Narration,
        sceneTemplateResolver: SceneTemplateResolver
    ): Promise<SimulationResult> {
        const victoriousNarrations: Narration[] = [];
        const simulations = 200;
        for (let i = 0; i < simulations; i++) {
            // eslint-disable-next-line prefer-const
            let [combatScene, combatNarration] = instrumentScene(
                combat,
                narration,
                sceneTemplateResolver
            );
            combatScene = await this.simulateCombat(combatScene);
            if (this.isVictoriousCombat(combatScene)) {
                victoriousNarrations.push(combatNarration);
            }
        }
        const survivability = victoriousNarrations.length / simulations;
        const victoriousNarration =
            victoriousNarrations[
                Math.floor(Math.random() * victoriousNarrations.length)
            ];
        return {
            survivability,
            narration: victoriousNarration,
        };
    }

    private async simulateCombat(scene: Scene): Promise<Scene> {
        const ai = new AI(scene);
        const player = scene.getPlayer();
        const combatSceneEngine = new CombatSceneEngine({
            scene,
        });
        while (player.isAlive() && !combatSceneEngine.isCombatOver()) {
            await this.simulateTurn(combatSceneEngine, ai, scene);
        }
        return scene;
    }

    private async simulateTurn(
        combatSceneEngine: CombatSceneEngine,
        ai: AI,
        scene: Scene
    ): Promise<void> {
        if (combatSceneEngine.isPlayerTurn()) {
            await this.simulatePlayerTurn(combatSceneEngine, ai, scene);
        } else {
            await combatSceneEngine.executeNextOponentAction();
        }
    }

    private async simulatePlayerTurn(
        combatSceneEngine: CombatSceneEngine,
        ai: AI,
        scene: Scene
    ): Promise<void> {
        const nextAction = ai.getNextAction(scene);
        await combatSceneEngine.executePlayerAction(nextAction);
    }

    private isVictoriousCombat(scene: Scene): boolean {
        return scene.getPlayer().isAlive();
    }
}

export interface SimulationResult {
    narration: Narration;
    survivability?: number;
}

export default CombatSimulator;
