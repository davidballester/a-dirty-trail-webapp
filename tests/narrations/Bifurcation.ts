import { Narration } from 'a-dirty-trail/build';
import Step from './Step';

interface Bifurcation {
    sceneTrail: string;
    combatTrail: string;
    narration: Narration;
    availableSteps: Step[];
}

export default Bifurcation;
