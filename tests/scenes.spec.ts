import { Narration } from 'a-dirty-trail';
import Actor from 'a-dirty-trail/build/core/Actor';
import Health from 'a-dirty-trail/build/core/Health';
import Inventory from 'a-dirty-trail/build/core/Inventory';
import SkillSet from 'a-dirty-trail/build/core/SkillSet';
import MyNarrationsCatalogue from '../helpers/MyNarrationsCatalogue';
import MySceneTemplateResolver from '../helpers/MySceneTemplateResolver';
import fs from 'fs';
import path from 'path';
import fetchMock from 'jest-fetch-mock';

describe('scenes', () => {
    let sceneTemplateResolver: MySceneTemplateResolver;
    let narrations: Narration[];
    let actor: Actor;

    beforeEach(async () => {
        fetchMock.enableMocks();
        fetchMock.mockImplementation(
            (url: string): Promise<any> => {
                const filePath = path.join(__dirname, '../public', url);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                return Promise.resolve({
                    json: () => JSON.parse(fileContent),
                    text: () => fileContent,
                });
            }
        );
        sceneTemplateResolver = new MySceneTemplateResolver();
        const narrationsCatalogue = new MyNarrationsCatalogue({
            sceneTemplateResolver,
        });
        narrations = await narrationsCatalogue.fetchNarrations();
        actor = new Actor({
            name: 'Jane Doe',
            health: new Health({ current: 5, max: 5 }),
            inventory: new Inventory({}),
            skillSet: new SkillSet({}),
        });
    });

    it('all scenes are valid', async () => {
        const narrationsPromises = narrations.map(async (narration) => {
            const sceneIds = getSceneIds(narration.getTitle());
            const scenesPromises = sceneIds.map(async (sceneId) => {
                try {
                    await sceneTemplateResolver.fetchScene(
                        narration,
                        sceneId,
                        actor
                    );
                } catch (err) {
                    console.error(err);
                    fail(
                        `Unexpected error for ${narration.getTitle()} ${sceneId}: ${
                            err.message
                        }`
                    );
                }
            });
            return await Promise.all(scenesPromises);
        });
        await narrationsPromises;
    });
});

function getSceneIds(narrationTitle: string): string[] {
    const narrationPath = path.join(
        __dirname,
        '../public/narrations',
        narrationTitle
    );
    const sceneFiles = fs
        .readdirSync(narrationPath)
        .filter((fileName) => path.extname(fileName) === '.md');
    return sceneFiles.map((sceneFileName) =>
        sceneFileName.replace(path.extname(sceneFileName), '')
    );
}
