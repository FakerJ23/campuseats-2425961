// src/App.jsx
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuItemCard from "./components/MenuItemCard.jsx";
import Footer from "./components/Footer.jsx";

// 1. Paste the array here
const dessertMenu = [
  { name: 'Ais Kacang (ABC)', description: 'Shaved ice with red beans, sweet corn, grass jelly, and palm sugar.', price: 4.5, available: true },
  { name: 'Cendol', description: 'Shaved ice with rich coconut milk, palm sugar syrup, and green rice flour jelly.', price: 4.0, available: true },
  { name: 'Apam Balik', description: 'Folded pancake filled with crushed peanuts, sugar, and sweet corn.', price: 3.5, available: true },
  { name: 'Pisang Goreng', description: 'Fresh bananas coated in batter and deep-fried until golden.', price: 3.0, available: true },
  { name: 'Ondeh-Ondeh', description: 'Green glutinous rice balls coated in grated coconut and filled with molten palm sugar.', price: 5.0, available: true },
  { name: 'Sago Gula Melaka', description: 'Pudding made with sago pearls, palm sugar syrup, and coconut milk.', price: 6.0, available: true },
  { name: 'Bubur Cha Cha', description: 'Sweet potatoes, taro, and sago pearls served in coconut milk.', price: 5.5, available: false },
  { name: 'Kuih Keria', description: 'Donut made with mashed sweet potatoes and lightly glazed.', price: 4.0, available: true },
  { name: 'Kuih Ketayap', description: 'Rolled pandan pancake filled with grated coconut and palm sugar.', price: 4.5, available: true },
  { name: 'Roti Tisu', description: 'Paper-thin, crispy cone-shaped flatbread drizzled with condensed milk.', price: 7.0, available: true }
];

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <h2 className="section-title">Today's vendors</h2>
          <VendorCard />
        </section>

        <section>
          <h2 className="section-title">Popular items</h2>
          <div className="grid">
            {/* 2. Use .map() to loop through the list and pass each item as a prop */}
            {dessertMenu.map((dessert, index) => (
              <MenuItemCard key={index} item={dessert} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;