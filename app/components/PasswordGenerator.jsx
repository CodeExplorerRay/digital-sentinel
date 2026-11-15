import React, { useState, useCallback, useRef } from 'react';
import { generatePassword } from '../lib/securityUtils';

// =============================================
// ICON COMPONENTS
// =============================================

/**
 * Copy Icon SVG Component
 * Used for clipboard copy functionality
 */
const CopyIcon = () => (
    <svg className="w-5 h-5 text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l1.5-1.5M16 4l2 2m-2-2l-2 2M6 8V6a2 2 0 012-2h2m-2 2h8m-5 8V8"/>
    </svg>
);

/**
 * Generate Icon SVG Component
 * Visual indicator for password generation action
 */
const GenerateIcon = () => (
    <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
);

// =============================================
// CHECKBOX COMPONENT
// =============================================

/**
 * Reusable Checkbox Component for Character Set Options
 * 
 * @param {string} id - Unique identifier for the checkbox
 * @param {string} name - Option name for state management
 * @param {boolean} checked - Current checked state
 * @param {Function} onChange - Change handler callback
 * @param {string} label - Display label for the checkbox
 */
const LabelledCheckbox = ({ id, name, checked, onChange, label }) => (
    <label className="flex items-center space-x-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
        <input 
            type="checkbox" 
            id={id} 
            name={name}
            checked={checked} 
            onChange={() => onChange(name)} 
            className="form-checkbox h-5 w-5 text-accent rounded bg-gray-700 border-gray-600 focus:ring-accent focus:ring-2 transition"
        />
        <span className="select-none font-medium">{label}</span>
    </label>
);

// =============================================
// MAIN PASSWORD GENERATOR COMPONENT
// =============================================

/**
 * Password Generator Component
 * 
 * Features:
 * - Cryptographically secure password generation
 * - Customizable character sets and length
 * - One-click copy to clipboard
 * - Visual feedback for user actions
 * - Responsive design with accessibility support
 */
