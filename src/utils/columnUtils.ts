import { EOL } from 'os';
import { SPACE, JavaType } from '../models/template';

export function find(type: string, key: string): string {
  if (JavaType.LocalDate === type) {
    return `,${EOL}` +
      `${SPACE.S2}render(h, {row}) {${EOL}` + 
      `${SPACE.S3}return h('span', moment(row.${key}).format('YYYY-MM-DD'));${EOL}` +
      `${SPACE.S2}}${EOL}`;
  } else if (JavaType.OffsetDateTime === type) {
    return `,${EOL}` + 
      `${SPACE.S2}render(h, {row}) {${EOL}` + 
      `${SPACE.S3}return h('span', moment(row.${key}).format('YYYY-MM-DD HH:mm:ss'));${EOL}` +
      `${SPACE.S2}}${EOL}`;
  } else {
    return '';
  }
}

export function of(key: string, name: string, type: string): string {
  return `${SPACE.S1}{${EOL}${SPACE.S2}title: '${name}',${EOL}${SPACE.S2}key: '${key}'${find(type, key)}${EOL}${SPACE.S1}}`;
}

export function insert(items: string[]): string {
  return `columns: [${EOL}${items.join(`,${EOL}`)}${EOL}]`;
}

export function forTable(key: string, name: string, type: string): string {
  return `${SPACE.S4}{${EOL}` +
      `${SPACE.S5}title: '${name}',${EOL}` +
      `${SPACE.S5}key: '${key}'` +
      `${findForTable(type, key)}${EOL}` + 
      `${SPACE.S4}}`;
}

export function findForTable(type: string, key: string) {
  if (JavaType.LocalDate === type) {
    return `,${EOL}` +
      `${SPACE.S5}render(h, {row}) {${EOL}` + 
      `${SPACE.S6}return h('span', moment(row.${key}).format('YYYY-MM-DD'));${EOL}` +
      `${SPACE.S5}}${EOL}`;
  } else if (JavaType.OffsetDateTime === type) {
    return `,${EOL}` +
      `${SPACE.S5}render(h, {row}) {${EOL}` + 
      `${SPACE.S6}return h('span', moment(row.${key}).format('YYYY-MM-DD HH:mm:ss'));${EOL}` +
      `${SPACE.S5}}${EOL}`;
  } else {
    return '';
  }
}