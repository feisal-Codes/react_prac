import HocExample from "./HOCs/WrapperComponent";
import {
  EnhancedA,
  EnhancedB,
  EnhancedC,
  EnhancedD,
} from "./HOCs/codeReusability";
import { Auth } from "./HOCs/crossCuttingConcerns";
// import Table from "./advancedState/table";
import Count from "./count";
import EventBubbling from "./eventBubbling";
import GenericComponents from "./genericComponents";
import HackerStories from "./hackerStrories";
import MiniMovieApp from "./movies";
import MusicPlayer from "./musicPlayer";
import CounterCharacter from "./practises/counterCharacter";
import Home from "./practises/renderProps";
import TasksManagement from "./tasks";
const initialData = [
  { id: 1, name: "Product A", quantity: 20 },
  { id: 2, name: "Product B", quantity: 15 },
  { id: 3, name: "Product C", quantity: 10 },
  { id: 4, name: "Product D", quantity: 25 },
  { id: 5, name: "Product E", quantity: 18 },
  { id: 6, name: "Product F", quantity: 12 },
  { id: 7, name: "Product G", quantity: 30 },
  { id: 8, name: "Product H", quantity: 22 },
  { id: 9, name: "Product I", quantity: 17 },
  { id: 10, name: "Product J", quantity: 28 },
];
const Fundamentals = () => {
  return (
    <>
      {/* <EventBubbling />
      <Count />
      <GenericComponents />
      <HocExample />
      <EnhancedA />
      <EnhancedB />
      <EnhancedC />
      <EnhancedD /> */}

      {/* <Auth /> */}
      {/* <Table initialData={initialData} /> */}

      {/* <HackerStories /> */}
      {/* <CounterCharacter /> */}
      {/* <Home /> */}
      {/* <MiniMovieApp /> */}
      {/* <TasksManagement /> */}
      <MusicPlayer />
    </>
  );
};

export default Fundamentals;
