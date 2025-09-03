import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useCallback } from 'react';

// Debounce function to limit how often a function is called
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

function App() {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [dropZoneHighlight, setDropZoneHighlight] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (fileToUpload) => {
    const file = fileToUpload || selectedFile;
    if (!file) {
      setUploadStatus('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(`File uploaded: ${data.filename}`);
        setSelectedFile(null); // Clear selected file after upload
      } else {
        setUploadStatus('Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  const performSearch = useCallback(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
        console.error('Search failed.');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setSearchResults([]);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(performSearch, 500), [performSearch]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleAiQueryChange = (event) => {
    setAiQuery(event.target.value);
    // Clear previous AI answer while typing a new question
    if (aiAnswer) setAiAnswer(null);
  };

  const getAnswerFromAI = async () => {
    if (!aiQuery) {
      setAiAnswer(null);
      return;
    }
    // Reset UI for a fresh question
    setAiAnswer(null);
    setUploadStatus('');
    setSelectedFile(null);
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';

    setAiLoading(true);
    try {
      const response = await fetch('http://localhost:5000/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnswer(data);
      } else {
        setAiAnswer({ answer: 'Failed to get AI answer.', confidence: 0, enrichmentSuggestion: '' });
      }
    } catch (error) {
      console.error('Error getting AI answer:', error);
      setAiAnswer({ answer: 'Error connecting to AI service.', confidence: 0, enrichmentSuggestion: '' });
    } finally {
      setAiLoading(false);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDropZoneHighlight(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDropZoneHighlight(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDropZoneHighlight(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleUpload(droppedFiles[0]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>AI-Powered Knowledge Base</h1>

        <main>
          <h2>Document Upload</h2>
          <div 
            className={`drop-zone ${dropZoneHighlight ? 'highlight' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p>Drag 'n' drop some files here, or click to select files</p>
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
            <button onClick={() => document.getElementById('fileInput').click()}>Select File</button>
            {selectedFile && <>
              <p>Selected: {selectedFile.name}</p>
              <button onClick={() => handleUpload()}>Upload Document</button>
            </>}
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>

          <h2>Search Documents</h2>
          <div className="search-section">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Enter your search query"
            />
          </div>
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map(doc => (
                <div key={doc.id} className="document-result">
                  <h3>{doc.originalname}</h3>
                  <p>{doc.preview}</p>
                </div>
              ))
            ) : (
              searchQuery && <p>No results found for "{searchQuery}".</p>
            )}
          </div>

          <h2>Ask AI</h2>
          <div className="ai-query-section">
            <input 
              type="text" 
              value={aiQuery} 
              onChange={handleAiQueryChange} 
              placeholder="Ask the AI a question"
            />
            <button onClick={getAnswerFromAI} disabled={aiLoading}>
              {aiLoading ? 'Getting Answer...' : 'Get AI Answer'}
            </button>
          </div>
          {aiAnswer && (
            <div className="ai-answer">
              <h3>AI Answer:</h3>
              <p>{aiAnswer.answer}</p>
              <p>
                Confidence:
                <span className={`confidence-indicator ${aiAnswer.confidence > 0.7 ? 'confidence-high' : aiAnswer.confidence > 0.4 ? 'confidence-medium' : 'confidence-low'}`}>
                  {Math.round(aiAnswer.confidence * 100)}%
                </span>
              </p>
              {aiAnswer.enrichmentSuggestion && (
                <p>Suggestion: {aiAnswer.enrichmentSuggestion}</p>
              )}
            </div>
          )}

        </main>
      </header>
    </div>
  );
}

export default App;
