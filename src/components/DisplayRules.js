import React from 'react';

const DisplayRules = ({ rules }) => {
    return (
        <div>
            <h2>Existing Rules</h2>
            <ul>
                {rules.length > 0 ? (
                    rules.map((rule) => (
                        <li key={rule.id}>
                            <strong>ID:</strong> {rule.id} - <strong>Rule:</strong> {rule.rule_string}
                        </li>
                    ))
                ) : (
                    <p>No rules found</p>
                )}
            </ul>
        </div>
    );
};

export default DisplayRules;
