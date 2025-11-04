import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Translations dictionary for common JavaScript terms
const translations = {
  // Frontmatter translations
  'easy': 'facile',
  'medium': 'moyen',
  'hard': 'difficile',

  // Common terms
  'primitives': 'primitifs',
  'types': 'types',
  'variables': 'variables',
  'functions': 'fonctions',
  'closures': 'fermetures',
  'promises': 'promesses',
  'async': 'asynchrone',
  'callbacks': 'rappels',
  'prototypes': 'prototypes',
  'inheritance': 'héritage',
  'scope': 'portée',
  'hoisting': 'remontée',
  'strict-mode': 'mode-strict',
  'arrow-functions': 'fonctions-fléchées',
  'spread': 'décomposition',
  'rest-parameters': 'paramètres-reste',
  'destructuring': 'déstructuration',
  'modules': 'modules',
  'classes': 'classes',
  'iterators': 'itérateurs',
  'generators': 'générateurs',
  'dom': 'dom',
  'browser': 'navigateur',
  'event-loop': 'boucle-événements',

  // Question titles - Manual translations for better quality
  'How do you detect primitive or non-primitive value types in JavaScript?':
    'Comment détecter les types de valeurs primitives ou non-primitives en JavaScript ?',
  'Explain the key features introduced in JavaScript ES6':
    'Expliquez les fonctionnalités clés introduites dans JavaScript ES6',
  'What are the differences between var, const & let in JavaScript?':
    'Quelles sont les différences entre var, const et let en JavaScript ?',
  'What are arrow functions in JavaScript?':
    'Que sont les fonctions fléchées en JavaScript ?',
  'What is hoisting in JavaScript?':
    'Qu\'est-ce que le hoisting en JavaScript ?',
  'What is Strict Mode in JavaScript?':
    'Qu\'est-ce que le mode strict en JavaScript ?',
  'What is NaN?':
    'Qu\'est-ce que NaN ?',
  'Is JavaScript a statically typed or a dynamically typed language?':
    'JavaScript est-il un langage à typage statique ou dynamique ?',
  'What are Higher-Order Functions in JavaScript?':
    'Que sont les fonctions d\'ordre supérieur en JavaScript ?',
  'What is the difference between Null and Undefined':
    'Quelle est la différence entre Null et Undefined',
  'What is DOM?':
    'Qu\'est-ce que le DOM ?',
  'What is BOM?':
    'Qu\'est-ce que le BOM ?',
  'Explain about this keyword in JavaScript with an example.':
    'Expliquez le mot-clé this en JavaScript avec un exemple.',
  'What is scope in JavaScript?':
    'Qu\'est-ce que la portée (scope) en JavaScript ?',
  'What is closure in JavaScript?':
    'Qu\'est-ce qu\'une fermeture (closure) en JavaScript ?',
  'Explain call(), apply() and bind() methods in JavaScript.':
    'Expliquez les méthodes call(), apply() et bind() en JavaScript.',
  'Explain pure and impure functions in JavaScript.':
    'Expliquez les fonctions pures et impures en JavaScript.',
  'What are prototypes in JavaScript?':
    'Que sont les prototypes en JavaScript ?',
  'What are callback functions in JavaScript and what is callback hell?':
    'Que sont les fonctions de rappel (callbacks) en JavaScript et qu\'est-ce que le callback hell ?',
  'What is Temporal Dead Zone in JavaScript?':
    'Qu\'est-ce que la zone morte temporelle (Temporal Dead Zone) en JavaScript ?',
  'What are promises in JavaScript?':
    'Que sont les promesses (promises) en JavaScript ?',
  'Explain rest parameter in JavaScript':
    'Expliquez le paramètre rest en JavaScript',
  'What is the correct way to use the rest parameter in JavaScript?':
    'Quelle est la bonne façon d\'utiliser le paramètre rest en JavaScript ?',
  'What are generator functions in JavaScript?':
    'Que sont les fonctions génératrices en JavaScript ?',
  'What is the difference between function declarations and function expressions?':
    'Quelle est la différence entre les déclarations de fonction et les expressions de fonction ?',
  'What is the difference between setTimeout, setImmediate and process.nextTick?':
    'Quelle est la différence entre setTimeout, setImmediate et process.nextTick ?',

  // HTML Questions
  'What is semantic HTML?':
    'Qu\'est-ce que le HTML sémantique ?',
  'What is Semantic HTML?':
    'Qu\'est-ce que le HTML sémantique ?',

  // CSS Questions
  'What is the box model?':
    'Qu\'est-ce que le modèle de boîte (box model) ?',
  'What is the CSS Box Model?':
    'Qu\'est-ce que le modèle de boîte CSS ?',
};

