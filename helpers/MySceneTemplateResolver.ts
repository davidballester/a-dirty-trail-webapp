import { SceneTemplateResolver } from 'a-dirty-trail';

class MySceneTemplateResolver extends SceneTemplateResolver {
    protected async fetchMarkdownSceneTemplate(
        narrationTitle: string,
        sceneTitle = 'index'
    ): Promise<string> {
        const sceneTemplateResponse = await fetch(
            `/narrations/${narrationTitle}/${sceneTitle}.md`
        );
        return sceneTemplateResponse.text();
    }
}

export default MySceneTemplateResolver;
