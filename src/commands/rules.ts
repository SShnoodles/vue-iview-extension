import * as vscode from "vscode";
import { JavaParse } from '../models/java';
import * as ruleUtils from '../utils/ruleUtils';

export function execute() {
  vscode.window.showOpenDialog({canSelectFiles:true, canSelectMany:false, filters: {'Java': ['java']}}).then(files => {
    files = files as vscode.Uri[];
    vscode.workspace.openTextDocument(files[0].path).then(document => {
      const javaText: string = document.getText();
      let javaParse = new JavaParse(javaText);
      let javaBean = javaParse.parse();
      console.log(javaBean);
      let rules = javaBean.variables.map(v => ruleUtils.of(v.name, v.comment, v.type));
      let ruleTemplate = ruleUtils.insert(rules);
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.insertSnippet(new vscode.SnippetString(ruleTemplate));
      }
      vscode.window.showInformationMessage('Successful rules code generation!');
    });
  });
}