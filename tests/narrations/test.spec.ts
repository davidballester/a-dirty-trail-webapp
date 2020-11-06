import { SceneTemplateResolver } from 'a-dirty-trail/build';
import testNarrations from 'a-dirty-trail/build/testUtils/testNarrations';
import MyNarrationsCatalogue from './MyNarrationsCatalogue';
import MySceneTemplateResolver from './MySceneTemplateResolver';
jest.mock('./MySceneTemplateResolver');

const MySceneTemplateResolverActual = jest.requireActual(
    './MySceneTemplateResolver'
).default;

describe('narrations tests', () => {
    const mySceneTemplateResolverMock = (MySceneTemplateResolver as unknown) as jest.Mock;
    let instance: SceneTemplateResolver;
    mySceneTemplateResolverMock.mockImplementation((args) => {
        instance = new MySceneTemplateResolverActual({ ...args });
        jest.spyOn(instance, 'fetchScene');
        return instance;
    });
    const sceneTemplateResolver = new MySceneTemplateResolver();
    const narrationsCatalogue = new MyNarrationsCatalogue({
        sceneTemplateResolver,
    });
    const messages = [];

    testNarrations.bind(this)({
        narrationsCatalogue,
        getSceneTemplateResolverWithInstrumentedFetchScene: () => instance,
        log: (message: string) => {
            messages.push(message);
        },
    });

    afterAll(() => {
        process.stdout.write(messages.join('\r\n'));
    });
});
