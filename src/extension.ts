// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// 该模块“vscode”包含 VS Code 可扩展性 API
import * as vscode from 'vscode';
import { clearMarkdownUnusedImages } from './commands/clearMarkdownUnusedImages';
import * as nls from 'vscode-nls';
const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// 当您的扩展被激活时调用此方法
// 您的扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
// 使用控制台输出诊断信息(console.log)和错误(console.error)
// 这行代码只会在你的扩展被激活时执行一次
	console.log('Congratulations, your extension "clear-markdown-unused-images" is now active!');
		console.log('恭喜，您的扩展“clear-markdown-unused-images”现已激活！');
    console.log(localize('extension.activated', 'Congratulations, your extension "clear-markdown-unused-images" is now active!'));


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
// 该命令已在package.json文件中定义
// 现在用registerCommand提供命令的实现
// commandId参数必须与package.json中的command字段匹配

let disposable = vscode.commands.registerCommand('clear-markdown-unused-images.run', clearMarkdownUnusedImages);
    context.subscriptions.push(disposable);
 
}

// This method is called when your extension is deactivated
// 当您的扩展被停用时调用此方法

export function deactivate() { }