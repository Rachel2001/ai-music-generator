import React from "react";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

const HomePage: React.FC = () => {
  return (
    <div>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0, 100, 255)"
        gradientBackgroundEnd="rgb(255, 0, 100)"
        firstColor="255, 0, 0"
        secondColor="0, 255, 0"
        thirdColor="0, 0, 255"
        fourthColor="255, 255, 0"
        fifthColor="255, 0, 255"
        pointerColor="0, 255, 255"
        size="90%"
        blendingValue="overlay"
      >
        <h1>Hello, welcome to my homepage!</h1>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default HomePage;
