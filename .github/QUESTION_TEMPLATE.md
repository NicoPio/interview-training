# Question Template

Use this template to create new interview questions.

## File Naming Convention

`q{XXX}-{question-slug}.md`

- `XXX`: Question number (e.g., `001`, `002`, `027`)
- `question-slug`: Lowercase, kebab-case slug derived from the question title

**Examples:**
- `q029-what-is-flexbox.md`
- `q030-how-does-event-delegation-work.md`

## File Location

Place your question file in the appropriate category folder:

```
content/
├── fr/                   # French content
│   ├── javascript/
│   ├── html/
│   ├── css/
│   ├── vuejs/
│   └── reactjs/
└── en/                   # English content
    ├── javascript/
    ├── html/
    ├── css/
    ├── vuejs/
    └── reactjs/
```

## Template Structure

```markdown
---
id: XXX
slug: question-slug-in-english
title: 'Your Question Title (in locale language)'
category: javascript|html|css|vuejs|reactjs
difficulty: easy|medium|hard
tags: ['tag1', 'tag2', 'tag3']
---

# Your Question Title

Brief introduction to the topic...

## Main Content

Detailed explanation with:

- Clear structure
- Code examples
- Best practices
- Common pitfalls

### Subsection 1

Content...

\`\`\`javascript
// Code example
const example = 'hello';
console.log(example);
\`\`\`

### Subsection 2

Content...

## Summary

Key takeaways...
```

## Frontmatter Fields

| Field | Required | Description | Format |
|-------|----------|-------------|--------|
| `id` | ✅ | Unique numeric ID | Integer (e.g., `1`, `29`) |
| `slug` | ✅ | URL-friendly identifier | Kebab-case, English (e.g., `what-is-flexbox`) |
| `title` | ✅ | Question title | String, in locale language |
| `category` | ✅ | Question category | One of: `javascript`, `html`, `css`, `vuejs`, `reactjs` |
| `difficulty` | ✅ | Difficulty level | One of: `easy`, `medium`, `hard` |
| `tags` | ✅ | Related topics | Array of lowercase strings |

## Difficulty Guidelines

### Easy
- Fundamental concepts
- Basic syntax
- Common patterns
- Entry-level knowledge

### Medium
- Intermediate concepts
- Practical applications
- Common use cases
- Some depth required

### Hard
- Advanced concepts
- Edge cases
- Performance considerations
- Deep understanding required

## Tag Guidelines

- Use lowercase
- Use English terms
- Be specific but concise
- Include 3-7 tags per question
- Examples: `'primitives'`, `'async'`, `'closures'`, `'flexbox'`, `'hooks'`

## Content Guidelines

### Structure
1. **Title**: Clear, concise question
2. **Introduction**: Brief context (1-2 sentences)
3. **Main Content**: Detailed explanation with subsections
4. **Code Examples**: Practical, well-commented examples
5. **Summary** (optional): Key takeaways

### Writing Style
- Clear and concise
- Beginner-friendly explanations
- Practical examples
- Avoid overly technical jargon
- Use proper markdown formatting

### Code Examples
- Include working code snippets
- Add comments for clarity
- Show both correct and incorrect usage when relevant
- Use syntax highlighting (\`\`\`javascript, \`\`\`html, \`\`\`css)

### Localization
- French content in `content/fr/`
- English content in `content/en/`
- Keep `slug` in English for both locales
- Translate `title`, tags, and content to locale language

## Validation Checklist

Before submitting your question, ensure:

- [ ] File follows naming convention (`q{XXX}-{slug}.md`)
- [ ] File is in the correct category folder
- [ ] All required frontmatter fields are present
- [ ] Frontmatter YAML is valid
- [ ] ID is unique (check existing questions)
- [ ] Slug is unique (check existing questions)
- [ ] Difficulty level is appropriate
- [ ] Tags are lowercase and relevant
- [ ] Content is well-structured
- [ ] Code examples are tested and working
- [ ] Markdown formatting is correct
- [ ] No spelling or grammar errors
- [ ] Both FR and EN versions created (if applicable)

## Examples

### Example 1: JavaScript Question

**File**: `content/fr/javascript/q029-what-is-a-closure.md`

```markdown
---
id: 29
slug: what-is-a-closure
title: 'Qu'est-ce qu'une fermeture (closure) en JavaScript ?'
category: javascript
difficulty: medium
tags: ['closures', 'scope', 'functions', 'lexical']
---

# Qu'est-ce qu'une fermeture (closure) en JavaScript ?

Une fermeture (closure) est une fonction qui a accès à son scope lexical, même lorsqu'elle est exécutée en dehors de son scope d'origine.

## Comment fonctionnent les fermetures

Les fermetures sont créées chaque fois qu'une fonction est créée...

\`\`\`javascript
function outer() {
  const message = 'Hello';

  function inner() {
    console.log(message); // Accède à 'message' via closure
  }

  return inner;
}

const myFunc = outer();
myFunc(); // Output: "Hello"
\`\`\`

## Cas d'usage courants

1. **Encapsulation de données**
2. **Factory functions**
3. **Event handlers**
```

### Example 2: CSS Question

**File**: `content/fr/css/q030-what-is-flexbox.md`

```markdown
---
id: 30
slug: what-is-flexbox
title: 'Qu'est-ce que Flexbox en CSS ?'
category: css
difficulty: easy
tags: ['flexbox', 'layout', 'responsive', 'alignment']
---

# Qu'est-ce que Flexbox en CSS ?

Flexbox (Flexible Box Layout) est un modèle de mise en page CSS conçu pour organiser et aligner les éléments de manière efficace.

## Propriétés principales

### Container (display: flex)

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### Items

\`\`\`css
.item {
  flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
}
\`\`\`
```

## Need Help?

If you have questions about contributing:

1. Check existing questions for reference
2. Read the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
3. Open an issue for discussion
4. Ask in pull request comments

---

**Thank you for contributing!** 🎉
