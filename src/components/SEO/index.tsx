"use client";

import type { DefaultSeoProps } from "next-seo";
import { DefaultSeo, NextSeo } from "next-seo";

interface DefaultSEOProps {
  config: DefaultSeoProps;
}

interface PageSEOProps {
  config?: DefaultSeoProps;
  jsonLd?: Record<string, any>;
}

export function DefaultSEO({ config }: DefaultSEOProps) {
  return <DefaultSeo {...config} />;
}

export function PageSEO({ config, jsonLd }: PageSEOProps) {
  return (
    <>
      {config && <NextSeo {...config} />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
