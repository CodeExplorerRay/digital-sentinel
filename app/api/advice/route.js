import { NextResponse } from "next/server";
import { retryWithBackoff } from "@/lib/securityUtils";

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

/**
 * AI Security Advisor Configuration
 * Environment-based configuration with fallbacks for resilience
 */
const AI_CONFIG = {
  // Ollama Integration
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  MODEL_NAME: process.env.OLLAMA_MODEL || "qwen2.5:1.5b",
  
  // Performance & Resilience
  MAX_RETRIES: parseInt(process.env.AI_MAX_RETRIES) || 3,
  REQUEST_TIMEOUT: parseInt(process.env.AI_REQUEST_TIMEOUT) || 30000,
  
  // Learning System
  LEARNING_ENABLED: process.env.AI_LEARNING_ENABLED !== "true",
  FEEDBACK_LOGGING: process.env.AI_FEEDBACK_LOGGING === "true",
  
  // Adaptive Behavior
  TEMPERATURE_RANGE: { min: 0.7, max: 0.9 },
  CONTEXT_WINDOW: 10, // Number of interactions to maintain in context
};

/**
 * Security Advisory Knowledge Base
 * Curated cybersecurity principles for consistent, accurate advice
 */
const SECURITY_PRINCIPLES = {
  password_management: [
    "Use password managers to generate and store unique passwords",
    "Implement passphrase-based passwords for memorability and strength",
    "Enable biometric authentication where available",
    "Use hardware security keys for critical accounts"
  ],
  multi_factor: [
    "Enable time-based one-time passwords (TOTP) for all supported services",
    "Prefer authenticator apps over SMS-based 2FA due to SIM swap risks",
    "Use FIDO2/WebAuthn for phishing-resistant authentication",
    "Implement backup codes and store them securely"
  ],
  behavioral: [
    "Avoid password reuse across different services",
    "Be cautious of phishing attempts asking for credentials",
    "Regularly review account access and active sessions",
    "Use breach monitoring services for early detection"
  ],
  technical: [
    "Minimum 12-character passwords for standard security",
    "16+ characters for high-value accounts and administrative access",
    "Combine uppercase, lowercase, numbers, and symbols strategically",
    "Avoid predictable patterns and personal information"
  ]
};

/**
 * Adaptive Tone Profiles
 * Dynamically selected based on context and user interaction patterns
 */
const TONE_PROFILES = {
  educational: {
    tone: "patient and explanatory",
    style: "Uses analogies and clear explanations",
    useCase: "First-time users or basic security concepts"
  },
  tactical: {
    tone: "direct and action-oriented", 
    style: "Bullet points, clear commands, immediate steps",
    useCase: "Critical security issues or time-sensitive situations"
  },
  strategic: {
    tone: "analytical and forward-thinking",
    style: "Long-term planning, risk assessment, architecture",
    useCase: "Enterprise security or advanced users"
  },
  supportive: {
    tone: "encouraging and positive",
    style: "Positive reinforcement, achievable steps",
    useCase: "Users making progress or needing motivation"
  }
};

// ============================================================================
// INTELLIGENCE & LEARNING SYSTEMS
// ============================================================================

/**
 * Context-Aware Prompt Optimizer
 * Dynamically adjusts prompts based on interaction history and performance
 */
class PromptOptimizer {
  constructor() {
    this.interactionHistory = [];
    this.performanceMetrics = {
      highEngagement: [],
      lowEngagement: [],
      effectiveAdvice: [],
      ineffectiveAdvice: []
    };
  }

  /**
   * Analyzes password security context to determine optimal advisory approach
   * 
   * @param {Object} analysis - Password analysis results
   * @returns {Object} Optimized prompt configuration
   */
  analyzeContext(analysis) {
    const { score, entropy, breachResult, feedback = [] } = analysis;
    
    // Risk assessment
    const riskLevel = this.calculateRiskLevel(score, entropy, breachResult);
    
    // User sophistication estimation
    const userLevel = this.estimateUserSophistication(entropy, feedback);
    
    // Optimal tone selection
    const toneProfile = this.selectToneProfile(riskLevel, userLevel);
    
    // Prompt complexity adjustment
    const complexity = this.adjustComplexity(userLevel, riskLevel);

    return {
      riskLevel,
      userLevel, 
      toneProfile,
      complexity,
      priorityAreas: this.identifyPriorityAreas(analysis)
    };
  }

