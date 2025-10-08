# Interactive Update Demo - Profile & Course Updates

## Overview

The **Interactive Update Demo** demonstrates a hybrid AI workflow that intelligently handles user profile and course update requests. The system automatically identifies which updates can be performed by AI and which require human approval, providing a transparent and efficient update experience.

## Use Cases

This workflow handles two primary scenarios:

### 1. Profile Updates
- **Query Examples**:
  - "How do I update my profile?"
  - "I need to change my phone number"
  - "Update my office location"
  - "Can I change my department?"

### 2. Course Updates
- **Query Examples**:
  - "How do I update a course?"
  - "Change course name"
  - "Update classroom location"
  - "I need to change the instructor"

## Architecture

### Components

1. **InteractiveUpdateWidget** (`/src/components/widgets/InteractiveUpdateWidget.tsx`)
   - Displays current data in a clean 2-column grid
   - Shows AI capabilities (what can be automated vs. needs approval)
   - Lists all updateable fields with auto/manual indicators
   - Displays update results with before/after comparison
   - Shows human agent assignment details when escalated
   - Prominent resolution status banner

2. **InteractiveUpdateData Type** (`/src/types/widget.ts`)
   ```typescript
   export interface InteractiveUpdateData {
     ticketId: string;
     customer: string;
     updateType: 'profile' | 'course' | 'settings';
     title: string;
     issueReported: string;
     currentData: Record<string, string>;
     updateableFields: Array<{
       field: string;
       label: string;
       currentValue: string;
       canAutoUpdate: boolean;
       requiresApproval?: string; // "manager" | "hr" | "admin" | "department_chair"
       icon?: string;
     }>;
     aiCapabilities: {
       canUpdate: string[];
       needsHuman: string[];
       explanation: string;
     };
     updateResult?: {
       success: boolean;
       updatedFields: Array<{
         field: string;
         label: string;
         oldValue: string;
         newValue: string;
       }>;
       message: string;
       timestamp: string;
     };
     resolution: 'ai-resolved' | 'human-assigned' | 'pending';
     humanAgent?: {
       name: string;
       role: string;
       eta: string;
       reason: string;
     };
   }
   ```

3. **Query Detection** (`/src/lib/query-detection.ts`)
   - Pattern matching for profile update queries
   - Pattern matching for course update queries
   - Returns appropriate widget type and demo data

4. **Claude API Tools** (`/src/app/api/chat/route.ts`)
   - `get_user_profile` - Retrieve current user profile data
   - `update_user_profile` - Update profile (auto for basic fields, approval for sensitive)
   - `get_course_details` - Retrieve current course information
   - `update_course_details` - Update course (auto for basic fields, approval for instructor)

## AI Logic & Approval Workflow

### Profile Updates

**AI Can Auto-Update** (✓):
- Full name
- Phone number
- Office location
- Bio/Description

**Requires Human Approval** (⚠️):
- Department (requires manager approval)
- Job title (requires HR approval)
- Manager assignment (requires HR approval)

### Course Updates

**AI Can Auto-Update** (✓):
- Course name
- Course description
- Schedule/timing
- Classroom location
- Maximum enrollment

**Requires Human Approval** (⚠️):
- Instructor (requires department chair approval)

## Demo Data Scenarios

### 1. Profile Update - Success (AI Resolved)
```typescript
// Demo: profileUpdateSuccessDemo
// User requests to update phone and location
// AI successfully updates both fields
// Resolution: ✓ UPDATED BY AI
```

### 2. Profile Update - Escalation (Human Required)
```typescript
// Demo: profileUpdateEscalationDemo
// User requests department change
// Requires manager approval
// Resolution: ⚠️ ASSIGNED TO HUMAN AGENT
// Assigned to: Jane Smith (Department Manager)
```

### 3. Course Update - Success (AI Resolved)
```typescript
// Demo: courseUpdateSuccessDemo
// User updates course name and classroom
// AI successfully updates both fields
// Resolution: ✓ UPDATED BY AI
```

### 4. Course Update - Escalation (Human Required)
```typescript
// Demo: courseUpdateEscalationDemo
// User requests instructor change
// Requires department chair approval
// Resolution: ⚠️ ASSIGNED TO HUMAN AGENT
// Assigned to: Dr. Michael Thompson (Department Chair)
```

## Visual Design

### Color Coding

**Update Types**:
- **Profile**: Primary color (warm orange) - `text-primary`
- **Course**: Chart-3 color (teal) - `text-chart-3`
- **Settings**: Chart-4 color (amber) - `text-chart-4`

**Resolution Status**:
- **AI Resolved**: Success green - `text-success`
- **Human Assigned**: Chart-4 amber - `text-chart-4`
- **Pending**: Muted gray - `text-muted-foreground`

