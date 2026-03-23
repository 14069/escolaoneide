import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

type PortableCopyProps = {
  body: PortableTextBlock[];
  fallbackBody: string[];
};

export function PortableCopy({ body, fallbackBody }: PortableCopyProps) {
  if (body.length) {
    return (
      <PortableText
        components={{
          block: {
            normal: ({ children }) => <p className="text-[1.02rem] leading-8 text-on-surface-variant">{children}</p>,
            h2: ({ children }) => (
              <h2 className="pt-4 font-headline text-2xl font-bold text-primary">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="pt-2 font-headline text-xl font-bold text-primary">{children}</h3>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc space-y-3 pl-6 text-[1.02rem] leading-8 text-on-surface-variant">{children}</ul>,
          },
          listItem: {
            bullet: ({ children }) => <li className="pl-1">{children}</li>,
          },
        }}
        value={body}
      />
    );
  }

  return (
    <>
      {fallbackBody.map((paragraph) => (
        <p className="text-[1.02rem] leading-8 text-on-surface-variant" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
