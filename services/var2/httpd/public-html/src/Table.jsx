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
        header.map((h, key) => (<th key={key}>{h}</th>))
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

export default function Table({ header, data } = { data: [], header: [] }) {
  return (<div className="tbl-wrap">
    <table border="5" cellPadding={5} className="tbl">
      <Header header={header}/>
      <Body data={data} />
    </table>
  </div>)
}
