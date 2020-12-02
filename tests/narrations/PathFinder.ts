/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    Narration,
    NarrativeSceneEngine,
    Scene,
    SceneTemplateResolver,
} from 'a-dirty-trail/build';
import AdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import Bifurcation from './Bifurcation';
import CombatSimulator from './CombatSimulator';
import instrumentScene from './instrument';
import Path, { getPrintableSceneAliasesDictionary } from './Path';
import Step from './Step';

class PathFinder {
    private narration: Narration;
    private getSceneTemplateResolver: () => SceneTemplateResolver;
    private pendingBifurcation: Bifurcation;
    private currentPath: Path;
    private output = '';

    constructor({
        narration,
        getSceneTemplateResolver,
    }: {
        narration: Narration;
        getSceneTemplateResolver: () => SceneTemplateResolver;
    }) {
        this.narration = narration;
        this.getSceneTemplateResolver = getSceneTemplateResolver;
    }

    async explore(): Promise<string> {
        do {
            this.currentPath = this.getPathFromBifurcation();
            while (!this.isPathFinished()) {
                const scene = this.currentPath.narration.getCurrentScene();
                try {
                    const bifurcation = await this.exploreScene(scene);
                    if (bifurcation && !this.pendingBifurcation) {
                        this.pendingBifurcation = bifurcation;
                    }
                } catch (error) {
                    this.currentPath.addToTrailCustom('(loop)');
                    break;
                }
            }
            if (
                !this.currentPath.narration
                    .getCurrentScene()
                    .getPlayer()
                    .isAlive()
            ) {
                this.currentPath.addToTrailCustom('(X)');
            }
            this.output += this.currentPath.getOutput() + '\n';
        } while (!!this.pendingBifurcation);
        const sceneAliases = getPrintableSceneAliasesDictionary();
        return this.output + '\n\n' + sceneAliases;
    }

    private getPathFromBifurcation(): Path {
        if (!this.pendingBifurcation) {
            return new Path({
                narration: this.narration,
            });
        }
        const newPath = new Path({
            sceneTrail: this.pendingBifurcation.sceneTrail,
            combatTrail: this.pendingBifurcation.combatTrail,
            narration: this.pendingBifurcation.narration,
            initialSteps: this.pendingBifurcation.availableSteps,
        });
        this.pendingBifurcation = undefined;
        return newPath;
    }

    private isPathFinished(): boolean {
        const narration = this.currentPath.narration;
        const currentScene = narration.getCurrentScene();
        if (!currentScene) {
            return true;
        }
        if (!currentScene.getPlayer().isAlive()) {
            return true;
        }
        if (currentScene.isCombat()) {
            return false;
        }
        const narrativeSceneEngine = new NarrativeSceneEngine({
            scene: currentScene,
        });
        return (
            narrativeSceneEngine.getPlayerActions().getAdvanceActions()
                .length === 0
        );
    }

    private async exploreScene(scene: Scene): Promise<Bifurcation> {
        if (scene.isCombat()) {
            return this.testCombatScene(scene);
        } else {
            return this.testNarrativeScene(scene);
        }
    }

    private async testCombatScene(scene: Scene): Promise<Bifurcation> {
        const combatSimulationResult = await new CombatSimulator().simulate(
            scene,
            this.narration,
            this.getSceneTemplateResolver()
        );
        this.narration = combatSimulationResult.narration;
        return this.testNarrativeScene(
            this.narration.getCurrentScene(),
            combatSimulationResult.survivability
        );
    }

    private async testNarrativeScene(
        scene: Scene,
        survivability?: number
    ): Promise<Bifurcation> {
        this.currentPath.addToTrail(scene, survivability);
        const steps = await this.getSteps(scene);
        let bifurcation: Bifurcation;
        if (steps.length > 1) {
            bifurcation = this.createBifurcation(scene, steps.slice(1));
        }
        const step = steps[0];
        const [, narration] = await this.takeStep(
            step,
            scene,
            this.currentPath.narration
        );
        this.currentPath.narration = narration;
        return bifurcation;
    }

