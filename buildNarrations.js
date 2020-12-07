const fs = require('fs');
const path = require('path');
const { snakeCase, capitalize } = require('lodash');

buildNarrations();

function buildNarrations() {
    const narrationsListPath = path.join(
        __dirname,
        'public/narrations',
        'list.json'
    );
    const narrationsListRaw = fs.readFileSync(narrationsListPath, 'utf-8');
    const narrationsList = JSON.parse(narrationsListRaw);
    narrationsList.forEach(buildNarration);
}

function buildNarration(narrationTitle) {
    const narrationPath = path.join(
        __dirname,
        'public/narrations',
        narrationTitle
    );
    deleteTopLevelNarrationFiles(narrationPath);
    const folders = fs
        .readdirSync(narrationPath)
        .filter((folderName) => isFolder(path.join(narrationPath, folderName)));
    folders.forEach((folderName) => {
        const folderPath = path.join(narrationPath, folderName);
        buildScenes(folderPath, folderName, narrationPath);
    });
}

function deleteTopLevelNarrationFiles(narrationPath) {
    const files = fs.readdirSync(narrationPath);
    files.forEach((file) => {
        const extension = getFileExtension(file);
        if (extension === 'md') {
            const filePath = path.join(narrationPath, file);
            fs.unlinkSync(filePath);
        }
    });
}

function getFileExtension(file) {
    const extension = path.extname(file);
    return extension.substring(1);
}

function isFolder(folderPath) {
    const stats = fs.statSync(folderPath);
    return stats.isDirectory();
}

function buildScenes(scenePath, prefix, outputFolderPath) {
    console.log(scenePath);
    const files = fs.readdirSync(scenePath);
    const pairedFiles = pairFiles(files);
    pairedFiles.forEach(({ yaml, md }) => {
        try {
            const yamlPath = path.join(scenePath, yaml);
            const mdPath = path.join(scenePath, md);
            buildScene(yamlPath, mdPath, prefix, outputFolderPath);
        } catch (err) {
            console.error('Error building scene', yaml, md);
            throw err;
        }
    });
}

function pairFiles(files) {
    return files.reduce((pairedFiles, file) => {
        const extension = getFileExtension(file);
        const fileNameWithoutExtension = getFileNameWithoutExtension(
            file,
            extension
        );
        return addToPairedFiles(
            pairedFiles,
            fileNameWithoutExtension,
            extension
        );
    }, []);
}

function getFileNameWithoutExtension(file, extension) {
    const extensionIndex = file.indexOf(extension);
    return file.substring(0, extensionIndex - 1);
}

function addToPairedFiles(pairedFiles, fileNameWithoutExtension, extension) {
    let existingPairedFilesEntry = pairedFiles.find(
        ({ id }) => id === fileNameWithoutExtension
    );
    if (!existingPairedFilesEntry) {
        existingPairedFilesEntry = { id: fileNameWithoutExtension };
        pairedFiles.push(existingPairedFilesEntry);
    }
    existingPairedFilesEntry[
        extension
    ] = `${fileNameWithoutExtension}.${extension}`;
    return pairedFiles;
}

function buildScene(yamlPath, mdPath, prefix, outputFolderPath) {
    let yamlContent;
    try {
        yamlContent = fs.readFileSync(yamlPath, 'utf-8');
        yamlContent = completeYamlContent(yamlContent, yamlPath);
    } catch (err) {}
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const sceneContent = buildSceneContent(yamlContent, mdContent);
    let fileName = path.basename(mdPath);
    if (fileName === 'index.md') {
        fileName = `${prefix}.md`;
    } else {
        fileName = `${prefix}_${fileName}`;
    }
    const outputScenePath = path.join(outputFolderPath, fileName);
    fs.writeFileSync(outputScenePath, sceneContent, { encoding: 'utf-8' });
}

function completeYamlContent(yamlContent, yamlPath) {
    yamlContent = completeId(yamlContent, yamlPath);
    yamlContent = completeTitle(yamlContent, yamlPath);
    return yamlContent;
}

function completeId(yamlContent, yamlPath) {
    const fileName = path.basename(yamlPath);
    const extension = path.extname(fileName);
    const folderName = path.basename(path.dirname(yamlPath));
    const id =
        fileName === 'index.yaml'
            ? folderName
            : `${folderName}_${fileName.replace(extension, '')}`;
    return `id: ${id}
${yamlContent}
`;
}

function completeTitle(yamlContent, yamlPath) {
    const folderName = path.basename(path.dirname(yamlPath));
    const title = capitalize(snakeCase(folderName).replace('_', ' '));
    return `title: ${title}
${yamlContent}
`;
}

function buildSceneContent(yaml, md) {
    if (!yaml) {
        return md;
    }
    return `---
${yaml.trim()}
---

${md}`;
}
