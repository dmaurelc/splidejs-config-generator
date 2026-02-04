import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showControls?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showControls, onChange, min, max, step = 1, value, ...props }, ref) => {
    const handleIncrement = () => {
      if (type !== 'number' || !onChange) return;
      const currentValue = Number(value) || 0;
      const newValue = max !== undefined ? Math.min(currentValue + Number(step), Number(max)) : currentValue + Number(step);
      onChange({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleDecrement = () => {
      if (type !== 'number' || !onChange) return;
      const currentValue = Number(value) || 0;
      const newValue = min !== undefined ? Math.max(currentValue - Number(step), Number(min)) : currentValue - Number(step);
      onChange({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
    };

    if (type === 'number' && showControls) {
      return (
        <div className="flex h-9 items-center rounded-md border border-input bg-transparent shadow-xs">
          <button
            type="button"
            onClick={handleDecrement}
            className={cn(
              "flex h-full items-center justify-center rounded-l-md border-r border-input px-2 text-muted-foreground transition-colors hover:bg-accent",
              min !== undefined && Number(value) <= Number(min) && "opacity-50 cursor-not-allowed"
            )}
            disabled={min !== undefined && Number(value) <= Number(min)}
          >
            <Minus className="h-3 w-3" />
          </button>
          <input
            type="number"
            ref={ref}
            value={value}
            onChange={onChange}
            className={cn(
              "h-full w-full border-0 bg-transparent px-2 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:outline-hidden focus-visible:ring-0",
              className
            )}
            min={min}
            max={max}
            step={step}
            {...props}
          />
          <button
            type="button"
            onClick={handleIncrement}
            className={cn(
              "flex h-full items-center justify-center rounded-r-md border-l border-input px-2 text-muted-foreground transition-colors hover:bg-accent",
              max !== undefined && Number(value) >= Number(max) && "opacity-50 cursor-not-allowed"
            )}
            disabled={max !== undefined && Number(value) >= Number(max)}
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"

export { Input }