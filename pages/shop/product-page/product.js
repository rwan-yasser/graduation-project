const mainImage = document.getElementById('mainImage');
  const allThumbs = document.querySelectorAll('.thumb-item');
 
  allThumbs.forEach(function(thumb){
    thumb.addEventListener('click', function(){
 
      mainImage.src = thumb.dataset.image;
 
      allThumbs.forEach(function(t){
        t.classList.remove('active');
      });
 
      thumb.classList.add('active');
    });
  });