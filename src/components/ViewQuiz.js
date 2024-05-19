import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import app from "./firebase";
import { getDatabase, ref, get } from "firebase/database";

function QuizDetail() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const db = getDatabase(app);
        const quizRef = ref(db, `IndiVue/polls/${quizId}`);
        const snapshot = await get(quizRef);
        if (snapshot.exists()) {
          setQuiz(snapshot.val());
        } else {
          console.error("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <p>quiz</p>
      <h2>Quiz Name : {quiz.name}</h2>
      <p>Quiz Question : {quiz.question}</p>
      

      <ul>
        {quiz.options.map( (item, index) => (
          <>
            <li key={index}> 
             <p>Option:  {item}</p>   
              
            </li>

          </>

        ) )}
      </ul>

    </div>
  );
}

export default QuizDetail;
