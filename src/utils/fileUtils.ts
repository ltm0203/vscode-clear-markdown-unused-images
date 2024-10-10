import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';

export async function findUnusedImages() {
    const images = await vscode.workspace.findFiles('**/*.{png,jpg,jpeg,gif,bmp,tiff,webp,svg}');
    const imagesMap = images.reduce((acc, image) => {
        acc[image.fsPath] = false;
        return acc;
    }, {} as { [key: string]: boolean });

    const markdowns = await vscode.workspace.findFiles('**/*.md');
    for (const markdown of markdowns) {
        const document = await vscode.workspace.openTextDocument(markdown);
        const text = document.getText();
        const imagePaths = text.match(/!\[.*\]\((.*)\)/g);
        if (imagePaths) {
            imagePaths.forEach(imageRawPath => {
                if (imageRawPath.startsWith("http")) {
                    return;
                }
                let imagePath = imageRawPath.match(/!\[.*\]\((.*)\)/)![1];
                if (imagePath.startsWith("/")) {
                    const workspaceRootPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
                    imagePath = path.join(workspaceRootPath, imagePath);
                } else {
                    imagePath = path.join(path.dirname(markdown.fsPath), imagePath);
                }
                imagesMap[imagePath] = true;
            });
        }
    }

    return imagesMap;
}