**Field Status Indicators**:
- **Auto Update**: Success green badge with "Auto" label
- **Manual Update**: Chart-4 amber badge with "Manual" label

### Layout Structure

1. **Header Section**
   - Update type icon + title
   - Ticket ID and customer name
   - User's reported issue (quoted text)

2. **Current Data Display**
   - Sparkles icon header
   - 2-column responsive grid
   - Clean field labels and values

3. **AI Capabilities Section**
   - Two side-by-side cards:
     - Left: What AI Can Update (green theme)
     - Right: Needs Human Approval (amber theme)
   - Checkmarks and warning icons
   - List of specific fields

4. **AI Explanation**
   - Primary color border and background
   - Plain text explanation of capabilities

5. **Updateable Fields List**
   - Interactive card per field
   - Hover effects
   - Auto/Manual badges
   - Current value display
   - Approval requirements shown

6. **Update Results** (if present)
   - Success/failure color coding
   - Before → After value comparison
   - Timestamp display

7. **Human Agent Assignment** (if escalated)
   - Agent details (name, role, contact)
   - Expected response time
   - Escalation reason

8. **Resolution Status Banner**
   - Large prominent banner at bottom
   - Icon + status label
   - Contextual message based on resolution type

## Testing Queries

### Profile Updates
```
✓ "How do I update my profile?"
✓ "I need to change my phone number"
✓ "Update my office location"
✓ "How to change my profile information"
✓ "Edit my profile"
```

### Course Updates
```
✓ "How do I update a course?"
✓ "I need to change course details"
✓ "Update course information"
✓ "How to edit a course"
✓ "Change course name"
```

## Integration with Existing Features

### Follows Same Pattern As:
- **Password Reset Demo** - Self-service with optional escalation
- **Account Unlock Demo** - Automated verification with security checks
- **Multi-System Access Demo** - Multiple automated actions with status tracking

### Key Similarities:
1. Transparent AI capabilities disclosure
2. Clear separation of automated vs. manual actions
3. Resolution status tracking (AI-resolved vs. human-assigned)
4. Human agent assignment with contact details
5. Ticket-based workflow with IDs

## Technical Implementation Notes

### Mock Data Strategy
- All demo scenarios use static data from `demo-widget-data.ts`
- Claude API tools return realistic mock responses
- Profile/course updates simulate real-world approval workflows
- Tool responses include `requires_approval` flag for sensitive changes

### Query Detection Priority
- Profile updates checked before course updates
- Multiple pattern variations supported
- Case-insensitive matching
- Natural language variations handled

### Widget Rendering
- Registered in `WidgetRenderer.tsx` as `'interactive-update'`
- Fully typed with `InteractiveUpdateData` interface
- Responsive design (mobile-first)
- Accessibility considerations (proper ARIA labels)

## Future Enhancements

### Potential Additions:
1. **Interactive Forms** - Allow users to directly edit fields in the widget
2. **Real-time Approval Status** - WebSocket updates for approval progress
3. **Approval History** - Show past approval requests and outcomes
4. **Bulk Updates** - Update multiple fields across multiple records
5. **Settings Updates** - Extend to system settings, preferences, etc.
6. **Approval Workflow** - Multi-step approval chains (manager → HR → admin)
7. **Rollback Capability** - Undo recent updates
8. **Change Log** - Audit trail of all profile/course changes

## Files Modified

1. `/src/types/widget.ts` - Added `InteractiveUpdateData` interface
2. `/src/components/widgets/InteractiveUpdateWidget.tsx` - NEW component (~280 lines)
3. `/src/data/demo-widget-data.ts` - Added 4 demo scenarios
4. `/src/lib/query-detection.ts` - Added profile/course update patterns
5. `/src/components/widgets/WidgetRenderer.tsx` - Registered widget
6. `/src/app/api/chat/route.ts` - Added 4 Claude API tools + mock implementations

## Success Metrics

The Interactive Update Demo successfully demonstrates:

✅ **Hybrid AI Workflow** - Clear separation of automated and manual actions
✅ **Transparent Capabilities** - Users understand what AI can and cannot do
✅ **Smart Escalation** - Sensitive changes routed to appropriate approvers
✅ **Real-time Feedback** - Update results shown immediately
✅ **Professional UI** - Clean, organized, color-coded interface
✅ **Flexible Architecture** - Easy to extend to other updateable entities
✅ **Consistent Pattern** - Follows established demo workflow conventions

## Conclusion

The Interactive Update Demo showcases how AI can intelligently handle routine profile and course updates while seamlessly escalating sensitive changes to human approvers. The transparent UI builds user trust by clearly showing capabilities, limitations, and approval requirements.

This demo proves the value of hybrid AI workflows where:
- **Speed**: Simple updates happen instantly
- **Safety**: Critical changes require human oversight
- **Transparency**: Users understand the process
- **Efficiency**: Support agents only handle what requires judgment
