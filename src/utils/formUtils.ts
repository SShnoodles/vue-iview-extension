export const Components: Map<string,string[]> = new Map([
  ["input", ["String", "Object"]],
  ["inputNumbser", ["Integer", "int", "Double", "double", "BigDecimal"]],
  ["datePicker", ["LocalDate", "OffsetDateTime"]],
  ["switch", ["Boolean", "boolean"]]
]);

function select(componentKey: string, key: string): string {
  if (componentKey === "input") {
    return `  <iv-input v-model="formData.${key}" style="width:90%" :maxlength="50" ></iv-input>`;
  } else if (componentKey === "inputNumbser") {
    return `  <iv-input-number v-model="formData.${key}" style="width:90%" :max="999999999" ></iv-input-number>`;
  } else if (componentKey === "datePicker") {
    return `  <iv-datepicker v-model="formData.${key}" format="yyyy-MM-dd" type="date"></iv-datepicker>`;
  } else if (componentKey === "switch") {
    return `  <iv-switch v-model="formData.${key}"></iv-switch>`;
  } else {
    return `  <iv-input v-model="formData.${key}" style="width:90%" :maxlength="50" ></iv-input>`;
  }
}

const enter = '\n';

export function of(key: string, name: string, component: string): string {
  return `  <iv-form-item label="${name}" prop="${key}">${enter}  ${component}${enter}  </iv-form-item>`;
}

export function insert(items: string[]): string {
  return `<iv-form ref="form" :model="formData" :rules="rules" :label-width="100">${enter}${items.join(`${enter}`)}${enter}</iv-form>`;
}

export function find(key: string, type: string): string {
  for (let [k, v] of Components) {
    if (v.includes(type)) {
      return select(k, key);
    }
  }
  return select('string', key);
}