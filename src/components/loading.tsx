import { useEffect } from "react";
const dots = [0, 1, 2, 3, 4];

const LoadingProgress = ({
  ariaLabel = "Please wait",
  showText = false,
  loadingText = "Loading...",
  progressValue = null, // null for indeterminate, number 0-100 for determinate
}) => {
  // useEffect(() => {
  //   // Create 5 animated dots
  //   const dotElements = [0, 1, 2, 3, 4];
  //   setDots(dotElements);
  // }, []);

  // Custom animation styles that can't be easily done with Tailwind
  const customStyles = `
    @keyframes pulse {
      from { opacity: 0.4; }
    }

    @keyframes progressDot {
      0%, 20% {
        left: 0;
        animation-timing-function: ease-out;
        opacity: 0;
      }
      25% {
        opacity: 1;
      }
      35% {
        left: 45%;
        animation-timing-function: linear;
      }
      65% {
        left: 60%;
        animation-timing-function: ease-in;
      }
      75% {
        opacity: 1;
      }
      80%, 100% {
        left: 100%;
        opacity: 0;
      }
    }

    .animate-pulse-custom {
      animation: pulse 1s infinite alternate;
    }

    .progress-dot {
      position: absolute;
      height: 8px;
      width: 5px;
      background-color: #0067b8;
      z-index: 100;
      border-radius: 50%;
      opacity: 0;
      animation: progressDot 2s infinite;
    }

    .progress-dot:nth-child(1) { animation-delay: 0.05s; }
    .progress-dot:nth-child(2) { animation-delay: 0.2s; }
    .progress-dot:nth-child(3) { animation-delay: 0.35s; }
    .progress-dot:nth-child(4) { animation-delay: 0.5s; }
    .progress-dot:nth-child(5) { animation-delay: 0.65s; }

    /* Custom progress bar styles for determinate mode */
    progress {
      height: 8px;
      border-style: none;
      color: #0067b8;
      background-color: #ccc;
      -webkit-appearance: none;
      display: block;
      width: 100%;
    }

    progress::-ms-fill { color: #0067b8; }
    progress::-webkit-progress-value { background-color: #0067b8; }
    progress::-webkit-progress-bar { background-color: #ccc; }
    progress::-moz-progress-bar { background-color: #0067b8; }
  `;

  return (
    <div className="w-full relative">
      <style>{customStyles}</style>

      {progressValue !== null ? (
        // Determinate progress bar
        <div className="w-full">
          <div
            // value={progressValue}
            // max={100}
            aria-label={ariaLabel}
            aria-valuenow={progressValue}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full"
          />
          {showText && (
            <div className="text-center mt-2 text-sm text-gray-600">
              {progressValue}% {loadingText}
            </div>
          )}
        </div>
      ) : (
        // Indeterminate progress with animated dots
        <div
          className="relative w-full"
          role="progressbar"
          aria-label={ariaLabel}
        >
          <div className="absolute -top-7.5 left-1/2 -translate-1/2 w-40 h-1 overflow-hidden">
            {dots.map((_, index) => (
              <div key={index} className="progress-dot" />
            ))}
          </div>

          {showText && (
            <div className="text-center mt-8 text-sm text-gray-600 animate-pulse-custom">
              {loadingText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Alternative simpler version with just the animated dots
export const AnimatedLoadingDots = ({
  ariaLabel = "Please wait",
  className = "",
}) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes progressDot {
        0%, 20% { left: 0; animation-timing-function: ease-out; opacity: 0; }
        25% { opacity: 1; }
        35% { left: 45%; animation-timing-function: linear; }
        65% { left: 60%; animation-timing-function: ease-in; }
        75% { opacity: 1; }
        80%, 100% { left: 100%; opacity: 0; }
      }
      
      .progress-dot-simple {
        position: absolute;
        height: 8px;
        width: 5px;
        background-color: #0067b8;
        z-index: 100;
        border-radius: 50%;
        opacity: 0;
        animation: progressDot 2s infinite;
      }
      
      .progress-dot-simple:nth-child(1) { animation-delay: 0.05s; }
      .progress-dot-simple:nth-child(2) { animation-delay: 0.2s; }
      .progress-dot-simple:nth-child(3) { animation-delay: 0.35s; }
      .progress-dot-simple:nth-child(4) { animation-delay: 0.5s; }
      .progress-dot-simple:nth-child(5) { animation-delay: 0.65s; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`w-full relative mt-12 mb-6 ${className}`}>
      <div
        className="relative w-full h-2"
        role="progressbar"
        aria-label={ariaLabel}
      >
        <div className="absolute top-0 left-0 h-2 w-full overflow-hidden">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div key={index} className="progress-dot-simple" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Full-page loading component
export const FullPageLoading = ({ message = "Loading..." }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/50 bg-opacity-30 flex justify-center z-50">
      <div className="text-center">
        <LoadingProgress
          ariaLabel={message}
          showText={true}
          loadingText={message}
        />
      </div>
    </div>
  );
};

// Button loading state component
export const ButtonLoading = ({ text = "Processing..." }) => {
  return (
    <div className="inline-flex items-center space-x-2">
      <div className="relative w-24 h-5">
        <LoadingProgress ariaLabel={text} />
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

export default LoadingProgress;
