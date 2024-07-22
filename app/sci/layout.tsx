import { Metadata } from "next";
import Decorator from "./decorator";

// Overwritten in decorator in useEffect hook
// Pretty much just here in case I later add a /sci page
export const metadata: Metadata = { title: "/sci" };

const SciLayout = ({ children }) => {

  return (
    <Decorator>
      {children}
    </Decorator>
  )
}

export default SciLayout;
