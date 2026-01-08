import { useEffect, useState } from "react";
import styles from "./LoadingSpinner.module.css";

type TypeLoadingSpinnerProps = {
  delay?: number;
};
function LoadingSpinner({ delay = 0 }: TypeLoadingSpinnerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;
  return <span aria-label="Loading" className={styles.loadingSpinner}></span>;
}

export default LoadingSpinner;
