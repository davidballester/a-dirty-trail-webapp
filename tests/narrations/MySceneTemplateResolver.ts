import { SceneTemplateResolver } from 'a-dirty-trail';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFilePromisified = promisify(fs.readFile);

class MySceneTemplateResolver extends SceneTemplateResolver {
    protected fetchMarkdownSceneTemplate(
        narrationTitle: string,
        sceneTitle = 'index'
    ): Promise<string> {
        const sceneFilePath = path.join(
            __dirname,
            '../../public/narrations/',
            narrationTitle,
            `${sceneTitle}.md`
        );
        return readFilePromisified(sceneFilePath, { encoding: 'utf-8' });
    }
}

export default MySceneTemplateResolver;
