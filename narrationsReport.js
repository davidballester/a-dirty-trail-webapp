const fs = require('fs');
const path = require('path');
const metadataParser = require('markdown-yaml-metadata-parser');
const { Graph } = require('graphlib');

narrationsReport();

function narrationsReport() {
    const narrationsList = getNarrationsList();
    narrationsList.forEach(narrationReport);
}

function getNarrationsList() {
    const listPath = path.join(__dirname, './public/narrations/list.json');
    const listContent = fs.readFileSync(listPath, 'utf-8');
    const list = JSON.parse(listContent);
    return list;
}

function narrationReport(narrationName) {
    const graph = createGraph(narrationName);
    reportNarrationName(narrationName);
    reportStats(graph);
    reportSinks(graph);
}

function createGraph(narrationName) {
    const scenes = getScenes(narrationName);
    const nodes = getNodes(scenes);
    const edges = getEdges(scenes);
    const graph = new Graph();
    nodes.forEach((node) => graph.setNode(node.id, node.content));
    edges.forEach((edge) => graph.setEdge(edge.source, edge.target));
    return graph;
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
    return metadataParser(sceneFileContent);
}

function getNodes(scenes) {
    return scenes.map((scene) => ({
        id: scene.metadata.id,
        content: scene.content,
    }));
}

function getEdges(scenes) {
    return scenes
        .map((scene) => getEdgesForScene(scene))
        .reduce((allEdges, sceneEdges) => [...allEdges, ...sceneEdges], []);
}

function getEdgesForScene(scene) {
    const nextScenes = extractNextScenes(scene);
    return nextScenes.map((nextScene) => ({
        source: scene.metadata.id,
        target: nextScene,
    }));
}

function extractNextScenes(scene) {
    const actions = scene.metadata.actions;
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

function reportNarrationName(narrationName) {
    console.log('');
    console.log('');
    console.log(narrationName);
    console.log(new Array(narrationName.length).fill('=').join(''));
    console.log('');
}

function reportStats(graph) {
    console.log(`  Scenes count: ${graph.nodes().length}`);
    console.log(`  Words count: ${getWordCount(graph)}`);
    console.log('');
}

function getWordCount(graph) {
    return graph
        .nodes()
        .map((node) => graph.node(node))
        .reduce((wordCount, node) => wordCount + node.split(' ').length, 0);
}

function reportSinks(graph) {
    console.log('  Sinks');
    console.log('  -----');
    graph.sinks().forEach((node) => console.log(`    ${node}`));
}
