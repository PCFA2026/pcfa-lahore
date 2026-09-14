interface Props {
  eyebrow?: string;
  title: string;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, center }: Props) {
  return (
    <div className={center ? "text-center mb-12" : "mb-12"}>
      {eyebrow && (
        <p className="text-brand-red font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
        {title}
      </h2>
      <div className={`mt-3 h-0.5 w-12 bg-brand-red ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
