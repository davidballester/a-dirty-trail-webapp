import { SceneTemplateResolver } from 'a-dirty-trail';

class MySceneTemplateResolver extends SceneTemplateResolver {
    protected async fetchMarkdownSceneTemplate(
        narrationTitle: string,
        sceneId = 'index'
    ): Promise<string> {
        const sceneTemplateResponse = await fetch(
            `/narrations/${narrationTitle}/${sceneId}.md`
        );
        return sceneTemplateResponse.text();
    }
}

export default MySceneTemplateResolver;
