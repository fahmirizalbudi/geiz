<div align="center">
<img src="./logo.svg" width="120" height="120" alt="Navio Logo">

<br />
<br />

![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/Router-000000?style=for-the-badge&logo=googlemaps&logoColor=white)
![](https://img.shields.io/badge/Zero_Dependency-DC143C?style=for-the-badge&logo=micro-strategy&logoColor=white)

</div>

<br/>

# Navio

Navio is a lightweight, zero-dependency client-side router for modern JavaScript applications. Built for simplicity and performance, it offers a robust routing solution without the overhead of larger frameworks.

## Features

- **Blazing Fast:** Native History API integration for instant page transitions.
- **Tiny Footprint:** ~1.5kb gzipped with zero dependencies.
- **Plug & Play:** Drop-in support for any vanilla JS or framework-based project.
- **Dynamic Routing:** Built-in support for URL parameters (`/user/:id`) and query strings.
- **Declarative Links:** Automatic handling of `data-navio` anchor tags.

## Tech Stack

- **JavaScript (ES6+)**: Written in modern, clean JavaScript.
- **JSDoc**: Fully typed for excellent IDE support.

## Getting Started

To get started with Navio, you can use it directly via CDN or include the bundle in your project.

### Installation via CDN

Add the following script to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/fahmirizalbudi/navio@main/bundle.js"></script>
```

## Usage

### 1. Initialize

```javascript
const router = new Navio({ hashMode: true });
```

### 2. Define Routes

```javascript
router
  .on('/', () => {
    console.log('Home Page');
  })
  .on('/user/:id', (context) => {
    console.log(`User ID: ${context.params.id}`);
  })
  .notFound(() => {
    console.log('404 Not Found');
  });
```

### 3. Start

```javascript
router.start();
```

## Documentation

For full documentation and examples, please visit the [Documentation Site](https://fahmirizalbudi.github.io/navio).

## License

MIT License. Copyright © 2026 @fahmirizalbudi.
