import { Narration, Scene } from 'a-dirty-trail/build';
import Step from './Step';

const scenesAliases: { [id: string]: string } = {};

class Path {
    narration: Narration;
    initialSteps: Step[];
    sceneTrail: string;
    combatTrail: string;
    visits: { [id: string]: number };

    constructor({
        narration,
        sceneTrail = '',
        combatTrail = '',
        initialSteps = [],
    }: {
        narration: Narration;
        sceneTrail?: string;
        combatTrail?: string;
        initialSteps?: Step[];
    }) {
        this.narration = narration;
        this.sceneTrail = sceneTrail;
        this.combatTrail = combatTrail;
        this.initialSteps = initialSteps;
        this.visits = {};
    }

    getOutput(): string {
        return `${this.sceneTrail}\n${this.combatTrail}`;
    }

    addToTrail(scene: Scene, survivability?: number): void {
        const alias = this.getOrCreateSceneAlias(scene.getId());
        if (this.sceneTrail.endsWith(alias)) {
            return;
        }
        if (this.sceneTrail) {
            this.sceneTrail += ',';
        }
        this.sceneTrail += alias;
        if (survivability) {
            this.combatTrail += 'L' + survivability.toFixed(2);
        } else {
            this.combatTrail += '     ';
        }
        this.visits[scene.getId()] = (this.visits[scene.getId()] || 0) + 1;
        if (this.visits[scene.getId()] > 3) {
            throw new Error('loop detected');
        }
    }

    private getOrCreateSceneAlias(sceneId: string): string {
        const existingAlias = scenesAliases[sceneId];
        if (!!existingAlias) {
            return existingAlias;
        }
        const sceneAliasIndex = Object.keys(scenesAliases).length + 1;
        const sceneAlias = String(sceneAliasIndex).padStart(4, '0');
        scenesAliases[sceneId] = sceneAlias;
        return sceneAlias;
    }

    addToTrailCustom(string: string): void {
        this.sceneTrail += string;
    }
}

export default Path;

export function getPrintableSceneAliasesDictionary(): string {
    return Object.keys(scenesAliases).reduce(
        (output, sceneId) => `${output}\n${scenesAliases[sceneId]}: ${sceneId}`,
        ''
    );
}
