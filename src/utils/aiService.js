// AI Service for generating step-by-step plans
// Using Hugging Face's free API as a fallback option

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'
const FALLBACK_API_URL = 'https://api.openai.com/v1/chat/completions'

class AIService {
  constructor() {
    this.apiKey = null // Will be set when user upgrades to Pro
  }

  async generatePlan(prompt, category = null) {
    try {
      // For demo purposes, we'll use a local generation with templates
      // In production, you would connect to OpenAI, Claude, or other AI APIs
      
      const enhancedPrompt = this.enhancePrompt(prompt, category)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate structured response based on prompt
      const plan = this.generateStructuredPlan(enhancedPrompt)
      
      return {
        success: true,
        data: plan,
        usage: {
          promptTokens: prompt.length,
          completionTokens: plan.length,
          totalTokens: prompt.length + plan.length
        }
      }
      
    } catch (error) {
      console.error('AI Service Error:', error)
      return {
        success: false,
        error: 'Failed to generate plan. Please try again.',
        fallback: this.getFallbackPlan(prompt)
      }
    }
  }

  enhancePrompt(prompt, category) {
    const categoryContext = {
      'Business Strategy': 'Focus on market analysis, competitive advantage, revenue models, and implementation timeline.',
      'Learning Plan': 'Structure with learning objectives, resources, practice exercises, and progress milestones.',
      'Health & Fitness': 'Include safety considerations, progressive difficulty, nutrition advice, and tracking methods.',
      'Travel Planning': 'Cover budget planning, itinerary, accommodations, transportation, and local experiences.',
      'Creative Project': 'Emphasize creative process, inspiration sources, skill development, and project timeline.',
      'Personal Goals': 'Focus on SMART goals, habit formation, accountability measures, and progress tracking.'
    }

    const context = category && categoryContext[category] 
      ? `Context: ${categoryContext[category]}\n\n` 
      : ''

    return `${context}Create a detailed, actionable step-by-step plan for: ${prompt}

Please structure your response with:
1. Clear overview and objectives
2. Detailed step-by-step breakdown
3. Timeline and milestones
4. Resources needed
5. Success metrics
6. Potential challenges and solutions`
  }

  generateStructuredPlan(prompt) {
    // This is a sophisticated template-based generator
    // In production, replace with actual AI API calls
    
    const planTemplates = {
      business: this.generateBusinessPlan,
      learning: this.generateLearningPlan,
      health: this.generateHealthPlan,
      travel: this.generateTravelPlan,
      creative: this.generateCreativePlan,
      personal: this.generatePersonalPlan,
      default: this.generateDefaultPlan
    }

    // Detect plan type from prompt
    const planType = this.detectPlanType(prompt)
    const generator = planTemplates[planType] || planTemplates.default
    
    return generator.call(this, prompt)
  }

