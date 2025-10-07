# 🧪 Post-Deployment Testing Checklist

## 📋 Test After Deployment to Vercel

After your app is deployed to `https://your-domain.vercel.app`, run through these tests to verify everything works in production.

---

## 🌐 Environment Tests

### 1. Basic Connectivity
- [ ] Main page loads: `https://your-domain.vercel.app/`
- [ ] C-Level page loads: `https://your-domain.vercel.app/demo/c-level`
- [ ] CS Manager page loads: `https://your-domain.vercel.app/demo/cs-manager`
- [ ] Support Agent page loads: `https://your-domain.vercel.app/demo/support-agent`
- [ ] No console errors in browser DevTools
- [ ] All assets load (images, fonts, CSS)

### 2. Environment Variables
- [ ] ANTHROPIC_API_KEY is working (AI responds)
- [ ] DATABASE_URL is connected (if using Prisma)
- [ ] No "Missing environment variable" errors in Vercel logs

---

## 🎭 C-Level Executive Tests (8 tests)

**URL**: `https://your-domain.vercel.app/demo/c-level`

### Single-Step Queries (5 tests)
- [ ] **Q1**: "Show me executive summary" → ✅ Executive Summary Widget renders
- [ ] **Q2**: "Tell me more about Acme Corp" → ✅ Customer Risk Profile Widget
- [ ] **Q3**: "Show me the SLA performance breakdown" → ✅ SLA Performance Chart
- [ ] **Q4**: "Show me high-risk customers" → ✅ Customer Risk List Widget
- [ ] **Q5**: "Show me ticket TICK-001" → ✅ Ticket Detail Widget

### Multi-Step Conversation (3 steps)
- [ ] **Q6**: "Schedule executive call" → ✅ AI asks for confirmation
- [ ] **Q7**: "yes" → ✅ Meeting Scheduler Widget appears
- [ ] **Q8**: "book tomorrow at 1pm" → ✅ Meeting Confirmation Widget

**Expected**: 8/8 tests pass

---

## 👔 CS Manager Tests (9 tests)

**URL**: `https://your-domain.vercel.app/demo/cs-manager`

### Single-Step Queries (4 tests)
- [ ] **Q1**: "Show me my team's status" → ✅ Team Workload Dashboard Widget
- [ ] **Q2**: "Show me Sarah's tickets" → ✅ Ticket List Widget (title: "Sarah's Tickets")
- [ ] **Q3**: "Schedule a 1-on-1 coaching session with Marcus" → ✅ AI asks for confirmation
- [ ] **Q4**: "Draft a message to Acme Corp about the outage" → ✅ Message Composer Widget

### Multi-Step Conversation (3 steps)
- [ ] **Step 1**: "Schedule a 1-on-1 coaching session with Marcus" → ✅ AI confirmation
- [ ] **Step 2**: "yes" → ✅ Meeting Scheduler Widget (Marcus in attendees)
- [ ] **Step 3**: "book tomorrow at 1pm" → ✅ Meeting Confirmation

### Interactive Button Actions (3 tests)
- [ ] **Q5**: Click "Send Message" button → ✅ "Message sent" confirmation
- [ ] **Q6**: Click "Save as Draft" button → ✅ Draft saved confirmation
- [ ] **Q7**: Click "Save as Template" button → ✅ Template saved confirmation

**Expected**: 9/9 tests pass

---

## 🎧 Support Agent Tests (13 tests)

**URL**: `https://your-domain.vercel.app/demo/support-agent`

### Single-Step Queries (9 tests)
- [ ] **Q1**: "Good morning, what's on my plate today?" → ✅ Agent Dashboard Widget ("My Dashboard")
- [ ] **Q2**: "Show me ticket TICK-001" → ✅ Ticket Detail Widget
- [ ] **Q3**: "Help me prepare for the call with Acme Corp" → ✅ Call Prep Notes Widget
- [ ] **Q4**: "Draft a response for this angry customer" → ✅ Response Composer Widget
- [ ] **Q5**: "Show me my tickets" → ✅ Ticket List Widget ("My Tickets")
- [ ] **Q6**: "Find similar tickets I've resolved" → ✅ Similar Tickets Analysis Widget
- [ ] **Q7**: "Show me my performance stats" → ✅ Agent Performance Stats Widget
- [ ] **Q8**: "How do I troubleshoot authentication issues?" → ✅ Knowledge Base Search Widget
- [ ] **Q9**: "Open KB-107" → ✅ Knowledge Article Widget (KB-107)

### Interactive Button Actions (3 tests)
- [ ] **Q10**: Click "Send Response" button → ✅ "Response sent successfully"
- [ ] **Q11**: Click "Edit & Customize" button → ✅ Response customization
- [ ] **Q12**: Click "Regenerate" button → ✅ "Regenerating response"

**Expected**: 13/13 tests pass

---

## 🎨 UI/UX Tests

### Responsive Design
- [ ] Desktop (1920x1080) - Layout looks good
- [ ] Tablet (768x1024) - Responsive adjustments work
- [ ] Mobile (375x667) - Touch-friendly, readable
- [ ] Sidebar collapse works on mobile
- [ ] Widgets stack properly on small screens

