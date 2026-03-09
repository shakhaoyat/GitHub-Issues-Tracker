# 🚀 GitHub Issues Tracker

A modern, responsive web application for tracking and managing GitHub issues with a beautiful user interface and powerful search functionality.

![GitHub Issues Tracker](./assets/github-logo.png)

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Demo Credentials](#demo-credentials)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [JavaScript Concepts](#javascript-concepts)
- [Contributing](#contributing)

---

## ✨ Features

### 🔐 Authentication
- Secure login page with credential validation
- Session management using localStorage
- Protected dashboard route

### 🎯 Issue Management
- Display all issues in a beautiful 4-column grid layout
- Filter issues by status (All, Open, Closed)
- Real-time issue count display
- Color-coded issue cards (Green border for Open, Purple for Closed)
- Priority badges (High, Medium, Low)
- Label categorization

### 🔍 Search Functionality
- Search issues by keywords
- Real-time search results
- Clear and re-fetch all issues

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet optimization
- Desktop-first approach with graceful degradation
- Adaptive grid layout (4 columns → 3 → 2 → 1 based on screen size)

### 🎨 User Experience
- Loading spinner during data fetch
- Smooth animations and transitions
- Modal popup for detailed issue view
- Active tab highlighting
- No results messaging

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind CSS
- **Vanilla JavaScript** - Pure JavaScript (ES6+)
- **Fetch API** - Asynchronous data fetching
- **LocalStorage** - Client-side session management

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API access)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-issues-tracker.git
cd github-issues-tracker
```

2. Open the project:
Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Access the application:
Navigate to `http://localhost:8000` in your browser

---

## 🔑 Demo Credentials

**Username:** `admin`  
**Password:** `admin123`

---

## 🌐 API Endpoints

### All Issues
```
GET https://phi-lab-server.vercel.app/api/v1/lab/issues
```

### Single Issue
```
GET https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}
Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33
```

### Search Issues
```
GET https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}
Example: https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications
```

---

## 📁 Project Structure

```
github-issues-tracker/
│
├── index.html              # Login page
├── dashboard.html          # Main issues dashboard
├── styles.css              # All CSS styles
├── login.js                # Login functionality
├── app.js                  # Main application logic
├── README.md               # Project documentation
│
├── assets/
│   ├── github-logo.png     # GitHub logo
│   ├── Aperture.png        # Issues icon
│   ├── Open-Status.png     # Open status icon
│   └── Closed- Status .png # Closed status icon
│
└── GitHub Issues Tracker.fig  # Figma design file
```

---

## 💡 JavaScript Concepts

### 1️⃣ What is the difference between var, let, and const?

**var:**
- Function-scoped or globally-scoped
- Can be re-declared and updated
- Hoisted to the top of their scope with `undefined` value
- Creates a property on the global object when declared globally

**let:**
- Block-scoped (limited to the block, statement, or expression where it's used)
- Cannot be re-declared in the same scope
- Can be updated
- Hoisted but not initialized (Temporal Dead Zone)
- Does not create a property on the global object

**const:**
- Block-scoped like `let`
- Cannot be re-declared or updated
- Must be initialized at declaration
- The variable identifier cannot be reassigned, but object properties can be modified
- Hoisted but not initialized (Temporal Dead Zone)

**Example:**
```javascript
// var - function scoped
function varExample() {
    if (true) {
        var x = 10;
    }
    console.log(x); // 10 - accessible outside block
}

// let - block scoped
function letExample() {
    if (true) {
        let y = 10;
    }
    console.log(y); // ReferenceError - not accessible
}

// const - cannot be reassigned
const PI = 3.14159;
PI = 3.14; // TypeError: Assignment to constant variable

// But object properties can be modified
const user = { name: 'John' };
user.name = 'Jane'; // This works!
user.age = 25; // This works too!
```

---

### 2️⃣ What is the spread operator (...)?

The **spread operator** (`...`) is a JavaScript syntax that allows an iterable (like an array, string, or object) to be expanded in places where zero or more arguments or elements are expected.

**Key Uses:**

1. **Array Expansion:**
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

2. **Copying Arrays:**
```javascript
const original = [1, 2, 3];
const copy = [...original]; // Creates a shallow copy
```

3. **Object Expansion:**
```javascript
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, city: 'New York' };
// { name: 'John', age: 30, city: 'New York' }
```

4. **Function Arguments:**
```javascript
const numbers = [1, 5, 3, 9, 2];
const max = Math.max(...numbers); // 9
```

5. **String to Array:**
```javascript
const str = 'Hello';
const chars = [...str]; // ['H', 'e', 'l', 'l', 'o']
```

**In This Project:**
```javascript
// Used in app.js to create a copy of allIssues
let filteredIssues = [...allIssues];
```

---

### 3️⃣ What is the difference between map(), filter(), and forEach()?

All three are array methods for iteration, but they serve different purposes:

**forEach():**
- Executes a function for each array element
- Returns `undefined` (doesn't return a new array)
- Cannot be chained
- Used for side effects (like logging, updating DOM)

```javascript
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2));
// Outputs: 2, 4, 6
// Returns: undefined
```

**map():**
- Creates a new array by transforming each element
- Returns a new array of the same length
- Can be chained
- Used for data transformation

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// Returns: [2, 4, 6]
```

**filter():**
- Creates a new array with elements that pass a test
- Returns a new array (possibly shorter)
- Can be chained
- Used for filtering/selecting specific elements

```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// Returns: [2, 4]
```

**Comparison Table:**

| Method | Returns | Modifies Original | Use Case |
|--------|---------|-------------------|----------|
| `forEach()` | undefined | No | Side effects |
| `map()` | New array (same length) | No | Transform data |
| `filter()` | New array (filtered) | No | Select data |

**In This Project:**
```javascript
// filter() - Used to filter issues by status
filteredIssues = allIssues.filter(issue => 
    issue.status?.toLowerCase() === 'open'
);

// forEach() - Used to create issue cards
issues.forEach(issue => {
    const card = createIssueCard(issue);
    issuesGrid.appendChild(card);
});
```

---

### 4️⃣ What is an arrow function?

An **arrow function** is a concise syntax for writing function expressions in JavaScript (introduced in ES6). It provides a shorter syntax and has different behavior regarding the `this` keyword.

**Syntax:**
```javascript
// Traditional function
const add = function(a, b) {
    return a + b;
};

// Arrow function
const add = (a, b) => a + b;
```

**Key Characteristics:**

1. **Shorter Syntax:**
```javascript
// No parameters
const greet = () => 'Hello!';

// One parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters
const multiply = (a, b) => a * b;

// Multiple statements (need curly braces)
const calculate = (a, b) => {
    const sum = a + b;
    return sum * 2;
};
```

2. **Lexical `this` Binding:**
Arrow functions don't have their own `this` - they inherit it from the parent scope.

```javascript
// Traditional function
const obj = {
    name: 'John',
    greet: function() {
        setTimeout(function() {
            console.log(this.name); // undefined (this refers to window/global)
        }, 1000);
    }
};

// Arrow function
const obj = {
    name: 'John',
    greet: function() {
        setTimeout(() => {
            console.log(this.name); // 'John' (inherits this from greet)
        }, 1000);
    }
};
```

3. **No `arguments` Object:**
```javascript
// Traditional function
function sum() {
    return Array.from(arguments).reduce((a, b) => a + b);
}

// Arrow function (use rest parameters instead)
const sum = (...args) => args.reduce((a, b) => a + b);
```

**When NOT to Use Arrow Functions:**
- As object methods (when you need `this` to refer to the object)
- As constructors
- When you need the `arguments` object

**In This Project:**
```javascript
// Used extensively for callbacks
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Arrow function preserves this context
        currentFilter = btn.dataset.tab;
        filterIssues();
    });
});

