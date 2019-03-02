import * as vscode from "vscode";
import { JavaParse } from '../models/java';
import * as columnUtils from '../utils/columnUtils';

export function execute() {
  vscode.window.showOpenDialog({canSelectFiles:true, canSelectMany:false, filters: {'Java': ['java']}}).then(files => {
    files = files as vscode.Uri[];
    vscode.workspace.openTextDocument(files[0].path).then(document => {
      const javaText: string = document.getText();
      let javaParse = new JavaParse(javaText);
      let javaBean = javaParse.parse();
      console.log(javaBean);
      let items = javaBean.variables.map(variable => columnUtils.of(variable.name, variable.comment, variable.type));
      let template = columnUtils.insert(items);
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(template));
      }
      vscode.window.showInformationMessage('Successful columns code generation!');
    });
  });
}