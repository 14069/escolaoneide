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
            normal: ({ children }) => <p>{children}</p>,
            h2: ({ children }) => (
              <h2 className="font-headline text-2xl font-bold text-primary">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-headline text-xl font-bold text-primary">{children}</h3>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5">{children}</ul>,
          },
        }}
        value={body}
      />
    );
  }

  return (
    <>
      {fallbackBody.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}
