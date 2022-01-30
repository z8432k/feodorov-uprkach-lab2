import Form from "./Form";
import Grid from "./Grid";

const data = [
  [
    "Row 1 col 1", "Row 1 col 2"
  ],
  [
    "Row 2 col 1", "Row 2 col 2"
  ]
];


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
  coerceData(header, data)

  return (<>
    <Form />
    <Grid header={header} data={data} />
  </>);
}
