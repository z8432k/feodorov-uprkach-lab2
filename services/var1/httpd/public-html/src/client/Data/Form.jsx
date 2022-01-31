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

export default function Form() {
  const [init, setInit] = useState({
    source: [],
    target: [],
    klass: []
  });

  useEffect(() => {
    fetch("/cgi-bin/init.cgi")
      .then(resp => resp.json())
      .then(setInit);
  }, []);

  return (<div>
    <p>Введите поисковый запрос.</p>
    <form>
      <Select label="Откуда" options={init.source.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select label="Куда" options={init.target.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select label="Класс" options={init.klass.map(o => ({ label: o, value: o }))} />&nbsp;
      <Text label="Дата отправл." />&nbsp;
      <button>Поиск</button>
    </form>
  </div>);
}
