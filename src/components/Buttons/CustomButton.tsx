import {forwardRef} from "react";
import {Button as BaseButton, ButtonProps} from "@mui/base/Button";
import {clsx} from "clsx";


const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {className, ...other} = props;
    return (
      <BaseButton
        ref={ref}
        className={clsx(
          "cursor-pointer transition text-xl font-sans font-semibold leading-normal bg-transparent text-[#FFA987] hover:border-[#FFA987] rounded-lg px-4 py-2 border border-solid border-white   hover:bg-[#FFA987] hover:text-white flex items-center gap-2",
          className
        )}
        {...other}
      />
    );
  }
);

export default CustomButton;