import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useState, useEffect } from "react";
const RecipeManagement = ({ data }) => {
  const [recipes, setRecipes] = useState(data);
  const [editRecipe, setEditRecipe] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [rateRecipe, setRateRecipe] = useState(false);

  const [userInput, setUserInput] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    vegetarian: null,
    glutenFree: null
  });
  const [filters, setFilters] = useState({
    isGlutenFree: null,
    isVegetarian: null,
    sortByName: null
  });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let filtered = recipes.filter((recipe) => {
      // Check if the recipe is vegetarian if the filter is set to true

      if (filters.isVegetarian && !recipe.vegetarian) {
        return false;
      }

      // Check if the recipe is gluten-free if the filter is set to true
      if (filters.isGlutenFree && !recipe.glutenFree) {
        return false;
      }

      // If neither filter is set to true, or both filters are true, include the recipe
      return true;
    });
    if (filters.sortByName === true) {
      let filteredarr = [...filtered].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      setFilteredData(filteredarr);
      console.log("we are here");
      console.log(filteredarr);
    } else {
      setFilteredData(filtered);
    }
  }, [filters, recipes]);

  const handleEditRecipe = (value, recipe) => {
    setEditRecipe(value);
    setRecipe(recipe);
  };

  const handleDeleteRecipe = (recipeId) => {
    let isPresent = recipes.find((recipe) => recipe.id === recipeId);
    if (isPresent) {
      setRecipes((prev) => prev.filter((item) => item.id !== recipeId));
    }
  };
  const handleChange = (e) => {
    const { name, value, checked, id } = e.target;
    let newValue = id ? checked : value;
    if (name === "ingredients") {
      let ingredients = value.trim().split(",");
      setUserInput((prevState) => ({ ...prevState, [name]: [ingredients] }));
    } else {
      setUserInput((prevState) => ({ ...prevState, [name]: newValue }));
    }
  };
  console.log(userInput);
  const handleChangeFilter = (e) => {
    let { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRateRecipe = (recipeId, stars) => {
    let updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...recipe, rating: stars };
      }
      return recipe;
    });

    setFilteredData(updatedRecipes);
  };
  const handleAddRecipe = () => {
    setRecipes((prevState) => {
      let lastId = 0;
      if (prevState.length > 0) {
        lastId = Math.max(...prevState.map((item) => item.id));
      }
      return [{ id: lastId + 1, ...userInput }, ...prevState];
    });
    setUserInput({
      name: "",
      ingredients: [],
      instructions: "",
      vegetarian: null,
      glutenFree: null
    });
  };
  console.log(filters);
  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Recipe Management
        </h1>
        <Form
          userInput={userInput}
          handleChange={handleChange}
          handleAddRecipe={handleAddRecipe}
        />
        <div>
          <Search
            filteredData={filteredData}
            recipes={recipes}
            setFilteredData={setFilteredData}
          />
        </div>
        <div>
          <h3>Filter By:</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              onChange={handleChangeFilter}
              value={filters.isVegetarian}
              type="checkbox"
              name="isVegetarian"
              checked={filters?.isVegetarian}
              style={{ marginRight: "4px" }}
            />
            <label htmlFor="isVegetarian">Vegetarian</label>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              onChange={handleChangeFilter}
              value={filters.isGlutenFree}
              type="checkbox"
              name="isGlutenFree"
              checked={filters?.isGlutenFree}
              style={{ marginRight: "4px" }}
            />
            <label htmlFor="glutenFree">Gluten Free</label>
          </div>

          <div>
            <h2>Sort Recipe By</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                onChange={handleChangeFilter}
                value={filters.sortByName}
                type="checkbox"
                name="sortByName"
                checked={filters?.sortByName}
                style={{ marginRight: "4px" }}
              />
              <label htmlFor="sortByName">Name </label>
            </div>
          </div>
        </div>
        {filteredData.length > 0 &&
          filteredData.map((recipe) => {
            return (
              <div
                key={recipe.id}
                style={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "16px",
                  marginBottom: "16px"
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {recipe.name}
                </h3>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}
                >
                  Ingredients
                </h4>
                <ul
                  style={{
                    listStyleType: "disc",
                    marginLeft: "20px",
                    marginTop: "5px"
                  }}
                >
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} style={{ marginBottom: "4px" }}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    width: "400px",
                    marginTop: "10px"
                  }}
                >
                  {recipe.instructions}
                </p>
                <p style={{ marginTop: "10px" }}>
                  Vegetarian: {recipe.vegetarian === false ? "No" : "Yes"}
                </p>
                <p>Gluten Free: {recipe.glutenFree === false ? "No" : "Yes"}</p>
                <div>
                  <Ratings ratings={recipe.rating} />
                </div>
                <button
                  onClick={() => {
                    setRateRecipe(true);
                    setRecipe(recipe);
                  }}
                  style={{
                    background: "green",
                    color: "#ffffff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                    marginRight: "10px"
                  }}
                >
                  Rate Recipe
                </button>
                <button
                  onClick={() => {
                    handleEditRecipe(true, recipe);
                  }}
                  style={{
                    background: "#007bff",
                    color: "#ffffff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  Edit Recipe
                </button>
                <button
                  onClick={() => {
                    handleDeleteRecipe(recipe.id);
                  }}
                  style={{
                    background: "red",
                    color: "#ffffff",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                    marginLeft: "10px"
                  }}
                >
                  Delete Recipe
                </button>
              </div>
            );
          })}

        {editRecipe && (
          <Modal setEditRecipe={setEditRecipe}>
            <Form
              userInput={userInput}
              handleChange={handleChange}
              handleAddRecipe={handleAddRecipe}
              editRecipe={editRecipe}
              recipe={recipe}
              recipes={recipes}
              setUserInput={setUserInput}
              setRecipes={setRecipes}
            />
          </Modal>
        )}
        {rateRecipe && (
          <Modal setEditRecipe={setRateRecipe}>
            <Ratings rate handleRateRecipe={handleRateRecipe} recipe={recipe} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default RecipeManagement;

const Modal = ({ children, setEditRecipe }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px"
        }}
      >
        {children}
        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px"
          }}
        >
          <button
            onClick={() => {
              setEditRecipe(false);
            }}
            style={{
              background: "#d9534f",
              color: "#ffffff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

const Form = ({
  userInput,
  handleChange,
  handleAddRecipe,
  recipe,
  recipes,
  setRecipes,
  editRecipe,
  setUserInput
}) => {
  const updateRecipe = (recipeId) => {
    let updated = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return { ...userInput };
      }
      return recipe;
    });

    setRecipes(updated);
    setUserInput({
      name: "",
      ingredients: [],
      instructions: "",
      vegetarian: null,
      glutenFree: null
    });
  };

  useEffect(() => {
    if (setUserInput && recipe) {
      setUserInput({
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        vegetarian: recipe.vegetarian,
        glutenFree: recipe.glutenFree
      });
    }
  }, [recipe]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "500px"
      }}
    >
      <input
        type="text"
        placeholder={recipe?.name ? recipe.name : "Name of Recipe"}
        onChange={handleChange}
        value={userInput.name}
        name="name"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
      <input
        onChange={handleChange}
        value={userInput.ingredients}
        type="text"
        placeholder="Add Ingredients (comma-separated)"
        name="ingredients"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
      <input
        onChange={handleChange}
        value={userInput.instructions}
        type="text"
        placeholder="Cooking Instructions"
        name="instructions"
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            onChange={handleChange}
            value={userInput.vegetarian}
            type="checkbox"
            name="vegetarian"
            id="vegetarian"
            checked={userInput?.vegetarian}
            style={{ marginRight: "4px" }}
          />
          <label htmlFor="vegetarian">Vegetarian</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            onChange={handleChange}
            value={userInput.glutenFree}
            type="checkbox"
            name="glutenFree"
            id="glutenFree"
            checked={userInput?.glutenFree}
            style={{ marginRight: "4px" }}
          />
          <label htmlFor="glutenFree">Gluten Free</label>
        </div>
      </div>

      <div>
        {editRecipe ? (
          <button
            onClick={() => {
              updateRecipe(recipe.id);
            }}
            style={{
              background: "#007bff",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Update Recipe
          </button>
        ) : (
          <button
            onClick={handleAddRecipe}
            style={{
              background: "#28a745",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
};

const Search = ({ filteredData, recipes, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      const filtered = filteredData.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          recipe.ingredients.some((item) =>
            item.includes(e.target.value.toLowerCase())
          )
      );

      // Update the filteredData state in the parent component
      setFilteredData(filtered);
    }, 500);
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleChange}
        type="text"
        name="search"
        placeholder="search for a recipe by name or ingredients"
      />
    </div>
  );
};

const Ratings = ({ ratings, rate, handleRateRecipe, recipe }) => {
  const [rating, setRating] = useState(0);
  const stars = [...Array(5)].map((i) => i + 1);
  const handleClick = (stars) => {
    console.log(stars);
    console.log(recipe);
    setRating(stars);
    handleRateRecipe(recipe?.id, stars);
  };
  if (rate) {
    return (
      <div>
        {stars.map((star, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleClick(index + 1);
              }}
            >
              {index + 1 <= rating ? (
                <AiFillStar color="orange" />
              ) : (
                <AiOutlineStar />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {stars.map((star, index) => {
        if (index + 1 <= ratings) {
          return <AiFillStar color="orange" key={index} />;
        } else {
          return <AiOutlineStar key={index} />;
        }
      })}
    </div>
  );
};
