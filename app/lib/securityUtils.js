/**
 * ============================================================================
 * DIGITAL SENTINEL SECURITY UTILITIES
 * ============================================================================
 * 
 * Military-grade cryptographic functions for password security analysis,
 * breach detection, and secure password generation.
 * 
 * Features:
 * - HIBP k-Anonymity breach checking (privacy-preserving)
 * - Cryptographic strength analysis with entropy calculations
 * - Secure random password generation (CSPRNG)
 * - Exponential backoff for robust API communication
 * - Cross-platform compatibility (Browser + Node.js)
 * 
 * Security Notes:
 * - Never transmits complete passwords to external services
 * - Uses cryptographically secure random number generation
 * - Implements proper error handling and graceful degradation
 * - Maintains zero-knowledge principles where possible
 * 
 * @version 2.1.0
 * @author Digital Sentinel Core Team
 * ============================================================================
 */

// ============================================================================
// BREACH DETECTION FUNCTIONS
// ============================================================================

/**
 * Synchronous breach check against common compromised passwords
 * Used as fallback when HIBP API is unavailable
 * 
 * @param {string} password - Password to check against known breaches
 * @returns {Object} Breach analysis result with status and messaging
 */
export function simulateBreachCheck(password) {
  // Input validation
  if (!password || typeof password !== 'string') {
    return {
      status: "INACTIVE",
      message: "No password provided for analysis",
      colorClass: "text-gray-400",
    };
  }

  /**
   * Curated list of commonly breached passwords
   * Source: Various security breach databases and common patterns
   */
  const compromisedPasswords = [
    "password", "123456", "qwerty", "secret", "iloveyou",
    "dragon", "access", "master", "welcome", "securepass123",
    "mysentinel", "admin", "letmein", "monkey", "123456789",
    "football", "1234567", "12345678", "12345", "1234567890"
  ];

  const normalizedPassword = password.toLowerCase().trim();
  const isCompromised = compromisedPasswords.includes(normalizedPassword);

  // Pattern detection for sequential or dictionary-based passwords
  const hasSequentialPattern = /^(abc|123|qwe|asd|zxc)/i.test(normalizedPassword);
  const isCommonPattern = normalizedPassword.length >= 8 && hasSequentialPattern;

  if (isCompromised) {
    return {
      status: "CRITICAL BREACH",
      message: "DANGER! This password was found in known data breaches. Change it IMMEDIATELY.",
      colorClass: "text-red-500",
      severity: "CRITICAL"
    };
  } else if (isCommonPattern) {
    return {
      status: "PATTERN WARNING",
      message: "Sequential or dictionary patterns are flagged by threat intelligence.",
      colorClass: "text-yellow-500",
      severity: "WARNING"
    };
  } else {
    return {
      status: "NO SAMPLE MATCH",
      message: "No exact match found in our sampled breach data.",
      colorClass: "text-green-500",
      severity: "SAFE"
    };
  }
}

/**
 * Privacy-preserving breach check using HIBP k-Anonymity API
 * Only transmits SHA-1 prefix (5 chars) to maintain privacy
 * 
 * @param {string} password - Password to check against HIBP database
 * @returns {Promise<Object>} Breach analysis with count and severity
 */
export async function checkBreachWithHIBP(password) {
  // Input validation and early return
  if (!password || typeof password !== 'string') {
    return {
      status: "INACTIVE",
      message: "Password required for breach analysis",
      colorClass: "text-gray-400",
      count: null,
      severity: "UNKNOWN"
    };
  }

  try {
    /**
     * SHA-1 Hash Computation
     * Uses platform-appropriate cryptographic APIs
     */
    let hashHex;
    if (globalThis.crypto?.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await globalThis.crypto.subtle.digest("SHA-1", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    } else {
      throw new Error("Web Crypto API is unavailable");
    }

    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);

    /**
     * HIBP API Request with Privacy Enhancements
     * - k-Anonymity model (only prefix sent)
     * - Response padding for traffic analysis resistance
     * - Proper User-Agent identification
     */
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: "GET",
      headers: {
        "Add-Padding": "true", // Privacy: uniform response sizes
        "User-Agent": "Digital-Sentinel/2.1.0 (https://github.com/digital-sentinel)",
      },
      signal: AbortSignal.timeout(10000) // 10-second timeout
    });

    if (!res.ok) {
      throw new Error(`HIBP API responded with HTTP ${res.status}`);
    }

    const responseBody = await res.text();
    const lines = responseBody.split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Find matching suffix in response (case-insensitive)
    const matchLine = lines.find((line) => {
      const [responseSuffix] = line.split(":");
      return responseSuffix.toUpperCase() === suffix.toUpperCase();
    });

    if (matchLine) {
      const [, countStr] = matchLine.split(":");
      const breachCount = parseInt(countStr || "0", 10);
      
      // Determine severity based on breach count
      let severity, message;
      if (breachCount > 10000) {
        severity = "CRITICAL";
        message = `CRITICAL: Password exposed in ${breachCount.toLocaleString()} breaches!`;
      } else if (breachCount > 1000) {
        severity = "HIGH";
        message = `HIGH RISK: Password found in ${breachCount.toLocaleString()} breaches.`;
      } else {
        severity = "MODERATE";
        message = `Password exposed in ${breachCount.toLocaleString()} breaches.`;
      }

      return {
        status: "BREACHED",
        message,
        colorClass: "text-red-500",
        count: breachCount,
        severity
      };
    }

    // No breaches found
    return {
      status: "SAFE",
      message: "No matches in HIBP breach database. ✅",
      colorClass: "text-green-500",
      count: 0,
      severity: "SAFE"
    };

  } catch (error) {
    console.error("HIBP Breach Check Failure:", error);
    
    return {
      status: "ERROR",
      message: "Breach verification service temporarily unavailable",
      colorClass: "text-yellow-500",
      count: null,
      severity: "UNKNOWN"
    };
  }
}

