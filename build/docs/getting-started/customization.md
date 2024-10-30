# Customization

This project allows you to customize various aspects of your documentation site to match your project's branding and style preferences.

## Modifying Colors and Styles

1. Open the `src/App.css` file.
2. Modify the CSS variables in the `:root` selector to change global colors:

   ```css
   :root {
     --primary-color: #007bff;
     --secondary-color: #6c757d;
     --background-color: #ffffff;
     --text-color: #333333;
   }
   ```

3. Adjust other CSS rules to fine-tune the appearance of specific components.

## Customizing the Sidebar

To modify the sidebar's appearance or behavior:

1. Open `src/components/Sidebar.js`.
2. Edit the JSX structure or CSS classes to change the layout.
3. Modify the `renderItems` function to alter how the navigation items are displayed.

## Customizing Content Rendering

To change how content is rendered:

1. Open `src/components/Content.js`.
2. Modify the `parseMarkdown` function to add or change Markdown parsing rules.
3. Adjust the HTML structure in the `return` statement to change the overall layout.

## Adding Custom Fonts

1. Import your desired fonts in `public/index.html` or `src/App.css`.
2. Update the font-family in `src/App.css`:

   ```css
   body {
     font-family: 'Your Custom Font', sans-serif;
   }
   ```

Remember to test your changes thoroughly to ensure they work well across different devices and browsers.