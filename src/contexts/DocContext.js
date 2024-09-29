import React, { createContext, useState, useContext, useEffect } from 'react';

const DocContext = createContext();

export const useDocContext = () => useContext(DocContext);

export const DocProvider = ({ children }) => {
  const [docs, setDocs] = useState({ pages: [] });

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const response = await fetch('/docs/structure.json');
        const structure = await response.json();
        
        const loadedPages = await Promise.all(structure.pages.map(async (page) => {
          const content = await fetchContent(page.path);
          const subpages = await Promise.all((page.subpages || []).map(async (subpage) => {
            const subContent = await fetchContent(subpage.path);
            return { ...subpage, content: subContent };
          }));
          return { ...page, content, subpages };
        }));

        setDocs({ pages: loadedPages });
      } catch (error) {
        console.error('Error loading documentation:', error);
      }
    };

    loadDocs();
  }, []);

  const fetchContent = async (path) => {
    try {
      const response = await fetch(`/docs${path}.md`);
      return await response.text();
    } catch (error) {
      console.error(`Error loading content for ${path}:`, error);
      return '# Content not found';
    }
  };

  const addPage = (newPage) => {
    setDocs(prevDocs => ({
      ...prevDocs,
      pages: [...prevDocs.pages, newPage],
    }));
  };

  return (
    <DocContext.Provider value={{ docs, addPage }}>
      {children}
    </DocContext.Provider>
  );
};