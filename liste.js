// init
async function initLoad () {
  // init vars & data
  const allImages = await setImageData('getImgs.php');
  const allImagesDiv = document.querySelector('.allImages');
  const imageBlock = document.querySelector('img');
  getAllImages(allImages, imageBlock);
  const btns = document.querySelectorAll("button");
  let index = 0;
  document.querySelector('.imageInfo').innerHTML = `${index+1} sur ${allImages.length}`;
  allImagesDiv.querySelector(`#icone_${index}`).classList.add('onScreen');
  imageBlock.src = allImages[index];
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      // no-more active
      allImagesDiv.querySelector(`#icone_${index}`).classList.remove('onScreen');
      // new id
      id = btn.id;
      if (id === 'prev' && index > 0) {
        index--;
      } else if (id === 'next' && index < allImages.length-1 ) {
        index++;
        document.querySelector('#prev').classList.remove('inactive');
      }
      // prev next buttons
      if (index === 0) {
        document.querySelector('#prev').classList.add('inactive');
      } else if (index === allImages.length-1) {
        document.querySelector('#next').classList.add('inactive');
      }
      // global
      document.querySelector('.imageInfo').innerHTML = `${index+1} sur ${allImages.length}`;
      allImagesDiv.querySelector(`#icone_${index}`).classList.add('onScreen');
      imageBlock.src = allImages[index];
    }, false);
  });
}
// load data
async function setImageData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
function getAllImages(allImages, imageBlock) {
  const allImagesDiv = document.querySelector('.allImages');

  allImages.forEach((item, i) => {
    var image = document.createElement("img");
    allImagesDiv.appendChild(image);
    image.src = item;
    image.id = `icone_${i}`;
    image.addEventListener("click", () => {
      imageBlock.src = allImages[i];
    });
  });
}
// let's go
if (window.addEventListener) {
  window.addEventListener('load', initLoad);
}
 else if (window.attachEvent) {
   window.attachEvent('onload', initLoad);
}
