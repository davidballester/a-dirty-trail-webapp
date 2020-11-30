import { Narration, SceneTemplateResolver } from 'a-dirty-trail/build';
import PathFinder from './PathFinder';
import MyNarrationsCatalogue from './MyNarrationsCatalogue';
import MySceneTemplateResolver from './MySceneTemplateResolver';
jest.mock('./MySceneTemplateResolver');

const MySceneTemplateResolverActual = jest.requireActual(
    './MySceneTemplateResolver'
).default;

jest.setTimeout(999999);

describe('narrations tests', () => {
    const mySceneTemplateResolverMock = (MySceneTemplateResolver as unknown) as jest.Mock;
    let sceneTemplateResolverInstance: SceneTemplateResolver;
    mySceneTemplateResolverMock.mockImplementation((args) => {
        sceneTemplateResolverInstance = new MySceneTemplateResolverActual({
            ...args,
        });
        jest.spyOn(sceneTemplateResolverInstance, 'fetchScene');
        return sceneTemplateResolverInstance;
    });
    const sceneTemplateResolver = new MySceneTemplateResolver();
    const narrationsCatalogue = new MyNarrationsCatalogue({
        sceneTemplateResolver,
    });

    let narrations: Narration[];
    beforeEach(async () => {
        narrations = await narrationsCatalogue.fetchNarrations();
    });

    it('works', async () => {
        for (let narration of narrations) {
            narration = await narrationsCatalogue.initializeNarration(
                narration
            );
            const pathFinder = new PathFinder({
                narration,
                getSceneTemplateResolver: () => sceneTemplateResolverInstance,
            });
            await pathFinder.explore();
            console.log(pathFinder.toString());
            expect(pathFinder.errors).toEqual([]);
        }
    });
});
