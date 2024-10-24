import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRules';
import './App.css';

function App() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    // Fetch all rules from the backend
    async function fetchRules() {
      try {
        const response = await axios.get('http://localhost:8000/rules');
        setRules(response.data.rules);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    }

    fetchRules();
  }, []);

  return (
    <div className="App">
      <h1>Rule Engine</h1>
      <CreateRule setRules={setRules} />
      <EvaluateRule rules={rules} />
      <CombineRules rules={rules} />
      <div className="rules-list">
        <h2>All Rules</h2>
        <ul>
          {rules.map(rule => (
            <li key={rule.id}>{rule.rule_string}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
