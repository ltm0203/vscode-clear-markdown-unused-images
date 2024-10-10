import * as vscode from 'vscode';
import { findUnusedImages } from '../utils/fileUtils';

export async function clearMarkdownUnusedImages() {
    	// The code you place here will be executed every time your command is executed
		//每次执行命令时都会执行您放置在这里的代码
    vscode.window.showInformationMessage('Searching for unused images in markdown files...');
		//正在 Markdown 文件中搜索未使用的图像...

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
                // filter network images
					//  过滤网络图像
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