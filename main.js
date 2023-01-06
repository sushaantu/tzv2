const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const fetchFonts = async () => {
  // Use a CORS proxy to fetch the list of fonts from the Google Fonts API
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyClSJ6W8k8FZHauS9J-BE26n4iOrSYT4FE', {
    headers: {
      'x-requested-with': 'XMLHttpRequest'
    }
  });
  const fonts = await response.json();


  // Create a list item for each font
  const fontList = document.createElement('ul');
  fonts.items.forEach(font => {
    const fontItem = document.createElement('li');
    fontItem.classList.add('font-item');
    fontItem.textContent = font.family;
    fontList.appendChild(fontItem);
  });

  // Add the list to the sidebar
  const sidebar = document.querySelector('.sidebar');
  sidebar.appendChild(fontList);

  // Add a click event listener to the font list items
  fontList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
      const fontName = event.target.textContent;
      displayFont(fontName);
    }
  });
};

const displayFont = async fontName => {
  // Use a CORS proxy to fetch the CSS for the selected font
  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://fonts.googleapis.com/css?family=${encodeURIComponent(fontName)}`, {
    headers: {
      'x-requested-with': 'XMLHttpRequest'
    }
  });

  // Check the status of the response
  if (response.status !== 200) {
    console.error('Error fetching font:', response.status);
    return;
  }

  const css = await response.text();

  // Add the CSS to a style element
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  // Update the selected font element
  const selectedFont = document.querySelector('.selected-font');
  selectedFont.style.fontFamily = fontName;
};



fetchFonts();