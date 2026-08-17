"use client";
import React, { useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import "codemirror/theme/monokai.css";

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function SimpleMde({ value, onChange }: Props) {
    const options = useMemo(() => ({
        spellChecker: false,
        placeholder: "Escreva aqui...",
        status: false,
        hideIcons: ["fullscreen"],
        showIcons: ["code", "strikethrough", "heading", "horizontal-rule"],
    }), []);

    const handleChange = useCallback((v: string) => {
        onChange(v);
    }, [onChange]);

    return (
        // Simple wrapper to ensure the editor is only loaded client-side
        // and receives stable props (avoids reinitialization)
        <SimpleMdeReact
            value={value}
            onChange={handleChange}
            options={options as any}
        />
    );
}
