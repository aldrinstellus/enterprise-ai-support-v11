# 🚀 Quick Start Guide

Get up and running with Enterprise AI Support V3 in minutes.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

---

## Installation

```bash
# Clone the repository
git clone https://github.com/aldrinstellus/enterprise-ai-support-v3.git
cd enterprise-ai-support-v3

# Install dependencies
npm install
```

---

## Running the App

### Development Mode
```bash
npm run dev
```

Visit **http://localhost:3004**

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## First Look

### **Empty State** (Initial Load)
When you first visit the app, you'll see:
- Clean, centered interface
- Headline: "AI that *actually* gets work done"
- Subtext: "Connect your tools. Ask AI. Watch it happen."
- Input box ready for your message

### **Try It Out**
1. Type a message or click an example prompt from the sidebar
2. Press Enter or click Send
3. Watch the smooth transition to active chat mode
4. See AI's step-by-step execution results

---

## Key Features

### **Sidebar** (Toggle with `⌘B` / `Ctrl+B`)
- **Example Prompts**: Click to demo
  - "Follow up with webinar leads who haven't responded to support"
  - "Schedule meetings with contacts from recent webinar"
  - "Check support status for all leads in CRM"
  - "Send summary to account manager via Slack"

- **Connected Services**:
  - Zoho CRM
  - Zoho Desk
  - Slack
  - Google Calendar
  - Email (SMTP)

### **Smooth Animations**
- Empty → Active state transition (600ms)
- Input slides from center to bottom
- Messages appear with stagger effect
- 60fps performance

---

## Project Structure

```
enterprise-ai-support-v3/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main interface
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Solar Dusk theme
│   ├── components/
│   │   └── ui/
│   │       └── glowing-effect.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Configuration

### Port
Default port is **3004**. To change:
```bash
npm run dev -- -p 3005
```

### Theme
Solar Dusk theme is defined in `src/app/globals.css`.
Colors can be customized by modifying CSS custom properties.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘B` / `Ctrl+B` | Toggle sidebar |
| `Enter` | Send message |

---

## Demo Mode

This is a **demo interface** with mocked data. All responses are simulated for showcase purposes. No real API connections are required.

---

## Development Tips

### Hot Reload
Next.js provides fast refresh - changes appear instantly without page reload.

### TypeScript
Run type checking:
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3004
lsof -ti:3004 | xargs kill -9

# Or use different port
npm run dev -- -p 3005
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm install
npm run build
```

---

## Next Steps

- Explore the interface
- Try example prompts
- Toggle sidebar (⌘B)
- See execution results
- Check out [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Read [COMPONENT-GUIDE.md](./COMPONENT-GUIDE.md) for customization

---

## Learn More

- [Full Documentation](./DOCS-INDEX.md)
- [Architecture](./ARCHITECTURE.md)
- [UI Design](./UI-DESIGN.md)
- [Component Guide](./COMPONENT-GUIDE.md)

---

**Ready to build something amazing!** 🚀
