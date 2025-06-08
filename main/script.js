const container = document.querySelector('#container')
let count = 1;
baseURL = "https://raw.githubusercontent.com/EmanuelFrigodeOliveira/myGalery/main/photos/Foto_"

while (count <= 10) {
    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${count}.jpg`
    container.appendChild(newImg);
    count++;
}