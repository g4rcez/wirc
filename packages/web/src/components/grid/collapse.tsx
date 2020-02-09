import React from "react";

type Props = {
  time: number | string;
  theme: any;
  onWork: any;
  onRest: any;
  isOpened: boolean;
  checkTimeout: any;
  children: React.ReactNode;
};

const isOpenStyle = { height: "auto", overflow: "initial" };
const isCloseStyle = { height: "0px", overflow: "hidden" };

class Collapse extends React.Component<Props, any> {
  static defaultProps = {
    theme: {
      collapse: "--collapse",
      content: "--content"
    },
    initialStyle: undefined,
    onRest: undefined,
    onWork: undefined,
    checkTimeout: 50
  };

  timeout = undefined;

  container = undefined;

  content = undefined;
  private initialStyle: any;

  constructor(props: any) {
    super(props);
    if (props.initialStyle) {
      this.initialStyle = props.initialStyle;
    } else {
      this.initialStyle = props.isOpened ? isOpenStyle : isCloseStyle;
    }
  }

  componentDidMount() {
    this.onResize();
  }

  shouldComponentUpdate(nextProps: any) {
    const { theme, isOpened, children } = this.props;

    return (
      children !== nextProps.children ||
      isOpened !== nextProps.isOpened ||
      Object.keys(theme).some(c => theme[c] !== nextProps.theme[c])
    );
  }

  getSnapshotBeforeUpdate() {
    if (!this.container || !this.content) {
      return null;
    }
    if ((this.container! as any).style.height === "auto") {
      const { clientHeight: contentHeight } = this.content!;
      (this.container! as any).style.height = `${contentHeight}px`;
    }
    return null;
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    global.clearTimeout(this.timeout!);
  }

  onResize = () => {
    global.clearTimeout(this.timeout!);

    if (!this.container || !this.content) {
      return;
    }

    const { isOpened, checkTimeout } = this.props;
    const { clientHeight: containerHeight } = this.container!;
    const { clientHeight: contentHeight } = this.content!;

    const isFullyOpened = isOpened && contentHeight === containerHeight;
    const isFullyClosed = !isOpened && containerHeight === 0;

    if (isFullyOpened || isFullyClosed) {
      this.onRest({
        isFullyOpened,
        isFullyClosed,
        isOpened,
        containerHeight,
        contentHeight
      });
    } else {
      this.onWork({
        isFullyOpened,
        isFullyClosed,
        isOpened,
        containerHeight,
        contentHeight
      });
      //@ts-ignore
      this.timeout = setTimeout(() => this.onResize(), checkTimeout);
    }
  };

  onRest = ({
    isFullyOpened,
    isFullyClosed,
    isOpened,
    containerHeight,
    contentHeight
  }: any) => {
    if (!this.container || !this.content) {
      return;
    }

    const hasOpened =
      isOpened &&
      (this.container! as any).style.height === `${contentHeight}px`;
    const hasClosed =
      !isOpened && (this.container! as any).style.height === "0px";

    if (hasOpened || hasClosed) {
      (this.container! as any).style.overflow = isOpened ? "initial" : "hidden";
      (this.container! as any).style.height = isOpened ? "auto" : "0px";

      const { onRest } = this.props!;
      if (onRest) {
        onRest({
          isFullyOpened,
          isFullyClosed,
          isOpened,
          containerHeight,
          contentHeight
        });
      }
    }
  };

  onWork = ({
    isFullyOpened,
    isFullyClosed,
    isOpened,
    containerHeight,
    contentHeight
  }: any) => {
    if (!this.container || !this.content) {
      return;
    }

    const isOpenining =
      isOpened &&
      (this.container! as any).style.height === `${contentHeight}px`;
    const isClosing =
      !isOpened && (this.container! as any).style.height === "0px";

    if (isOpenining || isClosing) {
      return;
    }

    (this.container! as any).style.overflow = "hidden";
    (this.container! as any).style.height = isOpened
      ? `${contentHeight}px`
      : "0px";

    const { onWork } = this.props;
    if (onWork) {
      onWork({
        isFullyOpened,
        isFullyClosed,
        isOpened,
        containerHeight,
        contentHeight
      });
    }
  };

  render() {
    const { theme, children } = this.props;
    return (
      <div
        ref={container => Object.assign(this, { container })}
        className={theme.collapse}
        style={{
          ...this.initialStyle,
          transition: `height ${this.props.time}ms`
        }}
      >
        <div
          ref={(content: any) => Object.assign(this, { content })}
          className={theme.content}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Collapse;
