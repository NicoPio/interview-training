---
id: 3
slug: what-are-the-differences-between-var-const-let-in-javascript
title: 'What are the differences between var, const & let in JavaScript?'
category: javascript
difficulty: medium
tags: ['variables', 'var', 'let', 'const', 'hoisting']
---

# What are the differences between var, const & let in JavaScript?

| Attribute                          | var                                                    | let                                                                               | const                                                                             |
| ---------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Scope                              | Functional scope                                       | Block scope                                                                       | Block scope                                                                       |
| Update/Re-declaration              | Can be updated and re-declared within the scope        | Can be updated but cannot be re-declared within the scope                         | Cannot be updated or re-declared within the scope                                 |
| Declaration without Initialization | Can be declared without being initialized              | Can be declared without being initialized                                         | Cannot be declared without being initialized                                      |
| Access without Initialization      | Accessible without initialization (default: undefined) | Inaccessible without initialization (throws 'ReferenceError')                     | Inaccessible without initialization (throws 'ReferenceError')                     |
| Hoisting                           | Hoisted and initialized with a 'default' value         | Hoisted but not initialized (error if accessed before declaration/initialization) | Hoisted but not initialized (error if accessed before declaration/initialization) |