// Used in filter operations
const openCount = allIssues.filter(issue => 
    issue.status?.toLowerCase() === 'open'
).length;
```

---

### 5️⃣ What are template literals?

**Template literals** (also called template strings) are string literals that allow embedded expressions, multi-line strings, and string interpolation. They are enclosed by backticks (`` ` ``) instead of single or double quotes.

**Key Features:**

1. **String Interpolation:**
```javascript
const name = 'John';
const age = 30;

// Old way
const message = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.';

// Template literal
const message = `Hello, my name is ${name} and I am ${age} years old.`;
```

2. **Multi-line Strings:**
```javascript
// Old way (requires concatenation)
const html = '<div>\n' +
             '  <h1>Title</h1>\n' +
             '</div>';

// Template literal
const html = `
    <div>
        <h1>Title</h1>
    </div>
`;
```

3. **Expression Evaluation:**
```javascript
const a = 10;
const b = 20;
console.log(`The sum is ${a + b}`); // "The sum is 30"
console.log(`${a > b ? 'a is greater' : 'b is greater'}`); // "b is greater"
```

4. **Nested Templates:**
```javascript
const items = ['apple', 'banana', 'orange'];
const html = `
    <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
`;
```

5. **Tagged Templates (Advanced):**
```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => 
        `${result}${str}<strong>${values[i] || ''}</strong>`, 
    '');
}

const name = 'John';
const age = 30;
const message = highlight`Name: ${name}, Age: ${age}`;
// "Name: <strong>John</strong>, Age: <strong>30</strong>"
```

