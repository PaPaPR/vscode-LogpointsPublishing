// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as dgram from 'dgram';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(vscode.commands.registerCommand('extension.start', () => {
        context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('cppdbg', {
            createDebugAdapterTracker(session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
                return new MyDebugAdapterTracker();
            }
        }));
    }));

    context.subscriptions.push(vscode.commands.registerCommand('extension.stop', () => {
        context.subscriptions.push();
    }));
}

// This method is called when your extension is deactivated
export function deactivate() {}

class MyDebugAdapterTracker implements vscode.DebugAdapterTracker {

    client = dgram.createSocket('udp4');
    PORT = 9870;
    HOST = '172.17.0.1';

    onWillStartSession(): void | Thenable<void> {
        console.log("Debug session is about to start...");
    }

    async onDidSendMessage(message: any): Promise<void> {
        if (!(message?.body?.category === "console" && message?.body?.output?.charAt(0) === "{")) {
            return;
        }
        this.client.send(message?.body?.output.trim(), this.PORT, this.HOST, (error: Error | null) => {
            if (error) {
              console.error(`PublishLogpoints: Error sending data: ${error.message}`);
            }
          });
    }

    onWillStopSession(): void | Thenable<void> {
        this.client.close();
    }
}