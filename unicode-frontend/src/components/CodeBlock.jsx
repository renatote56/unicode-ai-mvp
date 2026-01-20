import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ code, language = "javascript" }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4 rounded-xl overflow-hidden border border-unicode-gray-border">
            {/* Header */}
            <div className="bg-unicode-black-deeper border-b border-unicode-gray-border px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-unicode-gray hover:bg-unicode-gray-card text-gray-400 hover:text-unicode-green transition-all text-xs font-mono"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code Content */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "#0a0a0a",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                    }}
                    codeTagProps={{
                        className: "font-mono"
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
