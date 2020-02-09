import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

type Props = {
  element?: keyof HTMLElementTagNameMap;
  node?: any;
  children: React.ReactNode;
};

const ReactPortal = ({ element = "div", ...props }: Props): any => {
  const defaultNode = useRef<Node | null>(null);
  useEffect(
    () => () => {
      if (defaultNode.current) {
        document.body.removeChild(defaultNode.current);
      }
      defaultNode.current = null;
    },
    []
  );

  if (!canUseDOM) {
    return null;
  }
  if (!props.node && !defaultNode.current) {
    defaultNode.current = document.createElement(element);
    document.body.appendChild(defaultNode.current);
  }
  return ReactDOM.createPortal(
    props.children,
    props.node || defaultNode.current
  );
};

export default ReactPortal;
