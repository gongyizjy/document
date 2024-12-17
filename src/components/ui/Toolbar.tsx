import { Tooltip } from "antd";
import { Button, ButtonProps } from "./Button";
import { forwardRef, HTMLProps, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import { Surface } from "./Surface";

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  (
    {
      shouldShowContent = true,
      children,
      isVertical = false,
      className,
      ...props
    },
    ref
  ) => {
    const toolbarClassName = cn(
      "text-black inline-flex h-full leading-none gap-0.5",
      isVertical ? "flex-col p-2" : "flex-row p-1 items-center",
      className
    );
    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...props} ref={ref}>
          { children }
        </Surface>
      )
    )
  }
);
ToolbarWrapper.displayName = "ToolbarWrapper";

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;
const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...props }, ref) => {
    const diverClassName = cn(
      "bg-neutral-200",
      horizontal
        ? "w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0"
        : "h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0",
      className
    );
    return <div className={diverClassName} ref={ref} {...props} />;
  }
);
ToolbarDivider.displayName = "ToolbarDivider";

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  buttonSize?: ButtonProps["buttonSize"];
  variant?: ButtonProps["variant"];
};
const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, buttonSize = 'icon' ,variant = 'ghost',activeClassname, tooltip, children, ...props }, ref) => {
    const buttonClass = cn("gap-1 min-w-[2rem] px-2 w-auto", className);
    const content = (
      <Button
        activeClassname={activeClassname}
        className={buttonClass}
        buttonSize={buttonSize}
        variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
    if (tooltip) {
      return (
        <Tooltip title={tooltip} placement="top">
          {content}
        </Tooltip>
      );
    }
    return content;
  }
);
ToolbarButton.displayName = "ToolbarButton";
const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
export default Toolbar;
