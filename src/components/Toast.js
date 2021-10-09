import * as React from "react";
import "../styles/partials/components/_toast.scss";

const Toast = ({ show, duration = 1000, className, ...props }) => {
  const [visible, setVisible] = React.useState(show);
  const [animation, setAnimation] = React.useState("");

  React.useEffect(() => {
    if (show) {
      setVisible(true);
    }
    const timeout = setTimeout(() => {
      setAnimation("");
      setVisible(show);
    }, duration);
    setAnimation(show ? 'showing' : 'hiding');
    return () => clearTimeout(timeout);
  }, [show, duration]);

  return visible ? <div className={`toast ${animation} ${className}`} {...props} /> : null;
};

export default Toast;
