import { useRef } from "react";

function loadData(data) {
  fetch("/cgi-bin/load.cgi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.parse(data))
  })
    .then(() => document.location.reload());
}

export default function Admin() {
  const inputRef = useRef();

  function onUpload(event) {
    event.preventDefault();
    const { current: { files: [ file ] } } = inputRef;

    file.text().then(loadData);
  }

  return (<section>
    <h2>Administration</h2>
    <hr />
    <form>
      <label>
        JSON data file &nbsp;
        <input ref={inputRef} type="file" />
      </label>
      <button onClick={onUpload}>Upload data</button>
    </form>
  </section>
  );
}
