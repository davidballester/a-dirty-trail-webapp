/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    Narration,
    NarrativeSceneEngine,
    Scene,
    SceneTemplateResolver,
} from 'a-dirty-trail/build';
import AdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import instrumentScene from './instrument';

class Path {
    scenes: SceneInPath[] = [];
    private sceneTemplateResolver: SceneTemplateResolver;

    async addScene(
        narration: Narration,
        scene: Scene,
        sceneTemplateResolver: SceneTemplateResolver
    ): Promise<SceneInPath> {
        this.sceneTemplateResolver = sceneTemplateResolver;
        let sceneInPath = this.findScene(scene);
        if (!sceneInPath) {
            sceneInPath = this.addEmptyScene(scene, narration);
        }
        const possibleSteps = await this.buildPossibleSteps(narration, scene);
        const stepsNotAlreadyTaken = possibleSteps.filter(
            (step) => !this.containsStep(sceneInPath, step)
        );
        sceneInPath.steps.push(...stepsNotAlreadyTaken);
        return sceneInPath;
    }

    private findScene(scene: Scene): SceneInPath | undefined {
        return this.scenes.find(
            (sceneInPath) => sceneInPath.sceneId === scene.getId()
        );
    }

    private addEmptyScene(scene: Scene, narration: Narration): SceneInPath {
        const sceneInPath: SceneInPath = {
            narration: instrumentScene(
                scene,
                narration,
                this.sceneTemplateResolver
            )[1],
            sceneId: scene.getId(),
            steps: [],
        };
        this.scenes.push(sceneInPath);
        return sceneInPath;
    }

    private async buildPossibleSteps(
        narration: Narration,
        scene: Scene
    ): Promise<Step[]> {
        const [instrumentedScene] = instrumentScene(
            scene,
            narration,
            this.sceneTemplateResolver
        );
        const advanceActions = this.getAdvanceActions(instrumentedScene);
        const listOfSteps = await Promise.all(
            advanceActions.map((advanceAction) =>
                this.convertAdvanceActionToSteps(
                    advanceAction,
                    scene,
                    narration
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
        const stepWithHighLuck = await this.convertAdvanceActionToStepWithFixedLuck(
            advanceAction,
            'high',
            scene,
            narration
        );
        const stepWithLowLuck = await this.convertAdvanceActionToStepWithFixedLuck(
            advanceAction,
            'low',
            scene,
            narration
        );
        if (stepWithHighLuck.goesToSceneId === stepWithLowLuck.goesToSceneId) {
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
        luck: Luck,
        scene: Scene,
        narration: Narration
    ): Promise<Step> {
        const [instrumentedScene, instrumentedNarration] = instrumentScene(
            scene,
            narration,
            this.sceneTemplateResolver
        );
        const narrativeSceneEngine = new NarrativeSceneEngine({
            scene: instrumentedScene,
        });
        const instrumentedAdvanceAction = this.getInstrumentedAdvanceAction(
            narrativeSceneEngine,
            advanceAction.getId()
        );
        const randomSpy = jest.spyOn(Math, 'random');
        randomSpy.mockReturnValue(luck === 'low' ? 0 : 1);
        await narrativeSceneEngine.executePlayerAction(
            instrumentedAdvanceAction
        );
        randomSpy.mockRestore();
        const newScene = instrumentedNarration.getCurrentScene()!;
        return {
            actionId: instrumentedAdvanceAction.getId(),
            goesToSceneId: newScene.getId(),
            luck,
            taken: false,
            nextNarration: instrumentedNarration,
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

    private containsStep(sceneInPath: SceneInPath, step: Step): boolean {
        return !!sceneInPath.steps.find(
            (candidate) =>
                candidate.actionId === step.actionId &&
                candidate.goesToSceneId === step.goesToSceneId &&
                candidate.luck === step.luck
        );
    }

    getSceneNotFullyExplored(): SceneInPath {
        return this.scenes.find((scene) =>
            scene.steps.some((step) => !step.taken)
        );
    }

    containsUnexploredSteps(): boolean {
        return this.scenes.some((scene) =>
            scene.steps.some((step) => !step.taken)
        );
    }
}

export default Path;

export interface SceneInPath {
    narration: Narration;
    sceneId: string;
    steps: Step[];
}

export interface Step {
    actionId: string;
    luck?: Luck;
    goesToSceneId: string;
    taken: boolean;
    nextNarration?: Narration;
}

type Luck = 'high' | 'low';
