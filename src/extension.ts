// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as form from './commands/form';
import * as columns from './commands/columns';
import * as rules from './commands/rules';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.iviewForm', () => form.execute()),
		vscode.commands.registerCommand('extension.iviewColumns', () => columns.execute()),
		vscode.commands.registerCommand('extension.iviewRules', () => rules.execute())
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
