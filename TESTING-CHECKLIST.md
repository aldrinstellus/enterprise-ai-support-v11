# ✅ TESTING CHECKLIST - V6 Duplicate Cleanup

**App URL**: http://localhost:3004
**Status**: 🟡 Ready for Testing

---

## 🎯 PHASE 1: Regression Testing (Your 22 Working Questions)

### C-LEVEL EXECUTIVE (7 questions)
Navigate to: http://localhost:3004/demo/c-level

- [ ] 1. Show me executive summary
- [ ] 2. Show me the detailed analytics
- [ ] 3. Show me the SLA performance breakdown
- [ ] 4. Show me high-risk customers
- [ ] 5. Tell me more about Acme Corp
- [ ] 6. Show me ticket TICK-001
- [ ] 7. Schedule executive call → book tomorrow at 1pm

**Expected**: ✅ All 7 questions work exactly as before

---

### CS MANAGER (6 questions)
Navigate to: http://localhost:3004/demo/cs-manager

- [ ] 1. Show me my team's status
- [ ] 2. Who are the top and bottom performers?
- [ ] 3. Show me Sarah's tickets
- [ ] 4. Schedule a 1-on-1 coaching session with Marcus → book tomorrow at 1pm
- [ ] 5. Show me all high-risk customers
- [ ] 6. Draft a message to Acme Corp about the outage → send the message

**Expected**: ✅ All 6 questions work exactly as before

---

### SUPPORT AGENT (9 questions)
Navigate to: http://localhost:3004/demo/support-agent

- [ ] 1. Good morning, what's on my plate today?
- [ ] 2. Show me my performance stats
- [ ] 3. Show me my tickets
- [ ] 4. Show me ticket TICK-001
- [ ] 5. Find similar tickets I've resolved
- [ ] 6. How do I troubleshoot authentication issues?
- [ ] 7. Open KB-107
- [ ] 8. Draft a response for this angry customer → send the response
- [ ] 9. Help me prepare for the call with Acme Corp

**Expected**: ✅ All 9 questions work exactly as before

---

## 🆕 PHASE 2: New Unique Widgets (3 widgets to test)

### C-LEVEL EXECUTIVE (1 new widget)
Navigate to: http://localhost:3004/demo/c-level

- [ ] **Q1**: Show me our performance trends over the last week
  - **Widget**: performance-trends
  - **Expected**: Multi-line chart with 3 metrics (Response Time, Resolution Time, Satisfaction)
  - **Data**: 7 days (Dec 13-19)
  - **Validation**:
    - [ ] Chart renders without errors
    - [ ] 3 colored lines visible
    - [ ] Legend displays correctly
    - [ ] Hover states work

---

### CS MANAGER (2 new widgets)
Navigate to: http://localhost:3004/demo/cs-manager

- [ ] **Q1**: Compare agent performance for this month
  - **Widget**: agent-performance-comparison
  - **Expected**: Agent ranking with performance badges
  - **Validation**:
    - [ ] Widget renders without errors
    - [ ] Agents ranked correctly
    - [ ] Performance metrics display
    - [ ] Badges visible (Top Performer, etc.)

- [ ] **Q2**: What critical tickets need attention?
  - **Widget**: ticket-list
  - **Expected**: Critical tickets table with SLA indicators
  - **Validation**:
    - [ ] Widget renders without errors
    - [ ] Tickets display in table
    - [ ] Priority colors correct
    - [ ] SLA status badges visible

---

## ⚠️ PHASE 3: Borderline Cases (Optional - 2 queries)

### CS MANAGER
Navigate to: http://localhost:3004/demo/cs-manager

- [ ] **Q1**: Show me the current team workload distribution
  - **Compare with**: "Show me my team's status" (existing working query)
  - **Decision**:
    - [ ] Same result → Mark as duplicate
    - [ ] Different result → Keep both

- [ ] **Q2**: Show me all at-risk customers (new query)
  - **Compare with**: "Show me all high-risk customers" (existing working query #5)
  - **Decision**:
    - [ ] Same result → Mark as duplicate
    - [ ] Different result → Keep both

---

## 📊 TESTING SUMMARY

**Phase 1 Result**: ____ / 22 passed (Expected: 22/22 = 100%)
**Phase 2 Result**: ____ / 3 passed (Expected: 3/3 = 100%)
**Phase 3 Result**: ____ duplicates found

**Overall Status**:
- [ ] ✅ All tests passed - Ready to commit
- [ ] ⚠️ Minor issues - Document and fix
- [ ] ❌ Critical failures - Rollback cleanup

---

## 🐛 Issue Tracking

If any test fails, document here:

### Test #___ Failed
- **Query**: _______________________
- **Persona**: _____________________
- **Error**: _______________________
- **Expected**: ____________________
- **Actual**: ______________________
- **Console Errors**: ______________

---

## ✅ Sign-off

**Tested By**: __________________
**Date**: __________________
**Status**: [ ] PASS / [ ] FAIL
**Notes**: _________________________________________________

---

**Next Step After Testing**: If all tests pass, commit with:
```bash
git add .
git commit -m "cleanup: remove 6 duplicate Q&A entries (55% redundancy reduction)"
```