// Content translations - key phrases
const contentTranslations = {
  // Common phrases
  'In JavaScript, values are generally categorized as':
    'En JavaScript, les valeurs sont généralement catégorisées comme',
  'Primitive values include':
    'Les valeurs primitives incluent',
  'We can detect primitive or non-primitive in JavaScript in the following ways':
    'On peut détecter les valeurs primitives ou non-primitives en JavaScript de la manière suivante',
  'Non-primitive values are objects':
    'Les valeurs non-primitives sont des objets',
  'Important note':
    'Note importante',
  'Example':
    'Exemple',
  'Output':
    'Sortie',
  'Key Points':
    'Points clés',
  'Explanation':
    'Explication',
  'Benefits of':
    'Avantages de',
  'Examples to illustrate':
    'Exemples pour illustrer',
  'Examples of':
    'Exemples de',
  'Common':
    'Courants',

  // Data types
  'Number': 'Nombre',
  'String': 'Chaîne de caractères',
  'Boolean': 'Booléen',
  'Undefined': 'Indéfini',
  'Null': 'Null',
  'Symbol': 'Symbole',
  'Represents numeric values':
    'Représente les valeurs numériques',
  'Represents textual data':
    'Représente les données textuelles',
  'Represents true or false':
    'Représente vrai ou faux',
  'Represents an uninitialized variable or absence of a value':
    'Représente une variable non initialisée ou l\'absence de valeur',
  'Represents the intentional absence of any object value':
    'Représente l\'absence intentionnelle de toute valeur d\'objet',
  'Represents a unique identifier':
    'Représente un identifiant unique',

  // Operators and keywords
  'Using the':
    'En utilisant',
  'operator':
    'l\'opérateur',
  'constructor':
    'constructeur',
  'This operator returns a string indicating the type of a value':
    'Cet opérateur retourne une chaîne indiquant le type d\'une valeur',
  'Primitive types will return their corresponding strings':
    'Les types primitifs retourneront leurs chaînes correspondantes',
  'Non-primitive types will typically return':
    'Les types non-primitifs retourneront typiquement',
  'even though it\'s a primitive value':
    'même si c\'est une valeur primitive',
  'This constructor creates a new object wrapper for a value':
    'Ce constructeur crée un nouvel objet enveloppe pour une valeur',
  'If a value is primitive, it will be equal to its object-wrapped version':
    'Si une valeur est primitive, elle sera égale à sa version enveloppée dans un objet',
  'If a value is non-primitive, it won\'t be equal to its object-wrapped version':
    'Si une valeur est non-primitive, elle ne sera pas égale à sa version enveloppée dans un objet',

  // Hoisting
  'In JavaScript, hoisting is a phenomenon where variable and function declarations are conceptually moved to the top of their respective scopes, even if they\'re written later in the code':
    'En JavaScript, le hoisting est un phénomène où les déclarations de variables et de fonctions sont conceptuellement déplacées vers le haut de leurs portées respectives, même si elles sont écrites plus tard dans le code',
  'This behaviour applies to both global and local scopes':
    'Ce comportement s\'applique aux portées globales et locales',
  'While':
    'Alors que',
  'appears declared after its use, it\'s hoisted to the top of the scope':
    'apparaît déclaré après son utilisation, il est remonté vers le haut de la portée',
  'allowing its reference':
    'permettant sa référence',
  'but not its initial value':
    'mais pas sa valeur initiale',
  'before the actual declaration line':
    'avant la ligne de déclaration réelle',
  'Even though':
    'Même si',
  'is defined after its call':
    'est défini après son appel',
  'JavaScript acts as if it were declared at the beginning of the scope':
    'JavaScript agit comme s\'il était déclaré au début de la portée',
  'enabling its execution':
    'permettant son exécution',
  'Hoisting also occurs within local scopes':
    'Le hoisting se produit également dans les portées locales',
  'like functions':
    'comme les fonctions',
  'Here,':
    'Ici,',
  'is hoisted to the top of the':
    'est remonté vers le haut de la',
  'function':
    'fonction',
  'allowing its use before its explicit declaration':
    'permettant son utilisation avant sa déclaration explicite',
  'Only declarations are hoisted, not initializations':
    'Seules les déclarations sont remontées, pas les initialisations',
  'The example with':
    'L\'exemple avec',
  'demonstrates this':
    'le démontre',
  'as':
    'car',
  'is declared but not initialized before its use':
    'est déclaré mais pas initialisé avant son utilisation',
  'resulting in':
    'résultant en',
  'Strict mode enforces declaration':
    'Le mode strict impose la déclaration',
  'Using':
    'Utiliser',
  'at the beginning of your code prevents using variables before they\'re declared':
    'au début de votre code empêche d\'utiliser des variables avant qu\'elles ne soient déclarées',
  'helping avoid potential hoisting-related issues':
    'aidant à éviter les problèmes potentiels liés au hoisting',

  // Arrow functions
  'Arrow functions are a concise way to write anonymous function expressions in JavaScript':
    'Les fonctions fléchées sont une façon concise d\'écrire des expressions de fonction anonymes en JavaScript',
  'They were introduced in ECMAScript 6':
    'Elles ont été introduites dans ECMAScript 6',
  'and are especially useful for short, single-expression functions':
    'et sont particulièrement utiles pour les fonctions courtes à expression unique',
  'Here\'s the basic syntax for an arrow function':
    'Voici la syntaxe de base d\'une fonction fléchée',
  'In this':
    'Dans cet',
  'the arrow function':
    'la fonction fléchée',
  'takes two parameters':
    'prend deux paramètres',
  'and returns their sum':
    'et retourne leur somme',
  'The':
    'La',
  'syntax is used to define the function':
    'syntaxe est utilisée pour définir la fonction',
  'and the body of the function is enclosed in curly braces':
    'et le corps de la fonction est entouré d\'accolades',
  'If there\'s only one expression in the function body':
    'S\'il n\'y a qu\'une seule expression dans le corps de la fonction',
  'you can omit the curly braces and the':
    'vous pouvez omettre les accolades et le mot-clé',
  'keyword':
    '',
  'Traditional Function Expression':
    'Expression de fonction traditionnelle',
  'Arrow Function':
    'Fonction fléchée',
  'Define an object':
    'Définir un objet',
  'Define another object':
    'Définir un autre objet',
  'Call the method':
    'Appeler la méthode',
  'refers to the object calling the function':
    'fait référence à l\'objet appelant la fonction',
  'returns the':
    'retourne la',
  'property of':
    'propriété de',
  'inside the function refers to the object':
    'à l\'intérieur de la fonction fait référence à l\'objet',
  'does not refer to':
    'ne fait pas référence à',
  'Instead, it inherits its value from the parent scope':
    'Au lieu de cela, il hérite de sa valeur de la portée parente',
  'which is the global object':
    'qui est l\'objet global',
  'window in a browser environment':
    'window dans un environnement navigateur',
  'Consequently,':
    'Par conséquent,',
  'returns':
    'retourne',
  'undefined':
    'undefined',
  'or may even throw an error':
    'ou peut même lever une erreur',
  'is not defined in the global scope':
    'n\'est pas défini dans la portée globale',
  'depending on the environment':
    'selon l\'environnement',

  // Closures
  'In JavaScript, a closure is a function along with its lexical scope':
    'En JavaScript, une fermeture (closure) est une fonction associée à sa portée lexicale',
  'which allows it to access variables from its outer':
    'qui lui permet d\'accéder aux variables de sa',
  'enclosing':
    'englobante',
  'scope even after that scope has finished executing':
    'portée même après que cette portée ait fini de s\'exécuter',
  'A closure allows a function to remember and access variables from the environment in which it was created':
    'Une fermeture permet à une fonction de se souvenir et d\'accéder aux variables de l\'environnement dans lequel elle a été créée',
  'even if the function is executed in a different scope':
    'même si la fonction est exécutée dans une portée différente',
  'Here\'s an example to illustrate closures in JavaScript':
    'Voici un exemple pour illustrer les fermetures en JavaScript',
  'Outer function scope':
    'Portée de la fonction externe',
  'Inner function scope':
    'Portée de la fonction interne',
  'Accessing both inner and outer variables':
    'Accès aux variables internes et externes',
  'Inner Variable':
    'Variable interne',
  'Outer Variable':
    'Variable externe',
  'Returning the inner function, creating a closure':
    'Retour de la fonction interne, créant une fermeture',
  'Calling':
    'Appeler',
  'outerFunction':
    'outerFunction',
  'returns':
    'retourne',
  'innerFunction':
    'innerFunction',
  'which is now a closure':
    'qui est maintenant une fermeture',
  'Executing the closure function':
    'Exécution de la fonction de fermeture',
  'defines an outer variable':
    'définit une variable externe',
  'and an inner function':
    'et une fonction interne',
  'has access to the variables of its outer function':
    'a accès aux variables de sa fonction externe',
  'creating a closure':
    'créant une fermeture',
  'The returned':
    'La',
  'retournée':
    '',
  'retains access to the':
    'conserve l\'accès à la',
  'even after':
    'même après que',
  'has finished executing':
    'ait fini de s\'exécuter',
  'logs both the inner and outer variables to the console':
    'enregistre les variables internes et externes dans la console',

  // Semantic HTML
  'Semantic HTML refers to the use of HTML markup to reinforce the meaning of content on web pages':
    'Le HTML sémantique fait référence à l\'utilisation du balisage HTML pour renforcer la signification du contenu sur les pages web',
  'rather than merely defining its appearance':
    'plutôt que de simplement définir son apparence',
  'Semantic HTML uses HTML tags that carry meaning about the content they contain':
    'Le HTML sémantique utilise des balises HTML qui portent un sens sur le contenu qu\'elles contiennent',
  'Accessibility':
    'Accessibilité',
  'Screen readers and assistive technologies can better understand the content structure':
    'Les lecteurs d\'écran et les technologies d\'assistance peuvent mieux comprendre la structure du contenu',
  'SEO':
    'Référencement',
  'Search engines can better understand the content hierarchy and importance':
    'Les moteurs de recherche peuvent mieux comprendre la hiérarchie et l\'importance du contenu',
  'Maintainability':
    'Maintenabilité',
  'Code is easier to read and understand for developers':
    'Le code est plus facile à lire et à comprendre pour les développeurs',
  'Consistency':
    'Cohérence',
  'Provides a standard way to structure content':
    'Fournit une manière standard de structurer le contenu',
  'Instead of using divs for everything':
    'Au lieu d\'utiliser des divs pour tout',
  'Use semantic elements':
    'Utiliser des éléments sémantiques',
  'Common semantic HTML5 elements include':
    'Les éléments HTML5 sémantiques courants incluent',
  'Introductory content':
    'Contenu d\'introduction',
  'Navigation links':
    'Liens de navigation',
  'Main content':
    'Contenu principal',
  'Self-contained content':
    'Contenu autonome',
  'Thematic grouping':
    'Groupement thématique',
  'Sidebar content':
    'Contenu de barre latérale',
  'Footer content':
    'Contenu de pied de page',
  'Images with captions':
    'Images avec légendes',

  // CSS Box Model
  'The CSS Box Model is a fundamental concept that describes how elements are structured and displayed on a web page':
    'Le modèle de boîte CSS est un concept fondamental qui décrit comment les éléments sont structurés et affichés sur une page web',
  'Every element in CSS is represented as a rectangular box':
    'Chaque élément en CSS est représenté comme une boîte rectangulaire',
  'and the box model defines how the different parts of that box behave':
    'et le modèle de boîte définit comment les différentes parties de cette boîte se comportent',
  'The Box Model consists of four main areas':
    'Le modèle de boîte se compose de quatre zones principales',
  'Content':
    'Contenu',
  'The actual content of the element':
    'Le contenu réel de l\'élément',
  'text, images, etc':
    'texte, images, etc',
  'Padding':
    'Remplissage',
  'Space between the content and the border':
    'Espace entre le contenu et la bordure',
  'Border':
    'Bordure',
  'A line surrounding the padding and content':
    'Une ligne entourant le remplissage et le contenu',
  'Margin':
    'Marge',
  'Space outside the border, separating the element from other elements':
    'Espace à l\'extérieur de la bordure, séparant l\'élément des autres éléments',
  'Content width':
    'Largeur du contenu',
  'Content height':
    'Hauteur du contenu',
  'Space inside the border':
    'Espace à l\'intérieur de la bordure',
  'Border around padding and content':
    'Bordure autour du remplissage et du contenu',
  'Space outside the border':
    'Espace à l\'extérieur de la bordure',
  'Total element size calculation':
    'Calcul de la taille totale de l\'élément',
  'Total Width':
    'Largeur totale',
  'Total Height':
    'Hauteur totale',
  'width':
    'largeur',
  'height':
    'hauteur',
  'padding':
    'remplissage',
  'border':
    'bordure',
  'margin':
    'marge',
  'left':
    'gauche',
  'right':
    'droite',
  'top':
    'haut',
  'bottom':
    'bas',
  'property':
    'propriété',
  'Box-sizing':
    'Dimensionnement de boîte',
  'Default behavior':
    'Comportement par défaut',
  'Width and height apply only to content':
    'La largeur et la hauteur s\'appliquent uniquement au contenu',
  'Alternative behavior':
    'Comportement alternatif',
  'Width and height include padding and border':
    'La largeur et la hauteur incluent le remplissage et la bordure',

  // Common programming terms and longer phrases only
  'reference types':
    'types par référence',
  'also known as':
    'également connu sous le nom de',
  'for example':
    'par exemple',
  'such as':
    'tel que',
  'e.g.':
    'par ex.',
  'i.e.':
    'c\'est-à-dire',
  'etc.':
    'etc.',

  // More complete sentences - primitives (q001)
  'either primitive or non-primitive':
    'soit primitives soit non-primitives',
  'which include arrays, functions, and custom objects':
    'qui incluent les tableaux, les fonctions et les objets personnalisés',
  'We can detect primitive or non-primitive in JavaScript in the following ways':
    'On peut détecter les valeurs primitives ou non-primitives en JavaScript de la manière suivante',
  'If a value is primitive, it will be equal to its object-wrapped version':
    'Si une valeur est primitive, elle sera égale à sa version enveloppée dans un objet',
  'If a value is non-primitive, it won\'t be equal to its object-wrapped version':
    'Si une valeur est non-primitive, elle ne sera pas égale à sa version enveloppée dans un objet',

  // ES6 Features (q002)
  'In ES6, JavaScript introduced these key features':
    'Dans ES6, JavaScript a introduit ces fonctionnalités clés',
  'Arrow Functions: Concise syntax for anonymous functions with lexical scoping':
    'Fonctions fléchées : Syntaxe concise pour les fonctions anonymes avec portée lexicale',
  'Template Literals: Enables multiline strings and variable inclusion for improved readability':
    'Littéraux de gabarit : Permettent les chaînes multilignes et l\'inclusion de variables pour une meilleure lisibilité',
  'Destructuring Assignment: Simplifies extraction of values from arrays or objects':
    'Affectation par déstructuration : Simplifie l\'extraction de valeurs depuis des tableaux ou objets',
  'Enhanced Object Literals: Introduces shorthand notation for defining object methods and dynamic property names':
    'Littéraux d\'objets améliorés : Introduit une notation abrégée pour définir les méthodes d\'objets et les noms de propriétés dynamiques',
  'Promises: Streamlines asynchronous programming with a cleaner, structured approach':
    'Promesses : Simplifie la programmation asynchrone avec une approche plus propre et structurée',

  // var, const, let (q003)
  'Attribute':
    'Attribut',
  'Scope':
    'Portée',
  'Functional scope':
    'Portée fonctionnelle',
  'Block scope':
    'Portée de bloc',
  'Update/Re-declaration':
    'Mise à jour/Re-déclaration',
  'Can be updated and re-declared within the scope':
    'Peut être mis à jour et re-déclaré dans la portée',
  'Can be updated but cannot be re-declared within the scope':
    'Peut être mis à jour mais ne peut pas être re-déclaré dans la portée',
  'Cannot be updated or re-declared within the scope':
    'Ne peut pas être mis à jour ou re-déclaré dans la portée',
  'Declaration without Initialization':
    'Déclaration sans initialisation',
  'Can be declared without being initialized':
    'Peut être déclaré sans être initialisé',
  'Cannot be declared without being initialized':
    'Ne peut pas être déclaré sans être initialisé',
  'Access without Initialization':
    'Accès sans initialisation',
  'Accessible without initialization (default: undefined)':
    'Accessible sans initialisation (par défaut : undefined)',
  'Inaccessible without initialization (throws \'ReferenceError\')':
    'Inaccessible sans initialisation (lève \'ReferenceError\')',
  'Hoisting':
    'Remontée (Hoisting)',
  'Hoisted and initialized with a \'default\' value':
    'Remonté et initialisé avec une valeur \'par défaut\'',
  'Hoisted but not initialized (error if accessed before declaration/initialization)':
    'Remonté mais non initialisé (erreur si accédé avant déclaration/initialisation)',

  // Strict Mode (q006)
  'Strict Mode is a feature that allows you to place a program, or a function, in a "strict" operating context':
    'Le mode strict est une fonctionnalité qui vous permet de placer un programme, ou une fonction, dans un contexte opérationnel "strict"',
  'This way it prevents certain actions from being taken and throws more exceptions':
    'De cette façon, il empêche certaines actions d\'être prises et lève plus d\'exceptions',
  'The literal expression "use strict" instructs the browser to use the JavaScript code in the Strict mode':
    'L\'expression littérale "use strict" indique au navigateur d\'utiliser le code JavaScript en mode strict',
  'Strict mode helps in writing "secure" JavaScript by notifying "bad syntax" into real errors':
    'Le mode strict aide à écrire du JavaScript "sécurisé" en notifiant la "mauvaise syntaxe" comme de vraies erreurs',
  'The strict mode is declared by adding `"use strict";` to the beginning of a script or a function':
    'Le mode strict est déclaré en ajoutant `"use strict";` au début d\'un script ou d\'une fonction',
  'If declared at the beginning of a script, it has global scope':
    'Si déclaré au début d\'un script, il a une portée globale',

  // NaN (q007)
  'The `NaN` property in JavaScript represents a value that is "Not-a-Number," indicating an illegal or undefined numeric value':
    'La propriété `NaN` en JavaScript représente une valeur qui est "Not-a-Number" (Pas un nombre), indiquant une valeur numérique illégale ou indéfinie',
  'When checking the type of `NaN` using the `typeof` operator, it returns "Number."':
    'Lors de la vérification du type de `NaN` avec l\'opérateur `typeof`, il retourne "Number."',
  'To determine if a value is `NaN`, the `isNaN()` function is employed':
    'Pour déterminer si une valeur est `NaN`, la fonction `isNaN()` est utilisée',
  'It converts the given value to a Number type and then checks if it equals `NaN`':
    'Elle convertit la valeur donnée en type Number puis vérifie si elle est égale à `NaN`',

  // Dynamically typed (q008)
  'JavaScript is a dynamically typed language':
    'JavaScript est un langage à typage dynamique',
  'In a dynamically typed language, variable types are determined at runtime, allowing a variable to hold values of any type without explicit type declarations':
    'Dans un langage à typage dynamique, les types de variables sont déterminés à l\'exécution, permettant à une variable de contenir des valeurs de n\'importe quel type sans déclarations de type explicites',
  'This flexibility can make coding more convenient but may also lead to runtime errors if types are not handled appropriately':
    'Cette flexibilité peut rendre le codage plus pratique mais peut aussi conduire à des erreurs d\'exécution si les types ne sont pas gérés correctement',
  'JavaScript, being dynamically typed, allows variables to change types during execution and accommodates a wide range of data types without explicit type annotations':
    'JavaScript, étant à typage dynamique, permet aux variables de changer de types pendant l\'exécution et accommode une large gamme de types de données sans annotations de type explicites',

  // Higher-Order Functions (q009)
  'Functions that treat other functions as values, either by':
    'Fonctions qui traitent d\'autres fonctions comme des valeurs, soit en',
  'Taking one or more functions as arguments':
    'Prenant une ou plusieurs fonctions comme arguments',
  'Returning a function as a result':
    'Retournant une fonction comme résultat',
  'Common Examples of Built-in HOFs':
    'Exemples courants de HOF intégrées',
  'map():':
    'map() :',
  'Applies a function to each element of an array and creates a new array with the results':
    'Applique une fonction à chaque élément d\'un tableau et crée un nouveau tableau avec les résultats',
  'filter():':
    'filter() :',
  'Creates a new array containing only elements that pass a test implemented by a provided function':
    'Crée un nouveau tableau contenant uniquement les éléments qui passent un test implémenté par une fonction fournie',
  'reduce():':
    'reduce() :',
  'Applies a function against an accumulator and each element in an array (from left to right) to reduce it to a single value':
    'Applique une fonction contre un accumulateur et chaque élément d\'un tableau (de gauche à droite) pour le réduire à une seule valeur',
  'Creating Custom HOFs':
    'Créer des HOF personnalisées',
  'You can define your own HOFs to encapsulate common patterns and operations':
    'Vous pouvez définir vos propres HOF pour encapsuler des modèles et opérations courants',

  // DOM (q011)
  'DOM stands for Document Object Model, serving as a programming interface for web documents':
    'DOM signifie Document Object Model, servant d\'interface de programmation pour les documents web',
  'Tree Structure: It represents the document as a tree, with the document object at the top and elements, attributes, and text forming the branches':
    'Structure arborescente : Il représente le document comme un arbre, avec l\'objet document au sommet et les éléments, attributs et texte formant les branches',
  'Objects: Every document component (element, attribute, text) is an object in the DOM, allowing dynamic manipulation through programming languages like JavaScript':
    'Objets : Chaque composant du document (élément, attribut, texte) est un objet dans le DOM, permettant une manipulation dynamique via des langages de programmation comme JavaScript',
  'Dynamic Interaction: Enables real-time updates and interactions on web pages by modifying content and structure in response to user actions':
    'Interaction dynamique : Permet des mises à jour et interactions en temps réel sur les pages web en modifiant le contenu et la structure en réponse aux actions de l\'utilisateur',
  'Programming Interface: Provides a standardized way to interact with a web document, accessible and modifiable using scripts':
    'Interface de programmation : Fournit une manière standardisée d\'interagir avec un document web, accessible et modifiable via des scripts',
  'Cross-platform and Language-Agnostic: Not bound to a specific language and works across various web browsers, ensuring a consistent approach to document manipulation':
    'Multi-plateforme et indépendant du langage : Non lié à un langage spécifique et fonctionne sur divers navigateurs web, assurant une approche cohérente de la manipulation de documents',
  'Browser Implementation: While browsers have their own DOM implementations, they follow standards set by the World Wide Web Consortium (W3C), ensuring uniformity in document representation and manipulation':
    'Implémentation navigateur : Bien que les navigateurs aient leurs propres implémentations DOM, ils suivent les normes établies par le World Wide Web Consortium (W3C), assurant l\'uniformité dans la représentation et la manipulation des documents',

  // BOM (q012)
  'BOM (Browser Object Model) is a programming interface extending beyond DOM, providing control over browser-related features':
    'BOM (Browser Object Model) est une interface de programmation s\'étendant au-delà du DOM, fournissant un contrôle sur les fonctionnalités liées au navigateur',
  'Window Object: Core BOM element representing the browser window, with properties and methods for browser control':
    'Objet Window : Élément BOM principal représentant la fenêtre du navigateur, avec des propriétés et méthodes pour le contrôle du navigateur',
  'Navigator, Location, History, Screen Objects: Components handling browser information, URL navigation, session history, and screen details':
    'Objets Navigator, Location, History, Screen : Composants gérant les informations du navigateur, la navigation d\'URL, l\'historique de session et les détails d\'écran',
  'Document Object: Accessible through BOM, allowing interaction with the structure of web pages':
    'Objet Document : Accessible via BOM, permettant l\'interaction avec la structure des pages web',
  'Timers: Functions like setTimeout and setInterval for scheduling code execution':
    'Minuteries : Fonctions comme setTimeout et setInterval pour planifier l\'exécution du code',
  'Client Object: Represents user device information, aiding in responsive web design':
    'Objet Client : Représente les informations de l\'appareil utilisateur, aidant à la conception web responsive',
  'Event Object: Manages events triggered by user actions or browser events':
    'Objet Event : Gère les événements déclenchés par les actions de l\'utilisateur ou les événements du navigateur',

  // Table translations
  'Feature':
    'Caractéristique',
  'Type':
    'Type',
  'Definition':
    'Définition',
  'Nature':
    'Nature',
  'Representation':
    'Représentation',
  'Conversion in Operations':
    'Conversion dans les opérations',
  'Assignment value indicating no object':
    'Valeur d\'affectation indiquant aucun objet',
  'variable declared but not yet assigned a value':
    'variable déclarée mais pas encore affectée une valeur',
  'primitive value representing Null/empty':
    'valeur primitive représentant Null/vide',
  'primitive value used when a variable is unassigned':
    'valeur primitive utilisée quand une variable n\'est pas affectée',
  'Absence of a value for a variable':
    'Absence d\'une valeur pour une variable',
  'Indicates the absence of the variable itself':
    'Indique l\'absence de la variable elle-même',
  'Converted to zero':
    'Converti en zéro',
  'Converted to NaN during primitive operations':
    'Converti en NaN lors des opérations primitives',

  // this keyword (q013)
  'In JavaScript, the `this` keyword is a special variable that is automatically defined in the scope of every function':
    'En JavaScript, le mot-clé `this` est une variable spéciale qui est automatiquement définie dans la portée de chaque fonction',
  'Its value depends on how the function is invoked':
    'Sa valeur dépend de la façon dont la fonction est invoquée',
  'The `this` keyword is used to refer to the object that is the current context of the function or, more simply, the object that the function is a method of':
    'Le mot-clé `this` est utilisé pour faire référence à l\'objet qui est le contexte actuel de la fonction ou, plus simplement, l\'objet dont la fonction est une méthode',
  'Global Context:':
    'Contexte global :',
  'When `this` is used outside of any function or method, it refers to the global object (in a browser environment, it usually refers to `window`)':
    'Lorsque `this` est utilisé en dehors de toute fonction ou méthode, il fait référence à l\'objet global (dans un environnement navigateur, il fait généralement référence à `window`)',
  'Method Invocation:':
    'Invocation de méthode :',
  'When a function is a method of an object, `this` refers to that object':
    'Lorsqu\'une fonction est une méthode d\'un objet, `this` fait référence à cet objet',
  'Constructor Function:':
    'Fonction constructeur :',
  'When a function is used as a constructor with the `new` keyword, `this` refers to the newly created instance of the object':
    'Lorsqu\'une fonction est utilisée comme constructeur avec le mot-clé `new`, `this` fait référence à l\'instance nouvellement créée de l\'objet',

  // Scope (q014)
  'In JavaScript, the term "scope" refers to the context in which variables and functions are declared and accessed':
    'En JavaScript, le terme "portée" fait référence au contexte dans lequel les variables et fonctions sont déclarées et accessibles',
  'It defines the visibility and accessibility of these variables and functions within the code':
    'Il définit la visibilité et l\'accessibilité de ces variables et fonctions dans le code',
  'Understanding scope is crucial for managing the lifecycle and behavior of variables and functions in a program':
    'Comprendre la portée est crucial pour gérer le cycle de vie et le comportement des variables et fonctions dans un programme',
  'Global Scope:':
    'Portée globale :',
  'Variables declared outside of any function or block have global scope':
    'Les variables déclarées en dehors de toute fonction ou bloc ont une portée globale',
  'Global variables are accessible throughout the entire code, including within functions':
    'Les variables globales sont accessibles dans tout le code, y compris dans les fonctions',
  'Local Scope:':
    'Portée locale :',
  'Variables declared inside a function or block have local scope':
    'Les variables déclarées à l\'intérieur d\'une fonction ou bloc ont une portée locale',
  'Local variables are only accessible within the function or block where they are declared':
    'Les variables locales ne sont accessibles que dans la fonction ou le bloc où elles sont déclarées',
  'Scope Chain:':
    'Chaîne de portée :',
  'The scope chain refers to the hierarchy of scopes in a program':
    'La chaîne de portée fait référence à la hiérarchie des portées dans un programme',
  'When a variable or function is referenced, JavaScript looks for it in the current scope and then traverses up the scope chain until it finds the variable or reaches the global scope':
    'Lorsqu\'une variable ou fonction est référencée, JavaScript la cherche dans la portée actuelle puis remonte la chaîne de portée jusqu\'à ce qu\'il trouve la variable ou atteigne la portée globale',

  // call, apply, bind (q016)
  'In JavaScript, the `call`, `apply`, and `bind` methods are used to manipulate how a function is invoked and set the value of `this` within the function':
    'En JavaScript, les méthodes `call`, `apply` et `bind` sont utilisées pour manipuler la façon dont une fonction est invoquée et définir la valeur de `this` dans la fonction',
  'call method:':
    'Méthode call :',
  'The `call` method is used to invoke a function with a specified `this` value and arguments provided individually':
    'La méthode `call` est utilisée pour invoquer une fonction avec une valeur `this` spécifiée et des arguments fournis individuellement',
  'Here, `call` is used to invoke the `sayHello` function with `person` as the `this` value, and `\'Hello\'` as an argument':
    'Ici, `call` est utilisée pour invoquer la fonction `sayHello` avec `person` comme valeur `this`, et `\'Hello\'` comme argument',
  'apply method:':
    'Méthode apply :',
  'The `apply` method is similar to `call`, but it accepts arguments as an array':
    'La méthode `apply` est similaire à `call`, mais elle accepte les arguments comme un tableau',
  'In this example, `apply` is used to achieve the same result as `call`, but the arguments are provided as an array':
    'Dans cet exemple, `apply` est utilisée pour obtenir le même résultat que `call`, mais les arguments sont fournis comme un tableau',
  'bind method:':
    'Méthode bind :',
  'The `bind` method creates a new function with a specified `this` value and, optionally, initial arguments':
    'La méthode `bind` crée une nouvelle fonction avec une valeur `this` spécifiée et, optionnellement, des arguments initiaux',
  'Here, `bind` is used to create a new function (`sayHelloToJohn`) where `this` is permanently set to `person`':
    'Ici, `bind` est utilisée pour créer une nouvelle fonction (`sayHelloToJohn`) où `this` est définitivement défini à `person`',
  'When calling `sayHelloToJohn`, it\'s as if you\'re calling `sayHello` with `person` as `this`':
    'Lors de l\'appel de `sayHelloToJohn`, c\'est comme si vous appeliez `sayHello` avec `person` comme `this`',
  'These methods are especially useful when dealing with functions that are part of objects or classes, and you want to explicitly set the context (`this`) for their execution':
    'Ces méthodes sont particulièrement utiles lors du traitement de fonctions qui font partie d\'objets ou de classes, et vous voulez définir explicitement le contexte (`this`) pour leur exécution',

  // Pure and Impure Functions (q017)
  'Pure Function:':
    'Fonction pure :',
  'A pure function is a function that always returns the same result if the same arguments are passed in':
    'Une fonction pure est une fonction qui retourne toujours le même résultat si les mêmes arguments sont passés',
  'It does not depend on any state or data change during a program\'s execution':
    'Elle ne dépend d\'aucun état ou changement de données pendant l\'exécution d\'un programme',
  'It only depends on its input arguments':
    'Elle ne dépend que de ses arguments d\'entrée',
  'In this example, the `add` function is pure because it only depends on its input parameters (`a` and `b`) to produce a result and doesn\'t modify any external state':
    'Dans cet exemple, la fonction `add` est pure car elle ne dépend que de ses paramètres d\'entrée (`a` et `b`) pour produire un résultat et ne modifie aucun état externe',
  'Impure Function:':
    'Fonction impure :',
  'An impure function is a function that relies on or modifies external state or has side effects':
    'Une fonction impure est une fonction qui dépend ou modifie l\'état externe ou a des effets secondaires',
  'In this case, `addToTotal` is impure because it modifies the external variable `total` and has a side effect that can affect other parts of the program':
    'Dans ce cas, `addToTotal` est impure car elle modifie la variable externe `total` et a un effet secondaire qui peut affecter d\'autres parties du programme',

  // Prototypes (q018)
  'Every object in JavaScript has a prototype, which acts as a blueprint for shared properties and methods':
    'Chaque objet en JavaScript a un prototype, qui agit comme un modèle pour les propriétés et méthodes partagées',
  'When you try to access a property or method on an object, JavaScript first checks the object itself':
    'Lorsque vous essayez d\'accéder à une propriété ou méthode sur un objet, JavaScript vérifie d\'abord l\'objet lui-même',
  'If it\'s not found, it looks up the prototype chain, following a linked list of prototypes until it finds what it\'s looking for, or reaches the end (`null`)':
    'Si elle n\'est pas trouvée, il remonte la chaîne de prototypes, suivant une liste chaînée de prototypes jusqu\'à ce qu\'il trouve ce qu\'il cherche, ou atteigne la fin (`null`)',
  'The `Person` function acts as a constructor to create objects with a `name` property':
    'La fonction `Person` agit comme un constructeur pour créer des objets avec une propriété `name`',
  'The `greet` method is added to the `Person.prototype`, meaning it\'s shared by all instances created from `Person`':
    'La méthode `greet` est ajoutée au `Person.prototype`, ce qui signifie qu\'elle est partagée par toutes les instances créées à partir de `Person`',
  'When `person1.greet()` is called, JavaScript finds the `greet` method on the prototype, so it can be used even though it wasn\'t defined directly on `person1`':
    'Lorsque `person1.greet()` est appelé, JavaScript trouve la méthode `greet` sur le prototype, donc elle peut être utilisée même si elle n\'a pas été définie directement sur `person1`',
  'Add a method to the prototype, shared by all Person objects:':
    'Ajouter une méthode au prototype, partagée par tous les objets Person :',
  'Create two Person objects:':
    'Créer deux objets Person :',
  'Both objects can access the greet method from the prototype:':
    'Les deux objets peuvent accéder à la méthode greet depuis le prototype :',

  // Callbacks and Callback Hell (q019)
  'In JavaScript, a callback is a function that is passed as an argument to another function and is executed after the completion of some asynchronous operation or at a specified time':
    'En JavaScript, un callback est une fonction qui est passée comme argument à une autre fonction et est exécutée après la complétion d\'une opération asynchrone ou à un moment spécifié',
  'Callbacks are commonly used in scenarios like handling asynchronous tasks, event handling, and other situations where the order of execution is not guaranteed':
    'Les callbacks sont couramment utilisés dans des scénarios comme la gestion de tâches asynchrones, la gestion d\'événements, et d\'autres situations où l\'ordre d\'exécution n\'est pas garanti',
  'In this example, the `customGreeting` function is the callback function passed to `outerFunction`':
    'Dans cet exemple, la fonction `customGreeting` est la fonction callback passée à `outerFunction`',
  'Callback Hell:':
    'Callback Hell :',
  'Callback hell (or "pyramid of doom") is a situation in which multiple nested callbacks make the code difficult to read and maintain':
    'Le callback hell (ou "pyramide de la mort") est une situation dans laquelle plusieurs callbacks imbriqués rendent le code difficile à lire et maintenir',
  'This often occurs when dealing with asynchronous operations, such as making multiple API calls or handling multiple events':
    'Cela se produit souvent lors du traitement d\'opérations asynchrones, comme faire plusieurs appels API ou gérer plusieurs événements',
  'Example of Callback Hell:':
    'Exemple de Callback Hell :',
  'In this example, we have nested callbacks for getting a user, fetching their profile, retrieving their posts, and finally displaying the user profile':
    'Dans cet exemple, nous avons des callbacks imbriqués pour obtenir un utilisateur, récupérer son profil, récupérer ses posts, et finalement afficher le profil utilisateur',
  'As more asynchronous operations are added, the code becomes more difficult to read and maintain':
    'Au fur et à mesure que plus d\'opérations asynchrones sont ajoutées, le code devient plus difficile à lire et maintenir',
  'To address callback hell, developers often use techniques like Promises or `async/await` in modern JavaScript to make code more readable and manageable':
    'Pour résoudre le callback hell, les développeurs utilisent souvent des techniques comme les promesses ou `async/await` en JavaScript moderne pour rendre le code plus lisible et gérable',

  // Temporal Dead Zone (q020)
  'The Temporal Dead Zone is a phenomenon in JavaScript associated with the use of the `let` and `const` keywords, unlike the `var` keyword':
    'La Zone Morte Temporelle est un phénomène en JavaScript associé à l\'utilisation des mots-clés `let` et `const`, contrairement au mot-clé `var`',
  'In ECMAScript 6, attempting to access a `let` or `const` variable before it is declared within its scope results in a `ReferenceError`':
    'Dans ECMAScript 6, tenter d\'accéder à une variable `let` ou `const` avant qu\'elle soit déclarée dans sa portée résulte en une `ReferenceError`',
  'The term "temporal dead zone" refers to the timeframe during which this occurs, spanning from the creation of the variable\'s binding to its actual declaration':
    'Le terme "zone morte temporelle" fait référence à la période pendant laquelle cela se produit, allant de la création de la liaison de la variable à sa déclaration effective',
  'In this example, attempting to access `value2` before its declaration causes a `ReferenceError` due to the temporal dead zone, while accessing `value1` results in an output of `undefined`':
    'Dans cet exemple, tenter d\'accéder à `value2` avant sa déclaration provoque une `ReferenceError` due à la zone morte temporelle, tandis qu\'accéder à `value1` résulte en une sortie de `undefined`',

  // Promises
  'JavaScript Promises offer a streamlined approach to managing asynchronous operations':
    'Les promesses JavaScript offrent une approche simplifiée pour gérer les opérations asynchrones',
  'mitigating the callback hell problem encountered with events and traditional callback functions':
    'atténuant le problème de callback hell rencontré avec les événements et les fonctions de rappel traditionnelles',
  'Before Promises, working with callbacks often led to code that was hard to manage due to nested structures':
    'Avant les promesses, travailler avec des callbacks menait souvent à du code difficile à gérer en raison de structures imbriquées',
  'Promises serve as a cleaner solution for handling asynchronous tasks in JavaScript':
    'Les promesses servent de solution plus propre pour gérer les tâches asynchrones en JavaScript',
  'Syntax for creating a Promise':
    'Syntaxe pour créer une promesse',
  'Perform asynchronous operations':
    'Effectuer des opérations asynchrones',
  'The Promise constructor takes a single callback function as its argument':
    'Le constructeur Promise prend une seule fonction de rappel comme argument',
  'which, in turn, accepts two parameters':
    'qui, à son tour, accepte deux paramètres',
  'The operations inside this callback determine whether the Promise is fulfilled by calling':
    'Les opérations à l\'intérieur de ce rappel déterminent si la promesse est résolue en appelant',
  'or rejected by calling':
    'ou rejetée en appelant',
  'A Promise can exist in one of four states':
    'Une promesse peut exister dans l\'un des quatre états',
  'fulfilled':
    'résolue',
  'rejected':
    'rejetée',
  'pending':
    'en attente',
  'settled':
    'établie',
  'The action related to the promise succeeded':
    'L\'action liée à la promesse a réussi',
  'The action related to the promise failed':
    'L\'action liée à la promesse a échoué',
  'The promise is still awaiting fulfillment or rejection':
    'La promesse attend toujours sa résolution ou son rejet',
  'The promise has been either fulfilled or rejected':
    'La promesse a été soit résolue soit rejetée',

  // Rest Parameters (q022 & q023)
  'In JavaScript, the rest parameter is a feature that allows you to represent an indefinite number of arguments as an array':
    'En JavaScript, le paramètre rest est une fonctionnalité qui vous permet de représenter un nombre indéfini d\'arguments sous forme de tableau',
  'It is denoted by three dots (`...`) followed by the parameter name':
    'Il est indiqué par trois points (`...`) suivis du nom du paramètre',
  'The rest parameter collects all the remaining arguments passed to a function into a single array':
    'Le paramètre rest collecte tous les arguments restants passés à une fonction dans un seul tableau',
  'In this example, the `sum` function accepts any number of arguments':
    'Dans cet exemple, la fonction `sum` accepte n\'importe quel nombre d\'arguments',
  'The rest parameter `...numbers` collects all the arguments into an array called `numbers`':
    'Le paramètre rest `...numbers` collecte tous les arguments dans un tableau appelé `numbers`',
  'The function then uses the `reduce` method to sum up all the numbers in the array':
    'La fonction utilise ensuite la méthode `reduce` pour additionner tous les nombres dans le tableau',
  'It\'s important to note that the rest parameter must be the last parameter in the function declaration':
    'Il est important de noter que le paramètre rest doit être le dernier paramètre dans la déclaration de fonction',
  'The correct way to use the rest parameter in JavaScript is to ensure it is the last parameter in the function declaration':
    'La bonne façon d\'utiliser le paramètre rest en JavaScript est de s\'assurer qu\'il est le dernier paramètre dans la déclaration de fonction',
  'Valid Example:':
    'Exemple valide :',
  'Invalid Example:':
    'Exemple invalide :',
  'In the invalid example, the rest parameter is not the last parameter, which is incorrect syntax':
    'Dans l\'exemple invalide, le paramètre rest n\'est pas le dernier paramètre, ce qui est une syntaxe incorrecte',

  // Generator Functions (q024)
  'In JavaScript, generator functions are a special kind of function that allows you to control the execution flow and pause/resume it at certain points':
    'En JavaScript, les fonctions génératrices sont un type spécial de fonction qui vous permet de contrôler le flux d\'exécution et de le mettre en pause/reprendre à certains points',
  'Generator functions are defined using the `function*` syntax and use the `yield` keyword to produce a sequence of values':
    'Les fonctions génératrices sont définies en utilisant la syntaxe `function*` et utilisent le mot-clé `yield` pour produire une séquence de valeurs',
  'When a generator function is called, it returns an iterator called a generator':
    'Lorsqu\'une fonction génératrice est appelée, elle retourne un itérateur appelé un générateur',
  'In this example:':
    'Dans cet exemple :',
  'The `function* simpleGenerator()` syntax defines a generator function':
    'La syntaxe `function* simpleGenerator()` définit une fonction génératrice',
  'The `yield` keyword is used to produce values':
    'Le mot-clé `yield` est utilisé pour produire des valeurs',
  'Each time `yield` is encountered, the generator pauses its execution, and the yielded value is returned to the caller along with `done: false`':
    'Chaque fois que `yield` est rencontré, le générateur met en pause son exécution, et la valeur produite est retournée à l\'appelant avec `done: false`',
  'The generator can be resumed later':
    'Le générateur peut être repris plus tard',
  'The `generator.next()` method is used to advance the generator\'s execution':
    'La méthode `generator.next()` est utilisée pour avancer l\'exécution du générateur',
  'It returns an object with two properties: `value` (the yielded value) and `done` (a boolean indicating whether the generator has finished)':
    'Elle retourne un objet avec deux propriétés : `value` (la valeur produite) et `done` (un booléen indiquant si le générateur a terminé)',
  'Generators are useful for lazy evaluation, asynchronous programming, and creating iterable sequences':
    'Les générateurs sont utiles pour l\'évaluation paresseuse, la programmation asynchrone, et la création de séquences itérables',

  // Function Declarations vs Expressions (q025)
  'Function Declaration:':
    'Déclaration de fonction :',
  'A function declaration is a statement that defines a function and hoists it to the top of the current scope':
    'Une déclaration de fonction est une instruction qui définit une fonction et la remonte en haut de la portée actuelle',
  'It starts with the `function` keyword, followed by the function name, parameters (enclosed in parentheses), and the function body':
    'Elle commence par le mot-clé `function`, suivi du nom de la fonction, des paramètres (entre parenthèses), et du corps de la fonction',
  'Function declarations can be called before they are declared in the code because of hoisting':
    'Les déclarations de fonction peuvent être appelées avant d\'être déclarées dans le code grâce au hoisting',
  'Function Expression:':
    'Expression de fonction :',
  'A function expression is an assignment where a function is defined as part of an expression':
    'Une expression de fonction est une affectation où une fonction est définie comme partie d\'une expression',
  'It does not get hoisted in the same way as function declarations':
    'Elle n\'est pas remontée de la même manière que les déclarations de fonction',
  'Function expressions are often used in cases where you need to assign a function to a variable or pass it as an argument to another function':
    'Les expressions de fonction sont souvent utilisées dans les cas où vous devez affecter une fonction à une variable ou la passer comme argument à une autre fonction',
  'In this example, `add` is a variable that holds an anonymous function':
    'Dans cet exemple, `add` est une variable qui contient une fonction anonyme',
  'Function declarations are hoisted, while function expressions are not hoisted in the same way':
    'Les déclarations de fonction sont remontées, tandis que les expressions de fonction ne sont pas remontées de la même manière',
  'If you try to call a function expression before its definition, you\'ll get an error':
    'Si vous essayez d\'appeler une expression de fonction avant sa définition, vous obtiendrez une erreur',

  // setTimeout, setImmediate, process.nextTick (q026)
  '1. setTimeout:':
    '1. setTimeout :',
  'Schedules the callback to be executed after a specified delay (in milliseconds)':
    'Planifie le callback pour être exécuté après un délai spécifié (en millisecondes)',
  'The callback is added to the event queue, and it will be executed after the specified delay, but the exact timing is not guaranteed':
    'Le callback est ajouté à la file d\'événements, et il sera exécuté après le délai spécifié, mais le timing exact n\'est pas garanti',
  '2. setImmediate:':
    '2. setImmediate :',
  'Schedules the callback to be executed in the next iteration of the event loop':
    'Planifie le callback pour être exécuté dans la prochaine itération de la boucle d\'événements',
  'It\'s often used when you want the callback to be executed immediately after the current event loop cycle':
    'Il est souvent utilisé lorsque vous voulez que le callback soit exécuté immédiatement après le cycle actuel de la boucle d\'événements',
  '3. process.nextTick:':
    '3. process.nextTick :',
  'Executes the callback after the current event loop cycle, but before the event loop continues processing other I/O events':
    'Exécute le callback après le cycle actuel de la boucle d\'événements, mais avant que la boucle d\'événements ne continue à traiter d\'autres événements I/O',
  'It is often used when you want to execute a callback after the current operation but before I/O events':
    'Il est souvent utilisé lorsque vous voulez exécuter un callback après l\'opération actuelle mais avant les événements I/O',
  'These functions are all used in Node.js to schedule the execution of callbacks, but they differ in terms of when the callback will be executed':
    'Ces fonctions sont toutes utilisées dans Node.js pour planifier l\'exécution de callbacks, mais elles diffèrent en termes de moment où le callback sera exécuté',

  // Common words that should remain in lowercase when part of phrases
  'Example 1:':
    'Exemple 1 :',
  'Example 2:':
    'Exemple 2 :',
  'Example 3:':
    'Exemple 3 :',
  'Variable Hoisting':
    'Remontée de variable',
  'Function Hoisting':
    'Remontée de fonction',
  'Example:':
    'Exemple :',

};

