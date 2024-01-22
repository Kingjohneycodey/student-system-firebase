const links = document.getElementById('links').style;
const linker = document.getElementById('links')

function toggleClick() {
    if (links.display === '' || links.display === 'none') {
        links.display = 'block';
        linker.classList.add('visible');
        console.log('Element is now visible.');
    } else {
        links.display = 'none';
        console.log('Element is now hidden.');
    }
}