// ============================================================================
// PASSWORD STRENGTH ANALYSIS
// ============================================================================

/**
 * Comprehensive password strength analysis with entropy calculation
 * 
 * @param {string} password - Password to analyze
 * @returns {Object} Strength metrics and improvement feedback
 */
export function calculateStrength(password) {
  // Input validation
  if (!password || typeof password !== 'string') {
    return { 
      score: 0, 
      entropy: 0, 
      feedback: ["Password cannot be empty."] 
    };
  }

  const length = password.length;
  
  // Character set detection
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^a-zA-Z0-9\s]/.test(password);
  
  // Common pattern detection
  const hasRepeatedChars = /(.)\1{2,}/.test(password); // 3+ repeated chars
  const hasSequential = /(?:123|abc|qwe|asd|zxc)/i.test(password);
  const isCommonWord = /^(password|admin|welcome|qwerty|letmein)$/i.test(password);

  let charSetSize = 0;
  let feedback = [];

  // Character set analysis with size calculation
  if (hasLower) {
    charSetSize += 26;
  } else {
    feedback.push("Add lowercase letters (a-z)");
  }

  if (hasUpper) {
    charSetSize += 26;
  } else {
    feedback.push("Add uppercase letters (A-Z)");
  }

  if (hasNumbers) {
    charSetSize += 10;
  } else {
    feedback.push("Add numbers (0-9)");
  }

  if (hasSymbols) {
    charSetSize += 33; // Common symbol count
  } else {
    feedback.push("Add symbols (!@#$%^&*)");
  }

  // Length requirements
  if (length < 8) {
    feedback.push("Minimum 8 characters required");
  } else if (length < 12) {
    feedback.push("12+ characters recommended for modern security");
  } else if (length < 16) {
    feedback.push("16+ characters ideal for high-security applications");
  }

  // Pattern warnings
  if (hasRepeatedChars) {
    feedback.push("Avoid repeated characters (e.g., 'aaa')");
  }
  if (hasSequential) {
    feedback.push("Avoid sequential patterns (e.g., '123', 'abc')");
  }
  if (isCommonWord) {
    feedback.push("Avoid common dictionary words");
  }

  /**
   * Entropy Calculation: H = L * log2(N)
   * Where L = length, N = character set size
   */
  const entropy = charSetSize > 0 ? length * Math.log2(charSetSize) : 0;
  
  /**
   * Score Calculation (0-100):
   * - Base: Entropy normalized to 100
   * - Bonuses: Mixed character sets, sufficient length
   * - Penalties: Patterns, common words, short length
   */
  let score = Math.min(100, Math.floor(entropy / 1.5));

  // Apply penalties
  if (length < 8) score = Math.min(score, 10);
  else if (length < 12) score = Math.min(score, 60);
  if (hasRepeatedChars) score = Math.max(0, score - 15);
  if (hasSequential) score = Math.max(0, score - 10);
  if (isCommonWord) score = Math.max(0, score - 20);

  // Ensure score bounds
  score = Math.max(0, Math.min(100, score));

  return { 
    score, 
    entropy: Math.floor(entropy), 
    feedback: feedback.length > 0 ? feedback : ["✅ Excellent password strength!"] 
  };
}

/**
 * Estimates brute-force cracking time based on password entropy
 * 
 * @param {number} entropy - Password entropy in bits
 * @returns {Object} Human-readable crack time and possibilities
 */
