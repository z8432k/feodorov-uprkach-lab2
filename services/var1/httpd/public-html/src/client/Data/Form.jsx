import { useEffect, useState } from "react";

function Select({label, options} =  { label: "", options: [] }) {
  return (<label>
    {label}
    <select>
      {
        options.map((o, key) => (<option key={key} value={o.value}>{o.label}</option>))
      }
    </select>
  </label>);
}

function Text({ label } = { label: "" }) {
  return (<label>
    {label}
    <input type="text" />
  </label>);
}

export default function Form({ fields }) {
  return (<div>
    <p>Введите поисковый запрос.</p>
    <form>
      <Select label="Откуда" options={fields.source.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select label="Куда" options={fields.target.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select label="Класс" options={fields.klass.map(o => ({ label: o, value: o }))} />&nbsp;
      <button>Поиск</button>
    </form>
  </div>);
}
