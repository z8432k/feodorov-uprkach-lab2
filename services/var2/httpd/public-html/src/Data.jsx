import { useEffect, useState } from "react";
import Form from "./Form";
import Grid from "./Table";


const header = [
  "Причал",
  "Корабль",
  "Прибыл",
  "Убыл"
];


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
    fetch("/cgi-bin/find.cgi", {
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
