import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocContext } from '../contexts/DocContext';

function Content() {
  const { '*': path } = useParams();
  const { docs } = useDocContext();

  const findPageContent = (pages, currentPath) => {
    for (const page of pages) {
      if (page.path === `/${currentPath}`) {
        return page.content || `Content for ${page.title}`;
      }
      if (page.subpages) {
        const subpageContent = findPageContent(page.subpages, currentPath);
        if (subpageContent) return subpageContent;
      }
    }
    return '# Page not found';
  };

  const content = findPageContent(docs.pages, path);

  const parseMarkdown = (markdown) => {
    let htmlContent = markdown
      // Headers
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/___(.*)___/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*)_/g, '<em>$1</em>')
      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Unordered lists
      .replace(/^\s*[-*+]\s+(.*)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      // Ordered lists
      .replace(/^\d+\.\s+(.*)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, match => {
        return match.startsWith('<ul>') ? match : `<ol>${match}</ol>`;
      })
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)(\s"([^"]+)")?\)/g, '<a href="$2" title="$4">$1</a>')
      // Images
      .replace(/!\[([^\]]+)\]\(([^)]+)\s"([^"]+)"\)/g, '<img src="$2" alt="$1" title="$3">')
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      // Blockquotes
      .replace(/^\s*>\s*(.*)$/gim, '<blockquote>$1</blockquote>')
      .replace(/<\/blockquote><blockquote>/g, '<br>')
      // Task lists
      .replace(/^(\s*)- \[ \] (.*$)/gim, '$1<li class="task-list-item"><label><input type="checkbox" disabled> <span>$2</span></label></li>')
      .replace(/^(\s*)- \[x\] (.*$)/gim, '$1<li class="task-list-item"><label><input type="checkbox" checked disabled> <span>$2</span></label></li>')
      
      // Horizontal rules
      .replace(/^(-{3,}|_{3,}|\*{3,})$/gm, '<hr>')
      // Line breaks
      .replace(/\n$/gim, '<br />');

    // Tables
    htmlContent = htmlContent.replace(/^\s*\|(.+)\|\s*$/gm, (match, p1) => {
      const cells = p1.split('|').map(cell => cell.trim());
      const isHeader = cells.every(cell => cell.match(/^[-:]+$/));
      
      if (isHeader) {
        return ''; // Remove the separator row
      }

      const cellType = isHeader ? 'th' : 'td';
      const cellsHtml = cells.map(cell => `<${cellType}>${cell}</${cellType}>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    });

    // Wrap table rows with table tags
    htmlContent = htmlContent.replace(
      /(<tr>.*<\/tr>(\s|<br \/>)*)+/g,
      match => `<table>${match}</table>`
    );

    // Wrap task list items with a special class
    htmlContent = htmlContent.replace(
      /(<li class="task-list-item">.*<\/li>(\s|<br \/>)*)+/g,
      match => `<ul class="task-list">${match}</ul>`
    );

    return { __html: htmlContent };
  };

  return (
    <div className="content-container">
      <div dangerouslySetInnerHTML={parseMarkdown(content)} />
    </div>
  );
}

export default Content;