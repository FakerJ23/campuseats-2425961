# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
    Imperative is like giving step-by-step instructions on how to change the DOM manually with plain JavaScript. Declarative (like React) is just describing what you want the final UI to look like, and React figures out how to actually update the DOM behind the scenes.

2. Why must a component name start with a capital letter?
    It tells React the difference between standard HTML and your custom code. Lowercase tags like <h1> or <div> are treated as normal HTML, but starting with a capital letter tells React that it is a custom component you built.

3. What does a fragment <>...</> do, and why not just use a <div>?
    React forces you to return only one parent element. If you wrap everything in a <div> just to follow that rule, it adds extra useless tags to the webpage that can mess up your CSS layouts. A fragment <>...</> lets you group the elements together for React without actually adding any invisible boxes to the real DOM.

4. Name one benefit of splitting the UI into small components.
    Reusability. Instead of writing the same long chunk of code over and over, you can build a small piece (like a button or a product card) once and just plug it in wherever you need it in the app. It makes the code much cleaner and easier to fix if something breaks.