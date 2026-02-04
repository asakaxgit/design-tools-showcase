# Pending Issues to Create

This document tracks the issues that need to be created on GitHub for future development work.

## Issue 1: Fix overflow in Konva showcase examples

**Title:** Fix canvas overflow in 2-column grid layout

**Description:**
The second example in a row overflows its container since we changed the layout to a 2x3 grid (2 columns). The canvas Stage width is 600px, but the background container width was not adjusted to accommodate the grid layout.

**Acceptance Criteria:**
- [x] Canvas containers should be responsive and not overflow in 2-column grid layout
- [x] Add `max-width: 100%` and `overflow: auto` to `.canvas-container` class
- [ ] Test on various screen sizes to ensure proper display

**Priority:** High (Bug fix)

**Status:** ✅ Fixed in this PR

---

## Issue 2: Implement Fabric.js showcase

**Title:** Create Fabric.js showcase with same functions as Konva

**Description:**
Implement a complete Fabric.js showcase page that demonstrates the same functionality as the Konva showcase. This will allow for a fair comparison between the two libraries.

**Required Features:**
1. Basic Shapes - Rectangle, circle, and star with different colors
2. Draggable Elements - Drag objects around the canvas
3. Rotation & Animation - Click to rotate shapes
4. Text Rendering - Editable text with styling options
5. Transform with Handles - Rotate and resize with visual handles
6. Layer Management - Reordering shapes (bring to front, send to back, etc.)
7. Export Canvas - Export at multiple resolutions (preview and print quality)

**Technical Requirements:**
- Use the Fabric.js library
- Create route at `/app/fabric/page.tsx`
- Follow the same structure and styling as Konva showcase
- Include evaluation summary comparing with Konva
- Update home page to link to Fabric.js showcase

**Priority:** Medium (Feature)

**Estimated Effort:** 4-6 hours

---

## Issue 3: Implement Paper.js showcase

**Title:** Create Paper.js showcase with same functions as Konva

**Description:**
Implement a complete Paper.js showcase page that demonstrates the same functionality as the Konva showcase. This will allow for a fair comparison between the libraries.

**Required Features:**
1. Basic Shapes - Rectangle, circle, and star with different colors
2. Draggable Elements - Drag objects around the canvas
3. Rotation & Animation - Click to rotate shapes
4. Text Rendering - Editable text with styling options
5. Transform with Handles - Rotate and resize with visual handles
6. Layer Management - Reordering shapes (bring to front, send to back, etc.)
7. Export Canvas - Export at multiple resolutions (preview and print quality)

**Technical Requirements:**
- Use the Paper.js library
- Create route at `/app/paper/page.tsx`
- Follow the same structure and styling as Konva showcase
- Include evaluation summary comparing with Konva
- Update home page to link to Paper.js showcase

**Priority:** Medium (Feature)

**Estimated Effort:** 4-6 hours

---

## Notes

- Each implementation should be done in a separate PR
- All three showcases should maintain visual consistency
- Update README.md status section as each library showcase is completed
- Consider adding a comparison matrix after all three are complete
