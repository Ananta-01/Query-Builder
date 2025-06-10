import React, { useState } from 'react';
import { QueryGroup } from './types';
import Group from './Group';

export default function QueryBuilder() {
  const [rootGroup, setRootGroup] = useState<QueryGroup>({
    type: 'group',
    logic: 'AND',
    children: [],
  });

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    setOutput(JSON.stringify(rootGroup, null, 2));
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-testid="query-builder">
      <Group group={rootGroup} onChange={setRootGroup} data-testid="group-component" />

      <button
        data-testid="submit-button"
        onClick={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        ✅ Submit Query
      </button>

      {output && (
        <div style={{ marginTop: '20px' }} data-testid="output-container">
          <label htmlFor="query-output-textarea"><strong>Query Output:</strong></label>
          <div style={{ position: 'relative' }}>
            <textarea
              id="query-output-textarea"
              data-testid="output-textarea"
              rows={10}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              style={{ width: '100%', fontFamily: 'monospace', padding: '10px' }}
            />
            <button
              data-testid="copy-button"
              onClick={handleCopy}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              📋 Copy
            </button>
          </div>
          {copied && (
            <p style={{ color: 'green' }} data-testid="copied-message">
              Copied to clipboard ✅
            </p>
          )}
        </div>
      )}
    </div>
  );
}
