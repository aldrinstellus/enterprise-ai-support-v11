# E2E Test Queries Reference

**Enterprise AI Support V4**
**Last Updated**: January 4, 2025
**Test Suite**: Playwright E2E Tests
**Status**: 28/28 Passing (100%)

---

## Purpose

This document provides a comprehensive reference of all test queries used in the E2E test suite, organized by persona. Use this as a:

- **Quick reference** for manual testing and validation
- **Template** for adding new test cases
- **Documentation** of persona-specific interactions
- **Validation checklist** for query detection system updates

---

## C-Level Executive Persona

**Total Tests**: 8 (5 single-step + 1 multi-step flow)
**Demo URL**: http://localhost:3004/demo/c-level

### Single-Step Queries

| Test | Query | Expected Widget | Expected Content |
|------|-------|----------------|------------------|
| **Q1** | "Show me executive summary" | `executive-summary` | Executive Summary, SLA Performance, Customer Health |
| **Q2** | "Tell me more about Acme Corp" | `customer-risk-profile` | Acme Corporation, Risk |
| **Q3** | "Show me the SLA performance breakdown" | `sla-performance-chart` | SLA Performance |
| **Q4** | "Show me high-risk customers" | `customer-risk-list` | High-Risk Customers |
| **Q5** | "Show me ticket TICK-001" | `ticket-detail` | TICK-001 |

### Multi-Step Conversation Flow

**Q6-Q8: Schedule Executive Call** (3 steps)

| Step | Query | Expected Response/Widget | Notes |
|------|-------|--------------------------|-------|
| 1 | "Schedule executive call" | AI response: "Would you like me to check" | Confirmation request |
| 2 | "yes" | `meeting-scheduler` widget | Calendar interface |
| 3 | "book tomorrow at 1pm" | `meeting-confirmation` widget | Shows "1:00 PM" |

**File**: `tests/e2e/personas/c-level.spec.ts`

---

## CS Manager Persona

**Total Tests**: 9 (4 single-step + 1 multi-step flow + 3 button actions)
**Demo URL**: http://localhost:3004/demo/cs-manager

### Single-Step Queries

| Test | Query | Expected Widget | Expected Content |
|------|-------|----------------|------------------|
| **Q1** | "Show me my team's status" | `team-workload-dashboard` | Team Workload |
| **Q2** | "Show me Sarah's tickets" | `ticket-list` | Sarah's Tickets (personalized title) |
| **Q4** | "Draft a message to Acme Corp about the outage" | `message-composer` | Compose Message |

### Multi-Step Conversation Flow

**Q3: Schedule 1-on-1 with Marcus** (3 steps)

| Step | Query | Expected Response/Widget | Notes |
|------|-------|--------------------------|-------|
| 1 | "Schedule a 1-on-1 coaching session with Marcus" | AI response: "Would you like me to check" | Confirmation request |
| 2 | "yes" | `meeting-scheduler` widget | Calendar interface |
| 3 | "book tomorrow at 1pm" | `meeting-confirmation` widget | Shows "Marcus" as attendee |

### Interactive Button Actions

| Test | Widget | Button Text | Expected AI Response |
|------|--------|-------------|---------------------|
| **Q5** | `message-composer` | "Send Message" | "Message sent" |
| **Q6** | `message-composer` | "Save as Draft" | "message" (generic) |
| **Q7** | `message-composer` | "Save as Template" | "saved as template" |

**File**: `tests/e2e/personas/cs-manager.spec.ts`

---

## Support Agent Persona

**Total Tests**: 13 (9 single-step + 3 button actions)
**Demo URL**: http://localhost:3004/demo/support-agent

### Single-Step Queries

| Test | Query | Expected Widget | Expected Content |
|------|-------|----------------|------------------|
| **Q1** | "Good morning, what's on my plate today?" | `agent-dashboard` | My Dashboard (personalized) |
| **Q2** | "Show me ticket TICK-001" | `ticket-detail` | TICK-001 |
| **Q3** | "Help me prepare for the call with Acme Corp" | `call-prep-notes` | Call Preparation |
| **Q4** | "Draft a response for this angry customer" | `response-composer` | Response Composer |
| **Q8** | "Show me my tickets" | `ticket-list` | My Tickets (personalized) |
| **Q9** | "Find similar tickets I've resolved" | `similar-tickets-analysis` | Your Resolution Patterns |
| **Q10** | "Show me my performance stats" | `agent-performance-stats` | Your Performance |
| **Q11** | "How do I troubleshoot authentication issues?" | `knowledge-base-search` | Knowledge Base |
| **Q12** | "Open KB-107" | `knowledge-article` | KB-107 (dynamic ID extraction) |

### Interactive Button Actions

| Test | Widget | Button Text | Expected AI Response |
|------|--------|-------------|---------------------|
| **Q5** | `response-composer` | "Send Response" | "Response sent successfully" |
| **Q6** | `response-composer` | "Edit & Customize" | "response" (generic) |
| **Q7** | `response-composer` | "Regenerate" | "Regenerating response" |

