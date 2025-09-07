"use client";
export default function filterError({ error }) {
  return (
    <div id="error">
      <h2>error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
