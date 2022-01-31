import { useRef } from "react";

function Select({label, options, selectRef} =  { label: "", options: [] }) {
  return (<label>
    {label}
    <select ref={selectRef}>
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

export default function Form({ fields, onSubmit }) {
  const fromRef = useRef();
  const toRef = useRef();
  const klassRef = useRef();

  function onFormSubmit(event) {
    event.preventDefault();

    onSubmit({
      source: fromRef.current.value,
      target: toRef.current.value,
      klass: klassRef.current.value
    });
  }

  return (<div>
    <p>Введите поисковый запрос.</p>
    <form>
      <Select selectRef={fromRef} label="Откуда" options={fields.source.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select selectRef={toRef} label="Куда" options={fields.target.map(o => ({ label: o, value: o }))} />&nbsp;
      <Select selectRef={klassRef} label="Класс" options={fields.klass.map(o => ({ label: o, value: o }))} />&nbsp;
      <button onClick={onFormSubmit}>Поиск</button>
    </form>
  </div>);
}
