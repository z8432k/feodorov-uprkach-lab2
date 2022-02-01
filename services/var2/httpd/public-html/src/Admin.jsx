import { useRef } from "react";

function Text({ label, inputRef } = { label: "" }) {
  return (<label>
    <span>{label}</span>
    <input ref={inputRef}type="text" />
  </label>);
}

export default function Admin() {
  const korablRef = useRef();
  const prichalRef = useRef();
  const priblRef = useRef();
  const ublRef = useRef();

  function onSave(event) {
    event.preventDefault();

    const { current: { value: korabl } } = korablRef;
    const { current: { value: prichal } } = prichalRef;
    const { current: { value: pribl } } = priblRef;
    const { current: { value: ubl } } = ublRef;

    fetch("/cgi-bin/save.cgi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        korabl,
        prichal,
        pribl,
        ubl
      })
    })
      .then(() => document.location.reload());
  }

  return (<section>
    <h2>Manage</h2>
    <form>
      <div className="form-add-fields">
        <div className="form-add-field">
          <Text inputRef={korablRef} label="Корабль" />
        </div>
        <div className="form-add-field">
          <Text inputRef={prichalRef} label="Причал" />
        </div>
        <div className="form-add-field">
          <Text inputRef={priblRef} label="Прибыл" />
        </div>
        <div className="form-add-field">
        <Text inputRef={ublRef} label="Убыл" />
        </div>
        <div className="form-add-field">
          <button onClick={onSave}>Сохранить</button>
        </div>
      </div>
    </form>
  </section>
  );
}