    async getSteps(scene: Scene): Promise<Step[]> {
        if (this.currentPath.initialSteps.length) {
            const initialSteps = this.currentPath.initialSteps;
            this.currentPath.initialSteps = [];
            return initialSteps;
        }
        const [instrumentedScene] = instrumentScene(
            scene,
            this.currentPath.narration,
            this.getSceneTemplateResolver()
        );
        const advanceActions = this.getAdvanceActions(instrumentedScene);
        const listOfSteps = await Promise.all(
            advanceActions.map((advanceAction) =>
                this.convertAdvanceActionToSteps(
                    advanceAction,
                    scene,
                    this.currentPath.narration
                )
            )
        );
        const steps = listOfSteps.reduce(
            (allSteps, steps) => [...allSteps, ...steps],
            []
        );
        return steps;
    }

    private getAdvanceActions(scene: Scene): AdvanceAction[] {
        const narrativeSceneEngine = new NarrativeSceneEngine({
            scene,
        });
        const advanceActions = narrativeSceneEngine
            .getPlayerActions()
            .getAdvanceActions();
        return advanceActions;
    }

    private async convertAdvanceActionToSteps(
        advanceAction: AdvanceAction,
        scene: Scene,
        narration: Narration
    ): Promise<Step[]> {
        const {
            step: stepWithHighLuck,
            nextSceneId: highLighNextSceneId,
        } = await this.convertAdvanceActionToStepWithFixedLuck(
            advanceAction,
            'high',
            scene,
            narration
        );
        const {
            step: stepWithLowLuck,
            nextSceneId: lowLighNextSceneId,
        } = await this.convertAdvanceActionToStepWithFixedLuck(
            advanceAction,
            'low',
            scene,
            narration
        );
        if (highLighNextSceneId === lowLighNextSceneId) {
            return [
                {
                    ...stepWithHighLuck,
                    luck: undefined,
                },
            ];
        }
        return [stepWithHighLuck, stepWithLowLuck];
    }

    private async convertAdvanceActionToStepWithFixedLuck(
        advanceAction: AdvanceAction,
        luck: 'high' | 'low',
        scene: Scene,
        narration: Narration
    ): Promise<{ step: Step; nextSceneId: string }> {
        const step = {
            actionId: advanceAction.getId(),
            luck,
        };
        const [newScene] = await this.takeStep(step, scene, narration);
        return {
            step,
            nextSceneId: newScene.getId(),
        };
    }

    private getInstrumentedAdvanceAction(
        narrativeSceneEngine: NarrativeSceneEngine,
        actionId: string
    ): AdvanceAction {
        const advanceActions = narrativeSceneEngine
            .getPlayerActions()
            .getAdvanceActions();
        return advanceActions.find((action) => action.getId() === actionId)!;
    }

    private createBifurcation(scene: Scene, steps: Step[]): Bifurcation {
        const [, narration] = instrumentScene(
            scene,
            this.currentPath.narration,
            this.getSceneTemplateResolver()
        );
        return {
            availableSteps: steps,
            combatTrail: this.currentPath.combatTrail,
            sceneTrail: this.currentPath.sceneTrail,
            narration,
        };
    }

    private async takeStep(
        step: Step,
        scene: Scene,
        narration: Narration
    ): Promise<[Scene, Narration]> {
        const [instrumentedScene, instrumentedNarration] = instrumentScene(
            scene,
            narration,
            this.getSceneTemplateResolver()
        );
        const narrativeSceneEngine = new NarrativeSceneEngine({
            scene: instrumentedScene,
        });
        const instrumentedAdvanceAction = this.getInstrumentedAdvanceAction(
            narrativeSceneEngine,
            step.actionId
        );
        const randomSpy = jest.spyOn(Math, 'random');
        randomSpy.mockReturnValue(step.luck === 'low' ? 0 : 1);
        await narrativeSceneEngine.executePlayerAction(
            instrumentedAdvanceAction
        );
        randomSpy.mockRestore();
        const newScene = instrumentedNarration.getCurrentScene()!;
        return [newScene, instrumentedNarration];
    }
}

export default PathFinder;
