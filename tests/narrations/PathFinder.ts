import {
    Narration,
    NarrativeSceneEngine,
    Scene,
    SceneTemplateResolver,
} from 'a-dirty-trail/build';
import CombatSimulator from './CombatSimulator';
import Path from './Path';

class PathFinder {
    errors: string[] = [];
    log: string[] = [];
    private narration: Narration;
    private getSceneTemplateResolver: () => SceneTemplateResolver;
    private path: Path = new Path();
    private pathsFollowed: string[][] = [];

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

    async explore(): Promise<void> {
        do {
            const pathFollowed = [];
            while (!this.isNarrationFinished()) {
                const scene = this.narration.getCurrentScene();
                await this.exploreScene(scene);
                pathFollowed.push(scene.getId());
            }
            this.pathsFollowed.push(pathFollowed);
            this.resetNarrationFromFirstAvailableBifurcation();
        } while (!this.isPathFinished());
    }

    private isNarrationFinished(): boolean {
        if (!this.narration) {
            return true;
        }
        const currentScene = this.narration.getCurrentScene();
        if (!currentScene) {
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

    private async exploreScene(scene: Scene): Promise<void> {
        if (scene.isCombat()) {
            return this.testCombatScene(scene);
        } else {
            return this.testNarrativeScene(scene);
        }
    }

    private async testCombatScene(scene: Scene): Promise<void> {
        const combatSimulationResult = await new CombatSimulator().simulate(
            scene,
            this.narration,
            this.getSceneTemplateResolver()
        );
        if (combatSimulationResult.survivability < 0.3) {
            this.errors.push(
                `${scene.getId()} survivability rate: ${
                    combatSimulationResult.survivability
                }!`
            );
        }
        this.narration = combatSimulationResult.narration;
        return this.testNarrativeScene(this.narration.getCurrentScene());
    }

    private async testNarrativeScene(scene: Scene): Promise<void> {
        const sceneInPath = await this.path.addScene(
            this.narration,
            scene,
            this.getSceneTemplateResolver()
        );
        if (!sceneInPath.steps.length) {
            this.narration = undefined;
            return;
        }
        const stepsNotTaken = sceneInPath.steps.filter((step) => !step.taken);
        if (!stepsNotTaken.length) {
            this.narration = undefined;
            return;
        }
        this.narration = stepsNotTaken[0].nextNarration;
        stepsNotTaken[0].taken = true;
    }

    private resetNarrationFromFirstAvailableBifurcation(): void {
        const sceneInPath = this.path.getSceneNotFullyExplored();
        if (sceneInPath) {
            this.narration = sceneInPath.narration;
        }
    }

    private isPathFinished(): boolean {
        return !this.path.containsUnexploredSteps();
    }

    toString(): string {
        const scenePathIdMaker = new ScenePathIdMaker();
        const sceneIds = scenePathIdMaker.makeIds(
            this.path.scenes.map((scene) => scene.sceneId)
        );
        const sceneIdsString = this.sceneIdsToString(sceneIds);
        const pathsToString = this.pathsToString(sceneIds);
        return `${sceneIdsString}\n\n${pathsToString}`;
    }

    private sceneIdsToString(sceneIds: { [sceneId: string]: string }): string {
        return Object.keys(sceneIds)
            .map((sceneId) => `${sceneId}: ${sceneIds[sceneId]}`)
            .join('\n');
    }

    private pathsToString(sceneIds: { [sceneId: string]: string }): string {
        return this.pathsFollowed
            .map((pathFollowed) =>
                pathFollowed.map((scene) => sceneIds[scene]).join(',')
            )
            .join('\n');
    }
}

export default PathFinder;

class ScenePathIdMaker {
    private actAvailablePrefixes = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    private actToPrefix: { [act: string]: string } = {};
    private actToSceneIdToReadableId: ActToSceneIdToId = {};

    makeIds(scenes: string[]): { [sceneId: string]: string } {
        this.makeActToPrefix(scenes);
        this.makeSceneToIds(scenes);
        return Object.keys(this.actToSceneIdToReadableId)
            .map((act) => this.actToSceneIdToReadableId[act])
            .reduce(
                (allSceneIdToReadableId, actSceneIdToReadableId) => ({
                    ...allSceneIdToReadableId,
                    ...actSceneIdToReadableId,
                }),
                {}
            );
    }

    private makeActToPrefix(scenes: string[]): void {
        scenes
            .map((scene) => this.getAct(scene))
            .forEach((act) => {
                if (!this.actToPrefix[act]) {
                    const [prefix] = this.actAvailablePrefixes.splice(0, 1);
                    this.actToPrefix[act] = prefix;
                }
            });
    }

    private getAct(sceneId: string): string {
        return sceneId.substring(0, sceneId.indexOf('_')) || 'main';
    }

    private makeSceneToIds(scenes: string[]): void {
        scenes.forEach((scene) => {
            const act = this.getAct(scene);
            const actPrefix = this.actToPrefix[act];
            if (!this.actToSceneIdToReadableId[act]) {
                this.actToSceneIdToReadableId[act] = {};
            }
            const id = `${actPrefix}${
                Object.keys(this.actToSceneIdToReadableId[act]).length
            }`;
            this.actToSceneIdToReadableId[act][scene] = id;
        });
    }
}

type ActToSceneIdToId = { [act: string]: { [sceneId: string]: string } };
