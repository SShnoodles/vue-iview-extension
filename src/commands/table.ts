import * as vscode from "vscode";
import { JavaParse } from '../models/java';
import * as columnUtils from '../utils/columnUtils';
import * as formUtils from '../utils/formUtils';
import * as tableUtils from '../utils/tableUtils';

export function execute() {
  vscode.window.showOpenDialog({canSelectFiles:true, canSelectMany:false, filters: {'Java': ['java']}}).then(files => {
    files = files as vscode.Uri[];
    vscode.workspace.openTextDocument(files[0].path).then(document => {
      const javaText: string = document.getText();
      let javaParse = new JavaParse(javaText);
      let javaBean = javaParse.parse();
      console.log(javaBean);
      let form = javaBean.variables.map(v => formUtils.forDialog(v.name, v.comment, v.type));
      let columns = javaBean.variables.map(v => columnUtils.forTable(v.name, v.comment, v.type));
      let template = tableUtils.insert(form, columns);
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(template));
      }
      vscode.window.showInformationMessage('Successful table code generation!');
    });
  });
}