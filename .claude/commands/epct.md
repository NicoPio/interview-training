---
description: Execute the complete workflow for software engineering tasks
argument-hint: [task description]
---

# EPCT Workflow: Explore → Plan → Code → Test

Execute a comprehensive workflow for completing software engineering tasks systematically.

## Task
$ARGUMENTS

## Instructions

Follow the 4-step EPCT workflow to complete the task:

### 1. Explore
**Goal**: Understand the codebase and gather necessary context before planning.

- Search for relevant code, patterns, and existing implementations
- Read key files that relate to the task
- Understand the current architecture and conventions
- Identify dependencies and integration points
- Document your findings concisely

**Do NOT make assumptions.** Read actual code to understand implementation details.

### 2. Plan
**Goal**: Create a concrete, actionable plan based on exploration findings.

- Use `TodoWrite` to create specific, measurable tasks
- Break down complex work into clear steps
- Identify potential risks or edge cases
- Consider test requirements
- Ensure each todo has:
  - `content`: What needs to be done (imperative form)
  - `activeForm`: What you're doing (present continuous form)
  - `status`: pending

**Be explicit about your approach.** Explain WHY you're making specific choices based on what you discovered during exploration.

### 3. Code
**Goal**: Implement the solution following the plan systematically.

- Work through todos sequentially (mark each `in_progress`, then `completed`)
- Write production-quality code that matches codebase conventions
- **IMPORTANT**: Always prefer editing existing files over creating new ones
- Use `Read` before `Edit` or `Write`
- Ensure code is complete and functional, not placeholder or partial
- Update the plan if new tasks emerge during implementation

**Implement fully.** Go beyond the basics to create a robust, complete implementation.

### 4. Test
**Goal**: Verify the implementation works correctly and meets requirements.

- Run relevant test commands (unit tests, integration tests, build)
- Fix any errors or failures that occur
- Verify the solution meets the original task requirements
- Test edge cases and error scenarios
- If tests fail, add todos to fix them and continue until all pass

**Do NOT mark tasks as completed if tests fail.** Keep working until verification succeeds.

## Success Criteria
- All exploration questions answered with concrete code references
- Clear plan with specific, actionable todos
- Complete, working implementation
- All tests passing
- Original task requirements fully met

Execute this workflow autonomously. Update todos in real-time as you progress through each phase.
reply in french