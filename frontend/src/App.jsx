import { useEffect, useState } from "react";
import "./App.css";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [meals, setMeals] = useState(Array(7).fill(""));
  const [extraDays, setExtraDays] = useState([]);
    // Add extra meal row
    const addMealRow = () => {
      setMeals([...meals, ""]);
      setExtraDays([...extraDays, `Extra ${extraDays.length + 1}`]);
    };
  const [recipes, setRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newRecipe, setNewRecipe] = useState("");
  const [newFavorite, setNewFavorite] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL)
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not reachable"));
  }, []);

  // Add meal for a day
  const handleMealChange = (idx, value) => {
    const updated = [...meals];
    updated[idx] = value;
    setMeals(updated);
  };

  // Add recipe
  const addRecipe = () => {
    if (newRecipe.trim()) {
      setRecipes([...recipes, newRecipe.trim()]);
      setNewRecipe("");
    }
  };

  // Add favorite
  const addFavorite = () => {
    if (newFavorite.trim()) {
      setFavorites([...favorites, newFavorite.trim()]);
      setNewFavorite("");
    }
  };

  // Generate grocery list (simple demo: split meals/recipes into words)
  const generateGroceryList = () => {
    const items = [
      ...meals.filter(Boolean),
      ...recipes,
      ...favorites
    ].join(" ").split(/[, ]+/).filter(Boolean);
    setGroceryList([...new Set(items)]);
  };

  // Check off grocery item
  const toggleGroceryItem = (idx) => {
    const updated = [...groceryList];
    updated[idx] = updated[idx].startsWith("[x] ")
      ? updated[idx].replace("[x] ", "")
      : `[x] ${updated[idx]}`;
    setGroceryList(updated);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.className = theme === "light" ? "dark-theme" : "light-theme";
  };

  return (
    <div className="main-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 900 }}>
        <header className="header" style={{ textAlign: 'center' }}>
          <h1>🍽️ Meal & Grocery Planner</h1>
        </header>
        <div className="status-bar" style={{ textAlign: 'center' }}>
          <span className="status-label">Backend Status:</span>
          <span className={backendMessage.includes("Running") ? "status-ok" : "status-bad"}>{backendMessage}</span>
        </div>
        <div className="center-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="content-grid" style={{ width: '100%' }}>
            <section className="card meal-plan">
              <h2>Weekly Meal Plan</h2>
              <table className="meal-table">
                <tbody>
                  {daysOfWeek.map((day, idx) => (
                    <tr key={day}>
                      <td><b>{day}:</b></td>
                      <td>
                        <input
                          className="meal-input"
                          type="text"
                          value={meals[idx]}
                          onChange={e => handleMealChange(idx, e.target.value)}
                          placeholder="Add meal..."
                        />
                      </td>
                    </tr>
                  ))}
                  {extraDays.map((label, idx) => (
                    <tr key={label}>
                      <td><b>{label}:</b></td>
                      <td>
                        <input
                          className="meal-input"
                          type="text"
                          value={meals[daysOfWeek.length + idx]}
                          onChange={e => handleMealChange(daysOfWeek.length + idx, e.target.value)}
                          placeholder="Add meal..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={{marginTop: '1rem'}} onClick={addMealRow}>Add Meal</button>
            </section>
            <section className="card recipes">
              <h2>Recipe List</h2>
              <div className="input-row">
                <input
                  className="recipe-input"
                  type="text"
                  value={newRecipe}
                  onChange={e => setNewRecipe(e.target.value)}
                  placeholder="Add recipe..."
                />
                <button onClick={addRecipe}>Add</button>
              </div>
              <ul className="list">
                {recipes.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </section>
            <section className="card favorites">
              <h2>Saved Favorites</h2>
              <div className="input-row">
                <input
                  className="favorite-input"
                  type="text"
                  value={newFavorite}
                  onChange={e => setNewFavorite(e.target.value)}
                  placeholder="Add favorite..."
                />
                <button onClick={addFavorite}>Add</button>
              </div>
              <ul className="list">
                {favorites.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </section>
            <section className="card grocery-list">
              <h2>Grocery List</h2>
              <button className="generate-btn" onClick={generateGroceryList}>Generate Grocery List</button>
              <ul className="grocery-list-ul">
                {groceryList.map((item, idx) => (
                  <li key={idx} onClick={() => toggleGroceryItem(idx)} className={item.startsWith("[x] ") ? "checked" : ""}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <footer className="footer" style={{ textAlign: 'center', marginTop: 32 }}>
          <span>Made with ❤️ by Charles Zufan</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
