import { FlexDirectionProperty } from "csstype";
import React from "react";
import styled, { StyledComponent } from "styled-components";
import Collapse from "./collapse";
export type HtmlTag =
  | "div"
  | "section"
  | "main"
  | "aside"
  | "article"
  | "header"
  | "footer"
  | "a";

export type TypeText = string | number;

export type LegoMediaQuery = {
  span?: TypeText;
  xsmall?: TypeText;
  small?: TypeText;
  medium?: TypeText;
  large?: TypeText;
  xlarge?: TypeText;
};

export type TypeContainer = LegoMediaQuery &
  React.HTMLAttributes<HTMLElement> & {
    time?: TypeText;
    direction?: FlexDirectionProperty;
  };

const Flex = styled.div.attrs(
  ({ direction = "row", ...props }: TypeContainer) => {
    const span = props.span || "100%";
    const xsmall = props.xsmall || "100%";
    const small = props.small || "100%";
    const medium = props.medium || span;
    const large = props.large || span;
    const xlarge = props.xlarge || span;
    return { ...props, span, xsmall, medium, large, small, xlarge, direction };
  }
)`
  display: flex;
  flex: 0 0 ${(props: TypeContainer) => props.span};
  flex-wrap: wrap;
  flex-direction: ${(props: TypeContainer) => props.direction};

  @media only screen and (max-width: 600px) {
    flex: 0 0 ${(props: TypeContainer) => props.xsmall};
  }

  @media only screen and (min-width: 600px) {
    flex: 0 0 ${(props: TypeContainer) => props.small};
  }

  @media only screen and (min-width: 768px) {
    flex: 0 0 ${(props: TypeContainer) => props.medium};
  }

  @media only screen and (min-width: 992px) {
    flex: 0 0 ${(props: TypeContainer) => props.large};
  }

  @media only screen and (min-width: 1200px) {
    flex: 0 0 ${(props: TypeContainer) => props.xlarge};
  }
`;

type ResponsiveProps = {
  isCollapse?: boolean;
  show?: boolean;
  htmlTag?: HtmlTag;
  Component?: StyledComponent<"div", any, any>;
} & TypeContainer;

const Responsive = React.forwardRef(
  (
    {
      children,
      Component = Flex,
      htmlTag = "div",
      isCollapse = false,
      show = true,
      time = 450,
      ...props
    }: ResponsiveProps,
    ref
  ) => {
    if (!isCollapse) {
      return (
        <Component as={htmlTag} {...props} ref={ref}>
          {children}
        </Component>
      );
    }
    return (
      <Collapse isOpened={show} time={time}>
        <Component as={htmlTag} {...props} ref={ref}>
          {children}
        </Component>
      </Collapse>
    );
  }
);

export const View = styled(Responsive)`
  justify-items: center;
  flex-wrap: wrap;
`;
export const Container = styled(Responsive)`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  width: 100%;
`;
