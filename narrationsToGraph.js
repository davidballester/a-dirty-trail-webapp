const fs = require('fs');
const path = require('path');
const metadataParser = require('markdown-yaml-metadata-parser');

narrationsToGraph();

function narrationsToGraph() {
    const narrationsList = getNarrationsList();
    narrationsList.forEach((narration) => {
        const narrationGraph = narrationToGraph(narration);
        writeGraphToFile(narration, narrationGraph);
    });
}

function getNarrationsList() {
    const listPath = path.join(__dirname, './public/narrations/list.json');
    const listContent = fs.readFileSync(listPath, 'utf-8');
    const list = JSON.parse(listContent);
    return list;
}

function narrationToGraph(narrationName) {
    const scenes = getScenes(narrationName);
    const nodes = scenesToNodes(scenes);
    const edges = scenesToEdges(scenes);
    const commonPrologue = getCommonPrologue();
    return `${commonPrologue}\n${nodes}\n${edges}`;
}

function getScenes(narrationName) {
    const narrationPath = path.join(
        __dirname,
        './public/narrations/',
        narrationName
    );
    const filesInNarrationFolder = fs.readdirSync(narrationPath);
    const scenesFiles = filesInNarrationFolder.filter(
        (file) => path.extname(file).toLowerCase() === '.md'
    );
    return scenesFiles.map((sceneFile) => getScene(narrationName, sceneFile));
}

function getScene(narrationName, sceneFile) {
    const sceneFilePath = path.join(
        __dirname,
        './public/narrations',
        narrationName,
        sceneFile
    );
    const sceneFileContent = fs.readFileSync(sceneFilePath, 'utf-8');
    const { metadata: sceneMetadata } = metadataParser(sceneFileContent);
    return sceneMetadata;
}

function scenesToNodes(scenes) {
    return scenes
        .map(
            (scene) =>
                `(${sanitizeNodeName(scene.id)}${
                    scene.id === 'index' ? ':Start' : ''
                })`
        )
        .join('\n');
}

function sanitizeNodeName(nodeName) {
    return nodeName.replace(/_/g, ' ');
}

function scenesToEdges(scenes) {
    return scenes
        .map((scene) => {
            const nextScenes = extractNextScenes(scene);
            return nextScenes.map(
                (nextScene) =>
                    `(${sanitizeNodeName(scene.id)})->(${sanitizeNodeName(
                        nextScene
                    )})`
            );
        })
        .reduce((allEdges, sceneEdges) => [...allEdges, ...sceneEdges], [])
        .join('\n');
}

function extractNextScenes(scene) {
    const actions = scene.actions;
    if (!actions || !Object.keys(actions).length) {
        return [];
    }
    const nextScenes = Object.keys(actions)
        .map((actionName) => extractNextScenesFromAction(actions[actionName]))
        .reduce(
            (allNextScenes, nextScenes) => [...allNextScenes, ...nextScenes],
            []
        )
        .filter(Boolean);
    return Array.from(new Set(nextScenes));
}

function extractNextScenesFromAction(object) {
    if (!object || typeof object !== 'object') {
        return [undefined];
    }
    if (object.nextSceneId) {
        return [object.nextSceneId];
    }
    return Object.keys(object)
        .map((objectKey) => extractNextScenesFromAction(object[objectKey]))
        .reduce(
            (allNextScenes, nextScenes) => [...allNextScenes, ...nextScenes],
            []
        );
}

function getCommonPrologue() {
    return ':Start #red';
}

function writeGraphToFile(narrationName, graph) {
    const graphPath = path.join(__dirname, `${narrationName}.graph`);
    fs.writeFileSync(graphPath, graph, { encoding: 'utf-8' });
}
