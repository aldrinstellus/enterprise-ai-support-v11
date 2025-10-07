DEMO QUESTIONS

 E2E Test Queries by Persona

  C-Level Executive (8 tests)

  Single-Step Queries (5):
  1. Q1: "Show me executive summary" → Executive Summary Widget
  2. Q2: "Tell me more about Acme Corp" → Customer Risk Profile Widget
  3. Q3: "Show me the SLA performance breakdown" → SLA Performance Chart Widget
  4. Q4: "Show me high-risk customers" → Customer Risk List Widget
  5. Q5: "Show me ticket TICK-001" → Ticket Detail Widget

  Multi-Step Conversation (1 flow, 3 steps):
  6. Q6-Q8: Schedule Executive Call
  - Step 1: "Schedule executive call" → AI asks for confirmation
  - Step 2: "yes" → Meeting Scheduler Widget
  - Step 3: "book tomorrow at 1pm" → Meeting Confirmation Widget

  ---
  CS Manager (9 tests)

  Single-Step Queries (4):
  1. Q1: "Show me my team's status" → Team Workload Dashboard Widget
  2. Q2: "Show me Sarah's tickets" → Ticket List Widget (personalized title)
  3. Q4: "Draft a message to Acme Corp about the outage" → Message Composer Widget

  Multi-Step Conversation (1 flow, 3 steps):
  4. Q3: Schedule 1-on-1 with Marcus
  - Step 1: "Schedule a 1-on-1 coaching session with Marcus" → AI asks for confirmation
  - Step 2: "yes" → Meeting Scheduler Widget
  - Step 3: "book tomorrow at 1pm" → Meeting Confirmation Widget (with "Marcus" attendee)

  Interactive Button Actions (3):
  5. Q5: Click "Send Message" button → "Message sent" confirmation
  6. Q6: Click "Save as Draft" button → Generic message confirmation
  7. Q7: Click "Save as Template" button → "saved as template" confirmation

  ---
  Support Agent (13 tests)

  Single-Step Queries (9):
  1. Q1: "Good morning, what's on my plate today?" → Agent Dashboard Widget ("My Dashboard")
  2. Q2: "Show me ticket TICK-001" → Ticket Detail Widget
  3. Q3: "Help me prepare for the call with Acme Corp" → Call Prep Notes Widget
  4. Q4: "Draft a response for this angry customer" → Response Composer Widget
  5. Q8: "Show me my tickets" → Ticket List Widget ("My Tickets")
  6. Q9: "Find similar tickets I've resolved" → Similar Tickets Analysis Widget ("Your Resolution Patterns")
  7. Q10: "Show me my performance stats" → Agent Performance Stats Widget ("Your Performance")
  8. Q11: "How do I troubleshoot authentication issues?" → Knowledge Base Search Widget
  9. Q12: "Open KB-107" → Knowledge Article Widget (dynamic ID extraction)

  Interactive Button Actions (3):
  10. Q5: Click "Send Response" button → "Response sent successfully" confirmation
  11. Q6: Click "Edit & Customize" button → Generic "response" confirmation
  12. Q7: Click "Regenerate" button → "Regenerating response" confirmation

