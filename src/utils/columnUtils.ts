const enter = '\n';

export function of(key: string, name: string): string {
  return `  {${enter}    title: '${name}',${enter}    key: '${key}'${enter}  }`;
}

export function insert(items: string[]): string {
  return `columns: [${enter}${items.join(`,${enter}`)}${enter}]`;
}
