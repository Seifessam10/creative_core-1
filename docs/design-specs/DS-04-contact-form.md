# DS-04 — Contact Form Design Spec

## Page Layout
```
Desktop: 2-column grid
  Left:  60% — form
  Right: 40% — sticky contact info panel

Mobile: 1-column
  Form first
  Contact info below
  
Page padding: py-24
```

## Form Visual Style
```
Section label (top): Space Mono, 10px, uppercase, ls 0.15em, color #444
Heading: Bebas Neue, 72px, "START A PROJECT"
Sub: DM Sans, 14px, color #666, margin-bottom 48px

Field label:
  Font: Space Mono, 10px, uppercase, ls 0.12em
  Color: #444
  Margin bottom: 8px

Input / Select / Textarea:
  Background: #0f0f0f
  Border: 1px solid #1e1e1e
  Color: #e8e8e8
  Padding: 14px 16px
  Font: DM Sans, 14px
  Border radius: 0 (sharp)
  Width: 100%
  Placeholder color: #333
  
  Focus:
    Border color: #444
    Outline: none
    Background: #111

  Error state:
    Border color: #663333
    Error message: Space Mono, 10px, color #cc4444, margin-top 4px

Textarea:
  Min height: 120px
  Resize: vertical

Select:
  Same as input
  Custom arrow: CSS — no browser default
  
Field spacing (between fields): margin-bottom 24px
```

## Submit Button
```
Width: 100%
Height: 52px
Background: transparent
Border: 1px solid #1e1e1e
Color: #e8e8e8
Font: Bebas Neue, 18px, letter-spacing 0.1em
Text: "SEND INQUIRY"
Border radius: 0

Hover:
  Border color: #444
  Background: #0f0f0f
  Transition: 200ms

Loading:
  Text: "SENDING..."
  Opacity: 0.6
  Cursor: not-allowed
  Spinner: small, right of text

Success:
  Background: #0f140f
  Border color: #1e2e1e
  Color: #639922
  Text: "✓ INQUIRY SENT"

Error:
  Background: #140f0f
  Border color: #2e1e1e
  Color: #cc4444
  Text: "FAILED — EMAIL US DIRECTLY"
```

## Right Panel (contact info)
```
Position: sticky, top: 100px
Padding: 0 0 0 48px (left padding only — right edge is page edge)
Border left: 1px solid #1e1e1e

Label: Space Mono, 10px, uppercase, ls 0.15em, color #333 — "CONTACT"
Heading: Bebas Neue, 48px — "LET'S TALK"

Email row:
  Icon: Lucide Mail, 14px, color #444
  Text: DM Sans, 14px, color #666
  
Instagram row:
  Icon: simple IG icon or Lucide Instagram
  Text: @creativecore, color #666, links to IG in new tab

Response time:
  Space Mono, 10px, color #333
  "Typical response: 24–48 hours"

If acceptingInquiries == false:
  Replace form with:
    Bebas Neue 32px: "CURRENTLY AT CAPACITY"
    DM Sans 14px muted: "We're not accepting new projects right now. Follow @creativecore for updates."
  Right panel still shows
```
