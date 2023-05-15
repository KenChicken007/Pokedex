export default function Page({ gotoNext, gotoPrev }) {
  return (
    <div className="btn">
      {gotoPrev && <button onClick={gotoPrev}>Previous</button>}
      {gotoNext && <button onClick={gotoNext}>Next</button>}
    </div>
  );
}
