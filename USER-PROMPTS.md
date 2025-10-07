# 🎯 User Test Prompts - Enterprise AI Support V2

**Complete testing guide for all 4 personas**

This document contains all test queries organized by persona to help you thoroughly test the application's features, visualizations, and role-based capabilities.

---

## 📋 Quick Reference

| Persona | Role | Badge Color | Quick Actions | Demo Scenarios |
|---------|------|-------------|---------------|----------------|
| **Aldrin** | System Administrator | 🟠 Orange | 7 | 12 prompts |
| **Sarah Chen** | Chief Executive Officer | 🟣 Purple | 6 | 12 prompts |
| **Michael Torres** | Customer Success Manager | 🔵 Teal | 8 | 12 prompts |
| **Alex Rivera** | Senior Support Engineer | 🟢 Green | 6 | 12 prompts |

**Total**: 27 Quick Actions, 48 Demo Scenarios

---

## 🛡️ ADMIN - Aldrin (System Administrator)

**Badge**: Orange `ADMIN` badge with Shield icon
**Access Level**: Full system access (`permissions: ['*']`)
**Email**: aldrin@atc.xyz

### Quick Actions (Click to Auto-Fill)

1. **System Health** (98% badge)
   ```
   Show me system health and performance metrics
   ```

2. **All User Activity** (847 badge)
   ```
   Show me all user activity across the platform today
   ```

3. **Critical Alerts** (5 badge - red)
   ```
   Show me all critical alerts across all roles
   ```

4. **Performance Metrics** (Live badge)
   ```
   Show me real-time performance metrics for all services
   ```

5. **Configuration** (12 badge)
   ```
   Show me system configuration and integration settings
   ```

6. **Security Audit** (NEW badge)
   ```
   Show me recent security audit logs and access attempts
   ```

7. **User Management** (248 badge)
   ```
   Show me all users and their access levels
   ```

### Demo Scenarios by Category

#### System Administration
```
Show me system health dashboard
```
```
Which integrations need attention?
```
```
Security audit for last 24 hours
```
```
User access report for compliance
```

#### Cross-Role Analytics
```
Compare performance across all departments
```
```
Show me aggregate metrics for executive summary
```
```
Which teams have the highest workload?
```
```
Platform-wide SLA performance
```

#### Configuration
```
Show me all active integrations
```
```
Check API rate limits and usage
```
```
Review webhook configurations
```
```
Database performance metrics
```

### Expected Outputs
- **System dashboards** with health metrics
- **User activity logs** across all roles
- **Security audit reports** with access attempts
- **Performance charts** (CPU, memory, response times)
- **Integration status** for Zoho, Jira, Slack, Calendar
- **Cross-role analytics** comparing all departments

---

## 📈 C-LEVEL - Sarah Chen (Chief Executive Officer)

**Badge**: Purple `C-LEVEL` badge with TrendingUp icon
**Access Level**: Executive dashboard access
**Email**: sarah.chen@company.com

### Quick Actions (Click to Auto-Fill)

1. **SLA Performance** (92% badge - green)
   ```
   Show me SLA performance dashboard for this quarter
   ```

2. **Churn Risk** (5 badge - red)
   ```
   Which customers are at highest risk of churning?
   ```

3. **Executive Summary** (Q4 badge)
   ```
   Generate comprehensive executive dashboard summary
   ```

4. **Board Metrics** (Ready badge)
   ```
   Prepare metrics for board meeting presentation
   ```

5. **High-Value Accounts** (18 badge)
   ```
   Show me status of top 20 high-value customer accounts
   ```

6. **Strategic Initiatives** (8 badge)
   ```
   Show me progress on strategic initiatives and OKRs
   ```

### Demo Scenarios by Category

#### Executive Overview
```
Show me SLA performance for Q4 2025
```
```
Which customers are at risk of churning?
```
```
Executive dashboard summary for board meeting
```
```
Revenue impact analysis from support tickets
```

#### Customer Health
```
Show me customer satisfaction scores
```
```
Top 10 accounts by revenue with health scores
```
```
Escalation trends over last 3 months
```
```
Customer retention metrics and forecasts
```

#### Strategic Planning
```
Show me resource allocation efficiency
```
```
Team capacity vs demand projections
```
```
Integration ROI analysis
```
```
Competitive positioning from customer feedback
```

### Expected Outputs
- **Executive dashboards** with KPIs and trends
- **Customer health scores** with churn risk analysis
- **SLA performance charts** (line graphs, heatmaps)
- **Revenue impact reports** tied to support metrics
- **Board-ready presentations** with key metrics
- **Strategic initiative progress** with OKR tracking

---

## 👥 CS MANAGER - Michael Torres (Customer Success Manager)

**Badge**: Teal `CS MANAGER` badge with Users icon
**Access Level**: Team operations and customer management
**Email**: michael.torres@company.com

### Quick Actions (Click to Auto-Fill)

