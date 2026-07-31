import { useState } from 'react'
import './App.css'

function App() {
  const [problems, setProblems] = useState([
    {
      ID: 1,
      name: 'Two Sum',
      solved: true
    },
    {
      ID: 2,
      name: 'Binary Search',
      solved: true
    },
    {
      ID:3,
      name: 'Merged Intervals',
      solved: false
    },
  ])
  const [newProblem, setNewProblem] = useState('');
  const [filter, setFilter] = useState('all');
  const [nextID, setNextId] = useState(4);
  const totalProblems = problems.length;
  const totalSolved = problems.filter(problem => problem.solved).length;
  const totalUnsolved = problems.filter(problem => !problem.solved).length;
  const completionPercentage = ((totalSolved/totalProblems) * 100).toFixed(1);
  function addProblem() {
    if (newProblem.trim() === '') {
      return;
    }
    setProblems([
      ...problems,
      {
        ID: nextID,
        name: newProblem,
        solved: false,
      },
    ]);
    setNextId(nextID + 1);
    setNewProblem('');
  }
  function deleteProblem(idToDelete: number) {
    setProblems(
      problems.filter((problem) => problem.ID !== idToDelete)
    );
  }
  function UpdateSolvedState(idToUpdate: number) {
    setProblems(
      problems.map((problem) => {
          if(idToUpdate === problem.ID) {
            return({
              ...problem,
              solved: !problem.solved
            });
          }
          return problem;
        }
      )
    );
  }
console.log('Current filter:', filter);
console.log("App rendered");
console.log(newProblem);
  return (
    <main className="container">
      <h1>Coding Tracker</h1>
      <input
      type="text"
      value={newProblem}
      onChange={(event) => setNewProblem(event.target.value)}
      />
      <button onClick={addProblem}>
        Add Problem
      </button>
      <div className="stats">
        <div>
        Total Problems: {totalProblems}
        </div>
        <div>
          Solved: {totalSolved}
        </div>
        <div>
          Unsolved: {totalUnsolved}
        </div>
        <div>
          Completion: {completionPercentage}%
        </div>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('solved')}>Solved</button>
          <button onClick={() => setFilter('unsolved')}>Unsolved</button>
        </div>
      </div>
      
      <ul>
        {problems.filter((problem) => {
          if(filter === 'all') {
            return true;
          } else if(filter === 'solved'){
            if(problem.solved) {
              return true;
            }
          } else if(filter === 'unsolved'){
            if(!problem.solved) {
              return true;
            }
          }
        }).map((problem) => (
          <li key={problem.ID}>
            <span>{problem.name}</span>
            {" "}
            <div className="problem-buttons">
              <button onClick={() => 
              {deleteProblem(problem.ID);}}> 
              Delete
              </button>
              {" "}
              <button onClick={() => {UpdateSolvedState(problem.ID)}}>
                {problem.solved ? "Solved" : "Unsolved"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App