import React, { useState, useEffect, useCallback } from 'react';
import { calculateStrength, simulateHackerTime } from '../lib/securityUtils.js';

// =============================================
// DEFAULT STATE & CONSTANTS
// =============================================

/** Default analysis result structure */
const DEFAULT_RESULTS = {
  score: 0,
  entropy: 0,
  feedback: ["Enter a password to begin security audit."],
  crackTimeText: 'N/A',
  possibilitiesText: '0',
  breach: { 
    status: 'INACTIVE', 
    message: '---', 
    colorClass: 'text-gray-400' 
  },
};

// =============================================
// ICON COMPONENTS
// =============================================

const TimeIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const AdviceIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
  </svg>
);

const LoaderIcon = () => (
  <svg className="animate-spin h-5 w-5 mr-3 inline text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// =============================================
// MAIN COMPONENT
// =============================================

export default function PasswordAnalyzer() {
  // State declarations
  const [password, setPassword] = useState('');
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [adviceState, setAdviceState] = useState({ 
    isLoading: false, 
    advice: '', 
    sources: [],
    isFallback: false
  });

  // =============================================
  // PASSWORD ANALYSIS LOGIC
  // =============================================

  /**
   * Performs comprehensive password security analysis:
   * - Strength & entropy calculation
   * - Simulated crack time
   * - HIBP breach status check
   * 
   * @param {string} pass - Password to analyze
   */
  const analyzePassword = useCallback(async (pass) => {
    if (!pass) {
      setResults(DEFAULT_RESULTS);
      setAdviceState({ isLoading: false, advice: '', sources: [], isFallback: false });
      return;
    }

    // Calculate cryptographic strength metrics
    const { score, entropy, feedback } = calculateStrength(pass);
    const { crackTimeText, possibilitiesText } = simulateHackerTime(entropy);

    // Initialize breach result
    let breach = DEFAULT_RESULTS.breach;

    try {
      // Server-side HIBP API call (never sends raw password)
      const res = await fetch('/api/checkBreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass }),
      });

      if (!res.ok) throw new Error(`HIBP API responded with ${res.status}`);

      breach = await res.json();
    } catch (err) {
      console.error('🔒 HIBP Integration Error:', err);
      breach = { 
        status: 'ERROR', 
        message: 'Breach verification service unavailable.', 
        colorClass: 'text-yellow-500' 
      };
    }

    // Update analysis results
    setResults({ 
      score, 
      entropy, 
      feedback, 
      crackTimeText, 
      possibilitiesText, 
      breach 
    });

    // Reset AI advice state
    setAdviceState({ isLoading: false, advice: '', sources: [], isFallback: false });
  }, []);

  // Trigger analysis on password change
  useEffect(() => {
    analyzePassword(password);
  }, [password, analyzePassword]);

  // =============================================
  // UI HELPER FUNCTIONS
  // =============================================

  /**
   * Determines strength meter styling based on score
   * 
   * @param {number} score - Password strength score (0-100)
   * @returns {Object} Style properties and label
   */
  const getProgressStyle = (score) => {
    let color, strengthLabel, textClass;

    if (score < 25) {
      color = '#ef4444';
      strengthLabel = "Critically Weak";
      textClass = 'text-red-400';
    } else if (score < 50) {
      color = '#f59e0b';
      strengthLabel = "Weak";
      textClass = 'text-yellow-400';
    } else if (score < 75) {
      color = '#3b82f6';
      strengthLabel = "Moderate";
      textClass = 'text-secondary';
    } else {
      color = '#10b981';
      strengthLabel = "Excellent";
      textClass = 'text-accent';
    }

    return {
      width: `${score}%`,
      backgroundColor: color,
      label: strengthLabel,
      textClass: `text-sm mt-1 font-semibold transition-colors duration-300 ${textClass}`
    };
  };

  const progressStyle = getProgressStyle(results.score);

  /**
   * Fetches AI-powered security recommendations
   */
  const triggerSecurityAdvice = async () => {
    if (!password || adviceState.isLoading) return;

    setAdviceState({ isLoading: true, advice: '', sources: [], isFallback: false });

    try {
      const res = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: results.score,
          entropy: results.entropy,
          breachResult: results.breach,
          feedback: results.feedback,
        }),
      });

      if (!res.ok) throw new Error(`Advice API responded with ${res.status}`);

      const data = await res.json();
      setAdviceState({ 
        isLoading: false, 
        advice: data.advice, 
        sources: data.sources || [],
        isFallback: data.metadata?.model === 'FALLBACK'
      });
    } catch (err) {
      console.error('🤖 AI Advice API Error:', err);
      setAdviceState({ 
        isLoading: false, 
        advice: 'Security advisory service temporarily unavailable.', 
        sources: [],
        isFallback: true
      });
    }
  };

  /**
   * Renders security feedback list items
   * 
   * @returns {JSX.Element[]} List of feedback items
   */
  const renderFeedback = () => {
    const breach = results.breach;
    const listItems = [];

    // Breach warnings (highest priority)
    if (['BREACHED', 'CRITICAL BREACH'].includes(breach.status)) {
      listItems.push(
        <li key="breach-alert" className="text-red-500 font-bold">
          ⚠️ CRITICAL: {breach.message}
        </li>
      );
    }

    // Complexity feedback
    if (results.feedback.length > 0) {
      results.feedback.forEach((item, idx) => 
        listItems.push(
          <li key={idx} className="text-red-400">❌ {item}</li>
        )
      );
    } else if (!['BREACHED', 'CRITICAL BREACH'].includes(breach.status)) {
      listItems.push(
        <li key="success" className="text-green-400">
          ✅ Meets all complexity standards.
        </li>
      );
    }

    return listItems;
  };

  // =============================================
  // COMPONENT RENDER
  // =============================================

  return (
    <div id="tool-analyzer">
      {/* Header */}
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Analyzer: The Instant Security Audit
      </h3>

      <div className="max-w-xl mx-auto">
        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password (it stays on your device)"
          className="w-full p-4 rounded-lg bg-primary text-lg border-2 border-transparent focus:border-accent outline-none transition text-white"
        />

        {/* Strength Meter */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1 text-gray-400">
            Strength Score:
          </label>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-400 ease-in-out" 
              style={{ 
                width: progressStyle.width, 
                backgroundColor: progressStyle.backgroundColor 
              }}
            ></div>
          </div>
          <p className={progressStyle.textClass}>
            {password ? `${progressStyle.label} (${results.score}%)` : 'Start typing to audit...'}
          </p>
        </div>

        {/* Results Panel */}
        <div id="results-panel" className="mt-8 p-6 bg-primary rounded-lg shadow-inner border border-gray-700">
          <h4 className="text-xl font-bold mb-3 flex items-center text-red-400">
            <TimeIcon /> Compromise Deep Scan
          </h4>
          <p className={`text-lg font-semibold ${results.breach.colorClass}`}>
            {results.breach.message}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-gray-700 pt-4">
            <div>
              <p className="text-sm text-gray-400">Time to Crack (Modern System):</p>
              <p className="text-accent text-xl font-bold">{results.crackTimeText}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Possibilities (Keyspace):</p>
              <p className="text-xl font-bold text-white">{results.possibilitiesText}</p>
            </div>
          </div>

          {/* Complexity Feedback */}
          <h4 className="text-xl font-bold mt-6 mb-3 flex items-center text-secondary border-t border-gray-700 pt-4">
            <ListIcon /> Complexity Requirements
          </h4>
          <ul className="space-y-1 text-sm">
            {renderFeedback()}
          </ul>
        </div>

        {/* AI Advice Button */}
        <button
          onClick={triggerSecurityAdvice}
          className={`w-full bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-lg mt-6 transition duration-300 ${!password ? 'hidden' : ''}`}
          disabled={adviceState.isLoading}
        >
          {adviceState.isLoading ? 'Generating Advice...' : '✨ Get AI-Powered Security Advice'}
        </button>

        {/* AI Advice Panel */}
        {adviceState.advice && (
          <div className="mt-8 p-6 bg-primary rounded-lg shadow-inner border border-gray-700">
            <h4 className="text-xl font-bold mb-3 flex items-center text-accent">
              <AdviceIcon /> {adviceState.isFallback ? 'Security Advisor Guidance' : 'AI Security Advisor Response'}
            </h4>
            <div className="text-gray-300 space-y-3">
              {adviceState.isFallback && (
                <p className="text-amber-400 text-sm">
                  The AI model is unavailable; this is built-in security guidance.
                </p>
              )}
              {adviceState.isLoading && (
                <div className="text-center text-gray-400">
                  <LoaderIcon /> Analyzing risk profile...
                </div>
              )}
              <p>{adviceState.advice}</p>
              {adviceState.sources.length > 0 && (
                <div className="text-xs text-gray-500 mt-4 border-t border-gray-700 pt-3">
                  Source: {adviceState.sources.map((src, idx) => (
                    <a 
                      key={idx} 
                      href={src.uri} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary hover:text-blue-400 mr-2"
                    >
                      {src.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}