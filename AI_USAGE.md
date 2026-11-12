# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): Gemini
- What I asked for: Help setting up the initial Vite + React project and creating the static UI components (`Header`, `VendorCard`, `MenuItemCard`, `Footer`).
- What I kept, changed or rejected, and why: I kept the component structures but customized the hardcoded data to match my own restaurant, Kafe Joe the Star at Mahallah Joe, Block Star.
- One thing the AI got wrong and how I fixed it: The AI initially provided examples using standard HTML, but I had to ensure I used standard JSX rules like replacing `class` with `className` and ensuring all tags were self-closing to prevent build errors.

## Week 2
- Tool(s): Gemini
- What I asked for: Help passing props to `MenuItemCard`, rendering lists using `.map()`, and setting up the initial state for the app.
- What I kept, changed or rejected, and why: I kept the `.map()` logic to render the menu items dynamically from an array, as it made the `App.jsx` code much cleaner and easier to manage.
- One thing the AI got wrong and how I fixed it: The AI provided the JSON menu data but forgot to include the `available: true` property in the objects. Because my `MenuItemCard` checked for this property, all my items defaulted to saying "Sold out". I fixed this by manually adding `"available": true` to every item in my JSON data.

## Week 3
- Tool(s): Gemini
- What I asked for: Step-by-step guidance to fetch data from `vendors.json`, build the lifted cart state in `App.jsx`, and implement my personal feature (Filter by category).
- What I kept, changed or rejected, and why: I kept the lifted state functions (`handleAddToCart`, `handleChangeQty`, `handlePlaceOrder`) and the array filtering logic, integrating them directly into my `App.jsx` file to make the category buttons work.
- One thing the AI got wrong and how I fixed it: When I updated the `MenuItemCard.jsx` file with the new `onAdd` prop, I ended up with a "multiple default exports" crash. The AI helped me realize the new code was pasted below the old code instead of replacing it. I fixed it by completely replacing the file contents.

## Week 4
- Tool(s): Gemini
- What I asked for: Help creating custom hooks (`useLocalStorage`, `useVendors`), setting up the `CartContext`, configuring React Router, and fixing import errors.
- What I kept, changed or rejected, and why: I kept all the suggested file structures and code for the hooks, context, and pages because they correctly matched the lab requirements. I had to adjust my file locations to fix import errors.
- One thing the AI got wrong and how I fixed it: The AI provided the code, but I initially placed the files in the wrong directories or missed creating `useVendors.js` and `useLocalStorage.js`, causing Vite import crashes. I fixed this by ensuring the files were correctly placed inside the `src/hooks/` folder.