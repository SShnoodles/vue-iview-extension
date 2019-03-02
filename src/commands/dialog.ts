import * as vscode from "vscode";
import { JavaParse } from '../models/java';
import * as ruleUtils from '../utils/ruleUtils';
import * as formUtils from '../utils/formUtils';
import * as dialogUtils from '../utils/dialogUtils';

export function execute() {
  vscode.window.showOpenDialog({canSelectFiles:true, canSelectMany:false, filters: {'Java': ['java']}}).then(files => {
    files = files as vscode.Uri[];
    vscode.workspace.openTextDocument(files[0].path).then(document => {
      const javaText: string = document.getText();
      let javaParse = new JavaParse(javaText);
      let javaBean = javaParse.parse();
      console.log(javaBean);
      let rules = javaBean.variables.map(v => ruleUtils.forDialog(v.name, v.comment, v.type));
      let forms = javaBean.variables.map(v => formUtils.forDialog(v.name, v.comment, v.type));

      let template = dialogUtils.insert(forms, rules);
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(template));
      }
      vscode.window.showInformationMessage('Successful rules code generation!');
    });
  });
}