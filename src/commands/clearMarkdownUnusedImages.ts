import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { findUnusedImages } from '../utils/fileUtils';

export async function clearMarkdownUnusedImages() {
    vscode.window.showInformationMessage('Searching for unused images in markdown files...');

    const imagesMap = await findUnusedImages();

    const unusedImages = Object.keys(imagesMap).filter(imagePath => !imagesMap[imagePath]);
    const workspaceRootPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const unusedImagesDir = path.join(workspaceRootPath, "unused-images");

    if (!fs.existsSync(unusedImagesDir)) {
        fs.mkdirSync(unusedImagesDir);
    }

    for (const unusedImage of unusedImages) {
        const unusedImageName = path.basename(unusedImage);
        fs.renameSync(unusedImage, path.join(unusedImagesDir, unusedImageName));
        console.log(`Moved ${unusedImage} to ${unusedImagesDir}`);
    }

    vscode.window.showInformationMessage(`Moved ${unusedImages.length} unused images to ${unusedImagesDir}`);
}