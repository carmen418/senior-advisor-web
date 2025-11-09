document.addEventListener('DOMContentLoaded', () => {
    function generateValoresLines() {
        const header = document.querySelector('.valores-header');
        const container = document.querySelector('.valores-cards');

        // Clear existing lines
        header.innerHTML = '';

        const containerHeight = container.offsetHeight;
        const fontSize = parseFloat(getComputedStyle(header).getPropertyValue('font-size'));
        const lineHeight = fontSize * 1.1; // small gap between lines
        const linesNeeded = Math.ceil(containerHeight / lineHeight);

        for (let i = 0; i < linesNeeded; i++) {
            const line = document.createElement('div');
            line.classList.add('valores-title-line');

            // Make the first line a different color
            if (i === 0) {
                line.classList.add('valores-title-highlight'); 
            }

            line.textContent = 'VALORES QUE NOS MUEVEN';
            line.style.marginBottom = (lineHeight - fontSize) + 'px'; // proportional gap
            header.appendChild(line);
        }
    }

    // Run on load and resize
    generateValoresLines();
    window.addEventListener('resize', generateValoresLines);
});