  /**
   * Calculates security risk level based on multiple factors
   */
  calculateRiskLevel(score, entropy, breachResult) {
    let riskScore = 0;
    
    // Score-based risk (40% weight)
    if (score < 25) riskScore += 40;
    else if (score < 50) riskScore += 20;
    else if (score < 75) riskScore += 10;
    
    // Entropy-based risk (30% weight)  
    if (entropy < 40) riskScore += 30;
    else if (entropy < 60) riskScore += 15;
    
    // Breach-based risk (30% weight)
    if (breachResult?.status === 'CRITICAL BREACH') riskScore += 30;
    else if (breachResult?.status === 'BREACHED') riskScore += 20;
    else if (breachResult?.status === 'PATTERN WARNING') riskScore += 10;

    if (riskScore >= 60) return 'CRITICAL';
    if (riskScore >= 40) return 'HIGH';
    if (riskScore >= 20) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Estimates user technical sophistication for tailored advice
   */
  estimateUserSophistication(entropy, feedback) {
    if (entropy > 80 && feedback.length === 0) return 'EXPERT';
    if (entropy > 60 || (feedback.length > 0 && feedback.length <= 2)) return 'INTERMEDIATE';
    return 'BEGINNER';
  }

  /**
   * Selects appropriate tone profile based on context
   */
  selectToneProfile(riskLevel, userLevel) {
    if (riskLevel === 'CRITICAL') return 'tactical';
    if (userLevel === 'EXPERT') return 'strategic';
    if (userLevel === 'BEGINNER') return 'educational';
    return 'supportive';
  }

  /**
   * Adjusts response complexity based on user level and risk
   */
  adjustComplexity(userLevel, riskLevel) {
    const baseComplexity = {
      BEGINNER: { depth: 'basic', examples: true, technical: false },
      INTERMEDIATE: { depth: 'moderate', examples: true, technical: true },
      EXPERT: { depth: 'advanced', examples: false, technical: true }
    };

    const complexity = baseComplexity[userLevel];
    
    // Increase urgency for high-risk situations
    if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
      complexity.urgency = 'high';
      complexity.depth = 'actionable'; // Focus on immediate steps
    }

    return complexity;
  }

  /**
   * Identifies priority security areas for focused advice
   */
  identifyPriorityAreas(analysis) {
    const priorities = [];
    const { score, entropy, breachResult, feedback = [] } = analysis;

    // Critical breaches take highest priority
    if (breachResult?.status === 'CRITICAL BREACH') {
      priorities.push('BREACH_MITIGATION');
    }

    // Very weak passwords need immediate strengthening
    if (score < 25) {
      priorities.push('FUNDAMENTAL_STRENGTH');
    }

    // Missing character types
    if (feedback.some(f => f.includes('Requires'))) {
      priorities.push('CHARACTER_VARIETY');
    }

    // Length issues
    if (feedback.some(f => f.includes('Length'))) {
      priorities.push('PASSWORD_LENGTH');
    }

    // Entropy concerns
    if (entropy < 50) {
      priorities.push('ENTROPY_IMPROVEMENT');
    }

    return priorities.length > 0 ? priorities : ['GENERAL_SECURITY'];
  }

  /**
   * Records interaction for continuous learning
   */
  recordInteraction(context, response, engagementMetrics = {}) {
    if (!AI_CONFIG.LEARNING_ENABLED) return;

    const interaction = {
      timestamp: new Date().toISOString(),
      context,
      responsePreview: response.substring(0, 100) + '...',
      engagementMetrics,
      performanceScore: this.calculatePerformanceScore(engagementMetrics)
    };

    this.interactionHistory.unshift(interaction);
    
    // Maintain context window
    if (this.interactionHistory.length > AI_CONFIG.CONTEXT_WINDOW) {
      this.interactionHistory.pop();
    }

    this.updatePerformanceMetrics(interaction);
  }

