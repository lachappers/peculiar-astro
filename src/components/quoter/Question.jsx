export default function Question({ question }) {
  console.log(question);
  let q = question;
  //   console.log(q);
  return (
    // (question && (
    <div className="quotey">
      <h2 className="col-span-full w-full">{q.name}</h2>
      <ol className="choices">
        {q.choices.map((choice) => (
          <li className="choice">{choice.name}</li>
        ))}
      </ol>
    </div>
    // )) || <h1>Loading...</h1>
  );
}
