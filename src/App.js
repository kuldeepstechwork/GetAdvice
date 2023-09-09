import { useEffect, useState } from "react";

export default function App() {
  const [advice, setadvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data.slip.advice);
      setadvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      you have read <strong>{props.count}</strong> pieces of advice.
    </p>
  );
}
