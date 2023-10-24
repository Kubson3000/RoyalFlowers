// Function to change background color based on date
function changeColorBasedOnDate(element, dateStr, key) {
    const currentDate = new Date();
    const inputDate = new Date(dateStr.split('.').reverse().join('-'));

    // Calculate the difference in milliseconds
    const diffTime = Math.abs(inputDate - currentDate);
    // Convert time difference into days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (key === 'CFRdo') {
        if (diffDays <= 14 && inputDate >= currentDate) {
            element.style.backgroundColor = '#e977be';
        } else if (inputDate < currentDate) {
            element.style.backgroundColor = '#db2e74';
        }
    } else if (key === 'A1do') {
        if (diffDays <= 14 && inputDate >= currentDate) {
            element.style.backgroundColor = '#b4a7d6';
        } else if (inputDate < currentDate) {
            element.style.backgroundColor = '#674ea7';
        }
    }
}

// Create a MutationObserver instance to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            ['CFRdo', 'A1do'].forEach((key) => {
                const divs = document.querySelectorAll(`div[data-automation-key="${key}"]`);
                divs.forEach((div) => {
                    // Adjusted to get the date string from the innermost div
                    const dateStr = div.querySelector('div div').textContent.trim();
                    changeColorBasedOnDate(div, dateStr, key);
                });
            });
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });
