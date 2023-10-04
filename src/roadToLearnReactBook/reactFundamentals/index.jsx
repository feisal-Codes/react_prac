import HocExample from "./HOCs/WrapperComponent";
import {
  EnhancedA,
  EnhancedB,
  EnhancedC,
  EnhancedD,
} from "./HOCs/codeReusability";
import { Auth } from "./HOCs/crossCuttingConcerns";
import Count from "./count";
import EventBubbling from "./eventBubbling";
import GenericComponents from "./genericComponents";

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

      <Auth />
    </>
  );
};

export default Fundamentals;