  /**
   * Calculates performance score for learning optimization
   */
  calculatePerformanceScore(metrics) {
    // Simple heuristic - can be enhanced with ML
    let score = 50; // Base score
    
    if (metrics.responseTime < 2000) score += 10;
    if (metrics.adviceLength > 100 && metrics.adviceLength < 500) score += 10;
    if (metrics.containsActionableSteps) score += 15;
    if (metrics.matchesToneProfile) score += 15;

    return Math.min(100, score);
  }

  /**
   * Updates performance metrics for adaptive learning
   */
  updatePerformanceMetrics(interaction) {
    if (interaction.performanceScore >= 70) {
      this.performanceMetrics.effectiveAdvice.push(interaction);
    } else {
      this.performanceMetrics.ineffectiveAdvice.push(interaction);
    }

    // Trim metrics arrays to prevent memory issues
    Object.values(this.performanceMetrics).forEach(metric => {
      if (metric.length > 100) metric.shift();
    });
  }
}

// ============================================================================
// AI RESPONSE GENERATION ENGINE
// ============================================================================

/**
 * Advanced AI Security Advisor with Self-Learning Capabilities
 */
class SecurityAdvisor {
  constructor() {
    this.optimizer = new PromptOptimizer();
    this.advicePatterns = new Set();
  }