export default function PasswordGenerator() {
    // =============================================
    // STATE MANAGEMENT
    // =============================================

    /** @type {[number, Function]} Password length state (8-64 characters) */
    const [length, setLength] = useState(16);
    
    /** @type {[Object, Function]} Character set options state */
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    
    /** @type {[string, Function]} Generated password state */
    const [generatedPassword, setGeneratedPassword] = useState('');
    
    /** @type {[string, Function]} Copy feedback message state */
    const [copyMessage, setCopyMessage] = useState('');
    
    /** @type {React.MutableRefObject<number>} Timer reference for copy message timeout */
    const copyTimeoutRef = useRef(null);

    // =============================================
    // EVENT HANDLERS
    // =============================================

    /**
     * Toggles character set options
     * 
     * @param {string} name - Option name to toggle
     */
    const handleOptionChange = (name) => {
        setOptions(prev => {
            const newOptions = { ...prev, [name]: !prev[name] };
            
            // Validate at least one option remains selected
            const hasActiveOptions = Object.values(newOptions).some(Boolean);
            if (!hasActiveOptions) {
                console.warn('At least one character set must be selected');
                return prev; // Revert changes if no options selected
            }
            
            return newOptions;
        });
    };

    /**
     * Generates and displays a new cryptographically secure password
     * Uses useCallback to prevent unnecessary re-renders
     */
    const generateAndDisplayPassword = useCallback(() => {
        // Clear any existing copy messages
        setCopyMessage('');
        
        // Clear any pending timeouts
        if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
            copyTimeoutRef.current = null;
        }

        try {
            const newPassword = generatePassword(length, options);
            setGeneratedPassword(newPassword);
        } catch (error) {
            console.error('Password generation failed:', error);
            setGeneratedPassword('❌ Generation failed - try different options');
        }
    }, [length, options]);

    /**
     * Copies generated password to clipboard
     * Provides visual feedback and error handling
     */
    const copyPassword = async () => {
        if (!generatedPassword || generatedPassword.startsWith('❌')) return;

        try {
            await navigator.clipboard.writeText(generatedPassword);
            setCopyMessage('✅ Copied to Clipboard!');
            
            // Clear previous timeout if exists
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
            
            // Auto-clear message after 1.5 seconds
            copyTimeoutRef.current = setTimeout(() => {
                setCopyMessage('');
                copyTimeoutRef.current = null;
            }, 1500);
            
        } catch (err) {
            console.error('Clipboard copy failed:', err);
            setCopyMessage('❌ Copy failed - check permissions');
        }
    };

    // =============================================
    // RENDER LOGIC
    // =============================================

    return (
        <div id="tool-generator" className="animate-fade-in">
            {/* Component Header */}
            <h3 className="text-2xl font-bold mb-6 text-center text-white bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Generator: Forge High-Entropy Passwords
            </h3>
            
            <div className="max-w-xl mx-auto space-y-6">
                {/* Password Output Section */}
                <div className="flex items-stretch space-x-2">
                    <input 
                        type="text" 
                        value={copyMessage || generatedPassword} 
                        readOnly 
                        placeholder="Click 'Generate' to create a cryptographically secure password" 
                        className="flex-grow p-4 rounded-lg bg-primary text-lg font-mono border-2 border-gray-600 focus:border-accent outline-none transition cursor-text text-white placeholder-gray-400"
                        aria-label="Generated password"
                    />
                    <button 
                        onClick={copyPassword} 
                        className="p-4 bg-accent rounded-lg hover:bg-teal-500 active:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-300 focus:outline-none"
                        disabled={!generatedPassword || !!copyMessage || generatedPassword.startsWith('❌')}
                        aria-label="Copy password to clipboard"
                    >
                        <CopyIcon />
                    </button>
                </div>

                {/* Configuration Panel */}
                <div className="p-6 bg-primary rounded-lg border border-gray-700 space-y-4 shadow-lg">
                    <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-600 pb-2">
                        Cryptography Configuration
                    </h4>

                    {/* Character Set Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <LabelledCheckbox 
                            id="gen-uppercase" 
                            name="uppercase" 
                            checked={options.uppercase} 
                            onChange={handleOptionChange} 
                            label="A-Z" 
                        />
                        <LabelledCheckbox 
                            id="gen-lowercase" 
                            name="lowercase" 
                            checked={options.lowercase} 
                            onChange={handleOptionChange} 
                            label="a-z" 
                        />
                        <LabelledCheckbox 
                            id="gen-numbers" 
                            name="numbers" 
                            checked={options.numbers} 
                            onChange={handleOptionChange} 
                            label="0-9" 
                        />
                        <LabelledCheckbox 
                            id="gen-symbols" 
                            name="symbols" 
                            checked={options.symbols} 
                            onChange={handleOptionChange} 
                            label="!@#$" 
                        />
                    </div>

                    {/* Length Control */}
                    <div className="pt-4 border-t border-gray-600">
                        <label htmlFor="password-length" className="block text-sm font-medium mb-2 text-white">
                            Cryptographic Strength: <span id="length-value" className="text-accent font-bold">{length}</span> characters
                        </label>
                        <input 
                            type="range" 
                            id="password-length" 
                            min="8" 
                            max="64" 
                            value={length} 
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-accent"
                            aria-describedby="length-value"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Min (8)</span>
                            <span>Standard (16)</span>
                            <span>Maximum (64)</span>
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <button 
                    onClick={generateAndDisplayPassword} 
                    className="w-full bg-secondary hover:bg-blue-600 active:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition duration-300 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    aria-label="Generate new password"
                >
                    <GenerateIcon />
                    Generate High-Entropy Password
                </button>

                {/* Security Notice */}
                <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-primary rounded border border-gray-700">
                    🔒 <strong>Zero Knowledge Design:</strong> All password generation occurs locally in your browser. 
                    No data is transmitted to external servers.
                </div>
            </div>
        </div>
    );
}