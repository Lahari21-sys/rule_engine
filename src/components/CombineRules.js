import React, { useState } from 'react';
import axios from 'axios';

function CombineRules({ rules }) {
  const [selectedRules, setSelectedRules] = useState([]);
  const [condition, setCondition] = useState('or');
  const [combinedRule, setCombinedRule] = useState(null);

  const handleCheckboxChange = (ruleId) => {
    setSelectedRules((prevSelected) => {
      if (prevSelected.includes(ruleId)) {
        return prevSelected.filter(id => id !== ruleId); // Remove rule if already selected
      } else {
        return [...prevSelected, ruleId]; // Add rule if not selected
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/combine_rules', {
        rule_ids: selectedRules.map(id => parseInt(id, 10)),
        condition: condition,
      });
      setCombinedRule(response.data.combined_rule);
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

  return (
    <div className="combine-rules">
      <h2>Combine Rules</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Condition:</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="or">OR</option>
            <option value="and">AND</option>
          </select>
        </div>
        <div>
          <label>Rules:</label>
          <div>
            {rules.map(rule => (
              <div key={rule.id}>
                <input
                  type="checkbox"
                  id={`rule-${rule.id}`}
                  value={rule.id}
                  checked={selectedRules.includes(rule.id)}
                  onChange={() => handleCheckboxChange(rule.id)}
                />
                <label htmlFor={`rule-${rule.id}`}>{rule.rule_string}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Combine Rules</button>
      </form>
      {combinedRule && (
        <div className="combined-rule">
          <h3>Combined Rule: {combinedRule}</h3>
        </div>
      )}
    </div>
  );
}

export default CombineRules;
