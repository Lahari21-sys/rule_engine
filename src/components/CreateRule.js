import React, { useState } from 'react';
import axios from 'axios';

function CreateRule({ setRules }) {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create_rule', { rule_string: ruleString });
      console.log(response.data);
      // Update the rules list after adding a new rule
      const rulesResponse = await axios.get('http://localhost:8000/rules');
      setRules(rulesResponse.data.rules);
      setRuleString('');
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  return (
    <div className="create-rule">
      <h2>Create Rule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule string"
          required
        />
        <button type="submit">Create Rule</button>
      </form>
    </div>
  );
}

export default CreateRule;
