import React from 'react';
import { cleanStylistText } from '../services/geminiService';

/**
 * Renderizador elegante de Markdown para el chat del AI Stylist.
 * Parsea negrita (**texto**), cursiva (*texto*), títulos (###),
 * listas con viñetas (- / * / •), listas numeradas y párrafos limpios.
 */
export default function MarkdownMessage({ content }) {
  if (!content) return null;

  // Filtrar posibles etiquetas técnicas residuales, IDs o paréntesis vacíos
  const cleanContent = cleanStylistText(content);

  // Dividir por líneas
  const lines = cleanContent.split('\n');
  const renderedElements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      renderedElements.push(
        <ul key={`list-${renderedElements.length}`} className="space-y-1.5 my-2 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a00] mt-1.5 shrink-0"></span>
              <div className="flex-1">{renderInlineFormatting(item)}</div>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Línea divisoria
    if (trimmed === '---' || trimmed === '***') {
      flushList();
      renderedElements.push(
        <hr key={`hr-${index}`} className="border-white/10 my-3" />
      );
      return;
    }

    // Título H1, H2, H3 o H4
    if (trimmed.startsWith('#')) {
      flushList();
      const titleText = trimmed.replace(/^#+\s*/, '');
      renderedElements.push(
        <h4 key={`h-${index}`} className="text-xs sm:text-sm font-bold text-white mt-3 mb-1 flex items-center gap-1.5">
          {renderInlineFormatting(titleText)}
        </h4>
      );
      return;
    }

    // Elemento de lista (- o * o • o 1.)
    if (/^([-*•]|\d+\.)\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^([-*•]|\d+\.)\s+/, '');
      currentList.push(itemText);
      return;
    }

    // Línea normal o párrafo
    flushList();
    if (trimmed === '') {
      renderedElements.push(<div key={`empty-${index}`} className="h-1.5" />);
    } else {
      renderedElements.push(
        <p key={`p-${index}`} className="text-xs sm:text-sm text-gray-200 leading-relaxed">
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-1 text-left">{renderedElements}</div>;
}

/**
 * Parsea formato inline: **negrita**, *cursiva*, `código`
 */
function renderInlineFormatting(text) {
  if (!text) return '';

  // Regex para dividir por **negrita**, *cursiva* o `código`
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-white tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return (
        <em key={i} className="italic text-gray-100 font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-black/40 text-[#ff8a00] font-mono text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

