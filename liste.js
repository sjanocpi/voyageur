// init
async function initLoad () {
  // init vars & data
  let rootIndex = 0;
  document.querySelector('input[name=rootIndex]').value = rootIndex;
  const allImages = await setImageData('getImgs.php');
  const allImagesDiv = document.querySelector('.allImages');
  const imageBlock = document.querySelector('img');
  getAllImages(allImages, imageBlock);
  const btns = document.querySelectorAll("button");
  // document.querySelector('.imageInfo').innerHTML = `${rootIndex+1} sur ${allImages.length}`;
  editImageInfo(rootIndex, allImages);
  allImagesDiv.querySelector(`#icone_${rootIndex}`).classList.add('onScreen');
  imageBlock.src = allImages[rootIndex];
  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      // no-more active
      allImagesDiv.querySelector(`#icone_${rootIndex}`).classList.remove('onScreen');
      // new id
      id = btn.id;
      rootIndex = rootIndexer(rootIndex, 'get');
      console.log(rootIndex);
      if (id === 'prev' && rootIndex > 0) {
        rootIndex--;
      } else if (id === 'next' && rootIndex < allImages.length-1 ) {
        rootIndex++;
        document.querySelector('#prev').classList.remove('inactive');
      }
      // prev next buttons
      if (rootIndex === 0) {
        document.querySelector('#prev').classList.add('inactive');
      } else if (rootIndex === allImages.length-1) {
        document.querySelector('#next').classList.add('inactive');
      }
      rootIndexer(rootIndex, 'set');
      // global
      // document.querySelector('.imageInfo').innerHTML = `${rootIndex+1} sur ${allImages.length}`;
      editImageInfo(rootIndex, allImages)
      allImagesDiv.querySelector(`#icone_${rootIndex}`).classList.add('onScreen');
      imageBlock.src = allImages[rootIndex];
      //
    }, false);
  });
}
// load data
async function setImageData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
//
function getAllImages(allImages, imageBlock) {
  const allImagesDiv = document.querySelector('.allImages');
  allImages.forEach((item, i) => {
    var image = document.createElement("img");
    allImagesDiv.appendChild(image);
    image.src = item;
    image.id = `icone_${i}`;
    image.addEventListener("click", () => {
      imageBlock.src = allImages[i];
      allImagesDiv.querySelector(`#icone_${i}`).classList.add('onScreen');
      rootIndex = rootIndexer(i, 'set');
      editImageInfo(rootIndex, allImages);
    });
  });
}
//
function rootIndexer(rootIndex, type) {
  const queryIndex = document.querySelector('input[name=rootIndex]');
  if (type === 'get') {
    rootIndex = queryIndex.value;
  }else if (type === 'set') {
    queryIndex.value = rootIndex;
  }
  return rootIndex;
}
//
function editImageInfo(rootIndex, allImages) {
  document.querySelector('.imageInfo').innerHTML = `${rootIndex} sur ${allImages.length}`;
  rootIndexer(rootIndex, 'set');
}
// let's go
if (window.addEventListener) {
  window.addEventListener('load', initLoad);
}
 else if (window.attachEvent) {
   window.attachEvent('onload', initLoad);
}
