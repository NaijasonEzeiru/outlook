import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Create context for navigation
interface NavigationContextType {
  goToNext: () => void;
  goToPrev: () => void;
  goToStep: (step: number) => void;
  currentStep: number;
  totalSteps: number;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};

// Provider component
const NavigationProvider = ({
  children,
  totalSteps,
}: {
  children: ReactNode;
  totalSteps: number;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step !== currentStep && step >= 0 && step < totalSteps) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        goToNext,
        goToPrev,
        goToStep,
        currentStep,
        totalSteps,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Step components with internal navigation
const LoginStep = () => {
  const { goToNext } = useNavigation();

  return (
    <div className="step">
      <h2>Welcome back</h2>
      <input type="email" placeholder="Email" />
      <button onClick={goToNext}>Continue →</button>
    </div>
  );
};

const PasswordStep = () => {
  const { goToNext, goToPrev } = useNavigation();

  return (
    <div className="step">
      <h2>Enter your password</h2>
      <input type="password" placeholder="Password" />
      <button onClick={goToPrev}>← Back</button>
      <button onClick={goToNext}>Sign in →</button>
    </div>
  );
};

const MfaStep = () => {
  const { goToNext, goToPrev } = useNavigation();

  return (
    <div className="step">
      <h2>Two-factor authentication</h2>
      <input type="text" placeholder="Authenticator code" />
      <button onClick={goToPrev}>← Back</button>
      <button onClick={goToNext}>Verify →</button>
    </div>
  );
};

// Main component with slide animation
const SlidingFlowWithContext = () => {
  const steps = [LoginStep, PasswordStep, MfaStep];
  const [direction, setDirection] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  // Listen to context changes
  const handleNavigation = (stepChange: number) => {
    setDirection(stepChange > 0 ? 1 : -1);
    setCurrentStep((prev) => prev + stepChange);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  const CurrentStep = steps[currentStep];

  // Custom provider that updates parent state
  const navigationValue = {
    goToNext: () => handleNavigation(1),
    goToPrev: () => handleNavigation(-1),
    goToStep: (step: number) => {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    currentStep,
    totalSteps: steps.length,
  };

  return (
    <NavigationContext.Provider value={navigationValue}>
      <div className="flow-container">
        <div className="steps-wrapper">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.2 },
              }}
            >
              <CurrentStep />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};

export default SlidingFlowWithContext;
