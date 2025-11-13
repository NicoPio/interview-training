/* eslint-disable no-console, no-unused-vars, @typescript-eslint/no-unused-vars */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to extract question title from markdown
function extractTitle(content) {
  const match = content.match(/###\s+Q\.\d+\s+(.+)/);
  return match ? match[1].trim() : '';
}

// Helper function to determine difficulty (basic heuristic based on content length)
function determineDifficulty(content) {
  const length = content.length;
  if (length < 1500) return 'easy';
  if (length < 3000) return 'medium';
  return 'hard';
}

// Helper function to extract tags from content
function extractTags(title, content) {
  const tags = [];
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Common JavaScript topics
  const topicMap = {
    'primitive': ['primitives', 'types'],
    'es6': ['es6', 'ecmascript'],
    'var': ['variables', 'var', 'let', 'const'],
    'arrow': ['arrow-functions', 'functions'],
    'hoisting': ['hoisting'],
    'strict': ['strict-mode'],
    'nan': ['nan', 'numbers'],
    'type': ['types', 'typing'],
    'higher-order': ['higher-order-functions', 'functions'],
    'null': ['null', 'undefined'],
    'dom': ['dom', 'browser'],
    'bom': ['bom', 'browser'],
    'this': ['this', 'context'],
    'scope': ['scope'],
    'closure': ['closures'],
    'call': ['call', 'apply', 'bind', 'methods'],
    'pure': ['pure-functions', 'functions'],
    'prototype': ['prototypes', 'inheritance'],
    'callback': ['callbacks', 'async'],
    'temporal': ['temporal-dead-zone', 'let', 'const'],
    'promise': ['promises', 'async'],
    'rest': ['rest-parameters', 'spread'],
    'generator': ['generators', 'iterators'],
    'function': ['functions'],
    'settimeout': ['timing', 'event-loop', 'async']
  };

  for (const [keyword, relatedTags] of Object.entries(topicMap)) {
    if (lowerTitle.includes(keyword) || lowerContent.includes(keyword)) {
      tags.push(...relatedTags);
    }
  }

  return [...new Set(tags)].slice(0, 5); // Unique tags, max 5
}

// Main function to split content
function splitContent() {
  const contentPath = join(__dirname, '../content/index.md');

  if (!existsSync(contentPath)) {
    console.error('❌ content/index.md not found!');
    process.exit(1);
  }

  const content = readFileSync(contentPath, 'utf-8');

  // Split by question pattern (### Q.X)
  const questionPattern = /###\s+Q\.(\d+)\s+(.+?)(?=###\s+Q\.\d+|$)/gs;
  const matches = [...content.matchAll(questionPattern)];

  console.log(`\n🔍 Found ${matches.length} questions\n`);

  matches.forEach((match, index) => {
    const questionNumber = match[1];
    const questionContent = match[0];

    // Extract title
    const title = extractTitle(questionContent);
    const slug = createSlug(title);

    // Determine difficulty
    const difficulty = determineDifficulty(questionContent);

    // Extract tags
    const tags = extractTags(title, questionContent);

    // Split question and answer
    // The pattern: everything before the first code block or detailed explanation is the question
    const parts = questionContent.split(/(?=In JavaScript|JavaScript|In ES6|The |A |`)/);

    // Clean up the content - remove the Q.X header
    const cleanContent = questionContent.replace(/###\s+Q\.\d+\s+.+?\n\n/, '');

    // Create frontmatter
    const frontmatter = `---
id: ${parseInt(questionNumber)}
slug: ${slug}
title: "${title}"
category: javascript
difficulty: ${difficulty}
tags: ${JSON.stringify(tags)}
---

`;

    // Split into question and answer sections
    // The question is just the title, everything else is the answer
    const questionSection = title;
    const answerSection = cleanContent;

    // Format with MDC slots
    const formattedContent = `${frontmatter}
::question
${questionSection.trim()}
::

::answer
${answerSection.trim()}
::

[↑ Back to top](#table-of-contents)
`;

    // Generate filename
    const filename = `q${String(questionNumber).padStart(3, '0')}-${slug}.md`;
    const filepath = join(__dirname, '../content/javascript', filename);

    // Write file
    writeFileSync(filepath, formattedContent, 'utf-8');

    console.log(`✅ Created: ${filename}`);
    console.log(`   Title: ${title}`);
    console.log(`   Difficulty: ${difficulty}`);
    console.log(`   Tags: ${tags.join(', ')}\n`);
  });

  console.log(`\n🎉 Successfully split ${matches.length} questions into individual files!`);
  console.log(`📁 Files location: content/javascript/\n`);
}

// Run the script
splitContent();