1. **Priority Customers** (12 badge - red)
   ```
   Show me all high-priority customers needing attention
   ```

2. **Agent Performance** (This Week badge)
   ```
   Show me agent performance metrics for this week
   ```

3. **Most Slacking Agent** (! badge)
   ```
   Who is my most slacking agent this week?
   ```

4. **Top Performing Agent** (⭐ badge - green)
   ```
   Who is my top performing agent this week?
   ```

5. **Workload Balance** (View badge)
   ```
   Show me agent workload distribution and recommend reassignments
   ```

6. **SLA Breach Alerts** (3 badge - red)
   ```
   Show me tickets at risk of SLA breach
   ```

7. **Team Capacity** (78% badge)
   ```
   Show me team capacity and forecast for next week
   ```

8. **Escalation Queue** (7 badge)
   ```
   Show me all escalated tickets requiring manager attention
   ```

### Demo Scenarios by Category

#### Team Performance
```
Show me agent performance for this week
```
```
Who is my most slacking agent?
```
```
Who is my top performing agent?
```
```
Compare agent metrics: resolution time vs customer satisfaction
```

#### Customer Management
```
Which customers need immediate attention?
```
```
Show me all high-priority tickets by customer
```
```
Customers with multiple open tickets
```
```
Accounts with declining satisfaction scores
```

#### Operations
```
Recommend ticket reassignments for workload balance
```
```
Show me SLA breach risks for next 24 hours
```
```
Team capacity planning for Q1 2026
```
```
Escalation trends and root cause analysis
```

### Expected Outputs
- **Agent performance dashboards** with rankings
- **Workload distribution charts** (bar charts, pie charts)
- **Customer priority lists** with risk indicators
- **SLA breach alerts** with countdown timers
- **Team capacity forecasts** with utilization rates
- **Escalation queues** with root cause analysis
- **Agent comparison reports** (best/worst performers)

---

## 🎧 SUPPORT AGENT - Alex Rivera (Senior Support Engineer)

**Badge**: Green `SUPPORT AGENT` badge with Headphones icon
**Access Level**: Personal queue and assigned tickets
**Email**: alex.rivera@company.com

### Quick Actions (Click to Auto-Fill)

1. **My Open Tickets** (18 badge)
   ```
   Show me all my currently open support tickets
   ```

2. **AI-Resolved Today** (23 badge - green)
   ```
   How many tickets did AI resolve for me today?
   ```

3. **Escalated to Me** (5 badge - red)
   ```
   Show me tickets escalated to me that need my attention
   ```

4. **Today's Meetings** (3 badge)
   ```
   Show me my scheduled customer meetings for today
   ```

5. **Jira Sync Status** (✓ badge)
   ```
   Show me status of Jira issues linked to my tickets
   ```

6. **High-Priority Alerts** (7 badge - red)
   ```
   Show me my urgent tickets and critical alerts
   ```

### Demo Scenarios by Category

#### My Workload
```
Show me my tickets received in last 24 hours
```
```
How many tickets did AI resolve for me?
```
```
What are my urgent tickets right now?
```
```
My ticket resolution rate this week
```

#### Customer Interactions
```
Prep notes for my 2 PM customer call
```
```
Show me conversation history with TechCorp Solutions
```
```
Draft response for ticket DESK-1002
```
```
Schedule follow-up meeting with CloudNine Technologies
```

#### Productivity
```
Link ticket DESK-1002 to Jira issue PROJ-302
```
```
Show me tickets I can close today
```
```
AI-suggested canned responses for common issues
```
```
My performance metrics vs team average
```

### Expected Outputs
- **Personal ticket queue** with priority sorting
- **AI automation metrics** (tickets resolved by AI)
- **Escalated ticket lists** requiring immediate action
- **Calendar integration** showing today's meetings
- **Jira sync status** with linked issues
- **Customer interaction history** and conversation threads
- **Performance dashboards** (personal vs team average)
- **AI-suggested responses** for common ticket types

---

## 🧪 Testing Features Guide

### Conversation Management Features

#### Test Pin/Unpin
1. Ask any query as any persona
2. In sidebar, click **3-dot menu** on the conversation
3. Select **"Pin to Top"**
4. Verify conversation moves to **Pinned section**
5. Click 3-dot menu again and select **"Unpin"**
6. Verify it returns to **Recent section**

#### Test Archive/Unarchive
1. Click **3-dot menu** on any conversation
2. Select **"Archive"**
3. Verify conversation moves to **Archived section** (collapsed)
4. Click **"Archived (N)"** to expand
5. Click 3-dot menu and select **"Unarchive"**
6. Verify it returns to **Recent section**

#### Test Rename
1. Click **3-dot menu** on any conversation
2. Select **"Rename"**
3. Edit inline (shows input field)
4. Press **Enter** to save or **Escape** to cancel
5. Verify new title appears