**File**: `tests/e2e/personas/support-agent.spec.ts`

---

## Test Coverage Summary

### Overall Metrics
- **Total Tests**: 28
- **Pass Rate**: 100%
- **Execution Time**: 52.7 seconds
- **Parallel Workers**: 5

### Coverage by Type
- **Single-Step Queries**: 18 tests
- **Multi-Step Conversations**: 2 flows (6 steps total)
- **Interactive Button Actions**: 6 tests
- **Console Error Validation**: 3 tests (1 per persona)

### Widget Coverage (19 unique widgets)

| Widget Type | Personas | Test Count |
|-------------|----------|------------|
| `executive-summary` | C-Level | 1 |
| `customer-risk-profile` | C-Level | 1 |
| `customer-risk-list` | C-Level | 1 |
| `sla-performance-chart` | C-Level | 1 |
| `ticket-detail` | C-Level, Support Agent | 2 |
| `team-workload-dashboard` | CS Manager | 1 |
| `ticket-list` | CS Manager, Support Agent | 2 |
| `message-composer` | CS Manager | 3 (+ 3 button tests) |
| `meeting-scheduler` | C-Level, CS Manager | 2 |
| `meeting-confirmation` | C-Level, CS Manager | 2 |
| `agent-dashboard` | Support Agent | 1 |
| `call-prep-notes` | Support Agent | 1 |
| `response-composer` | Support Agent | 4 (+ 3 button tests) |
| `similar-tickets-analysis` | Support Agent | 1 |
| `agent-performance-stats` | Support Agent | 1 |
| `knowledge-base-search` | Support Agent | 1 |
| `knowledge-article` | Support Agent | 1 |

---

## Usage Instructions

### For Manual Testing

1. **Start Dev Server**: `npm run dev` (port 3004)
2. **Navigate to Persona**: Use demo URLs above
3. **Test Queries**: Copy queries from tables above
4. **Verify Widget**: Check expected widget renders
5. **Validate Content**: Confirm expected text appears

### For Adding New Test Cases

1. **Choose Persona**: Determine which persona(s) the query applies to
2. **Define Query Pattern**: Create natural language query
3. **Identify Widget**: Specify which widget should render
4. **Add Expected Content**: List key text/data to validate
5. **Update Test File**: Add to appropriate `tests/e2e/personas/*.spec.ts`
6. **Update This Reference**: Add row to relevant table above

### For Query Detection Validation

Use this reference to validate `/src/lib/query-detection.ts`:

1. **Pattern Matching**: Ensure all queries in this doc match detection patterns
2. **Persona Routing**: Verify persona-specific queries route correctly
3. **Widget Mapping**: Confirm query → widget mapping is accurate
4. **Priority Handling**: Check overlapping patterns resolve to correct widget

### For Regression Testing

Before deploying changes to query detection or widgets:

1. Run full E2E suite: `npm run test:e2e`
2. Verify 28/28 tests pass
3. Check test report: `tests/reports/playwright-report/`
4. Validate no console errors

---

## Query Detection Patterns

### Common Patterns by Intent

**Executive/Leadership Queries**:
- "show me executive"
- "board metrics"
- "high-risk customers"
- "SLA performance"

**Team Management Queries**:
- "team status"
- "workload"
- "[person]'s tickets"
- "schedule 1-on-1"

**Support Agent Queries**:
- "my tickets"
- "my dashboard"
- "ticket [ID]"
- "draft response"
- "knowledge base"
- "KB-[ID]"

**Multi-Step Triggers**:
- "schedule [meeting type]" → confirmation flow
- Button clicks → AI response + widget state change

---

## Notes

### Personalization Detection

The query detection system personalizes widget titles based on:
- **Agent name extraction**: "Show me Sarah's tickets" → "Sarah's Tickets"
- **Context inference**: "my tickets" (as agent) → "My Tickets"
- **Role-based defaults**: "team status" → persona-specific dashboard

### Dynamic ID Extraction

Some widgets support dynamic IDs:
- **Ticket Detail**: "Show me ticket TICK-001" extracts `TICK-001`
- **Knowledge Article**: "Open KB-107" extracts `KB-107`
- Pattern: Uppercase alphanumeric with hyphen (e.g., `[A-Z]+-\d+`)

### Button Action Testing

Interactive buttons are tested separately from widget rendering:
1. Widget renders via query
2. Button click simulated via `clickWidgetButton()`
3. AI response validated via `assertAIResponseContains()`
4. Widget may re-render with updated state

---

## Related Documentation

- **Test Results**: `TEST-RESULTS-2025-01-04.md`
- **Team Guide**: `E2E-TESTER-AGENT-TEAM-GUIDE.md`
- **Project Docs**: `CLAUDE.md`
- **Test Helpers**: `tests/e2e/helpers/`

---

**Generated**: January 4, 2025
**Project**: Enterprise AI Support V4
**Maintained By**: E2E Tester Agent
