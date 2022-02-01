import { useRef } from "react";

function Select({label, options, selectRef, hasEmpty} =  { label: "", options: [] }) {
  return (<label>
    {label}&nbsp;
    <select ref={selectRef} title={label}>
      {
        hasEmpty
          ? <option></option>
          : null
      }
      {
        options.map((o, key) => (<option key={key} value={o.value}>{o.label}</option>))
      }
    </select>
  </label>);
}

export default function Form({ fields, onSubmit }) {
  const korablRef = useRef();
  const prichalRef = useRef();

  function onFormSubmit(event) {
    event.preventDefault();

    onSubmit({
      korabl: korablRef.current.value,
      prichal: prichalRef.current.value,
    });
  }

  return (<div>
    <form>
      <div className="form-fields">
        <div className="form-field">
          <Select hasEmpty={true} selectRef={korablRef} label="Корабль" options={fields.korabl.map(o => ({ label: o, value: o }))} />&nbsp;
        </div>
        <div className="form-field">
          <Select hasEmpty={true} selectRef={prichalRef} label="Причал" options={fields.prichal.map(o => ({ label: o, value: o }))} />&nbsp;
        </div>
        <div className="form-field">
          <button onClick={onFormSubmit}>Поиск</button>
        </div>
      </div>
    </form>
  </div>);
}
