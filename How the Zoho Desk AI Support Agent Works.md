How the Zoho Desk AI Support Agent Works - Step by Step

  Let me explain the complete flow from when a customer sends an email to Zoho Desk until they receive an AI-generated response.

  ---
  📧 Step-by-Step Flow

  Step 1: Customer Sends Email to Zoho Desk

  Customer: "I forgot my password and can't log in"
      ↓
  Zoho Desk receives email
      ↓
  Creates new ticket: TICK-12345

  What happens: Zoho Desk creates a ticket and stores it in their system.

  ---
  Step 2: Zoho Desk Sends Webhook to Our System

  // Zoho Desk makes HTTP POST request to:
  POST https://your-app.com/api/zoho/webhook

  // With payload:
  {
    "body": [{
      "eventType": "Ticket_Add",
      "payload": {
        "id": "12345",
        "ticketNumber": "TICK-12345",
        "subject": "Password reset help",
        "channel": "EMAIL",
        "contact": {
          "email": "customer@example.com",
          "lastName": "Smith"
        },
        "firstThread": {
          "content": "<div>I forgot my password and can't log in</div>"
        }
      }
    }]
  }

  What happens:
  - Zoho Desk automatically calls our webhook URL
  - Sends complete ticket information as JSON
  - This triggers our processing pipeline

  File: /src/app/api/zoho/webhook/route.ts

  ---
  Step 3: Webhook Validates and Filters

  // In webhook/route.ts
  export async function POST(req: NextRequest) {
    const body = await req.json();

    // Filter: Only process EMAIL channel
    if (payload.channel !== 'EMAIL') {
      return; // Skip other channels
    }

    // Extract ticket ID
    const ticketId = payload.id;

    // Trigger processing pipeline
    fetch('/api/zoho/process-ticket', {
      method: 'POST',
      body: JSON.stringify({ ticketId, payload })
    });
  }

  What happens:
  - Checks if ticket is from EMAIL channel (ignores WEB, PHONE, CHAT)
  - Extracts ticket ID
  - Calls the processing pipeline

  ---
  Step 4: Extract Ticket Information

  // In process-ticket/route.ts

  // Clean HTML and extract plain text
  const cleanedContent = cleanEmailContent(payload.firstThread.content);
  // Result: "I forgot my password and can't log in"

  // Extract basic info
  const ticketInfo = {
    ticket_id: "12345",
    subject: "Password reset help",
    original_query: "I forgot my password and can't log in",
    customer_email: "customer@example.com"
  };

  What happens:
  - Removes HTML tags (<div>, </div>)
  - Removes email signatures, metadata
  - Extracts plain text query

  File: /src/lib/email-cleaner.ts

  ---
  Step 5: Get Full Conversation History

  // Call Zoho Desk API to get all previous messages
  const conversations = await zohoClient.getConversations(ticketId);

  // Returns array of all threads:
  [
    { id: "1", content: "I forgot my password...", author: "CUSTOMER" },
    { id: "2", content: "Here's how to reset...", author: "AGENT" },
    { id: "3", content: "Still not working", author: "CUSTOMER" }
  ]

  What happens:
  - Fetches ALL previous messages in the ticket
  - Includes customer messages AND agent replies
  - Used for context understanding

  File: /src/lib/integrations/zoho-desk.ts

  ---
  Step 6: Aggregate Conversation

  // Consolidate all messages into AI-friendly format
  const aggregated = aggregateConversation(threads);

  // Creates:
  {
    latestMessage: "CUSTOMER - Still not working",
    previousConversation: "CUSTOMER - I forgot my password..., AGENT - Here's how to reset...",
    queryForKB: "LATEST MESSAGE: CUSTOMER - Still not working, PREVIOUS CONVERSATION: ..."
  }

  What happens:
  - Combines all messages into single query
  - Formats as "LATEST MESSAGE: ..., PREVIOUS CONVERSATION: ..."
  - This helps AI understand the full context

  File: /src/lib/conversation-aggregator.ts

  ---
  Step 7: Optimize Query for AI

  // Consolidate into concise technical summary
  const optimizedQuery = consolidateForAI(aggregated, { maxLength: 200 });

  // Result: "Customer wants to reset password. Previously had trouble with reset link. Still not working after following instructions."

  What happens:
  - Removes metadata, email signatures
  - Focuses on technical issue
  - Max 200 characters (for KB search)
  - One-line summary for AI processing

  ---
  Step 8: Classify Ticket Using AI

  // Call Claude 4 Sonnet to classify
  const classification = await classifyTicket({
    subject: "Password reset help",
    conversation: "Customer wants to reset password...",
    priority: "Medium"
  });

  // Claude returns:
  {
    primary_category: "MANUAL_ADMIN",
    secondary_categories: [],
    confidence: 0.95,
    reasoning: "Password reset is a standard admin task",
    auto_resolvable: true,
    estimated_complexity: "low"
  }

  What happens:
  - Sends ticket details to Claude AI
  - Claude analyzes and picks 1 of 7 categories:
    - DATA_GENERATION (reports, analytics)
    - BACKEND_INVESTIGATION (bugs, errors)
    - MANUAL_ADMIN (password resets, account changes) ← THIS ONE
    - CONTENT_MANAGEMENT (course publishing)
    - CONFIGURATION (system settings)
    - SIMPLE_RESPONSE (how-to questions)
    - ESCALATION_NEEDED (complex issues)
  - Returns confidence score
  - Determines if auto-resolvable

  File: /src/app/api/zoho/process-ticket/route.ts (function classifyTicket)

  ---
  Step 9: Route Based on Classification

  if (classification.primary_category === 'DATA_GENERATION') {
    // Direct to Jira (skip KB search)
    createJiraTicket();
  } else {
    // Continue to KB search
    searchKnowledgeBase();
  }

  What happens:
  - DATA_GENERATION → Creates Jira ticket immediately (no AI response)
  - All others → Continues to knowledge base search

  ---
  Step 10: Search Knowledge Base (Dify AI)

  // Smart KB search based on query length
  const kbResult = await smartKBSearch(optimizedQuery);

  if (optimizedQuery.length <= 250) {
    // Short query → Use Chat API
    const response = await difyClient.chat(optimizedQuery);
    return { answer: response.answer };
  } else {
    // Long query → Use Retrieval API
    const response = await difyClient.retrieve(optimizedQuery);
    return { context: aggregateResults(response.records) };
  }

  What happens:
  - Short queries (≤250 chars): Direct chat API (gets answer)
  - Long queries (>250 chars): Retrieval API (gets relevant articles)
  - Dify searches your knowledge base articles
  - Returns top 5 matches

  File: /src/lib/integrations/dify.ts

  ---
  Step 11: Generate AI Response Using Claude

  // Call Claude with context from KB
  const aiResponse = await generateResponse({
    query: "Customer wants to reset password...",
    context: "To reset your password:\n1. Go to login page\n2. Click 'Forgot Password'..."
  });

  // Claude returns:
  {
    text: `Hello! I can help you reset your password. Here are the steps:

  1. Visit https://yourapp.com/login
  2. Click on "Forgot Password" below the login form
  3. Enter your registered email address
  4. Check your email for a reset link (check spam folder too)
  5. Click the link and create a new password

  The reset link expires in 24 hours. If you're still having trouble after trying these steps, please let me know and I'll escalate this to our technical team.

  Best regards,
  Support Team`
  }

  What happens:
  - Sends optimized query + KB context to Claude
  - Claude generates professional, helpful response
  - Tone is friendly and supportive
  - Includes specific steps
  - Mentions escalation if needed

  File: /src/app/api/zoho/process-ticket/route.ts (function generateResponse)

  ---
  Step 12: Send Reply to Customer

  // Send reply via Zoho Desk API
  const replyResponse = await zohoClient.sendReply(ticketId, {
    contentType: 'plainText',
    content: aiResponse.text,
    fromEmailAddress: "support@yourcompany.com",
    to: "customer@example.com",
    channel: "EMAIL"
  });

  What happens:
  - Sends AI-generated response back to Zoho Desk
  - Zoho Desk emails it to the customer
  - Customer receives email with helpful instructions
  - Ticket status updated in Zoho Desk

  File: /src/lib/integrations/zoho-desk.ts

  ---
  Step 13: Check if Escalation Needed

  // Detect escalation signals in AI response
  const escalation = detectEscalationSignals(aiResponse.text);

  // Checks for phrases like:
  // - "need to check with the team"
  // - "I'll get back to you"
  // - "requires further investigation"

  if (escalation.hasSignals || !classification.auto_resolvable) {
    // Create Jira ticket
    createJiraTicket();
  }

  What happens:
  - Analyzes AI response for phrases indicating human help needed
  - Checks auto_resolvable flag from classification
  - If either signals escalation → Creates Jira ticket

  File: /src/lib/conversation-aggregator.ts (function detectEscalationSignals)

  ---
  Step 14: Create Jira Ticket (If Needed)

  // Create Jira ticket with full context
  const jiraTicket = await jiraClient.createZohoEscalation({
    title: "Password reset help",
    description: `User Query: Customer wants to reset password...
    
  Agent Response: Hello! I can help you reset...

  --- Zoho Ticket Information ---
  Zoho Ticket ID: 12345
  Zoho Ticket URL: https://desk.zoho.com/...
  Customer: customer@example.com`,
    priority: "Medium",
    zohoTicketId: "12345",
    zohoTicketUrl: "https://desk.zoho.com/..."
  });

  // Returns:
  {
    key: "AFR-1234",
    url: "https://atcauz.atlassian.net/browse/AFR-1234"
  }

  What happens:
  - Creates task in Jira project
  - Includes full context (query + AI response)
  - Links to original Zoho ticket
  - Assigns to support team
  - Human agent can see full history

  File: /src/lib/integrations/jira.ts

  ---
  Step 15: Display in UI (Real-time)

  // Return complete processing result
  return {
    ticketId: "12345",
    ticketNumber: "TICK-12345",
    status: "completed",
    classification: { primary_category: "MANUAL_ADMIN", confidence: 0.95 },
    kbSearch: { query: "...", matches: 5, method: "chat" },
    aiResponse: { text: "Hello! I can help...", needsEscalation: false },
    zohoReply: { id: "reply-123", sent: true },
    jiraTicket: null, // No escalation needed
    timeline: [
      { step: "extract_info", status: "completed", duration: 50 },
      { step: "get_conversations", status: "completed", duration: 200 },
      { step: "classify_ticket", status: "completed", duration: 1500 },
      { step: "kb_search", status: "completed", duration: 1200 },
      { step: "generate_response", status: "completed", duration: 2500 },
      { step: "send_reply", status: "completed", duration: 500 }
    ],
    totalDuration: 5950 // milliseconds
  };

  What happens:
  - Complete processing result returned as JSON
  - Can be displayed in TicketProcessingWidget
  - Shows real-time progress
  - Timeline with step durations
  - All details visible to admin

  File: /src/components/widgets/TicketProcessingWidget.tsx

  ---
  🎨 Visual Timeline in UI

  ┌────────────────────────────────────────┐
  │ ✓ Extracting Information      (50ms)  │
  │ ✓ Get Conversations           (200ms)  │
  │ ✓ Classifying Ticket        (1,500ms)  │
  │ ✓ Searching Knowledge Base  (1,200ms)  │
  │ ✓ Generating Response       (2,500ms)  │
  │ ✓ Sending Reply              (500ms)  │
  │ ✓ Processing Complete      (5,950ms)  │
  └────────────────────────────────────────┘

  Classification: MANUAL_ADMIN (95% confidence)
  KB Search: 5 matches found (chat method)
  AI Response: Sent to customer
  Status: ✅ Completed (no escalation)

  ---
  🔄 Complete Data Flow Diagram

  ┌─────────────────┐
  │  Customer Email │
  └────────┬────────┘
           │
           ↓
  ┌─────────────────┐
  │   Zoho Desk     │ Creates ticket
  └────────┬────────┘
           │
           ↓ Webhook (HTTP POST)
  ┌─────────────────────────────────────┐
  │  /api/zoho/webhook (Our System)     │
  │  - Validate payload                 │
  │  - Filter EMAIL channel             │
  │  - Extract ticket ID                │
  └────────┬────────────────────────────┘
           │
           ↓ Trigger processing
  ┌─────────────────────────────────────┐
  │  /api/zoho/process-ticket           │
  ├─────────────────────────────────────┤
  │  Step 1: Extract Info               │
  │    ├─ Clean HTML                    │
  │    └─ Parse email content           │
  │                                     │
  │  Step 2: Get Conversations          │
  │    └─ Zoho Desk API call            │
  │                                     │
  │  Step 3: Aggregate Threads          │
  │    └─ Consolidate messages          │
  │                                     │
  │  Step 4: Classify Ticket            │
  │    └─ Claude AI (7 categories)      │
  │                                     │
  │  Step 5: Route Decision             │
  │    ├─ DATA_GENERATION → Jira        │
  │    └─ Others → KB Search            │
  │                                     │
  │  Step 6: KB Search                  │
  │    ├─ Short query → Dify Chat       │
  │    └─ Long query → Dify Retrieval   │
  │                                     │
  │  Step 7: Generate Response          │
  │    └─ Claude AI with KB context     │
  │                                     │
  │  Step 8: Send Reply                 │
  │    └─ Zoho Desk API                 │
  │                                     │
  │  Step 9: Check Escalation           │
  │    ├─ Detect signals                │
  │    └─ Check auto_resolvable         │
  │                                     │
  │  Step 10: Create Jira (if needed)   │
  │    └─ Jira API with full context    │
  └────────┬────────────────────────────┘
           │
           ↓
  ┌─────────────────────────────────────┐
  │  Return Processing Result            │
  │  - Classification details            │
  │  - KB search results                 │
  │  - AI response text                  │
  │  - Jira ticket (if created)          │
  │  - Timeline with durations           │
  └────────┬────────────────────────────┘
           │
           ↓
  ┌─────────────────────────────────────┐
  │  TicketProcessingWidget (UI)         │
  │  - Real-time progress bar            │
  │  - Step-by-step timeline             │
  │  - Classification results            │
  │  - AI response preview               │
  │  - Jira link (if created)            │
  └─────────────────────────────────────┘

  ---
  🔑 Key Technologies

  | Technology      | Purpose                      | Example                              |
  |-----------------|------------------------------|--------------------------------------|
  | Zoho Desk       | Ticket management            | Creates tickets from customer emails |
  | Claude 4 Sonnet | AI classification & response | "This is MANUAL_ADMIN category"      |
  | Dify AI         | Knowledge base search        | Finds relevant help articles         |
  | Jira            | Escalation tracking          | Creates tasks for human agents       |
  | Next.js 15      | Backend & frontend           | Hosts webhook and UI                 |
  | TypeScript      | Type safety                  | Prevents runtime errors              |

  ---
  ⚙️ Configuration Required

  Environment Variables (.env.local)

  # Claude AI
  ANTHROPIC_API_KEY=sk-ant-api03-...

  # Zoho Desk
  ZOHO_ORG_ID=894225429
  ZOHO_CLIENT_ID=...
  ZOHO_CLIENT_SECRET=...
  ZOHO_REFRESH_TOKEN=...

  # Dify AI
  DIFY_KB_ID=81b248c9-0445-4cbb-a0ab-9df95a9512f0
  DIFY_API_KEY=dataset-...
  DIFY_CHAT_API_KEY=app-...

  # Jira
  JIRA_BASE_URL=https://your-domain.atlassian.net
  JIRA_EMAIL=your-email@example.com
  JIRA_API_TOKEN=...
  JIRA_PROJECT_KEY=AFR

  Zoho Desk Webhook Setup

  1. Go to Zoho Desk → Setup → Extensions → Webhooks
  2. Create webhook:
    - URL: https://your-app.com/api/zoho/webhook
    - Events: Ticket_Add, Ticket_Thread_Add
    - Channel: EMAIL only
  3. Save and activate

  ---
  📊 Performance Metrics

  | Step              | Average Time |
  |-------------------|--------------|
  | Extract Info      | 50ms         |
  | Get Conversations | 200ms        |
  | Classify Ticket   | 1,500ms      |
  | KB Search         | 1,200ms      |
  | Generate Response | 2,500ms      |
  | Send Reply        | 500ms        |
  | Create Jira       | 800ms        |
  | Total             | ~6.8 seconds |

  ---
  🎯 Example Scenarios

  Scenario A: Simple How-To Question (Auto-Resolved)

  Customer: "How do I upload a SCORM file?"
    ↓ Classify → SIMPLE_RESPONSE (auto_resolvable: true)
    ↓ KB Search → Finds SCORM upload guide
    ↓ AI Response → Step-by-step instructions
    ↓ Send Reply → Customer gets answer
    ✓ No Jira ticket needed

  Scenario B: Report Request (Direct to Jira)

  Customer: "Can you generate a user activity report for last month?"
    ↓ Classify → DATA_GENERATION (auto_resolvable: false)
    ↓ Skip KB Search
    ↓ Create Jira → Assign to reporting team
    ✓ Human handles report generation

  Scenario C: System Bug (Escalation)

  Customer: "Course completion not tracking for 20+ users"
    ↓ Classify → BACKEND_INVESTIGATION (auto_resolvable: false)
    ↓ KB Search → Finds troubleshooting guide
    ↓ AI Response → "I'll escalate to technical team"
    ↓ Send Reply → Customer informed
    ↓ Create Jira → Engineers investigate
    ✓ Escalated with full context

  ---
  This is the complete step-by-step explanation of how the Zoho Desk AI Support Agent works! Every email from a customer triggers this entire pipeline automatically, from classification to response
  generation to escalation.