  /**
   * Generates intelligent security advice with contextual awareness
   * 
   * @param {Object} analysis - Password security analysis data
   * @returns {Promise<Object>} AI-generated security advice
   */
  async generateAdvice(analysis) {
    const startTime = Date.now();

    try {
      // Context analysis and optimization
      const context = this.optimizer.analyzeContext(analysis);
      const promptConfig = this.buildDynamicPrompt(analysis, context);
      
      // Generate AI response
      const aiResponse = await this.queryAI(promptConfig);
      
      // Enhance with security principles
      const enhancedAdvice = this.enhanceWithKnowledge(aiResponse, context);
      
      // Calculate performance metrics
      const engagementMetrics = this.calculateEngagementMetrics(enhancedAdvice, startTime);
      
      // Record for learning
      this.optimizer.recordInteraction(context, enhancedAdvice, engagementMetrics);

      return {
        advice: enhancedAdvice,
        context: {
          riskLevel: context.riskLevel,
          userLevel: context.userLevel,
          tone: context.toneProfile,
          priorityAreas: context.priorityAreas
        },
        metadata: {
          responseTime: engagementMetrics.responseTime,
          adviceLength: engagementMetrics.adviceLength,
          model: AI_CONFIG.MODEL_NAME,
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('🔮 AI Security Advisor Error:', error);
      return this.generateFallbackAdvice(analysis);
    }
  }

  /**
   * Builds dynamic prompt based on context and learning
   */
  buildDynamicPrompt(analysis, context) {
    const toneProfile = TONE_PROFILES[context.toneProfile];
    const principles = this.selectRelevantPrinciples(context.priorityAreas);

    const systemPrompt = `
# AI Security Advisor Role
You are a ${toneProfile.tone} cybersecurity expert providing password security advice.
Your style should be: ${toneProfile.style}

# Core Security Principles to Reference:
${principles.map(p => `- ${p}`).join('\n')}

# Response Guidelines:
- Provide ${context.complexity.depth}-level advice
- ${context.complexity.examples ? 'Include practical examples' : 'Focus on conceptual understanding'}
- ${context.complexity.technical ? 'Use appropriate technical terms' : 'Avoid technical jargon'}
- ${context.complexity.urgency === 'high' ? 'Prioritize immediate action steps' : 'Balance immediate and long-term advice'}
- Be original and avoid clichéd security advice
- Structure response for clarity and actionability

# Learning Context:
${this.getLearningContext()}
    `.trim();

    const userPrompt = `
# Password Security Analysis:
- Strength Score: ${analysis.score}/100
- Entropy: ${analysis.entropy?.toFixed(2)} bits
- Breach Status: ${analysis.breachResult?.status}
- Security Weaknesses: ${analysis.feedback?.join('; ') || 'None identified'}
- Risk Assessment: ${context.riskLevel} risk level
- User Profile: ${context.userLevel} technical level

# Request:
Provide targeted security advice focusing on: ${context.priorityAreas.join(', ')}
    `.trim();

    return {
      systemPrompt,
      userPrompt,
      temperature: this.calculateDynamicTemperature(context),
      maxTokens: this.calculateResponseLength(context)
    };
  }

  /**
   * Selects relevant security principles based on priority areas
   */
  selectRelevantPrinciples(priorityAreas) {
    const selectedPrinciples = [];
    
    priorityAreas.forEach(area => {
      switch(area) {
        case 'BREACH_MITIGATION':
          selectedPrinciples.push(...SECURITY_PRINCIPLES.multi_factor);
          selectedPrinciples.push(...SECURITY_PRINCIPLES.behavioral);
          break;
        case 'FUNDAMENTAL_STRENGTH':
          selectedPrinciples.push(...SECURITY_PRINCIPLES.technical);
          selectedPrinciples.push(...SECURITY_PRINCIPLES.password_management);
          break;
        case 'CHARACTER_VARIETY':
          selectedPrinciples.push(...SECURITY_PRINCIPLES.technical);
          break;
        case 'PASSWORD_LENGTH':
          selectedPrinciples.push(...SECURITY_PRINCIPLES.technical);
          break;
        default:
          selectedPrinciples.push(...SECURITY_PRINCIPLES.password_management);
      }
    });

    // Remove duplicates and return unique principles
    return [...new Set(selectedPrinciples)].slice(0, 8); // Limit to top 8
  }

  /**
   * Calculates dynamic temperature for varied but consistent responses
   */
  calculateDynamicTemperature(context) {
    const baseTemp = AI_CONFIG.TEMPERATURE_RANGE.min;
    const range = AI_CONFIG.TEMPERATURE_RANGE.max - AI_CONFIG.TEMPERATURE_RANGE.min;
    
    // Higher temperature for beginners (more creative), lower for experts (more precise)
    const userModifier = context.userLevel === 'BEGINNER' ? 0.8 : 
                        context.userLevel === 'INTERMEDIATE' ? 0.5 : 0.2;
    
    // Higher temperature for low risk (more varied), lower for critical (more focused)
    const riskModifier = context.riskLevel === 'LOW' ? 0.7 :
                        context.riskLevel === 'MEDIUM' ? 0.5 :
                        context.riskLevel === 'HIGH' ? 0.3 : 0.1;

    return baseTemp + (range * (userModifier + riskModifier) / 2);
  }

  /**
   * Calculates appropriate response length based on context
   */
  calculateResponseLength(context) {
    const baseLength = 300;
    
    if (context.userLevel === 'BEGINNER') return baseLength;
    if (context.userLevel === 'INTERMEDIATE') return baseLength * 1.5;
    return baseLength * 2; // Expert users get more detailed advice
  }

  /**
   * Gets learning context from recent interactions
   */
  getLearningContext() {
    if (!AI_CONFIG.LEARNING_ENABLED || this.optimizer.interactionHistory.length === 0) {
      return "No previous context available. Provide foundational security advice.";
    }

    const recentEffective = this.optimizer.performanceMetrics.effectiveAdvice
      .slice(0, 3)
      .map(i => `Effective: ${i.responsePreview}`)
      .join('\n');

    return `Recent effective advice patterns:\n${recentEffective}`;
  }

  /**
   * Queries the AI model with optimized parameters
   */
  async queryAI(promptConfig) {
    const payload = {
      model: AI_CONFIG.MODEL_NAME,
      prompt: `${promptConfig.systemPrompt}\n\n${promptConfig.userPrompt}`,
      stream: false,
      options: {
        temperature: promptConfig.temperature,
        top_p: 0.9,
        top_k: 40,
        repeat_penalty: 1.1,
        num_predict: promptConfig.maxTokens,
      },
    };
    if (AI_CONFIG.MODEL_NAME.startsWith("qwen3")) {
      payload.think = false;
    }

    console.log('🔮 AI Request Payload:', JSON.stringify({
      model: payload.model,
      temperature: payload.options.temperature,
      maxTokens: payload.options.num_predict
    }, null, 2));

    const response = await retryWithBackoff(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.REQUEST_TIMEOUT);

      try {
        const res = await fetch(`${AI_CONFIG.OLLAMA_BASE_URL}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        if (!res.ok) {
          throw new Error(`Ollama API error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
      } catch (error) {
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    }, AI_CONFIG.MAX_RETRIES, 1000, error => error.name !== "AbortError");

    return response?.response?.trim() || "Unable to generate security advice at this time.";
  }

  /**
   * Enhances AI response with curated security knowledge
   */
  enhanceWithKnowledge(aiResponse, context) {
    // Remove any markdown formatting for clean text
    let cleanedResponse = aiResponse.replace(/[#*`]/g, '');
    
    // Ensure response addresses priority areas
    const missingAreas = context.priorityAreas.filter(area => 
      !cleanedResponse.toLowerCase().includes(area.toLowerCase().replace('_', ' '))
    );

    if (missingAreas.length > 0 && cleanedResponse.length < 400) {
      const additionalGuidance = this.generateAreaSpecificGuidance(missingAreas[0]);
      cleanedResponse += `\n\nAdditionally, for ${missingAreas[0].toLowerCase().replace('_', ' ')}: ${additionalGuidance}`;
    }

    return cleanedResponse.trim();
  }

  /**
   * Generates area-specific security guidance
   */
  generateAreaSpecificGuidance(area) {
    const guidance = {
      'BREACH_MITIGATION': 'Immediately change this password and enable multi-factor authentication on all accounts using it.',
      'FUNDAMENTAL_STRENGTH': 'Consider using a password manager to generate and store strong, unique passwords automatically.',
      'CHARACTER_VARIETY': 'Mix uppercase, lowercase, numbers, and symbols throughout the password, not just at the beginning or end.',
      'PASSWORD_LENGTH': 'Aim for at least 16 characters—length is one of the most important factors in password strength.',
      'ENTROPY_IMPROVEMENT': 'Increase randomness by avoiding predictable patterns, sequences, or personal information.'
    };

    return guidance[area] || 'Review and strengthen this password using security best practices.';
  }

  /**
   * Calculates engagement metrics for learning system
   */
  calculateEngagementMetrics(advice, startTime) {
    return {
      responseTime: Date.now() - startTime,
      adviceLength: advice.length,
      containsActionableSteps: /(step|action|enable|implement|use)/i.test(advice),
      matchesToneProfile: true, // Simplified - could be enhanced with NLP
      readabilityScore: this.calculateReadability(advice)
    };
  }

  /**
   * Simple readability calculation (Flesch-like)
   */
  calculateReadability(text) {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const syllables = text.toLowerCase().replace(/[^a-z]/g, '').length * 0.4; // Approximation
    
    if (sentences === 0 || words === 0) return 0;
    
    return Math.max(0, Math.min(100, 
      206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    ));
  }

  /**
   * Fallback advice generation when AI is unavailable
   */
  generateFallbackAdvice(analysis) {
    const { score, breachResult, feedback = [] } = analysis;
    let category;
    let advice;
    let context;

    if (['CRITICAL BREACH', 'BREACHED', 'PATTERN WARNING'].includes(breachResult?.status)) {
      category = 'common';
      advice = "CRITICAL: This password has appeared in known breaches or follows a common pattern. Attackers may try it immediately. Change it everywhere you use it.";
      context = { riskLevel: 'CRITICAL', userLevel: 'BEGINNER', tone: 'tactical' };
    } else if (feedback.some(item =>
      item.includes('Minimum 8 characters required') ||
      item.includes('12+ characters recommended')
    )) {
      category = 'short';
      advice = "Needs Improvement: Your password is too short. Aim for at least 12 characters to significantly increase its strength.";
      context = { riskLevel: 'HIGH', userLevel: 'BEGINNER', tone: 'educational' };
    } else if (score < 50) {
      category = 'weak';
      advice = "Recommendation: Add a mix of uppercase letters, numbers, and symbols (like !@#$%) to make your password much harder to guess.";
      context = { riskLevel: 'HIGH', userLevel: 'BEGINNER', tone: 'educational' };
    } else if (score < 75) {
      category = 'medium';
      advice = "Good Progress: This is a decent password. To make it even better, consider making it longer or using a randomly generated passphrase.";
      context = { riskLevel: 'MEDIUM', userLevel: 'INTERMEDIATE', tone: 'supportive' };
    } else {
      category = 'strong';
      advice = "Excellent Strength: This password appears strong and complex. Ensure it's unique to each account and consider using a password manager to keep track of it.";
      context = { riskLevel: 'LOW', userLevel: 'INTERMEDIATE', tone: 'supportive' };
    }

    return {
      advice,
      context,
      metadata: {
        responseTime: 0,
        adviceLength: advice.length,
        model: 'FALLBACK',
        fallbackCategory: category,
        timestamp: new Date().toISOString()
      }
    };
  }
}

// ============================================================================
// API ROUTE HANDLER
// ============================================================================

// Initialize singleton advisor instance
const securityAdvisor = new SecurityAdvisor();

/**
 * AI Security Advice API Route
 * 
 * POST /api/advice
 * 
 * @param {Request} req - Incoming request with password analysis data
 * @returns {NextResponse} JSON response with AI-generated security advice
 */
export async function POST(req) {
  const requestStart = Date.now();

  try {
    // Parse and validate request data
    const requestData = await req.json();
    const { score, entropy, breachResult, feedback } = requestData;

    // Input validation
    if (score === undefined || entropy === undefined) {
      return NextResponse.json(
        { 
          message: "Invalid request: score and entropy are required",
          error: "MISSING_REQUIRED_FIELDS"
        },
        { status: 400 }
      );
    }

    console.log('🔮 AI Advice Request:', {
      score,
      entropy: entropy?.toFixed(2),
      breachStatus: breachResult?.status,
      feedbackCount: feedback?.length || 0
    });

    // Generate intelligent security advice
    const adviceResult = await securityAdvisor.generateAdvice({
      score: Math.max(0, Math.min(100, score)),
      entropy: Math.max(0, entropy),
      breachResult: breachResult || { status: 'UNKNOWN', message: 'No breach data' },
      feedback: feedback || []
    });

    // Construct response
    const response = {
      advice: adviceResult.advice,
      context: adviceResult.context,
      metadata: {
        ...adviceResult.metadata,
        totalProcessingTime: Date.now() - requestStart,
        learningEnabled: AI_CONFIG.LEARNING_ENABLED
      }
    };

    const logMessage = adviceResult.metadata.model === 'FALLBACK'
      ? '⚠️ AI unavailable; fallback advice returned'
      : '✅ AI Advice Generated';
    console.log(logMessage, {
      responseTime: response.metadata.totalProcessingTime,
      riskLevel: response.context.riskLevel,
      adviceLength: response.advice.length,
      model: adviceResult.metadata.model
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('🔥 AI Security Advisor API Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Graceful error response
    return NextResponse.json(
      {
        message: "Security advisory service temporarily unavailable",
        error: "AI_SERVICE_UNAVAILABLE",
        fallbackAdvice: "For immediate security improvement: use a password manager, enable two-factor authentication, and ensure passwords are unique across different services."
      },
      { status: 503 } // Service Unavailable
    );
  }
}

/**
 * Health check endpoint for monitoring and diagnostics
 */
export async function GET() {
  return NextResponse.json({
    status: "operational",
    service: "AI Security Advisor",
    version: "2.1.0",
    capabilities: {
      contextualAdvice: true,
      adaptiveLearning: AI_CONFIG.LEARNING_ENABLED,
      toneAdaptation: true,
      riskAssessment: true
    },
    metrics: {
      model: AI_CONFIG.MODEL_NAME,
      learningEnabled: AI_CONFIG.LEARNING_ENABLED,
      contextWindow: AI_CONFIG.CONTEXT_WINDOW
    }
  });
}