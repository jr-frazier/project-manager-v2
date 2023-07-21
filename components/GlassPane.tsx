import clsx from "clsx";

const GlassPane = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={clsx(" bg-slate-50 bg-opacity-30 rounded-2xl", className)}>
      {children}
    </div>
  );
};

export default GlassPane;
