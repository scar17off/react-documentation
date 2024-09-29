# Structuring Your Documentation

This project uses a simple JSON file to define the structure of your documentation. Follow these steps to set up your documentation structure:

1. Open the `public/docs/structure.json` file.

2. Define your documentation pages and subpages using the following format:

   ```json
   {
     "pages": [
       {
         "title": "Page Title",
         "path": "/page-path",
         "subpages": [
           {
             "title": "Subpage Title",
             "path": "/page-path/subpage-path"
           }
         ]
       }
     ]
   }
   ```

3. For each page and subpage, create a corresponding Markdown file in the `public/docs` directory. The file path should match the `path` specified in the `structure.json` file.

4. Write your documentation content in the Markdown files.

5. The sidebar will automatically update to reflect your documentation structure.

Remember to keep your `structure.json` file and your Markdown files in sync for the best results.