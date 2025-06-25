export default {
  title: 'Design System/ThemeTokens',
};

export const ThemeTokens = () => {
  const primaryColors = Array.from({ length: 10 }, (_, i) => `color-primary-${(i + 1) * 100}`);
  const neutralColors = Array.from({ length: 10 }, (_, i) => `color-neutral-${(i + 1) * 100}`);
  const shadows = [
    '--shadow-xs',
    '--shadow-sm',
    '--shadow',
    '--shadow-md',
    '--shadow-lg',
    '--shadow-xl',
  ];
  const fontSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
  const radii = [
    '--radius-sm',
    '--radius-default',
    '--radius-md',
    '--radius-lg',
    '--radius-xl',
    '--radius-2xl',
    '--radius-3xl',
    '--radius-full',
  ];

  const spacings = [
    '--spacing-0',
    '--spacing-px',
    '--spacing-1_5',
    '--spacing-2_5',
    '--spacing-4',
    '--spacing-8',
    '--spacing-10',
    '--spacing-12',
    '--spacing-16',
    '--spacing-20',
  ];

  return (
    <div className="space-y-10 p-4">
      {/* Colors */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Primary Colors</h2>
        <div className="grid grid-cols-5 gap-4">
          {primaryColors.map((c) => (
            <div key={c} className="flex flex-col items-center">
              <div
                className="h-16 w-16 rounded-full border"
                style={{ backgroundColor: `var(--${c})` }}
              />
              <code className="mt-1 text-xs">--{c}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Neutral Colors</h2>
        <div className="grid grid-cols-5 gap-4">
          {neutralColors.map((c) => (
            <div key={c} className="flex flex-col items-center">
              <div
                className="h-16 w-16 rounded-full border"
                style={{ backgroundColor: `var(--${c})` }}
              />
              <code className="mt-1 text-xs">--{c}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Font Sizes</h2>
        <div className="space-y-2">
          {fontSizes.map((s) => (
            <p key={s} className={`text-${s}`}>
              --text-{s}: The quick brown fox jumps over the lazy dog.
            </p>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Shadows</h2>
        <div className="flex flex-row gap-6 overflow-x-auto pb-2">
          {shadows.map((shadowToken) => (
            <div key={shadowToken} className="flex min-w-[8rem] flex-col items-center gap-2">
              <div
                className="h-32 w-32 rounded-md border border-neutral-200 bg-white"
                style={{ boxShadow: `var(${shadowToken})` }}
              />
              <span className="whitespace-nowrap font-mono text-xs">{shadowToken}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Radii */}
      <section>
        <h2 className="text-xl">Radii</h2>
        <div className="flex flex-wrap gap-4">
          {radii.map((radius) => (
            <div key={radius} className="flex flex-col items-center gap-1">
              <div
                className="border border-neutral-400 bg-neutral-200"
                style={{ width: 64, height: 64, borderRadius: `var(${radius})` }}
              ></div>
              <span>{radius}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacings */}
      <section>
        <h2 className="text-xl">Spacings</h2>
        <div className="flex flex-wrap gap-4">
          {spacings.map((space) => (
            <div key={space} className="flex flex-col items-center gap-1">
              <div
                className="border border-neutral-400 bg-neutral-200"
                style={{ width: `var(${space})`, height: `var(${space})` }}
              ></div>
              <span>{space}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