### Animations
- [ ] Chat typewriter effect works smoothly
- [ ] Widget loading skeleton appears
- [ ] Widget fade-in animation works
- [ ] Background image carousel rotates (15s intervals)
- [ ] Persona badge transitions smoothly

### Navigation
- [ ] Persona switcher works in sidebar
- [ ] Quick actions clickable and functional
- [ ] Conversation list shows/hides correctly
- [ ] URL changes when switching personas
- [ ] Back/forward browser buttons work

---

## 💾 Data Persistence Tests

### LocalStorage
- [ ] Conversations save after sending messages
- [ ] Recent conversations appear in sidebar
- [ ] Sidebar open/closed state persists on refresh
- [ ] Persona selection persists across sessions
- [ ] Saved queries appear correctly

### Conversation Management
- [ ] Create new conversation works
- [ ] Rename conversation works
- [ ] Pin conversation moves to top
- [ ] Archive conversation hides it
- [ ] Delete conversation removes it
- [ ] Export conversation (JSON/Text) downloads

---

## ⚡ Performance Tests

### Load Times
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Total page load < 2s
- [ ] Widget rendering < 500ms
- [ ] AI response streaming starts < 1s

### Lighthouse Scores (Chrome DevTools)
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 80

**Run**: Chrome DevTools → Lighthouse → Generate Report

---

## 🔒 Security Tests

### Headers (Check in DevTools → Network → Response Headers)
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `X-Frame-Options: DENY` present
- [ ] `X-XSS-Protection: 1; mode=block` present
- [ ] `Referrer-Policy: origin-when-cross-origin` present

### API Security
- [ ] API routes require proper authentication (if implemented)
- [ ] ANTHROPIC_API_KEY not exposed in client code
- [ ] DATABASE_URL not visible in browser
- [ ] No sensitive data in console logs

---

## 🐛 Error Handling Tests

### Edge Cases
- [ ] Empty query submission → Shows placeholder or error
- [ ] Very long message (500+ chars) → Handles correctly
- [ ] Special characters in query → No crashes
- [ ] Network offline → Graceful error message
- [ ] API timeout → Shows retry option
- [ ] Invalid widget data → Shows error widget

### Console Errors
- [ ] No React hydration errors
- [ ] No "key" prop warnings
- [ ] No unhandled promise rejections
- [ ] No CORS errors
- [ ] No 404s for assets

---

## 🎯 Critical Path Test (Full Flow)

### C-Level Executive Journey
1. [ ] Land on `/demo/c-level`
2. [ ] See welcome state with centered input
3. [ ] Type "Show me executive summary"
4. [ ] AI responds with Executive Summary Widget
5. [ ] Input transitions to bottom-fixed position
6. [ ] Click "Show me high-risk customers" quick action
7. [ ] Customer Risk List Widget renders
8. [ ] Click "New Conversation"
9. [ ] Chat resets, input returns to center
10. [ ] Previous conversation appears in sidebar

**Time**: Should complete in < 30 seconds

---

## 📊 Vercel Deployment Checks

### Vercel Dashboard
- [ ] Deployment status: "Ready"
- [ ] Build logs show no errors
- [ ] Function logs show API calls working
- [ ] Analytics tab shows page views (if enabled)
- [ ] Environment variables set correctly

### Production URL
- [ ] Custom domain working (if configured)
- [ ] HTTPS certificate valid
- [ ] No mixed content warnings
- [ ] Sitemap accessible (if generated)

---

## ✅ Test Summary Template

After testing, fill this out:

```
🧪 DEPLOYMENT TEST RESULTS
========================

Deployment URL: https://_____.vercel.app
Test Date: _____
Tester: _____

Environment:
✅/❌ Main page loads
✅/❌ All demo pages accessible
✅/❌ AI responds correctly
✅/❌ Environment variables configured

C-Level Tests: __/8 passed
CS Manager Tests: __/9 passed
Support Agent Tests: __/13 passed

UI/UX: ✅/❌
Performance: ✅/❌
Security: ✅/❌
Error Handling: ✅/❌

TOTAL SCORE: __/30 tests passed

Issues Found:
1. _____
2. _____

Next Steps:
1. _____
2. _____
```

---

## 🚨 Common Issues & Fixes

### Issue: AI Not Responding
**Fix**: Check ANTHROPIC_API_KEY in Vercel environment variables

### Issue: Widgets Not Rendering
**Fix**: Check browser console for errors, verify demo data loading

### Issue: 404 on Demo Pages
**Fix**: Verify deployment includes `/demo/*` routes, redeploy with `--force`

### Issue: Slow Loading
**Fix**: Check Vercel function logs, may need to increase timeout

### Issue: Database Errors
**Fix**: Verify DATABASE_URL, run `prisma migrate deploy`

---

## 📞 Support

**Deployment Issues**: Check `DEPLOYMENT-GUIDE.md`
**E2E Tests**: See `E2E-TEST-QUERIES-REFERENCE.md`
**Vercel Logs**: `vercel logs` or Vercel Dashboard

---

**Quick Test Command** (all personas):
```bash
# C-Level
open https://your-domain.vercel.app/demo/c-level

# CS Manager
open https://your-domain.vercel.app/demo/cs-manager

# Support Agent
open https://your-domain.vercel.app/demo/support-agent
```

🎯 **Goal**: 30/30 tests passing for production-ready certification!
