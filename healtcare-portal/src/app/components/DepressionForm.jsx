import React, { useState } from 'react';
import Link from 'next/link';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';
import Navbar from '../components/Navbar';
import styles from './styles.module.css'; // Import your CSS module (styles.module.css)

export default function DepressionForm() {
  const [pos, setPos] = useState(0);
  const [data, setData] = useState('');
  const [submitButton, setSubmitButton] = useState(true);
  const [buttonClick, setButtonClick] = useState(true);
  const [displayResult, setDisplayResult] = useState(false);
  const [result, setResult] = useState();

  const initialValue = {};

  const [formData, setFormData] = useState(initialValue);

  var options = [
    'Did not apply to me at all',
    'Applied to me to some degree',
    'Applied to me to a considerable degree',
    'Applied to me most of the time',
  ];

  var questions = [
    { question: "I couldn't seem to experience any positive feeling at all.", type: 'text', name: 'q3' },
    { question: "I just couldn't seem to get going.", type: 'text', name: 'q5' },
    { question: 'I felt that I had nothing to look forward to.', type: 'email', name: 'q10' },
    { question: 'I feel sad lately', type: 'text', name: 'q13' },
    { question: "I felt that I had lost interest in just about everything.", type: 'text', name: 'q16' },

    { question: "I felt I wasn't worth much as a person.", type: 'text', name: 'q17' },
    { question: "I felt that life wasn't worthwhile.", type: 'text', name: 'q21' },

    { question: "I couldn't seem to get any enjoyment out of the things I did.", type: 'text', name: 'q24' },
    { question: 'I felt down-hearted and blue.', type: 'text', name: 'q26' },
    { question: 'I was unable to become enthusiastic about anything.', type: 'text', name: 'q31' },
    { question: 'I felt I was pretty worthless.', type: 'text', name: 'q34' },
    { question: 'I could see nothing in the future to be hopeful about.', type: 'text', name: 'q37' },
    { question: 'I felt that life was meaningless.', type: 'text', name: 'q38' },
    { question: 'I found it difficult to work up the initiative to do things.', type: 'text', name: 'q42' },
  ];

  function clickHandler(event) {
    event.preventDefault();

    pos === questions.length - 2 ? setSubmitButton(false) : setSubmitButton(true);
    pos < questions.length - 1 ? setPos(pos + 1) : setPos(0);

    setData('');
    setButtonClick(!buttonClick);
  }

  function handleChange(event) {
    setData(event.target.value);

    var { name, value } = event.target;
    console.log(name, value);
    value = options.indexOf(value);
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function reset() {
    setButtonClick(!buttonClick);
  }

  function submitHandler() {
    console.log(formData);

    const { q3, q5, q10, q13, q16, q17, q21, q24, q26, q31, q34, q37, q38, q42 } = formData;

    axios
      .post('http://localhost:5000/api/v1/ml/depression', {
        q3,
        q5,
        q10,
        q13,
        q16,
        q17,
        q21,
        q24,
        q26,
        q31,
        q34,
        q37,
        q38,
        q42,
      })
      .then((res) => {
        console.log(res);

        setResult(res.data.probabilityArray.answer);
        setDisplayResult(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      {displayResult ? (
        <>
          {result.map((key, val) => (
            <div className="infoDiabetic">
              <h2 className="text-orange font-BebasNeue text-7xl">{key}</h2>
              <h5 className="text-teal-500 text-base text-center">
                You have more power over depression than you may think!
              </h5>
              <div className="preventDiabetes w-1/2 mt-2 text-base">
                <p>
                  These tips can help you feel happier, healthier, and more hopeful.
                </p>
                <ul className="text-sm">
                  <li>Reach out and stay connected</li>
                  <li>Do things that make you feel good</li>
                  <li>Get moving</li>
                  <li>Eat a healthy, depression-fighting diet</li>
                  <li>Get a daily dose of sunlight</li>
                  <li>Challenge negative thinking</li>
                </ul>
                <p>
                  Seek professional help, needing additional help doesn’t mean you’re weak. Sometimes the negative thinking
                  in depression can make you feel like you’re a lost cause, but depression can be treated and you can feel
                  better!
                  Don’t forget about these self-help tips, though. Even if you’re receiving professional help, these tips
                  can be part of your treatment plan, speeding your recovery and preventing depression from returning.
                </p>
                <a href="https://www.helpguide.org/articles/depression/coping-with-depression.htm">know more...</a>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="fullFrame bg-cover bg-repeat-x bg-top h-screen">
          <div className="text-white text-4xl mt-3">Clinical Depression Prediction</div>
          <hr className="w-30 bg-orange border-3"></hr>

          <div className="center">
            <div id="register" className={`bg-white relative w-96 p-8 shadow-md transition-transform ${submitButton ? '' : 'close'}`}>
              <div className="flex flex-col">
                <div className="flex flex-row customLabel items-start">
                  <h1 className="text-sm mr-2">{pos + 1 + '/' + questions.length}</h1>
                  <label className="customLabel">{questions[pos].question}</label>
                </div>
                <div className="flex flex-row">
                  <select
                    className="custominputField p-2 border-b-3 border-solid border-blue-500 bg-transparent w-5/6"
                    name={questions[pos].name}
                    value={buttonClick ? data : ('', reset())}
                    onChange={handleChange}
                  >
                    <option>--select option--</option>
                    {options.map((key, val) => (
                      <option key={val}>{key}</option>
                    ))}
                  </select>

                  <button className="arrowButton border-none bg-white text-blue-500" onClick={clickHandler}>
                    <ArrowForwardIcon fontSize="large"></ArrowForwardIcon>
                  </button>
                </div>
                <div></div>
                {submitButton ? (
                  ''
                ) : (
                  <button className="customSubmitButton bg-orange rounded-full border-none p-2 text-white font-bold mt-4" onClick={submitHandler}>
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
