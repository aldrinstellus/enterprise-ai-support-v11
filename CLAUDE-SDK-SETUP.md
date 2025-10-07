# 🤖 Claude SDK Integration Setup

This guide explains how to set up and use the real Claude AI integration in Enterprise AI Support V3.

---

## ✨ What Changed?

The app now uses **real Claude AI** instead of mock responses:

### Before (v1.0.0 - main branch)
- ❌ Hardcoded mock responses
- ❌ No real AI processing
- ✅ Good for UI demo/showcase

### After (feature/claude-sdk-integration branch)
- ✅ Real Claude 3.5 Sonnet AI
- ✅ Streaming responses with typing effect
- ✅ Tool calling for services (Zoho, Slack, etc.)
- ✅ Natural language understanding

---

## 🚀 Quick Setup

### 1. Get Your Claude API Key

1. Visit **https://console.anthropic.com/settings/keys**
2. Sign in or create an Anthropic account
3. Click **"Create Key"**
4. Copy your API key (starts with `sk-ant-...`)

### 2. Configure Environment

Edit `.env.local` in the project root:

```bash
# Anthropic Claude API Key
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**Important**: Never commit your `.env.local` file to git! (Already in `.gitignore`)

### 3. Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🎯 How It Works

### API Route (`/src/app/api/chat/route.ts`)

- **Streaming**: Real-time token-by-token response
- **Model**: `claude-3-5-sonnet-20241022`
- **Tools**: Defined for Zoho CRM, Zoho Desk, Slack, Google Calendar
- **System Prompt**: Guides Claude's behavior and response format

### Frontend Updates (`/src/app/page.tsx`)

- **Streaming Handler**: Processes Server-Sent Events (SSE)
- **Typing Indicator**: Shows animated dots while Claude thinks
- **Error Handling**: Graceful fallback on API errors
- **State Management**: `isStreaming` prevents multiple simultaneous requests

---

## 🔧 Available Tools (Mock for Demo)

Claude can "call" these tools (currently returning mock data):

### 1. `search_zoho_crm`
Search for leads and contacts in Zoho CRM.

**Example**: "Find all leads from last week's webinar"

### 2. `check_zoho_desk_status`
Check support ticket status for contacts.

**Example**: "Check if Sarah Johnson has responded to support"

### 3. `schedule_google_calendar_meeting`
Schedule meetings in Google Calendar.

**Example**: "Schedule a meeting with david@example.com tomorrow at 2 PM"

### 4. `send_slack_message`
Send messages to Slack channels or users.

**Example**: "Send summary to #sales channel"

---

## 🎨 Features

### Real-Time Streaming
```typescript
// Text appears token-by-token as Claude generates it
"I'll help you with that..." → "I'll help you with that task..."
```

### Typing Indicator
```tsx
// Shows while waiting for first token
● ● ● Thinking...
```

### Natural Responses
Claude understands context and provides detailed, step-by-step execution results formatted naturally.

---

## 💰 Cost Considerations

### Claude 3.5 Sonnet Pricing (as of October 2025)
- **Input**: $3 per million tokens
- **Output**: $15 per million tokens

### Typical Usage
- Average prompt: ~500 tokens ($0.0015)
- Average response: ~1000 tokens ($0.015)
- **Cost per message**: ~$0.016 (less than 2 cents)

### Free Tier
Anthropic offers free credits for testing. Check: https://console.anthropic.com/settings/limits

---

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Store API key in `.env.local`
- ❌ Never commit `.env.local` to git
- ✅ Use different keys for dev/staging/prod

### 2. API Route Protection (Future Enhancement)
```typescript
// Add authentication to /api/chat
if (!session) {
  return new Response('Unauthorized', { status: 401 });
}
```

### 3. Rate Limiting (Future Enhancement)
Implement rate limiting to prevent abuse:
```typescript
// Limit to 10 requests per minute per user
```

---

## 🐛 Troubleshooting

### Error: "Missing API key"
**Solution**: Ensure `.env.local` has `ANTHROPIC_API_KEY` set and restart server

### Error: "Failed to get response"
**Solution**: Check API key is valid and has credits remaining

### Slow Responses
**Solution**: Normal for streaming. Claude generates ~30-50 tokens/second

### No Streaming Effect
**Solution**: Ensure browser supports Server-Sent Events (SSE). All modern browsers do.

---

## 📊 Testing

### Basic Test
1. Start the app: `npm run dev`
2. Type: "Hello, test the AI"
3. Expected: Streaming response from Claude

### Tool Test
1. Type: "Find leads from recent webinar and check their support status"
2. Expected: Claude calls `search_zoho_crm` and `check_zoho_desk_status`

### Example Prompts
Click any example prompt in the sidebar to test:
- "Follow up with webinar leads who haven't responded to support"
- "Schedule meetings with contacts from recent webinar"

---

## 🚧 Current Limitations

### 1. Tool Execution
Tools are **mocked** for demo purposes. Real implementation would:
- Connect to actual Zoho API
- Use real Slack webhooks
- Integrate with Google Calendar API

### 2. Conversation History
Currently single-turn. Future: Multi-turn conversations with context.

### 3. Tool Results Display
Responses are pure text. Future: Structured execution result cards like v1.0.0.

---

## 🎯 Next Steps (Future Enhancements)

### Phase 1: Real Tool Integration
- [ ] Connect to Zoho CRM API
- [ ] Connect to Zoho Desk API
- [ ] Integrate Slack webhooks
- [ ] Add Google Calendar OAuth

### Phase 2: Enhanced UX
- [ ] Parse tool results into structured cards
- [ ] Show execution steps in real-time
- [ ] Add tool call indicators (e.g., "🔍 Searching CRM...")

### Phase 3: Production Features
- [ ] User authentication
- [ ] Conversation persistence
- [ ] Rate limiting
- [ ] Error logging and monitoring

---

## 📖 Code Structure

```
enterprise-ai-support-v3/
├── src/app/api/chat/
│   └── route.ts              # Claude API integration + streaming
├── src/app/
│   └── page.tsx              # Frontend with streaming handler
├── .env.local                # API key (not committed)
└── CLAUDE-SDK-SETUP.md       # This file
```

---

## 🔗 Resources

- **Anthropic Console**: https://console.anthropic.com
- **Claude API Docs**: https://docs.anthropic.com/claude/reference/messages_post
- **Streaming Guide**: https://docs.anthropic.com/claude/reference/streaming
- **Tool Use Guide**: https://docs.anthropic.com/claude/docs/tool-use

---

## ❓ FAQ

### Q: Can I use Claude 3 Opus instead?
**A**: Yes! Change the model in `/src/app/api/chat/route.ts`:
```typescript
model: 'claude-3-opus-20240229'
```

### Q: How do I add more tools?
**A**: Add to the `tools` array in `/src/app/api/chat/route.ts` and implement execution in `executeTool()`.

### Q: Can I deploy this?
**A**: Yes! Deploy to Vercel/Netlify and set `ANTHROPIC_API_KEY` in environment variables.

### Q: What about GPT-4?
**A**: This uses Claude (Anthropic). For GPT-4, you'd need to switch to OpenAI's SDK.

---

## 🎉 You're Ready!

Your app now has **real AI** instead of mock responses. Test it out and watch Claude work its magic! 🚀

---

*Last Updated: October 1, 2025 - Claude SDK Integration*
