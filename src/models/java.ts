interface Variable {
  type: string;
  name: string;
  comment: string;
}

interface JavaBean {
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
    return bean;
  }
}