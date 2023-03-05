import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    if (count > 50) {
      amount = 50;
      alert("Maximum limit exceeded. Generating 50 paragraphs.");
    }

    setLoading(true);

    const apiUrl = `https://hipsum.co/api/?type=hipster-centric&paras=${amount}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setText(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-center">
      <h3>tired of boring lorem ipsum?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
