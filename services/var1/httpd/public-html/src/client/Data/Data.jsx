import { useEffect, useState } from "react";
import Form from "./Form";
import Grid from "./Grid";


const header = [
  {
    label: "Откуда"
  },
  {
    label: "Куда"
  },
  {
    label: "Когда"
  },
  {
    label: "Класс"
  },
  {
    label: "Дата"
  }
];

function coerceData(header = [], data = []) {
  const cnt = header.length;

  data.forEach((row) => {
    for (let i = 0; i < cnt; i++) {
      if (row[i] === undefined) {
        row[i] = "";
      }
    }
  });
}


export default function Data() {
  const [init, setInit] = useState({
    source: [],
    target: [],
    klass: [],
    rows: []
  });

  coerceData(header, init.rows)

  useEffect(() => {
    fetch("/cgi-bin/init.cgi")
      .then(resp => resp.json())
      .then(setInit);
  }, []);

  const fields = {
    ...init
  };
  delete fields.rows;

  function sendForm(data) {
    fetch("/cgi-bin/search.cgi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(rows => {
      setInit({
        ...init,
        rows
      });
    })
  }

  return (<>
    <Form fields={fields} onSubmit={sendForm} />
    <br />
    <Grid header={header} data={init.rows} />
  </>);
}