#### Test Export
1. Click **3-dot menu** on any conversation
2. Select **"Export as Text"** or **"Export as JSON"**
3. Verify file downloads with correct format
4. Open file to confirm content

#### Test Copy to Clipboard
1. Click **3-dot menu** on any conversation
2. Select **"Copy to Clipboard"**
3. Paste in notepad to verify full conversation copied

#### Test Share Link
1. Click **3-dot menu** on any conversation
2. Select **"Share Link"**
3. Verify URL copied to clipboard
4. Check URL format: `http://localhost:3004/?conversation={id}`

#### Test Delete
1. Click **3-dot menu** on any conversation
2. Select **"Delete"**
3. Confirm deletion in prompt
4. Verify conversation removed from all lists

### Message Action Bar Features

#### Test Copy Message
1. Hover over any **AI response** message
2. Click **Copy** button in action bar
3. Verify "Copied" feedback appears for 2 seconds
4. Paste in notepad to confirm

#### Test Regenerate
1. Hover over any **AI response** message
2. Click **Regenerate** button
3. Verify new response generates with same query
4. Check typewriter effect plays again

#### Test Like/Dislike
1. Hover over any **AI response** message
2. Click **👍 Like** or **👎 Dislike**
3. Verify button fills with color
4. Click again to toggle off

#### Test Save Query (User Messages)
1. Hover over any **user query** message
2. Click **⭐ Star** button
3. Verify star fills and query saves
4. Check **Saved Queries** section in sidebar

### Persona Switching

#### Test Persona Switch
1. Click bottom **profile badge** (shows current persona)
2. Select different persona from dropdown
3. Verify:
   - Badge color changes
   - Name and role update
   - Quick Actions change
   - Saved Queries section shows persona-specific queries
   - Conversations show persona-specific history

#### Test Persona Persistence
1. Switch to different persona
2. Refresh page (F5)
3. Verify persona selection persisted

### Typewriter Effect

#### Test Streaming
1. Ask any query
2. Watch response appear character-by-character
3. Verify smooth animation (~200 chars/sec)
4. Verify action bar appears after completion

---

## 📊 Sample Testing Flow

### Complete Feature Test (15 minutes)

1. **Start as Admin**
   - Ask: "Show me system health dashboard"
   - Save query with star button
   - Switch to C-Level persona

2. **As C-Level**
   - Ask: "Show me SLA performance for Q4 2025"
   - Pin this conversation
   - Copy the AI response
   - Switch to CS Manager persona

3. **As CS Manager**
   - Ask: "Who is my top performing agent this week?"
   - Ask: "Who is my most slacking agent?"
   - Like the first response, dislike the second
   - Rename conversation to "Weekly Agent Review"
   - Switch to Support Agent persona

4. **As Support Agent**
   - Ask: "Show me all my currently open support tickets"
   - Click **Regenerate** to get updated data
   - Archive this conversation
   - Export as JSON

5. **Final Checks**
   - Verify Pinned section shows C-Level conversation
   - Verify Archived section shows Support Agent conversation
   - Verify Saved Queries shows Admin query
   - Switch back to Admin and verify history

---

## 🎨 Expected UI Behavior

### Sidebar Organization
```
📌 Pinned (N)
  └─ [Conversations with pin icon]

🕐 Recent Conversations
  └─ [Last 10 non-pinned, non-archived conversations]

📦 Archived (N) [Collapsible]
  └─ [Archived conversations when expanded]

⭐ Saved Queries
  └─ [Starred user queries for current persona]
```

### Action Bar Appearance
- **User Messages**: Star button on right (hover to show)
- **AI Messages**: Full action bar (Copy, Regenerate, Like, Dislike, Timestamp)
- **On Hover**: Action bars fade in with `opacity-0 group-hover:opacity-100`
- **Icons**: Small (3.5w × 3.5h) with subtle hover effects

### Conversation Menu
- **Position**: Top-right of conversation card
- **Icon**: Three vertical dots (MoreVertical)
- **Dropdown**: Appears on click with 8 options
- **Inline Rename**: Replaces title with input field

---

## 🔧 Troubleshooting Tips

### If features don't work:
1. **Check browser console** for errors (F12 → Console)
2. **Verify localStorage** (Application → Local Storage)
3. **Refresh page** to clear state
4. **Check persona** - some features are role-specific
5. **Verify dev server** is running on port 3004

### To reset all data:
```javascript
// Open browser console (F12) and run:
localStorage.clear();
location.reload();
```

---

## 📝 Notes

- All data is **demo mode** - no real integrations
- **LocalStorage** persists data per persona
- Conversations auto-save every 2 seconds
- Maximum **10 recent conversations** shown (others are archived)
- **Typewriter effect** runs at ~200 characters/second
- All personas can access their own data only (except Admin)

---

**Version**: 1.1.0
**Last Updated**: October 1, 2025
**App URL**: http://localhost:3004
