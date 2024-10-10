# 欢迎使用 VS Code 扩展

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#welcome-to-your-vs-code-extension)

## What's in the folder 文件夹里有什么

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#whats-in-the-folder)

* This folder contains all of the files necessary for your extension.
* 该文件夹包含扩展所需的所有文件。
* `package.json` - this is the manifest file in which you declare your extension and command.package.json 
* 这是您在其中声明扩展和命令的清单文件。
* The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* 示例插件注册一个命令并定义其标题和命令名称。有了这些信息，VS Code 就可以在命令面板中显示该命令。它还不需要加载插件。
* `src/extension.ts` - this is the main file where you will provide the implementation of your command.src/extension.ts -
* 这是主文件，您将在其中提供命令的实现。
* The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call
* `registerCommand`.该文件导出一个函数activate ，该函数在第一次激活扩展程序时被调用（在本例中是通过执行命令）。在activate函数中，我们调用registerCommand 。
* We pass the function containing the implementation of the command as the second parameter to `registerCommand`.我们将包含命令实现的函数作为第二个参数传递给registerCommand 。

## Get up and running straight away立即起身奔跑

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#get-up-and-running-straight-away)

* Press `F5` to open a new window with your extension loaded.按F5打开一个已加载扩展程序的新窗口。
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.通过按（在 Mac 上按Ctrl+Shift+P或Cmd+Shift+P ）并输入Hello World从命令选项板运行命令。
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.在src/extension.ts内的代码中设置断点来调试扩展。
* Find output from your extension in the debug console.在调试控制台中查找扩展的输出。

## Make changes 做出改变

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#make-changes)

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.更改src/extension.ts中的代码后，您可以从调试工具栏重新启动扩展。
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.您还可以使用您的扩展重新加载（在 Mac 上按Ctrl+R或Cmd+R ）VS Code 窗口以加载更改。

## Explore the API 探索 API

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#explore-the-api)

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.打开文件就可以打开我们全套的API node_modules/@types/vscode/index.d.ts 。

## Run tests 运行测试

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#run-tests)

* Install the [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)安装扩展测试运行器
* Run the "watch" task via the **Tasks: Run Task** command. Make sure this is running, or tests might not be discovered.通过任务：运行任务命令运行“监视”任务。确保它正在运行，否则可能无法发现测试。
* Open the Testing view from the activity bar and click the Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`从活动栏中打开“测试”视图，然后单击“运行测试”按钮，或使用热键Ctrl/Cmd + ; A
* See the output of the test result in the Test Results view.在测试结果视图中查看测试结果的输出。
* Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder.更改src/test/extension.test.ts或在test文件夹中创建新的测试文件。
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.提供的测试运行程序将仅考虑与名称模式**.test.ts匹配的文件。
  * You can create folders inside the `test` folder to structure your tests any way you want.您可以在test文件夹内创建文件夹，以按照您想要的方式构建测试。

## Go further 走得更远

[](https://github.com/ltm0203/vscode-clear-markdown-unused-images/blob/main/vsc-extension-quickstart.md#go-further)

* [Follow UX guidelines](https://code.visualstudio.com/api/ux-guidelines/overview) to create extensions that seamlessly integrate with VS Code's native interface and patterns.遵循 UX 指南来创建与 VS Code 的本机界面和模式无缝集成的扩展。
* Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).通过捆绑扩展来减小扩展大小并缩短启动时间。
* [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.在 VS Code 扩展市场上发布您的扩展。
* Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).通过设置持续集成来自动化构建。
