export const RulesType: Map<string,string[]> = new Map([
  ["string", ["String", "Object"]],
  ["number", ["Integer", "int", "Double", "double", "BigDecimal"]],
  ["date", ["LocalDate", "OffsetDateTime"]],
  ["boolean", ["Boolean", "boolean"]]
]);

const enter = '\n';

export function of(key: string, name: string, type: string): string {
  return `  ${key}: [${enter}    { required: true, message: '${name}不能为空', trigger: 'blur', type: '${type}' }${enter}  ]`;
}

export function insert(rules: string[]): string {
  return `rules: {${enter}${rules.join(`,${enter}`)}${enter}}`;
}

export function find(type: string): string {
  for (let [key, value] of RulesType) {
    if (value.includes(type)) {
      return key;
    }
  }
  return 'string';
}
