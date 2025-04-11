import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "bg-transparent border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));

TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveTab(value);
      }
    }, [value]);

    const handleTabChange = (newValue: string) => {
      if (value === undefined) {
        setActiveTab(newValue);
      }
      onValueChange?.(newValue);
    };

    // Clone children to add active state
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === TabsTrigger) {
        return React.cloneElement(child as React.ReactElement<any>, {
          onClick: () => {
            const triggerValue = (child.props as any).value;
            if (triggerValue) {
              handleTabChange(triggerValue);
            }
            (child.props as any).onClick?.();
          },
          "data-state": (child.props as any).value === activeTab ? "active" : "inactive",
        });
      }

      if (child.type === TabsContent) {
        return React.cloneElement(child as React.ReactElement<any>, {
          hidden: (child.props as any).value !== activeTab,
          "data-state": (child.props as any).value === activeTab ? "active" : "inactive",
        });
      }

      return child;
    });

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {enhancedChildren}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs, TabsList, TabsTrigger, TabsContent }; 