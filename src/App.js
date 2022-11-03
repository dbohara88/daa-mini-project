import { useState } from 'react';
import './App.css';

function App() {
  const [string, setString] = useState('')
  const [pattern, setPattern] = useState('')
  const [naive, setNaive] = useState()
  const [Rabin, setRabin] = useState()
  const [naiveTime, setNaiveTime] = useState();
  const [rabinTime, setRabinTime] = useState();

  const naiveSearch = () => {
    let M = pattern.length;
    let N = string.length;
    for (let i = 0; i <= N - M; i++) {
      let j;
      for (j = 0; j < M; j++)
        if (string[i + j] !== pattern[j])
          break;
      if (j === M)
        setNaive(i);
    }
  }

  const RabinSearch = () => {
    let d = 256;
    let q = 101;
    let M = pattern.length;
    let N = string.length;
    let i, j;

    let p = 0;

    let t = 0;
    let h = 1;
    for (i = 0; i < M - 1; i++)
      h = (h * d) % q;

    for (i = 0; i < M; i++) {
      p = (d * p + pattern[i].charCodeAt()) % q;
      t = (d * t + string[i].charCodeAt()) % q;
    }

    for (i = 0; i <= N - M; i++) {

      if (p === t) {

        for (j = 0; j < M; j++) {
          if (string[i + j] != pattern[j])
            break;
        }

        if (j === M)
          setRabin(i);
      }

      if (i < N - M) {
        t = (d * (t - string[i].charCodeAt() * h) +
          string[i + M].charCodeAt()) % q;

        if (t < 0)
          t = (t + q);
      }
    }
  }

  const handleNaiveClick = () => {

    // const start = performance.now();
    // console.time('naive')
    naiveSearch();
    // const end = performance.now();
    // console.timeEnd('naive')

    // console.log(end - start)
    // setNaiveTime(end - start)
  }

  const handleRabinClick = () => {

    // const start = performance.now();
    // console.time('Rabin')

    RabinSearch();
    // const end = performance.now();
    // console.timeEnd('Rabin')

    // console.log(end - start)
    // setRabinTime(end - start)
  }

  const handleClick = () => {

    naiveSearch()

    RabinSearch()
  }


  return (
    <div className="App">
      <p>String is : {string}</p>
      <p>Pattern is : {pattern}</p>
      <p>Pattern found by naive at index : {naive}</p>
      <p>Pattern found by Rabin at index : {Rabin}</p>

      <input type="text" placeholder="Enter string" onChange={e => setString(e.target.value)} />
      <input type="text" placeholder="Enter Pattern" onChange={e => setPattern(e.target.value)} />

      <button onClick={handleNaiveClick}>Naive search</button>
      <button onClick={handleRabinClick}>Rabin search</button>



      {/* <button onClick={handleClick}> search</button> */}

      {/* <p>Execution time for Naive: {naiveTime} ms</p> */}
      {/* <p>Execution time for Rabin: {rabinTime} ms</p> */}
      {/* <p>hence Rabin is faster than naive by {naiveTime - rabinTime || 0}ms</p> */}
    </div >
  );
}

export default App;
