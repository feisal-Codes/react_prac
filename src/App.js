// import "./styles.css";
import { useState } from "react";
import { tasks, recipes, movies, users, booksData } from "./data";
// import "./styles.css"

// //kanban board
// //input -> [backlog,todo,inprogress,done]
// //output-> simulate an assembly line
// //[[1,2,3,4,5,6],[],[],[]]
// import Assembly from "./kanban";
// import Task from "./task";
// import Products from "./shop/products";
// import Shop from "./shop";
// import { Route, Routes } from "react-router-dom";
// import Cart from "./shop/cart";
// import { products } from "./data";
// import DisplayWeather from "./weather/weather";

import TaskList from "./task/task";
import RecipeManagement from "./recipes/recipe";
import MultiStepForms from "./multiStepForms/form";
import Movies from "./movies";
import UserManagement from "./userManagement";
import Books from "./roadToLearnReactBook/reactFundamentals/filter";
import Form from "./roadToLearnReactBook/reactFundamentals/form";
import Fundamentals from "./roadToLearnReactBook/reactFundamentals";

// const Tasks = [
//   { id: 1, name: "Buy groceries", completed: false },
//   { id: 2, name: "Finish homework", completed: true },
//   { id: 3, name: "Walk the dog", completed: false },
//   { id: 4, name: "shopping", completed: false },
//   { id: 5, name: "Finish classwork", completed: true },
//   { id: 6, name: "sleep", completed: false }
// ];
// const list = ["backlog", "todo", "progress", "done"];

// export default function App() {
//   const [cart, setCart] = useState([]);

//   const handleClick = (product) => {
//     const existingItem = cart.find((item) => item.id === product.id);

//     if (existingItem) {
//       let updatedState = cart.map((prev) => {
//         if (prev.id === product.id) {
//           return { ...product, quantity: prev.quantity + 1 };
//         }
//         return prev;
//       });
//       setCart(updatedState);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     // console.log(cart);
//   };
//   return (
//     <>
//       <Routes>
//         <Route exact path="/" element={<Shop handleClick={handleClick} />} />
//         <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//         <Route path="weather" element={<DisplayWeather />} />
//       </Routes>
//     </>
//   );
// }
// function App() {
// const [initialState, setInitialState] = useState({ tasks });
// const toggleCompletionStatus = (taskId) => {
//   // Use map to create a new array with updated tasks
//   const updatedTasks = initialState.tasks.map((task) => {
//     if (task.id === taskId) {
//       // Toggle the completion status
//       return {
//         ...task,
//         status: task.status === "completed" ? "incomplete" : "completed",
//       };
//     }
//     return task;
//   });

//   // Set the new state object with the updated tasks
//   setInitialState({ tasks: updatedTasks });
// };
// const toggleCompletionStatus = (taskId) => {
//   //check the task id and filter it out
//   // use immutable updates
//   let updatedTasks = initialState.tasks.map((task) => {
//     if (task.id === taskId) {
//       return {
//         ...task,
//         status: task.status === "completed" ? "incomplete" : "completed"
//       };
//     }
//     return task;
//   });
//   setInitialState({ tasks: updatedTasks });
//   console.log("*************************");
//   console.log(updatedTasks);
// };
// return (
//   <div>
//     <h1>Task Management</h1>
//     <TaskList
//       initialState={initialState}
//       toggleCompletionStatus={toggleCompletionStatus}
//     />
//   </div>
// );

function App() {
  return (
    <>
      {/* <RecipeManagement data={recipes} />
      <MultiStepForms />
      <Movies movies={movies} />
      <UserManagement users={users} />
      <Books data={booksData} /> */}
      {/* <Form /> */}
      <Fundamentals />
    </>
  );
}
export default App;