function translateTags(tags) {
  return tags.map(tag => translations[tag] || tag);
}

function translateTitle(title) {
  return translations[title] || title;
}

function translateDifficulty(difficulty) {
  return translations[difficulty] || difficulty;
}

// Improved content translation function
function translateContent(content) {
  let translated = content;

  // Sort translations by length (longest first) to avoid partial replacements
  const sortedTranslations = Object.entries(contentTranslations).sort(
    ([a], [b]) => b.length - a.length
  );

  // Replace content phrases with case-insensitive matching
  // but preserve code blocks
  const codeBlockRegex = /```[\s\S]*?```|`[^`]*`/g;
  const codeBlocks = [];

  // Extract code blocks temporarily
  translated = translated.replace(codeBlockRegex, (match, offset) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Translate H1 headers if they match question titles
  translated = translated.replace(/^# (.+)$/gm, (match, headerText) => {
    const trimmedHeader = headerText.trim();
    // Check if this header matches any of our title translations
    for (const [english, french] of Object.entries(translations)) {
      if (trimmedHeader.toLowerCase() === english.toLowerCase() && french) {
        return `# ${french}`;
      }
    }
    return match; // Keep original if no translation found
  });

  // Translate content outside of code blocks
  for (const [english, french] of sortedTranslations) {
    if (french) { // Skip empty translations
      // Create a regex that matches word boundaries when appropriate
      const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Add word boundaries for short words (less than 4 chars) to avoid partial replacements
      // For longer phrases or words with punctuation, match as-is
      let regex;
      if (english.length <= 3 && /^\w+$/.test(english)) {
        // Short word: use word boundaries
        regex = new RegExp(`\\b${escapedEnglish}\\b`, 'gi');
      } else {
        // Longer phrase or contains punctuation: match as-is
        regex = new RegExp(escapedEnglish, 'gi');
      }

      translated = translated.replace(regex, french);
    }
  }

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    const placeholder = `__CODE_BLOCK_${index}__`;
    translated = translated.replace(placeholder, block);
  });

  return translated;
}

