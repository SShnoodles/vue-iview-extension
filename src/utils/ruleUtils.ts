import { EOL } from 'os';
import { SPACE, JavaType } from '../models/template';

export const RulesType: Map<string,string[]> = new Map([
  ["string", [JavaType.String, JavaType.Object]],
  ["number", [JavaType.Integer, JavaType.int, JavaType.Double, JavaType.double, JavaType.BigDecimal]],
  ["date", [JavaType.LocalDate, JavaType.OffsetDateTime]],
  ["boolean", [JavaType.Boolean, JavaType.boolean]]
]);

export function find(type: string): string {
  for (let [key, value] of RulesType) {
    if (value.includes(type)) {
      return key;
    }
  }
  return 'string';
}

export function of(key: string, name: string, type: string): string {
  return `  ${key}: [${EOL}    { required: true, message: '${name} 必填', trigger: 'blur', type: '${find(type)}' }${EOL}  ]`;
}

export function insert(rules: string[]): string {
  return `rules: {${EOL}${rules.join(`,${EOL}`)}${EOL}}`;
}

export function forDialog(key: string, name: string, type: string): string {
  return `${SPACE.S4}${key}: [${EOL}` +
    `${SPACE.S5}{ required: true, message: '${name} 必填', trigger: 'blur', type: '${find(type)}' }${EOL}` +
    `${SPACE.S4}]`;
}