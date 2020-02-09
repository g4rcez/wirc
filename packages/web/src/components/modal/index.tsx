import { TypeContainer, View } from "../grid";
import ReactPortal from "../grid/portal";
import useBlockScroll from "../../hooks/use-block-scroll";
import Keyboard from "../../hooks/use-key-down/keyboard";
import useOnClickOutside from "../../hooks/use-on-click-outside";
import React, {
  CSSProperties,
  useEffect,
  useImperativeHandle,
  useRef
} from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
export type HtmlTag =
  | "div"
  | "section"
  | "main"
  | "aside"
  | "article"
  | "header"
  | "footer"
  | "a";

const ModalPortal = styled.div.attrs(({ visible = false, ...props }: any) => ({
  ...props,
  speed: props.speed,
  visible: visible,
  paddingVertical: props.paddingVertical || "3rem"
}))`
  display: ${props => (props.visible ? "block" : "none")};
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: fixed;
  padding-top: ${props => props.paddingVertical};
  padding-bottom: ${props => props.paddingVertical};
  background-color: rgba(0, 0, 0, 0.65);
  animation: fading ${props => props.speed}ms forwards ease-out;

  @keyframes fading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

type Content = ThemedStyledFunction<"div", any, any, any> & {
  width: string | number;
};

const ModalContent = styled.div.attrs((props: Content) => props)`
  background-color: #fff;
  margin: auto;
  z-index: 3;
  min-width: 320px;
  max-width: 100%;
  overflow-y: hidden;
  width: ${props => props.width};
  border: 1px solid #12121270;
`;

const Close = styled.span`
  color: ${props => props.color};
  font-size: 1.35rem;
  font-weight: bold;
  margin-top: -10px;
  float: right;

  &:hover,
  &:focus {
    color: #12121260;
    text-decoration: none;
    cursor: pointer;
  }
`;

type Props = {
  htmlTag?: HtmlTag;
  closeColor?: string;
  onClose: () => any;
  title?: React.ReactNode | Element;
  footer?: React.ReactNode;
  closeIcon?: React.ReactNode;
  visible: boolean;
  closeOnMask?: boolean;
  children: React.ReactNode;
  animationTime?: number;
  width?: string | number;
  headerProps?: Partial<TypeContainer>;
  bodyProps?: Partial<TypeContainer>;
  closeOnEsc?: boolean;
  maskPaddingVertical?: string;
  footerProps?: Partial<TypeContainer>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

const defaultModalPartProps = {
  span: "100%",
  style: {
    padding: "1rem"
  } as CSSProperties
} as Partial<TypeContainer>;

const Modal = React.forwardRef(
  (
    {
      visible,
      width = "60%",
      closeOnMask = true,
      footer,
      closeIcon = <MdClose />,
      onClose,
      maskPaddingVertical = "3rem",
      headerProps = defaultModalPartProps,
      bodyProps = defaultModalPartProps,
      footerProps = defaultModalPartProps,
      title,
      closeColor = "#505050",
      closeOnEsc = true,
      children,
      animationTime = 950
    }: Props,
    externalRef
  ) => {
    const ref = useRef(null);

    useImperativeHandle(externalRef, () => ref.current);
    useBlockScroll(!!visible);

    const onClickMask = (e: any) => {
      if (closeOnMask && visible) {
        e.stopPropagation();
        onClose();
      }
    };

    useOnClickOutside(ref, onClickMask);

    const toggle = () => {
      if (visible) {
        console.log("=>", onClose.toString());
        onClose();
      }
    };

    useEffect(() => {
      const toggleVisibility = (e: KeyboardEvent) => {
        if (e.keyCode === Keyboard.esc && closeOnEsc && visible) {
          toggle();
        }
      };
      window.addEventListener("keydown", toggleVisibility);
      return () => window.removeEventListener("keydown", toggleVisibility);
    }, []);

    const onModalClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.persist();
      event.stopPropagation();
    };

    const headerViewProps = {
      ...headerProps,
      style: {
        borderBottom: `1px solid #12121270`,
        justifyContent: "space-between",
        ...defaultModalPartProps.style,
        ...headerProps.style
      }
    };
    const bodyViewProps = {
      ...bodyProps,
      style: { ...defaultModalPartProps.style, ...bodyProps.style }
    };
    const footerViewProps = {
      ...footerProps,
      style: {
        textAlign: "right" as "right",
        ...defaultModalPartProps.style,
        ...footerProps.style
      }
    };

    return (
      <ReactPortal>
        <ModalPortal
          visible={visible}
          maskPaddingVertical={maskPaddingVertical}
          speed={animationTime}
        >
          <ModalContent ref={ref} onClick={onModalClick} width={width}>
            <View {...headerViewProps}>
              <View span="90%" xsmall="90%" small="90%">
                {title}
              </View>
              <View className="justify-end" span="10%" xsmall="3%" small="3%">
                <Close color={closeColor} onClick={onClose}>
                  {closeIcon}
                </Close>
              </View>
            </View>
            <View {...bodyViewProps}>{children}</View>
            {!!footer && <View {...footerViewProps}>{footer}</View>}
          </ModalContent>
        </ModalPortal>
      </ReactPortal>
    );
  }
);

export default Modal;
