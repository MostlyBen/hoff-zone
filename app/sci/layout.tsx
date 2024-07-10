import { Metadata } from "next";
import Decorator from "./decorator";

export const metadata: Metadata = { title: "/sci" };

const SciLayout = ({ children }) => {

  return (
    <Decorator>
      {children}
    </Decorator>
  )
}

export default SciLayout;