  detectPlanType(prompt) {
    const keywords = {
      business: ['business', 'startup', 'company', 'revenue', 'market', 'strategy', 'product launch'],
      learning: ['learn', 'study', 'course', 'skill', 'education', 'training', 'development'],
      health: ['fitness', 'health', 'exercise', 'workout', 'diet', 'nutrition', 'weight'],
      travel: ['travel', 'trip', 'vacation', 'visit', 'journey', 'destination'],
      creative: ['creative', 'art', 'design', 'writing', 'music', 'photography', 'project'],
      personal: ['goal', 'habit', 'personal', 'improvement', 'lifestyle', 'routine']
    }

    const lowerPrompt = prompt.toLowerCase()
    
    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => lowerPrompt.includes(word))) {
        return type
      }
    }
    
    return 'default'
  }

  generateBusinessPlan(prompt) {
    return `# 📊 Business Strategy Plan

## 🎯 Executive Summary
This comprehensive business plan addresses: "${prompt.split(':')[1] || prompt}"

## 📈 Market Analysis & Strategy

### Phase 1: Research & Validation (Weeks 1-2)
1. **Market Research**
   - Analyze target market size and demographics
   - Study competitor landscape and positioning
   - Identify market gaps and opportunities
   - Conduct customer interviews and surveys

2. **Business Model Validation**
   - Define value proposition clearly
   - Test assumptions with potential customers
   - Validate pricing strategy
   - Assess revenue potential

### Phase 2: Planning & Preparation (Weeks 3-4)
3. **Strategic Planning**
   - Develop detailed business model canvas
   - Create financial projections and budgets
   - Plan marketing and sales strategies
   - Design operational processes

4. **Resource Preparation**
   - Secure initial funding or investment
   - Build core team and partnerships
   - Set up legal structure and compliance
   - Develop minimum viable product (MVP)

### Phase 3: Launch & Growth (Weeks 5-12)
5. **Market Entry**
   - Execute soft launch with beta customers
   - Gather feedback and iterate quickly
   - Implement marketing campaigns
   - Build brand awareness and credibility

6. **Scale & Optimize**
   - Monitor key performance indicators (KPIs)
   - Optimize operations for efficiency
   - Expand customer base strategically
   - Plan for sustainable growth

## 💰 Financial Projections
- **Initial Investment**: $10,000 - $50,000
- **Break-even Timeline**: 6-9 months
- **Revenue Target Year 1**: $100,000+

## 🚀 Success Metrics
- Customer acquisition cost (CAC)
- Monthly recurring revenue (MRR)
- Customer lifetime value (CLV)
- Market share growth

## ⚠️ Risk Management
- **Market Risks**: Economic downturns, competition
- **Operational Risks**: Team scalability, supply chain
- **Financial Risks**: Cash flow, funding gaps
- **Mitigation**: Diversification, contingency planning

## 🎯 Next Immediate Actions
1. Start market research this week
2. Create customer persona profiles
3. Develop MVP specifications
4. Set up tracking systems for metrics

*This plan is designed to be adaptive - review and adjust monthly based on market feedback and performance data.*`
  }

  generateLearningPlan(prompt) {
    return `# 📚 Comprehensive Learning Plan

## 🎯 Learning Objectives
Master the skills outlined in: "${prompt.split(':')[1] || prompt}"

## 📖 Structured Learning Path

### Phase 1: Foundation Building (Weeks 1-2)
1. **Knowledge Assessment**
   - Take initial skill assessment test
   - Identify current knowledge gaps
   - Set specific, measurable learning goals
   - Create learning schedule and timeline

2. **Resource Gathering**
   - Research best learning materials (books, courses, videos)
   - Join relevant online communities and forums
   - Find mentors or study partners
   - Set up learning environment and tools

### Phase 2: Core Learning (Weeks 3-8)
3. **Structured Study Sessions**
   - Daily 1-2 hour focused study blocks
   - Follow spaced repetition for retention
   - Take detailed notes and create summaries
   - Complete practice exercises regularly

4. **Practical Application**
   - Work on hands-on projects weekly
   - Apply concepts to real-world scenarios
   - Build portfolio of completed work
   - Seek feedback from peers and mentors

### Phase 3: Mastery & Application (Weeks 9-12)
5. **Advanced Practice**
   - Tackle complex, challenging projects
   - Teach concepts to others (blog, presentations)
   - Contribute to open-source projects
   - Participate in competitions or challenges

6. **Knowledge Consolidation**
   - Create comprehensive study guides
   - Take final assessment tests
   - Build capstone project demonstrating skills
   - Plan for continued learning and growth

## 📅 Weekly Schedule
- **Monday-Wednesday-Friday**: 2 hours theory and concepts
- **Tuesday-Thursday**: 1.5 hours practical exercises
- **Saturday**: 3 hours project work
- **Sunday**: Review and planning

## 📊 Progress Tracking
- Weekly knowledge assessments
- Project completion milestones
- Skill demonstration checkpoints
- Peer review and feedback sessions

## 🛠️ Required Resources
- Primary textbooks or online courses
- Practice platforms and tools
- Community access (forums, Discord, etc.)
- Project hosting and version control

## 🎯 Success Metrics
- Complete 90% of planned study sessions
- Finish 3-5 practical projects
- Achieve 80%+ on skill assessments
- Build demonstrable portfolio

## 🚧 Common Challenges & Solutions
- **Time Management**: Use time-blocking and Pomodoro technique
- **Motivation**: Set small daily wins and celebrate progress
- **Difficulty Spikes**: Break complex topics into smaller chunks
- **Information Overload**: Focus on one concept at a time

## 🎯 Immediate Next Steps
1. Take initial skill assessment today
2. Purchase/enroll in primary learning resource
3. Set up daily study schedule in calendar
4. Join 2-3 relevant learning communities

*Remember: Consistency beats intensity. Small daily progress leads to mastery.*`
  }

  generateDefaultPlan(prompt) {
    return `# 🎯 Comprehensive Action Plan

## 📋 Project Overview
Detailed step-by-step plan for: "${prompt}"

## 🚀 Implementation Strategy

### Phase 1: Planning & Preparation (Days 1-7)
1. **Goal Definition & Research**
   - Clearly define specific, measurable objectives
   - Research best practices and methodologies
   - Identify required resources and tools
   - Set realistic timeline and milestones

2. **Resource Allocation**
   - List all necessary materials and tools
   - Allocate budget and time requirements
   - Identify team members or collaborators
   - Set up workspace and systems

### Phase 2: Foundation Building (Days 8-21)
3. **Initial Setup**
   - Create project structure and organization
   - Establish workflows and processes
   - Set up tracking and measurement systems
   - Begin with small, manageable tasks

4. **Skill Development**
   - Learn essential skills and knowledge
   - Practice fundamental techniques
   - Seek guidance from experts or mentors
   - Build confidence through small wins

### Phase 3: Active Implementation (Days 22-60)
5. **Core Execution**
   - Follow systematic approach to main tasks
   - Maintain consistent daily progress
   - Monitor quality and adjust as needed
   - Document lessons learned and insights

6. **Iterative Improvement**
   - Regular review and optimization cycles
   - Gather feedback from stakeholders
   - Make data-driven adjustments
   - Scale successful approaches

### Phase 4: Completion & Optimization (Days 61-90)
7. **Final Push & Polish**
   - Complete remaining tasks and details
   - Quality assurance and testing
   - Prepare for launch or presentation
   - Create documentation and guides

8. **Review & Future Planning**
   - Comprehensive project evaluation
   - Document successes and failures
   - Plan for maintenance and updates
   - Identify opportunities for expansion

## 📊 Success Metrics
- **Completion Rate**: 95% of planned tasks finished
- **Quality Score**: Meet or exceed defined standards
- **Timeline Adherence**: Complete within planned timeframe
- **Stakeholder Satisfaction**: Positive feedback from key parties

## 🛠️ Required Resources
- Time commitment: 1-2 hours daily
- Budget allocation: $[Estimate based on scope]
- Tools and software: [List specific requirements]
- Support network: Mentors, team members, communities

## ⚠️ Risk Management
- **Scope Creep**: Stick to defined objectives
- **Time Overruns**: Build in 20% buffer time
- **Quality Issues**: Regular review checkpoints
- **Resource Constraints**: Have backup plans ready

## 🎯 Immediate Action Items
1. **Today**: Define specific success criteria
2. **This Week**: Gather all necessary resources
3. **Next Week**: Begin Phase 1 implementation
4. **Month 1**: Complete foundation building

## 📈 Long-term Vision
This plan is designed to not only achieve immediate goals but also build sustainable systems and skills for future success. Focus on creating processes that can be replicated and improved over time.

*Remember: Progress over perfection. Take action today, even if it's just a small step forward.*`
  }

  generateHealthPlan(prompt) {
    return `# 💪 Complete Health & Fitness Plan

## 🎯 Health Goals
Comprehensive plan for: "${prompt.split(':')[1] || prompt}"

## 🏃‍♂️ Structured Fitness Journey

### Phase 1: Assessment & Foundation (Weeks 1-2)
1. **Health Assessment**
   - Complete fitness assessment (strength, cardio, flexibility)
   - Track baseline measurements (weight, body composition)
   - Consult healthcare provider if needed
   - Set SMART fitness goals

2. **Habit Formation**
   - Start with 15-20 minute daily activities
   - Focus on consistency over intensity
   - Create workout schedule that fits lifestyle
   - Prepare healthy meal prep routine

### Phase 2: Building Momentum (Weeks 3-8)
3. **Progressive Training**
   - Increase workout duration to 30-45 minutes
   - Add strength training 3x per week
   - Include cardio activities 2-3x per week
   - Focus on proper form and technique

4. **Nutrition Optimization**
   - Track daily food intake and calories
   - Increase protein intake for muscle building
   - Stay hydrated (8-10 glasses water daily)
   - Plan balanced meals with whole foods

### Phase 3: Advanced Development (Weeks 9-16)
5. **Intensity & Variety**
   - Incorporate HIIT and circuit training
   - Try new activities (swimming, hiking, yoga)
   - Challenge yourself with progressive overload
   - Focus on weak areas and imbalances

6. **Lifestyle Integration**
   - Make fitness a non-negotiable daily habit
   - Find active hobbies and social activities
   - Optimize sleep for recovery (7-9 hours)
   - Manage stress through exercise and mindfulness

## 📅 Weekly Schedule
- **Monday**: Upper body strength + 20min cardio
- **Tuesday**: Lower body strength + flexibility
- **Wednesday**: Active recovery (walking, yoga)
- **Thursday**: Full body circuit training
- **Friday**: Cardio focus (running, cycling)
- **Saturday**: Fun activity (sports, hiking)
- **Sunday**: Rest and meal prep

## 🥗 Nutrition Guidelines
- **Breakfast**: Protein + complex carbs + healthy fats
- **Lunch**: Lean protein + vegetables + whole grains
- **Dinner**: Light protein + vegetables + minimal carbs
- **Snacks**: Fruits, nuts, yogurt, protein shakes

## 📊 Progress Tracking
- Weekly weigh-ins and measurements
- Progress photos monthly
- Fitness performance metrics
- Energy levels and mood tracking

## 🎯 Success Metrics
- Lose 1-2 lbs per week (if weight loss goal)
- Increase strength by 20-30% in 3 months
- Complete 90% of planned workouts
- Improve overall energy and well-being

## ⚠️ Safety & Considerations
- Always warm up before exercising
- Listen to your body and rest when needed
- Stay hydrated during workouts
- Consult professionals for form corrections

## 🎯 Immediate Action Steps
1. Schedule fitness assessment this week
2. Plan and prep healthy meals for 3 days
3. Choose 2-3 enjoyable physical activities
4. Set up tracking system (app or journal)

*Remember: Health is a journey, not a destination. Focus on building sustainable habits that you can maintain for life.*`
  }

  generateTravelPlan(prompt) {
    return `# ✈️ Complete Travel Planning Guide

## 🌍 Trip Overview
Detailed travel plan for: "${prompt.split(':')[1] || prompt}"

## 🗓️ Pre-Trip Planning (8-12 weeks before)

### Phase 1: Research & Booking (Weeks 1-4)
1. **Destination Research**
   - Study climate, culture, and local customs
   - Research top attractions and hidden gems
   - Read travel blogs and reviews
   - Check visa requirements and travel advisories

2. **Budget Planning**
   - Set total trip budget ($X,XXX)
   - Allocate: 40% accommodation, 30% activities, 20% food, 10% misc
   - Compare flight prices and book early
   - Research accommodation options and book

### Phase 2: Detailed Itinerary (Weeks 5-8)
3. **Day-by-Day Planning**
   - Create flexible daily itineraries
   - Book must-see attractions in advance
   - Plan transportation between locations
   - Research local restaurants and food experiences

4. **Practical Preparations**
   - Check passport expiration dates
   - Get necessary vaccinations
   - Purchase travel insurance
   - Notify banks of travel plans

### Phase 3: Final Preparations (Weeks 9-12)
5. **Packing & Documentation**
   - Create comprehensive packing checklist
   - Organize all travel documents
   - Download offline maps and translation apps
   - Prepare emergency contact information

6. **Last-Minute Details**
   - Confirm all bookings and reservations
   - Check-in for flights 24 hours prior
   - Pack carry-on with essentials
   - Set up international phone plan

## 📅 Sample 7-Day Itinerary

**Day 1: Arrival & Orientation**
- Airport transfer to accommodation
- Light exploration of nearby area
- Welcome dinner at local restaurant
- Early rest to combat jet lag

**Day 2-3: Major Attractions**
- Visit top 3 must-see landmarks
- Guided city tour or walking tour
- Cultural experiences (museums, galleries)
- Local market exploration

**Day 4-5: Adventure & Activities**
- Outdoor activities or day trips
- Unique local experiences
- Photography opportunities
- Interaction with locals

**Day 6: Relaxation & Shopping**
- Leisure activities and rest
- Souvenir shopping
- Spa or wellness activities
- Farewell dinner

**Day 7: Departure**
- Final packing and checkout
- Last-minute sightseeing
- Airport transfer and departure

## 💰 Budget Breakdown
- **Flights**: $XXX (book 6-8 weeks early)
- **Accommodation**: $XXX (mix of hotels/Airbnb)
- **Food**: $XXX ($50-80 per day)
- **Activities**: $XXX (prioritize must-dos)
- **Transportation**: $XXX (local transport/car rental)
- **Emergency Fund**: $XXX (20% of total budget)

## 🎒 Essential Packing List
**Documents**: Passport, visas, insurance, itinerary
**Electronics**: Phone, chargers, power adapters, camera
**Clothing**: Weather-appropriate, comfortable shoes
**Health**: Medications, first aid kit, sunscreen
**Money**: Cash, cards, emergency funds

## 📱 Useful Apps & Tools
- **Navigation**: Google Maps, Citymapper
- **Translation**: Google Translate, Duolingo
- **Booking**: Booking.com, Airbnb, OpenTable
- **Transportation**: Uber, local transit apps

## 🚨 Safety & Emergency Planning
- Register with embassy if traveling abroad
- Share itinerary with family/friends
- Keep copies of important documents
- Know emergency numbers for destination
- Have travel insurance contact information

## 🎯 Immediate Action Items
1. **This Week**: Set budget and research destinations
2. **Next Week**: Book flights and accommodation
3. **Month 1**: Plan detailed itinerary and activities
4. **Month 2**: Handle documentation and preparations

## 🌟 Pro Travel Tips
- Pack light and leave room for souvenirs
- Learn basic phrases in local language
- Be flexible with plans and open to spontaneity
- Document memories but don't forget to live in the moment
- Respect local customs and traditions

*Remember: The best trips balance planning with spontaneity. Plan the essentials but leave room for unexpected adventures!*`
  }

  generateCreativePlan(prompt) {
    return `# 🎨 Creative Project Masterplan

## 🌟 Creative Vision
Comprehensive plan for: "${prompt.split(':')[1] || prompt}"

## 🎭 Creative Development Process

### Phase 1: Inspiration & Ideation (Weeks 1-2)
1. **Creative Research**
   - Study masters and contemporary artists in your field
   - Collect inspiration from diverse sources
   - Create mood boards and reference collections
   - Analyze techniques and styles you admire

2. **Concept Development**
   - Brainstorm multiple creative directions
   - Sketch initial ideas and concepts
   - Define your unique artistic voice
   - Set creative goals and success criteria

### Phase 2: Skill Building & Experimentation (Weeks 3-6)
3. **Technical Skill Development**
   - Practice fundamental techniques daily
   - Take online courses or workshops
   - Experiment with different tools and mediums
   - Create small practice pieces regularly

4. **Creative Exploration**
   - Try different styles and approaches
   - Collaborate with other creatives
   - Push boundaries and take risks
   - Document your creative process

### Phase 3: Project Execution (Weeks 7-12)
5. **Main Project Creation**
   - Begin work on primary creative piece
   - Maintain consistent daily creative practice
   - Iterate and refine based on feedback
   - Stay true to your artistic vision

6. **Refinement & Polish**
   - Review and critique your work objectively
   - Make final adjustments and improvements
   - Prepare work for presentation or publication
   - Create supporting materials (artist statement, etc.)

## 📅 Daily Creative Routine
**Morning (1-2 hours)**:
- Warm-up exercises or sketching
- Work on main project
- Technique practice

**Evening (30 minutes)**:
- Review day's work
- Plan tomorrow's session
- Inspiration gathering

## 🛠️ Creative Toolkit
**Physical Tools**: [List specific materials needed]
**Digital Tools**: Software, apps, online resources
**Learning Resources**: Books, courses, tutorials
**Community**: Online forums, local groups, mentors

## 📈 Progress Milestones
- **Week 2**: Complete concept development
- **Week 4**: Finish skill-building phase
- **Week 8**: 50% completion of main project
- **Week 12**: Final project completion

## 🎯 Success Metrics
- Complete daily creative practice 90% of days
- Finish main project within timeline
- Receive positive feedback from peers
- Feel proud of creative growth and output

## 💡 Creative Challenges & Solutions
- **Creative Block**: Change environment, try new techniques
- **Perfectionism**: Set time limits, embrace "good enough"
- **Lack of Motivation**: Connect with creative community
- **Technical Difficulties**: Break down into smaller steps

## 🌟 Inspiration Sources
- Museums and galleries (virtual tours)
- Nature and everyday observations
- Other art forms (music, literature, film)
- Travel and cultural experiences
- Dreams and subconscious exploration

## 🎯 Immediate Creative Actions
1. **Today**: Set up dedicated creative workspace
2. **This Week**: Gather inspiration and create mood board
3. **Next Week**: Start daily creative practice routine
4. **Month 1**: Complete first major milestone

## 🚀 Long-term Creative Vision
This project is just the beginning of your creative journey. Focus on building sustainable creative habits, developing your unique voice, and connecting with a community of fellow creators.

*Remember: Creativity is a practice, not a talent. Show up consistently, embrace imperfection, and trust the process.*`
  }

  generatePersonalPlan(prompt) {
    return `# 🎯 Personal Development Plan

## 🌱 Growth Objectives
Comprehensive plan for: "${prompt.split(':')[1] || prompt}"

## 🚀 Personal Transformation Journey

### Phase 1: Self-Assessment & Goal Setting (Weeks 1-2)
1. **Current State Analysis**
   - Complete honest self-assessment
   - Identify strengths and areas for improvement
   - Analyze current habits and routines
   - Define what success looks like for you

2. **SMART Goal Definition**
   - Set Specific, Measurable, Achievable goals
   - Create Relevant and Time-bound objectives
   - Break large goals into smaller milestones
   - Write down your "why" for each goal

### Phase 2: Foundation Building (Weeks 3-8)
3. **Habit Formation**
   - Start with 1-2 keystone habits
   - Use habit stacking to build routines
   - Track daily progress consistently
   - Focus on consistency over perfection

4. **Mindset Development**
   - Practice daily gratitude and reflection
   - Develop growth mindset thinking
   - Challenge limiting beliefs
   - Cultivate self-compassion and patience

### Phase 3: Momentum & Expansion (Weeks 9-16)
5. **Skill Development**
   - Invest in learning new capabilities
   - Seek feedback and mentorship
   - Practice deliberate skill building
   - Apply new skills in real situations

6. **Environment Optimization**
   - Design environment for success
   - Remove obstacles and temptations
   - Surround yourself with supportive people
   - Create systems that support your goals

## 📅 Daily Success Routine
**Morning (30 minutes)**:
- Gratitude practice (5 minutes)
- Goal review and intention setting (10 minutes)
- Priority task identification (15 minutes)

**Evening (20 minutes)**:
- Daily reflection and journaling (10 minutes)
- Tomorrow's preparation (10 minutes)

## 📊 Progress Tracking System
**Weekly Reviews**:
- Goal progress assessment
- Habit consistency tracking
- Challenges and obstacles identification
- Wins and achievements celebration

**Monthly Evaluations**:
- Goal adjustment if needed
- Habit refinement and optimization
- New skill development planning
- Support system evaluation

## 🎯 Key Success Habits
1. **Morning Routine**: Consistent wake time and morning ritual
2. **Exercise**: 30 minutes daily physical activity
3. **Learning**: 20 minutes daily skill development
4. **Reflection**: Evening journaling and planning
5. **Connection**: Regular meaningful social interactions

## 🧠 Mindset Practices
- **Meditation**: 10 minutes daily mindfulness
- **Visualization**: Daily success visualization
- **Affirmations**: Positive self-talk practice
- **Gratitude**: Daily appreciation practice

## 📚 Development Resources
**Books**: Personal development and skill-specific
**Courses**: Online learning platforms and workshops
**Mentors**: Experienced guides in your field
**Community**: Support groups and accountability partners

## ⚠️ Common Obstacles & Solutions
- **Lack of Motivation**: Connect with your deeper "why"
- **Time Constraints**: Start with micro-habits (2 minutes)
- **Perfectionism**: Focus on progress, not perfection
- **Social Pressure**: Find supportive community

## 🎯 90-Day Milestones
- **Day 30**: Establish core daily habits
- **Day 60**: See measurable progress in key areas
- **Day 90**: Achieve first major milestone

## 🌟 Success Metrics
- Consistency in daily habits (80%+ completion)
- Measurable progress toward main goals
- Improved self-awareness and confidence
- Positive feedback from others

## 🎯 Immediate Action Steps
1. **Today**: Complete self-assessment and define top 3 goals
2. **This Week**: Design daily routine and tracking system
3. **Next Week**: Start with one keystone habit
4. **Month 1**: Build momentum with consistent daily practice

## 🚀 Long-term Vision
Personal development is a lifelong journey. This plan creates the foundation for continuous growth, resilience, and fulfillment. Focus on becoming the person you want to be, one day at a time.

*Remember: Small, consistent actions compound into extraordinary results. Be patient with yourself and trust the process.*`
  }

  getFallbackPlan(prompt) {
    return `# 🎯 Quick Action Plan

## Overview
Here's a basic plan for: "${prompt}"

## Steps:
1. **Define Clear Objectives** - What exactly do you want to achieve?
2. **Research & Gather Information** - Learn about best practices and requirements
3. **Create a Timeline** - Break down tasks into manageable chunks
4. **Take Action** - Start with the first small step today
5. **Monitor Progress** - Track your advancement and adjust as needed
6. **Iterate & Improve** - Learn from results and optimize your approach

## Next Actions:
- Start with step 1 immediately
- Set aside dedicated time daily
- Find resources and support
- Stay consistent and patient

*This is a basic framework. For more detailed plans, please try again or consider upgrading to Pro for advanced AI planning.*`
  }
}

export default new AIService()
