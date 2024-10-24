import React, { useState } from 'react';
import axios from 'axios';

function EvaluateRule({ rules }) {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/evaluate_rule', {
        rule_id: parseInt(ruleId, 10),
        data: JSON.parse(data)
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setResult('Error evaluating rule');
    }
  };

  return (
    <div className="evaluate-rule">
      <h2>Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <select value={ruleId} onChange={(e) => setRuleId(e.target.value)} required>
          <option value="" disabled>Select rule</option>
          {rules.map(rule => (
            <option key={rule.id} value={rule.id}>{rule.rule_string}</option>
          ))}
        </select>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder='Enter data as JSON (e.g., {"age": 25})'
          required
        />
        <button type="submit">Evaluate Rule</button>
      </form>
      {result !== null && (
        <div className="result">
          <h3>Result: {result.toString()}</h3>
        </div>
      )}
    </div>
  );
}

export default EvaluateRule;
