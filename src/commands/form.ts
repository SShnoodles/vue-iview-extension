import * as vscode from "vscode";
import { JavaParse } from '../models/java';
import * as formUtils from '../utils/formUtils';

export function execute() {
  vscode.window.showOpenDialog({canSelectFiles:true, canSelectMany:false, filters: {'Java': ['java']}}).then(files => {
    files = files as vscode.Uri[];
    vscode.workspace.openTextDocument(files[0].path).then(document => {
      const javaText: string = document.getText();
      let javaParse = new JavaParse(javaText);
      let javaBean = javaParse.parse();
      console.log(javaBean);
      let items = javaBean.variables.map(v => formUtils.of(v.name, v.comment, v.type));
      let template = formUtils.insert(items);
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(template));
      }
      vscode.window.showInformationMessage('Successful form code generation!');
    });
  });
}