export function simulateHackerTime(entropy) {
  const GUESSES_PER_SECOND = 1e12; // 1 trillion guesses/sec (modern GPU cluster)
  const possibilities = Math.pow(2, entropy);
  const timeInSeconds = possibilities / GUESSES_PER_SECOND;
  
  // Time constants for conversion
  const SECONDS_IN_YEAR = 31536000;
  const SECONDS_IN_MILLENNIUM = SECONDS_IN_YEAR * 1000;

  let crackTimeText;

  if (timeInSeconds < 1e-3) { // < 1 millisecond
    crackTimeText = "Instantly";
  } else if (timeInSeconds < 1) { // Milliseconds
    crackTimeText = (timeInSeconds * 1000).toFixed(2) + " Milliseconds";
  } else if (timeInSeconds < 60) { // Seconds
    crackTimeText = timeInSeconds.toFixed(2) + " Seconds";
  } else if (timeInSeconds < 3600) { // Minutes
    crackTimeText = (timeInSeconds / 60).toFixed(2) + " Minutes";
  } else if (timeInSeconds < 86400) { // Hours
    crackTimeText = (timeInSeconds / 3600).toFixed(2) + " Hours";
  } else if (timeInSeconds < SECONDS_IN_YEAR) { // Days
    crackTimeText = (timeInSeconds / 86400).toFixed(2) + " Days";
  } else if (timeInSeconds < SECONDS_IN_MILLENNIUM) { // Years
    crackTimeText = (timeInSeconds / SECONDS_IN_YEAR).toFixed(2) + " Years";
  } else { // Millennia and beyond
    crackTimeText = (timeInSeconds / SECONDS_IN_MILLENNIUM).toExponential(1) + " Millennia";
  }

  const possibilitiesText = possibilities > 1e6 ? 
    possibilities.toExponential(2) : 
    possibilities.toLocaleString();

  return { 
    crackTimeText, 
    possibilitiesText,
    isSecure: timeInSeconds > SECONDS_IN_YEAR // > 1 year considered secure
  };
}

// ============================================================================
// CRYPTOGRAPHIC PASSWORD GENERATION
// ============================================================================

/**
 * Generates cryptographically secure random passwords
 * Uses CSPRNG (Cryptographically Secure Pseudorandom Number Generator)
 * 
 * @param {number} length - Desired password length (8-64)
 * @param {Object} options - Character set configuration
 * @returns {string} Generated secure password
 */
export function generatePassword(
  length = 16, 
  options = { 
    lowercase: true, 
    uppercase: true, 
    numbers: true, 
    symbols: true 
  }
) {
  // Input validation
  if (length < 8 || length > 64) {
    throw new Error("Password length must be between 8 and 64 characters");
  }

  // Character set definitions
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  // Build character set based on options
  let charSet = "";
  if (options.lowercase) charSet += lower;
  if (options.uppercase) charSet += upper;
  if (options.numbers) charSet += numbers;
  if (options.symbols) charSet += symbols;

  // Validate at least one character set is selected
  if (charSet.length === 0) {
    throw new Error("At least one character type must be selected");
  }

  const charSetLength = charSet.length;
  let password = "";

  /**
   * Cryptographically Secure Random Generation
   * Uses platform-appropriate CSPRNG implementations
   */
  if (globalThis.crypto?.getRandomValues) {
    const randomValues = new Uint32Array(length);
    globalThis.crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charSetLength;
      password += charSet[randomIndex];
    }
  } else {
    throw new Error("Web Crypto API is unavailable");
  }

  // Final validation
  if (password.length !== length) {
    throw new Error("Password generation failed: length mismatch");
  }

  return password;
}

// ============================================================================
// RESILIENCE UTILITIES
// ============================================================================

/**
 * Robust retry mechanism with exponential backoff
 * 
 * @param {Function} func - Async function to execute
 * @param {number} maxRetries - Maximum retry attempts (default: 3)
 * @param {number} baseDelay - Base delay in ms (default: 1000)
 * @returns {Promise<any>} Result of the function execution
 */
export async function retryWithBackoff(
  func, 
  maxRetries = 3, 
  baseDelay = 1000,
  shouldRetry = () => true
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await func();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      
      if (isLastAttempt || !shouldRetry(error, attempt + 1)) {
        console.error(
          isLastAttempt
            ? `All ${attempt + 1} retry attempts failed:`
            : `Retry stopped after attempt ${attempt + 1}:`,
          error
        );
        throw error;
      }
      
      // Exponential backoff with jitter
      const delay = Math.pow(2, attempt) * baseDelay + Math.random() * 1000;
      console.warn(`Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached due to throw in loop
  throw new Error("Unexpected retry mechanism failure");
}