function translateFile(sourceFile, targetFile) {
  const content = readFileSync(sourceFile, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`⚠️  No frontmatter found in ${sourceFile}`);
    return;
  }

  const frontmatter = frontmatterMatch[1];
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Parse frontmatter
  const idMatch = frontmatter.match(/id:\s*(\d+)/);
  const slugMatch = frontmatter.match(/slug:\s*(.+)/);
  const titleMatch = frontmatter.match(/title:\s*"(.+)"/);
  const categoryMatch = frontmatter.match(/category:\s*(.+)/);
  const difficultyMatch = frontmatter.match(/difficulty:\s*(.+)/);
  const tagsMatch = frontmatter.match(/tags:\s*(\[.+\])/);

  const id = idMatch ? idMatch[1] : '';
  const slug = slugMatch ? slugMatch[1] : '';
  const title = titleMatch ? titleMatch[1] : '';
  const category = categoryMatch ? categoryMatch[1] : '';
  const difficulty = difficultyMatch ? difficultyMatch[1] : '';
  const tags = tagsMatch ? JSON.parse(tagsMatch[1].replace(/'/g, '"')) : [];

  // Translate
  const translatedTitle = translateTitle(title);
  const translatedDifficulty = translateDifficulty(difficulty);
  const translatedTags = translateTags(tags);
  const translatedBody = translateContent(body);

  // Create new frontmatter
  const newFrontmatter = `---
id: ${id}
slug: ${slug}
title: "${translatedTitle}"
category: ${category}
difficulty: ${translatedDifficulty}
tags: ${JSON.stringify(translatedTags)}
---
`;

  const newContent = newFrontmatter + translatedBody;

  writeFileSync(targetFile, newContent, 'utf-8');
  console.log(`✅ Translated: ${sourceFile} → ${targetFile}`);
}

function translateDirectory(sourceDir, targetDir) {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`📁 Created directory: ${relative(process.cwd(), targetDir)}`);
  }

  const files = readdirSync(sourceDir);

  files.forEach(file => {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);
    const stats = statSync(sourcePath);

    if (stats.isDirectory()) {
      // Recursively translate subdirectories
      translateDirectory(sourcePath, targetPath);
    } else if (file.endsWith('.md')) {
      // Translate markdown files
      translateFile(sourcePath, targetPath);
    }
  });
}

// Main execution
console.log('🌍 Starting translation from English to French...\n');

const sourceBase = join(__dirname, '../content/en');
const targetBase = join(__dirname, '../content/fr');

// Check if source directory exists
if (!existsSync(sourceBase)) {
  console.error(`❌ Source directory not found: ${sourceBase}`);
  process.exit(1);
}

// Recursively translate all content
console.log('📁 Translating all content recursively...\n');
translateDirectory(sourceBase, targetBase);

console.log('\n🎉 Translation complete!');
console.log(`📂 French content available in: content/fr/\n`);
