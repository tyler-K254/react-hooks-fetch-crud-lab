import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  const handleDeleteQuestion = (deleteQuestion) => {
    const updateQuestions = questions.filter((question)=> question.id !== deleteQuestion.id) 
    setQuestions(updateQuestions)
  };

  const handlePatchQuestion = (updateQuestion) => {
    const updateQuestions = questions.map((question)=> {
      if (question.id === updateQuestion.id){
        return updateQuestion;
      }else{
        return question;
      }
    });
       
    setQuestions(updateQuestions)
  };

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <QuestionItem 
            key={question.id} 
            question={question}
            onUpdateQuestion = {handlePatchQuestion}
            onDeleteQuestion={handleDeleteQuestion} />
            <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
