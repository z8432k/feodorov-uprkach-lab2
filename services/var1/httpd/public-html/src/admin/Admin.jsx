function onUpload() {
  console.log("Do upload.")
}

export default function Admin() {
  return (<section>
    <h2>Administration</h2>
    <hr />
    <button onClick={onUpload}>Upload data</button>
  </section>
  );
}
