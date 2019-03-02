import { EOL } from 'os';
import { SPACE } from '../models/template';

export function insert(form: string[], rules: string[]): string {
  return `<template>${EOL}` +
    `<div class="dialog" v-cloak>${EOL}` + 
    `${SPACE.S1}<div class="dialog-body">${EOL}` + 
    `${SPACE.S2}<iv-form ref="form" :model="formData" :rules="rules" :label-width="100">${EOL}` +
    `${form.join(`${EOL}`)}${EOL}` +
    `${SPACE.S2}</iv-form>${EOL}` +
    `${SPACE.S1}</div>${EOL}` +
    `${SPACE.S1}<div class="dialog-footer">${EOL}` + 
    `${SPACE.S2}<iv-button size="large" @click="cancel">取消</iv-button>${EOL}` + 
    `${SPACE.S2}<iv-button type="primary" size="large" @click="save">保存</iv-button>${EOL}` +
    `${SPACE.S1}</div>${EOL}` + 
    `</div>${EOL}` + 
    `</template>${EOL}${EOL}` +
    `<script>${EOL}` + 
    `export default {${EOL}` + 
    `${SPACE.S1}data() {${EOL}` + 
    `${SPACE.S2}return {${EOL}` + 
    `${SPACE.S3}formData: {},${EOL}` + 
    `${SPACE.S3}rules: {${EOL}` + 
    `${rules.join(`,${EOL}`)}${EOL}` + 
    `${SPACE.S3}}${EOL}` +
    `${SPACE.S2}}${EOL}` +
    `${SPACE.S1}},${EOL}` + 
    `${SPACE.S1}methods: {${EOL}` + 
    `${SPACE.S2}cancel() {${EOL}` + 
    `${SPACE.S3}view.close();${EOL}` + 
    `${SPACE.S2}},${EOL}` + 
    `${SPACE.S2}async save() {${EOL}` + 
    `${SPACE.S3}let valid = await this.\\$refs['form'].validate();${EOL}` + 
    `${SPACE.S3}if (!valid) return;${EOL}` + 
    `${SPACE.S3}let form = Object.assign({}, this.formData);${EOL}` + 
    `${SPACE.S3}let res = await http.post(\`/api/demo\`, { body: form });${EOL}` + 
    `${SPACE.S3}if (res.ok) {${EOL}` + 
    `${SPACE.S4}shell.newNotification({ title: "保存成功", type: "success" });${EOL}` + 
    `${SPACE.S4}view.close();${EOL}` +
    `${SPACE.S3}} else {${EOL}` +
    `${SPACE.S4}shell.newNotification({ title: "保存失败", type: "error" });${EOL}` +
    `${SPACE.S3}}${EOL}` +
    `${SPACE.S2}}${EOL}` +
    `${SPACE.S1}}${EOL}` +
    `}${EOL}` +
    `</script>`;
}