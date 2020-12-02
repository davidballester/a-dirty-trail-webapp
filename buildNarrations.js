const fs = require('fs');
const path = require('path');

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
    console.log(scenePath, prefix);
    const files = fs.readdirSync(scenePath);
    const pairedFiles = pairFiles(files);
    pairedFiles.forEach(({ yaml, md }) => {
        const yamlPath = path.join(scenePath, yaml);
        const mdPath = path.join(scenePath, md);
        buildScene(yamlPath, mdPath, prefix, outputFolderPath);
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
    const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
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

function buildSceneContent(yaml, md) {
    return `---
${yaml.trim()}
---

${md}`;
}
