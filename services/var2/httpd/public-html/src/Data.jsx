import { useEffect, useState } from "react";
import Form from "./Form";
import Grid from "./Table";


export default function Data() {
  const [init, setInit] = useState({
    korabl: [],
    prichal: [],
    rows: []
  });

  useEffect(() => {
    fetch("/cgi-bin/main.cgi")
      .then(resp => resp.json())
      .then(setInit);
  }, []);

  const fields = {
    ...init
  };
  delete fields.rows;

  function sendForm(data) {
    const payload = {};

    if (data.korabl && data.korabl.length > 0) {
      payload.korabl = data.korabl
    }

    if (data.prichal && data.prichal.length > 0) {
      payload.prichal = data.prichal
    }

    fetch("/cgi-bin/find.cgi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(rows => {
      setInit({
        ...init,
        rows
      });
    })
  }

  const clearData  = init.rows.map(r => r.slice(1));
  const header = [
    "Причал",
    "Корабль",
    "Прибыл",
    "Убыл"
  ];

  return (<>
    <Form fields={fields} onSubmit={sendForm} />
    <Grid header={header} data={clearData} />
  </>);
}
