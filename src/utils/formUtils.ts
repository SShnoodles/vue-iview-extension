import { EOL } from 'os';
import { SPACE, Component, JavaType } from '../models/template';

export const Components: Map<string,string[]> = new Map([
  [Component.Input, [JavaType.String, JavaType.Object]],
  [Component.InputNumbser, [JavaType.Integer, JavaType.int, JavaType.Double, JavaType.double, JavaType.BigDecimal]],
  [Component.DatePicker, [JavaType.LocalDate, JavaType.OffsetDateTime]],
  [Component.Switch, [JavaType.Boolean, JavaType.boolean]]
]);

function select(componentKey: string, key: string): string {
  if (componentKey === Component.Input) {
    return `  <iv-input v-model="formData.${key}" style="width:90%" :maxlength="50" clearable></iv-input>`;
  } else if (componentKey === Component.InputNumbser) {
    return `  <iv-input-number v-model="formData.${key}" style="width:90%" :max="999999999" ></iv-input-number>`;
  } else if (componentKey === Component.DatePicker) {
    return `  <iv-datepicker v-model="formData.${key}" format="yyyy-MM-dd" type="date" clearable></iv-datepicker>`;
  } else if (componentKey === Component.Switch) {
    return `  <iv-switch v-model="formData.${key}"></iv-switch>`;
  } else {
    return `  <iv-input v-model="formData.${key}" style="width:90%" :maxlength="50" ></iv-input>`;
  }
}

export function find(key: string, type: string): string {
  for (let [k, v] of Components) {
    if (v.includes(type)) {
      return select(k, key);
    }
  }
  return select('string', key);
}

export function of(key: string, name: string, type: string): string {
  return `  <iv-form-item label="${name}" prop="${key}">${EOL}  ${find(key, type)}${EOL}  </iv-form-item>`;
}

export function insert(items: string[]): string {
  return `<iv-form ref="form" :model="formData" :rules="rules" :label-width="100">${EOL}${items.join(`${EOL}`)}${EOL}</iv-form>`;
}

export function forDialog(key: string, name: string, type: string): string {
  return `${SPACE.S3}<iv-form-item label="${name}" prop="${key}">${EOL}${SPACE.S3}${find(key, type)}${EOL}${SPACE.S3}</iv-form-item>`;
}

