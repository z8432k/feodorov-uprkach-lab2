function Row({ data: cells } = { data: [] }) {
  return (<tr>
    {
      cells.map((c, key) => (<td key={key}>{c}</td>))
    }
  </tr>);
}

function Header({ header } = { header: [] }) {
  return (<thead>
    <tr>
      {
        header.map((h, key) => (<th key={key}>{h.label}</th>))
      }
    </tr>
  </thead>);
}

function Body({ data }) {
  return (<tbody>
    {
      data.map((r, key) => (<Row key={key} data={r}/>))
    }
  </tbody>);
}

export default function Grid({ header, data } = { data: [], header: [] }) {
  return (<div>
    <table border="1" cellPadding={5}>
      <Header header={header}/>
      <Body data={data} />
    </table>
  </div>)
}
