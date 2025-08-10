// A real AI Service for generating step-by-step plans using the Gemini API.

class RealAiService {
  constructor() {
    // We will use gemini-2.5-flash-preview-05-20 for text generation.
  }

  /**
   * Generates a detailed, actionable plan based on a user prompt and category.
   * @param {string} prompt - The user's goal or request.
   * @param {string} category - The category of the plan (e.g., "Business Strategy").
   * @returns {Promise<string>} A promise that resolves with the generated plan text.
   */
  async generatePlan(prompt, category = 'General') {
    try {
      // The user has provided an API key, which we will use directly.
      // NOTE: For security in a production environment, this should be stored
      // as an environment variable, not hardcoded in the source code.
      const apiKey = "AIzaSyB6KwvHUxxWufpKUXDrvgwXvnA6UNVV9TI"; 
      
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      let systemMessage;
      let userMessage;
      
      const codeKeywords = ['java code', 'java program', 'python code', 'javascript code', 'html code', 'react component', 'swift code', 'c++ code', 'give me code'];
      if (codeKeywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
        systemMessage = `You are a programming expert. Your task is to generate clean, well-commented code directly, without any conversational or template-based text.
          The response should contain only the code block, with the correct language identifier.`;
        userMessage = prompt;
      } else {
        systemMessage = `You are NeuroDesk AI, an expert planning assistant. Your task is to create detailed, actionable, step-by-step plans.
          Do not include any conversational text outside the plan. Use a clear, concise markdown format.
          Always start the plan with a title.`;
        userMessage = `Create a comprehensive action plan for the following goal: "${prompt}". The category for this plan is: "${category}".`;
      }

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: systemMessage + "\n" + userMessage }],
          },
        ],
      };

      let response;
      let retries = 0;
      const maxRetries = 5;
      let delay = 1000; // 1 second

      // Implement exponential backoff for API calls.
      while (retries < maxRetries) {
        try {
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            break; // Exit the loop on a successful response
          } else if (response.status === 429) {
            // Too Many Requests, retry with exponential backoff
            retries++;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Double the delay for the next retry
          } else {
            // Other non-retriable error
            throw new Error(`API request failed with status: ${response.status}`);
          }
        } catch (error) {
          if (retries < maxRetries) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
          } else {
            throw error; // Re-throw the error if max retries are exceeded
          }
        }
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected API response format or no content found.');
      }
    } catch (error) {
      console.error('Error in RealAiService:', error.message);
      // Return a structured, friendly fallback message
      return `# 🎯 Comprehensive Action Plan

## 📋 Project Overview
**Objective:** ${prompt}
**Category:** ${category}
**Complexity Level:** medium
**Estimated Timeline:** 1-3 months

## 🚀 Implementation Strategy
### Phase 1: Planning & Preparation (1-2 weeks)
1. **Define Objectives**
   - Set measurable goals
   - List SMART goals
   - Clear targets
2. **Resource Assessment**
   - Identify needs
   - Make a checklist
   - Ready to start
### Phase 2: Foundation Building (2-4 weeks)
1. **Initial Setup**
   - Gather all required tools and materials.
   - Establish a clear workflow and project structure.
2. **Skill Development**
   - Acquire any new skills needed for the project.
   - Practice fundamentals before moving on.
### Phase 3: Active Implementation (4-8 weeks)
1. **Core Execution**
   - Focus on the main tasks of the project.
   - Work through the plan systematically.
2. **Iterative Refinement**
   - Review progress regularly and make adjustments.
   - Seek feedback to improve the work.
### Phase 4: Optimization & Completion (2-4 weeks)
1. **Final Polish**
   - Complete all final details and checks.
   - Ensure the project meets all initial objectives.
2. **Review & Lessons Learned**
   - Evaluate the project's success.
   - Document insights for future use.

## 📊 Success Metrics
- **Completion Rate**: 90%+ tasks done on time
- **Quality Score**: Meets defined criteria

## 🛠️ Required Resources
- **Time Commitment**: 1-2 hours daily, Weekly reviews
- **Tools & Software**: Project management tool, Note-taking app

## ⚠️ Potential Challenges & Solutions
- **Challenge**: Time Management
  - **Solution**: Use time-blocking
- **Challenge**: Skill Gaps
  - **Solution**: Take short courses

## 🎯 Immediate Action Items
1. **Today**: Start with small, clear tasks.
2. **This Week**: Break the first phase into smaller steps.
3. **Next Week**: Start the initial project setup.
4. **Month 1**: Complete the foundation building phase.

## 📈 Long-term Vision
This plan ensures long-term success for "${prompt}". It's designed to be a living document that can be adjusted as you progress.
---
*Generated by NeuroDesk AI (Fallback)*`;
    }
  }
}

export default new RealAiService();
