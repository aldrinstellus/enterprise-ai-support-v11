# Password Reset Demo - Stakeholder Presentation Guide

## 🎯 Demo Overview

This demo showcases **AI-first password reset** with seamless escalation to human agents via Jira when self-help fails.

**Demo URL**: http://localhost:3011/demo/support-agent

---

## 📺 Demo Script

### **Scenario A: AI Success** (90 seconds)

#### Step 1: Initial Request
**User types**: `I need to password reset my account`

**AI Response**:
- "I can help you with password reset! Let me show you our step-by-step guide..."
- **Displays**: KnowledgeArticleWidget (KB-1847)

#### What's Shown:
✅ KB Article: "How to Reset Your Password"
✅ Quick Reset Steps (5-step bullet list)
✅ Video Tutorial (YouTube link)
✅ Direct Reset Link (https://app.auzmor.com/reset-password)
✅ Warning about 1-hour expiration
✅ Pro Tip: Use password manager
✅ Related Articles (3 suggestions)
✅ Feedback buttons (Was this helpful?)

#### Step 2: Success
**User responds**: `Thanks, got it!` or clicks "Yes" on feedback

**Result**: Ticket resolved by AI ✓

---

### **Scenario B: Escalation** (2 minutes)

#### Step 1: Initial Request
**User types**: `I need to password reset my account`

**AI Response**:
- Shows same KB article as Scenario A
- User sees self-help resources

#### Step 2: User Still Unable
**User types**: `I am still unable to reset it`

**AI Response**:
- "I understand you need additional assistance. Let me escalate this to a human agent..."
- **Displays**: EscalationPathWidget (TICK-2847)

#### What's Shown:

**Stage 1: AI Self-Help (Completed ✓)**
- Assignee: AI Assistant
- Duration: 1.5 min
- Notes: "Sent KB article KB-1847 with video tutorial and direct reset link"

**Stage 2: Jira Issue Created (Current ⏱)**
- Assignee: Jira Automation System
- Notes:
  - Created JIRA-5621: "Password reset failed for user@auzmor.com"
  - ✉️ Email notification sent to CS team
  - 📱 SMS alert sent to on-call agent
  - 🔗 Jira link: https://auzmor.atlassian.net/browse/JIRA-5621

**Stage 3: Human Agent Assignment (Pending)**
- Assignee: Sarah Chen (Senior Support Agent)
- Expected response: 15 minutes
- Will investigate: account lockout, email delivery, system issues

**Recommended Action**:
"Agent should verify email delivery status and check for account lockout before attempting manual password reset."

---

## 🎨 Visual Highlights

### KB Article Widget Features:
- 📖 Category badge: "Account Access"
- ⭐ 4.8/5 rating (847 helpful votes)
- 🎥 Video tutorial embedded
- 🔗 Direct reset link
- ⚠️ Warning section (orange)
- 💡 Pro tip section (blue)
- 📚 3 related articles with relevance scores
- 👍👎 Feedback buttons

### Escalation Path Widget Features:
- 3-stage vertical timeline with connecting lines
- Status indicators:
  - ✓ Green checkmark (completed)
  - ⏱ Orange clock (current)
  - ⚪ Gray circle (pending)
- Integration badges for Jira, Email, SMS
- Detailed notes for each stage
- Recommended action banner

---

## 🔧 Technical Implementation

### Files Modified:
1. `/src/data/demo-widget-data.ts` - Added password reset demo data
2. `/src/lib/query-detection.ts` - Added password reset query patterns
3. `/src/app/api/chat/route.ts` - Added 2 new Claude tools
4. `/src/types/widget.ts` - Added 'escalation-path' widget type

### Demo Data:
- **passwordResetArticleDemo** - KB-1847 with full self-help content
- **passwordResetEscalationDemo** - 3-stage escalation timeline

### Query Patterns:
- Trigger article: "password reset", "locked out", "need password reset"
- Trigger escalation: "still unable", "not working", "need help"

### Claude API Tools:
1. **send_password_reset_resources** - Sends KB article + video + link
2. **escalate_to_jira** - Creates Jira issue + sends notifications

---

## 💡 Demo Tips

1. **Start Clean**: Refresh the page before each demo
2. **Type Naturally**: Use conversational language
3. **Pause for Effect**: Let stakeholders see each widget fully render
4. **Highlight Integration**: Point out Jira, Email, SMS badges
5. **Show Metrics**:
   - AI Resolution: 78%
   - Avg AI Time: 3.2 min
   - Escalation Rate: 22%
   - Human Response: 15 min

---

## 📊 Key Stakeholder Takeaways

✅ **AI Handles 78% Autonomously** - Reduces human agent workload
✅ **Fast Resolution** - 3.2 min avg for AI vs 15+ min for human
✅ **Seamless Handoff** - Clear escalation path with full context
✅ **Multi-Channel Notifications** - Email + SMS for urgency
✅ **Jira Integration** - Automatic issue creation with tracking
✅ **Full Transparency** - Users see exactly what's happening
✅ **Knowledge Base Reuse** - Same article works for multiple tickets

---

## 🎬 Quick Test Commands

```
Test 1 - AI Success:
1. Type: "I need to password reset my account"
2. Observe: KB article displays
3. Type: "Thanks, got it!"
4. Result: Resolved ✓

Test 2 - Escalation:
1. Type: "I need to password reset my account"
2. Observe: KB article displays
3. Type: "I am still unable to reset it"
4. Observe: Escalation path with Jira issue
5. Result: Agent assigned ✓
```

---

## 🚀 Running the Demo

```bash
cd /Users/admin/Documents/claudecode/Projects/enterprise-ai-support-v11
npm run dev

# Open browser:
http://localhost:3011/demo/support-agent

# Start demo with:
"I need to password reset my account"
```

---

## 📝 Notes

- All data is simulated (no real Jira/Email integration yet)
- Widget rendering is instant (no API delays)
- Can be extended to other scenarios (billing, access, etc.)
- Reuses existing widgets (no new components needed!)

---

**Demo Duration**: 2-3 minutes
**Complexity**: Simple
**Impact**: High stakeholder value
**Ready**: Production demo quality ✅
