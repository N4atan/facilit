"use client";
import React from "react";
import { RenderMarkdown } from "../Editor/RenderMarkdown";

type Props = {
  description?: string | null;
};

export default function DocumentContent({  description }: Props) {
  return (
    <section className="mt-4">

        {description ? (
          // For now render plaintext; consider replacing with a markdown renderer
          <RenderMarkdown content={description} />
        ) : (
          <span className="text-md font-semibold text-primary">Começe por aqui</span>
        )}
    </section>
  );
}
