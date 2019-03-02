import { EOL } from 'os';

export function insert(form: string[], columns: string[]): string {
  return `<template>${EOL}` +
    `<div class="vbox">${EOL}` +
    `  <header>${EOL}` +
    `    <iv-form inline :label-width="80">${EOL}` +
    `${form.join(`${EOL}`)}${EOL}` +
    `      <iv-form-item :label-width="20">${EOL}` +
    `        <iv-button type="primary" icon="ios-search" size="small" @click="search">查询</iv-button>${EOL}` +
    `        <iv-button type="success" icon="ios-add" size="small" @click="add">新增</iv-button>${EOL}` +
    `      </iv-form-item>${EOL}` +
    `    </iv-form>${EOL}` +
    `  </header>${EOL}` +
    `  <section>${EOL}` +
    `    <iv-table border :columns="columns" :data="items" size="small" :height="tableHeight"></iv-table>${EOL}` +
    `  </section>${EOL}` +
    `  <footer>${EOL}` +
    `    <iv-page show-total show-sizer size="small" :total="totalCount" :page-size="criteria.size" @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></iv-page>${EOL}` +
    `  </footer>${EOL}` +
    `</div>${EOL}` +
    `</template>${EOL}` +
    `${EOL}` +
    `<script>${EOL}` +
    `export default {${EOL}` +
    `  data() {${EOL}` +
    `    var vue = this;${EOL}` +
    `    return {${EOL}` +
    `      items: [],${EOL}` +
    `      totalCount: 0,${EOL}` +
    `      criteria: {page: 1, size: 10 },${EOL}` +
    `      tableHeight: 0,${EOL}` +
    `      columns: [${EOL}` +
    `        {${EOL}` +
    `          title: '操作',${EOL}` +
    `          width: 150,${EOL}` +
    `          render(h, {row}) {${EOL}` +
    `            return [${EOL}` +
    `              h('iv-button', { props: { size: "small", type: "primary"}, on: { "click": function () { vue.edit(row) } } }, "编辑"),${EOL}` +
    `              h('iv-button', { props: { size: "small", type: "error" }, on: { "click": function () { vue.delete(row) } } }, "删除")${EOL}` +
    `            ];${EOL}` +
    `          }${EOL}` +
    `        },${EOL}` +
    `        {${EOL}` +
    `          title: '序号',${EOL}` +
    `          type: 'index',${EOL}` +
    `          width: 70,${EOL}` +
    `          align: 'center',${EOL}` +
    `        },${EOL}` +
    `${columns.join(`,${EOL}`)}${EOL}` +
    `      ]${EOL}` +
    `    }${EOL}` +
    `  },${EOL}` +
    `  methods: {${EOL}` +
    `    async search() {${EOL}` +
    `      let res = await http.get({ path: '/api/demo', queryParams: this.criteria });${EOL}` +
    `      if (res.ok) {${EOL}` +
    `        this.totalCount = utils.getTotalCount(res.headers);${EOL}` +
    `        this.items = await res.json();${EOL}` +
    `      }${EOL}` +
    `    },${EOL}` +
    `    onPageChange(page) {${EOL}` +
    `      this.criteria.page = page;${EOL}` +
    `      this.search();${EOL}` +
    `    },${EOL}` +
    `    onPageSizeChange(size) {${EOL}` +
    `      this.criteria.size = size;${EOL}` +
    `      this.search();${EOL}` +
    `    },${EOL}` +
    `    async edit(item) {${EOL}` +
    `      let controller = await shell.openDialog({ url: \`/demo/edit?id=\\$\{item.id}\` });${EOL}` +
    `      await controller.closeResult;${EOL}` +
    `      this.search();${EOL}` +
    `    },${EOL}` +
    `    async add() {${EOL}` +
    `      let controller = await shell.openDialog({ url: \`/demo/new\` });${EOL}` +
    `      await controller.closeResult;${EOL}` +
    `      this.search();${EOL}` +
    `    },${EOL}` +
    `    async delete(item) {${EOL}` +
    `      let confirmed = await shell.confirm({ title: "确认删除", message: \`确定要删除\\$\{item.name}吗？\` });${EOL}` +
    `      if (!confirmed) return;${EOL}` +
    `      let res = await http.delete(\`/api/demo/\\$\{item.id}\`);${EOL}` +
    `      if (res.ok) {${EOL}` +
    `        shell.newNotification({ title: "删除成功", type: 'success' });${EOL}` +
    `        this.search();${EOL}` +
    `      } else {${EOL}` +
    `        shell.newNotification({ title: "删除成功", type: "error" });${EOL}` +
    `      }${EOL}` +
    `    }${EOL}` +
    `  },${EOL}` +
    `  mounted() {${EOL}` +
    `    this.tableHeight = document.querySelector('section').offsetHeight - 15;${EOL}` +
    `    this.search();${EOL}` +
    `  }${EOL}` +
    `}${EOL}` +
    `</script>`;
}
