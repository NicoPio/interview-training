---
id: 3
slug: what-are-the-differences-between-var-const-let-in-javascript
title: 'Quelles sont les différences entre var, const et let en JavaScript ?'
category: javascript
difficulty: medium
tags: ['variables', 'var', 'let', 'const', 'remontée']
---

# Quelles sont les différences entre var, const et let en JavaScript ?

| Attribut                        | var                                                    | let                                                                             | const                                                                           |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Portée                          | Portée fonctionnelle                                   | Portée de bloc                                                                  | Portée de bloc                                                                  |
| Mise à jour/Re-déclaration      | Peut être mis à jour et re-déclaré dans la portée      | Peut être mis à jour mais ne peut pas être re-déclaré dans la portée            | Ne peut pas être mis à jour ou re-déclaré dans la portée                        |
| Déclaration sans initialisation | Peut être déclaré sans être initialisé                 | Peut être déclaré sans être initialisé                                          | Ne peut pas être déclaré sans être initialisé                                   |
| Accès sans initialisation       | Accessible sans initialisation (par défaut : Indéfini) | Inaccessible sans initialisation (lève 'ReferenceError')                        | Inaccessible sans initialisation (lève 'ReferenceError')                        |
| Remontée (Hoisting)             | Remonté et initialisé avec une valeur 'par défaut'     | Remonté mais non initialisé (erreur si accédé avant déclaration/initialisation) | Remonté mais non initialisé (erreur si accédé avant déclaration/initialisation) |
