import { useRef } from "react";

function Select({label, options, selectRef} =  { label: "", options: [] }) {
  return (<label>
    {label}&nbsp;
    <select ref={selectRef}>
      {
        options.map((o, key) => (<option key={key} value={o.value}>{o.label}</option>))
      }
    </select>
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
    <form>
      <div className="form-fields">
        <div className="form-field">
          <Select selectRef={fromRef} label="Откуда" options={fields.source.map(o => ({ label: o, value: o }))} />&nbsp;
        </div>
        <div className="form-field">
          <Select selectRef={toRef} label="Куда" options={fields.target.map(o => ({ label: o, value: o }))} />&nbsp;
        </div>
        <div className="form-field">
          <Select selectRef={klassRef} label="Класс" options={fields.klass.map(o => ({ label: o, value: o }))} />&nbsp;          
        </div>
        <div className="form-field">
          <button onClick={onFormSubmit}>Поиск</button>          
        </div>   
      </div>
    </form>
  </div>);
}
