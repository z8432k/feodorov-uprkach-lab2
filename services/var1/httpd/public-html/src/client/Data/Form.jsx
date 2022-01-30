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
  return (<div>
    <p>Введите поисковый запрос.</p>
    <form>
      <Select label="Откуда" options={[]} />&nbsp;
      <Select label="Куда" options={[]} />&nbsp;
      <Select label="Класс" options={[]} />&nbsp;
      <Text label="Дата отправл." />&nbsp;
      <button>Поиск</button>
    </form>
  </div>);
}
