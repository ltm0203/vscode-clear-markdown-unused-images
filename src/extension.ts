import * as vscode from 'vscode';
import path from 'path';
import fs from 'fs';
// 当您的扩展被激活时调用此方法
// 您的扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "clear-markdown-unused-images" is now active!');
	console.log('恭喜，您的扩展“clear-markdown-unused-images”现已激活！');

	// 该命令已在package.json文件中定义
// 现在用registerCommand提供命令的实现
// commandId参数必须与package.json中的command字段匹配
    let disposableClearAll = vscode.commands.registerCommand('clear-markdown-unused-images.run', async () => {
        vscode.window.showInformationMessage('Searching for unused images in markdown files...');
		//vscode.window.showInformationMessage('正在 Markdown 文件中搜索未使用的图像...');

        await clearUnusedImagesInWorkspace();
    });

    let disposableClearSingle = vscode.commands.registerCommand('clear-markdown-file-image.run', async (uri: vscode.Uri) => {
        if (uri && uri.fsPath.endsWith('.md')) {
            vscode.window.showInformationMessage(`Searching for unused images in ${uri.fsPath}...`);
            await clearUnusedImagesInFile(uri.fsPath);
        } else {
            vscode.window.showErrorMessage('Please select a Markdown file.');
        }
    });

    context.subscriptions.push(disposableClearAll);
    context.subscriptions.push(disposableClearSingle);
}

async function clearUnusedImagesInWorkspace() {
    const images = await vscode.workspace.findFiles('**/*.{png,jpg,jpeg,gif,bmp,tiff,webp,svg}');
    const imagesMap = createImagesMap(images);

    const markdowns = await vscode.workspace.findFiles('**/*.md');
    for (const markdown of markdowns) {
        await updateImagesMapFromMarkdown(markdown.fsPath, imagesMap);
    }

    await moveUnusedImages(imagesMap);
}

async function clearUnusedImagesInFile(markdownPath: string) {
    const images = await vscode.workspace.findFiles('**/*.{png,jpg,jpeg,gif,bmp,tiff,webp,svg}');
    const imagesMap = createImagesMap(images);

    await updateImagesMapFromMarkdown(markdownPath, imagesMap);

    await moveUnusedImages(imagesMap);
}

function createImagesMap(images: vscode.Uri[]): { [key: string]: boolean } {
    return images.reduce((acc, image) => {
        acc[image.fsPath] = false;
        return acc;
    }, {} as { [key: string]: boolean });
}

async function updateImagesMapFromMarkdown(markdownPath: string, imagesMap: { [key: string]: boolean }) {
    const document = await vscode.workspace.openTextDocument(markdownPath);
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
                imagePath = path.join(path.dirname(markdownPath), imagePath);
            }
            imagesMap[imagePath] = true;
        });
    }
}

async function moveUnusedImages(imagesMap: { [key: string]: boolean }) {
    const unusedImages = Object.keys(imagesMap).filter(imagePath => !imagesMap[imagePath]);

    const workspaceRootpath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const unusedImagesDir = path.join(workspaceRootpath, "unused-images");
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

export function deactivate() { }
    vscode.window.showInformationMessage(`Moved ${unusedImages.length} unused images to ${unusedImagesDir}`);
}

//// 当您的扩展被停用时调用此方法

export function deactivate() { }