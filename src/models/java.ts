import * as vscode from "vscode";

export interface Variable {
  type: string;
  name: string;
  comment: string;
}

export interface JavaBean {
  className: string;
  comment: string;
  variables: Variable[];
}

export class JavaParse {
  private javaText: string;

  constructor(java: string) {
    this.javaText = java;
  }

  parse(): JavaBean {
    let bean = {} as JavaBean;
    let variables = [] as Variable[];
    // class
    let classNames = this.javaText.match(/class(.+?){/g);
    if (classNames) {
      let className = classNames[0].substring("class".length, classNames[0].length - 1).trim();
      bean.className = className;
      bean.comment = '';
    }
    // variables
    let attrs = this.javaText.match(/(private|public)?\s+(BigDecimal|OffsetDateTime|LocalDate|Integer|int|float|Float|boolean|Boolean|double|Double|String|Object)[A-Za-z0-9|\s|_]+;/g);
    if (attrs) {
      for (let attr of attrs) {
        attr = attr.trim();
        if(attr.indexOf("public") === 0){
          attr = attr.substring("public".length, attr.length - 1).trim();
        }else if(attr.indexOf("private") === 0){
          attr = attr.substring("private".length, attr.length - 1).trim();
        }else if(attr.indexOf("protected")){
          attr = attr.substring("protected".length, attr.length - 1).trim();
        }
        let type = attr.substring(0, attr.indexOf(" "));
        let name = attr.substring(attr.indexOf(" ")).trim();
        let comment = '';
        variables.push({type, name, comment});
      }
      bean.variables = variables;
    }
    // comments
    const comments = this.javaText.match(/[\u4e00-\u9fa5]+（[\u4e00-\u9fa5]+）|[\u4e00-\u9fa5]+\([\u4e00-\u9fa5]+\)|[\u4e00-\u9fa5]+/g);
    if (comments) {
      if (comments.length > 0 && comments.length >= bean.variables.length) {
        bean.comment = comments[0];
        bean.variables.forEach((v, i) => v.comment = comments[i + 1]);
      }
      if (comments.length < bean.variables.length) {
        vscode.window.showInformationMessage('Missing some comments!');
      }
    } else {
      vscode.window.showInformationMessage('Missing comments!');
    }
    return bean;
  }
}