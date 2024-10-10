import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * 查找工作区中未使用的图片。
 * 
 * 该方法会扫描工作区中的所有图片文件和 Markdown 文件，
 * 并检查每个 Markdown 文件中引用的图片路径。
 * 最后返回一个包含所有图片路径的对象，其中值为布尔值，
 * 表示该图片是否在任何 Markdown 文件中被引用。
 * 
 * @returns 一个包含所有图片路径的对象，其中值为布尔值，表示该图片是否在任何 Markdown 文件中被引用。
 */
export async function findUnusedImages() {
    // 查找工作区中的所有图片文件
    const images = await vscode.workspace.findFiles('**/*.{png,jpg,jpeg,gif,bmp,tiff,webp,svg}');
    // 创建一个对象来存储图片路径和它们的引用状态
    const imagesMap = images.reduce((acc, image) => {
        acc[image.fsPath] = false;
        return acc;
    }, {} as { [key: string]: boolean });

    // 查找工作区中的所有 Markdown 文件
    const markdowns = await vscode.workspace.findFiles('**/*.md');
    for (const markdown of markdowns) {
        // 打开每个 Markdown 文件并读取其内容
        const document = await vscode.workspace.openTextDocument(markdown);
        const text = document.getText();
        // 使用正则表达式查找 Markdown 文件中引用的图片路径
        const imagePaths = text.match(/!\[.*\]\((.*)\)/g);
        if (imagePaths) {
            imagePaths.forEach(imageRawPath => {
                // 忽略以 "http" 开头的外部图片链接
                if (imageRawPath.startsWith("http")) {
                    return;
                }
                // 提取图片路径
                let imagePath = imageRawPath.match(/!\[.*\]\((.*)\)/)![1];
                // 如果图片路径是绝对路径，则将其转换为工作区中的路径
                if (imagePath.startsWith("/")) {
                    const workspaceRootPath = vscode.workspace.workspaceFolders![0].uri.fsPath;
                    imagePath = path.join(workspaceRootPath, imagePath);
                } else {
                    // 如果图片路径是相对路径，则将其转换为相对于 Markdown 文件的路径
                    imagePath = path.join(path.dirname(markdown.fsPath), imagePath);
                }
                // 将图片路径标记为已引用
                imagesMap[imagePath] = true;
            });
        }
    }

    // 返回包含所有图片路径的对象，其中值为布尔值，表示该图片是否在任何 Markdown 文件中被引用
    return imagesMap;
}