# Open Graph Image Guide

## Current Status
The application references `/og-image.jpg` in Open Graph meta tags, but this file needs to be created.

## Requirements
- **Dimensions**: 1200x630 pixels (2:1 aspect ratio)
- **Format**: JPG or PNG
- **File size**: < 8MB (recommended < 300KB)
- **Filename**: `og-image.jpg` (place in `/public` directory)

## Recommended Content
Include the following elements in your OG image:

- **Title**: "JS Interview Prep"
- **Subtitle**: "Master JavaScript Interview Questions"
- **Visual**: Code snippet or JavaScript logo
- **Stats**: "26+ Questions" or similar
- **Branding**: Colors matching the app theme

## Tools to Create OG Images

### Online Tools (Easy)
1. **Canva** (https://www.canva.com)
   - Template: Social Media > Facebook Post (1200x630)
   - Free, drag-and-drop interface

2. **Figma** (https://www.figma.com)
   - Create custom design
   - Export as JPG

3. **OG Image Generator** (https://og-image.vercel.app/)
   - Simple text-based OG images
   - Customizable with code

### Programmatic (Advanced)
1. **@vercel/og** - Generate images with React components
2. **Playwright** - Screenshot of HTML/CSS
3. **Puppeteer** - Similar to Playwright

## Quick Placeholder Solution
For a quick start, use a solid color background with centered text:
- Background: Gradient (Purple to Blue)
- Text: "JS Interview Prep - 26+ Interview Questions"
- Font: Bold, sans-serif, white color

## Testing
After creating the image, test it with:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Example using Canva
1. Go to canva.com
2. Create design > Custom size (1200 x 630 px)
3. Add gradient background
4. Add text: "JS Interview Prep"
5. Add icon or code snippet
6. Download as JPG
7. Rename to `og-image.jpg`
8. Place in `/public` directory