**In This Project:**
```javascript
// Used extensively for creating HTML dynamically
card.innerHTML = `
    <div class="issue-card-header">
        <span class="issue-status-badge ${status}">${status}</span>
    </div>
    <h3 class="issue-title">${escapeHtml(issue.title || 'Untitled')}</h3>
    <p class="issue-description">${escapeHtml(issue.description || 'No description')}</p>
    <div class="issue-meta">
        ${issue.label ? `<span class="issue-label">${escapeHtml(issue.label)}</span>` : ''}
        ${issue.priority ? `<span class="issue-priority ${priority}">${escapeHtml(issue.priority)}</span>` : ''}
    </div>
`;

// Used for API endpoint construction
const response = await fetch(`${API_BASE_URL}/issues/search?q=${encodeURIComponent(searchTerm)}`);
```

---

## 🎨 Features Implemented

- ✅ Login page with authentication
- ✅ Dashboard with navbar
- ✅ Tab filtering (All, Open, Closed)
- ✅ Issue cards with color-coded borders
- ✅ Loading spinner
- ✅ Active tab highlighting
- ✅ Search functionality
- ✅ Modal for issue details
- ✅ Responsive design
- ✅ Issue count display
- ✅ Priority and label badges

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created with ❤️ for Assignment-05

---

## 🙏 Acknowledgments

- Design inspiration from GitHub Issues
- API provided by Phi Lab Server
- Icons and assets from the Figma design file

---

**Happy Coding! 🚀**

- Responsiveness: The website should be responsive for mobile devices. It is totally up to you. 


--- 


## ⚙️ Functionalities
- In login page, there will be default admin credentials (username, password). You need to sign in using these credentials.

- Load all issues and display as per Figma

- On clicking on an open or closed tab, it will load the issues data of the related tab and show it in a display-like card in a 4-column layout like Figma. By default, it will show all data 

- Each card shows:
  - Title
  - Description
  - Status
  - Category
  - Author
  - Priority
  - Label
  - CreatedAt
- Clicking on an issue  card will open a modal and show all the information about that Issue. 

### 🚀 Challenges


- Show the card Top border based on their category(open, closed), open card will have Green Boder, closed card will have a purple border on top. 

- Loading spinner on data load

- Show active button on changing category names

- Implement Search Functionality and 8 meaningful github commit.  

- Create a readme file and answer this question on your own. Don’t copy-paste from Google or any AI chatbot. 
    - 1️⃣ What is the difference between var, let, and const?
    - 2️⃣ What is the spread operator (...)?
    - 3️⃣ What is the difference between map(), filter(), and forEach()?
    - 4️⃣ What is an arrow function?
    - 5️⃣ What are template literals?


---

## 🛠️ Technology Stack

- **HTML**
- **CSS** (Vanilla/Tailwind/DaisyUI)
- **JavaScript** (Vanilla)

---

## 🔑 Demo Credentials

```text
Username: admin
Password: admin123
```


---

### Optional: 
 - No need to show status: Open, Closed styles On modals. 
 - No Need to show icon on labels 
 - No need to apply styles on Priority 
--- 


## 📤 What to submit

- **GitHub Repository Link:**
- **Live Site Link:**

---


