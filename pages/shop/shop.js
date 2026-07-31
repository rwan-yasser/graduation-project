const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const trackActive = document.getElementById('trackActive');
 
const MIN_GAP = 100;
 
function updateTrack(){
  const min = parseInt(minRange.min);
  const max = parseInt(minRange.max);
  const minVal = parseInt(minRange.value);
  const maxVal = parseInt(maxRange.value);
 
  const leftPercent = ((minVal - min) / (max - min)) * 100;
  const rightPercent = ((maxVal - min) / (max - min)) * 100;
 
  trackActive.style.left = leftPercent + '%';
  trackActive.style.width = (rightPercent - leftPercent) + '%';
}
 
function handleMinRange(){
  if(parseInt(minRange.value) > parseInt(maxRange.value) - MIN_GAP){
    minRange.value = parseInt(maxRange.value) - MIN_GAP;
  }
  minInput.value = minRange.value;
  updateTrack();
}
 
function handleMaxRange(){
  if(parseInt(maxRange.value) < parseInt(minRange.value) + MIN_GAP){
    maxRange.value = parseInt(minRange.value) + MIN_GAP;
  }
  maxInput.value = maxRange.value;
  updateTrack();
}
 
function handleMinInput(){
  let val = parseInt(minInput.value) || 0;
  val = Math.min(val, parseInt(maxRange.value) - MIN_GAP);
  val = Math.max(val, parseInt(minRange.min));
  minRange.value = val;
  minInput.value = val;
  updateTrack();
}
 
function handleMaxInput(){
  let val = parseInt(maxInput.value) || 0;
  val = Math.max(val, parseInt(minRange.value) + MIN_GAP);
  val = Math.min(val, parseInt(maxRange.max));
  maxRange.value = val;
  maxInput.value = val;
  updateTrack();
}
 
minRange.addEventListener('input', handleMinRange);
maxRange.addEventListener('input', handleMaxRange);
minInput.addEventListener('change', handleMinInput);
maxInput.addEventListener('change', handleMaxInput);
updateTrack();


const presetItems = document.querySelectorAll('.preset-item');
 
presetItems.forEach(function(item){
  item.addEventListener('click', function(){
    const min = parseInt(item.dataset.min);
    const max = parseInt(item.dataset.max);
 
    minRange.value = min;
    maxRange.value = max;
    minInput.value = min;
    maxInput.value = max;
 
    updateTrack();
    setActivePreset();
  });
});
 

function setActivePreset(){
  const currentMin = parseInt(minRange.value);
  const currentMax = parseInt(maxRange.value);
  let matched = false;

  presetItems.forEach(function(item){
    const itemMin = parseInt(item.dataset.min);
    const itemMax = parseInt(item.dataset.max);
    if(itemMin === currentMin && itemMax === currentMax){
      item.classList.add('active');
      matched = true;
    } else {
      item.classList.remove('active');
    }
  });

  return matched;
}

const originalUpdateTrack = updateTrack;
updateTrack = function(){
  originalUpdateTrack();
  setActivePreset();
};

updateTrack();

const brandCheckboxes = document.querySelectorAll('input[name="brand"]');

brandCheckboxes.forEach(function(checkbox){
  checkbox.addEventListener('change', function(){
    
    let selectedBrands = [];
    
    for(let i = 0; i < brandCheckboxes.length; i++){
      if(brandCheckboxes[i].checked){
        selectedBrands.push(brandCheckboxes[i].value);
      }
    }
    
    console.log(selectedBrands);
  });
});

const tagsWrap = document.getElementById('tagsWrap');
  const allTags = tagsWrap.querySelectorAll('.tag-btn');
 
  allTags.forEach(function(tag){
    tag.addEventListener('click', function(){
      tag.classList.toggle('active');
    });
  });

  const products = [
  { id:1, name:"Apple Watch Series 7", brand:"apple", category:"warable-technology", tags:["smart-tv"],
    price:299, rating:5, reviewCount:120, tag:"HOT",
    image:"../../assets/images/shop/watch.jpg" },
  { id:2, name:"Samsung Galaxy A71", brand:"samsung", category:"smartphone", tags:["samsung"],
    price:320, rating:4, reviewCount:212, tag:"null",
    image:"../../assets/images/shop/phone.png" },
  { id:3, name:"2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray", brand:"hp", category:"computer-laptop", tags:["asus-laptops"],
    price:650, rating:4, reviewCount:88, tag:null,
    image:"../../assets/images/shop/laptop.png" },
  { id:4, name:"LG Smart TV 55 inch", brand:"lg", category:"tv-homesappliances", tags:["smart-tv","tv"],
    price:480, rating:5, reviewCount:150, tag:"NEW",
    image:"../../assets/images/shop/tv.png" },
  { id:5, name:"Panasonic Microwave", brand:"microsoft", category:"warable-technology", tags:["microwave"],
    price:90, rating:4, reviewCount:40, tag:null,
    image:"../../assets/images/shop/microwave.jpg" },
    { id:6, name:"Portable Wshing Machine, 11lbs", brand:"samsung", category:"warable-technology", tags:["speaker"],
    price:90, rating:3, reviewCount:40, tag:"SALE",
    image:"../../assets/images/shop/headphone.png" },
    { id:7, name:"Wired Over-Ear Gaming Headphones with USB", brand:"panasonic", category:"gamingconsole", tags:["Game"],
    price:920, rating:3, reviewCount:410, tag:"HOT",
    image:"../../assets/images/shop/drone.png" },
    { id:8, name:"Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...", brand:"panasonic", category:"tv-homesappliances", tags:["smart-tv"],
    price:90, rating:3, reviewCount:30, tag:null,
    image:"../../assets/images/shop/tv2.png" },
    { id:9, name:"Dell Optiplex 7000x7480 All-in-One Computer Monitor", brand:"panasonic", category:"tv-homesappliances", tags:["smart-tv"],
    price:90, rating:3, reviewCount:20, tag:null,
    image:"../../assets/images/shop/monitor.png" },
    { id:10, name:"4K UHD LED Smart TV with Chromecast Built-in", brand:"samsung", category:"Smartphone", tags:["Samsung"],
    price:90, rating:3, reviewCount:409, tag:null,
    image:"../../assets/images/shop/phone2.png" },
    { id:11, name:"TOZO T6 True Wireless Earbuds Bluetooth Headphon...", brand:"dell", category:"computer-accessories", tags:["tablet"],
    price:90, rating:3, reviewCount:411, tag:null,
    image:"../../assets/images/shop/keyboard.png" },
    { id:12, name:"Dell Optiplex 7000x7480 All-in-One Computer Monitor", brand:"oneplus", category:"computer-accessories", tags:["graphics-card"],
    price:90, rating:3, reviewCount:94, tag:null,
    image:"../../assets/images/shop/printer.png" },
    { id:13, name:"Samsung Electronics Samsung Galexy S21 5G", brand:"panasonic", category:"tv-homesappliances", tags:["electronics-devices"],
    price:90, rating:3, reviewCount:21, tag:"HOT",
    image:"../../assets/images/shop/camera.png" },
    { id:14, name:"Portable Wshing Machine, 11lbs capacity Model 18NMF...e", brand:"apple", category:"Smartphone", tags:["iphone"],
    price:910, rating:3, reviewCount:23, tag:null,
    image:"../../assets/images/shop/iphone.png" },
    { id:15, name:"4K UHD LED Smart TV with Chromecast Built-in", brand:"panasonic", category:"Smartphone", tags:["oneplus"],
    price:90, rating:3, reviewCount:40, tag:null,
    image:"../../assets/images/shop/phone3.png" },
    { id:16, name:"Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...", brand:"panasonic", category:"electronics-devices", tags:["game"],
    price:90, rating:3, reviewCount:40, tag:null,
    image:"../../assets/images/shop/washing.png" },
    { id:17, name:"Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...e", brand:"apple", category:"electronics-devices", tags:["samsung"],
    price:90, rating:3, reviewCount:40, tag:null,
    image:"../../assets/images/shop/airco.png" },
    { id:18, name:"Dell Optiplex 7000x7480 All-in-One Computer Monitor", brand:"oneplus", category:"computer-accessories", tags:["graphics-card"],
    price:90, rating:3, reviewCount:94, tag:null,
    image:"../../assets/images/shop/printer2.png" },

];

function renderStars(rating){
  const filled = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return `<span class="filled">${filled}</span><span class="empty">${empty}</span>`;
}

function renderProducts(list){
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
 
  if(list.length === 0){
    grid.innerHTML = '<div class="empty-state">No Results</div>';
    return;
  }
 
  list.forEach(function(product){
    const card = document.createElement('div');
    card.className = ' position-relative product-card col-3 p-2 card  ';
 
    const tagHtml = product.tag
      ? `<div class="product-tag tag-${product.tag.toLowerCase()}">${product.tag}</div>`
      : '';
 
    card.innerHTML = `
      ${tagHtml}
      <div class="product-image position-relative">
        <img class="w-100" src="${product.image}" alt="${product.name}">
          <div class="overlay position-absolute top-50  start-50 translate-middle"></div>
            <div class="btns position-absolute top-50  start-50 translate-middle d-flex ">
                <button class=" p-1 ms-1 "><i class="fa-regular fa-heart"></i></button>
                <button class=" p-1 ms-1"><i class="fa-solid fa-cart-shopping"></i></button>
                <button class=" p-1 ms-1"><a href="product-page/product.html"><i class="fa-regular fa-eye"></i></a></button>
                      </div>
                  </div>

          
      <div class="product-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span class="review-count">(${product.reviewCount})</span>
      </div>
      <div class="product-desc">${product.name}</div>
      <div class="product-price">$${product.price}</div>
    `;
 
    grid.appendChild(card);
  });
}

function applyFilters(){
  const minPrice = parseInt(minRange.value);
  const maxPrice = parseInt(maxRange.value);
 
  const checkedCategory = document.querySelector('input[name="category"]:checked');
  const selectedCategory = checkedCategory ? checkedCategory.value : null;
 
  const selectedBrands = [];
  brandCheckboxes.forEach(function(cb){
    if(cb.checked) selectedBrands.push(cb.value);
  });
 
  const activeTags = [];
  allTags.forEach(function(tag){
    if(tag.classList.contains('active')) activeTags.push(tag.dataset.value);
  });
 
  const filtered = products.filter(function(product){
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
 
    const matchesCategory = !selectedCategory || (product.category === selectedCategory);
 
    const matchesBrand = (selectedBrands.length === 0) || selectedBrands.includes(product.brand);
 
    const matchesTag = (activeTags.length === 0) ||
      activeTags.some(function(t){
        return product.tags.includes(t);
      });
 
    return matchesPrice && matchesCategory && matchesBrand && matchesTag;
  });
 
  renderProducts(filtered);
}

minRange.addEventListener('input', applyFilters);
maxRange.addEventListener('input', applyFilters);
minInput.addEventListener('change', applyFilters);
maxInput.addEventListener('change', applyFilters);
 
categoryRadiosForFilter = document.querySelectorAll('input[name="category"]');
categoryRadiosForFilter.forEach(function(radio){
  radio.addEventListener('change', applyFilters);
});

brandCheckboxes.forEach(function(checkbox){
  checkbox.addEventListener('change', applyFilters);
});
 
allTags.forEach(function(tag){
  tag.addEventListener('click', applyFilters);
});
 
applyFilters();


function applyFilters(){
  const minPrice = parseInt(minRange.value);
  const maxPrice = parseInt(maxRange.value);

  const checkedCategory = document.querySelector('input[name="category"]:checked');
  const selectedCategory = checkedCategory ? checkedCategory.value : null;

  const selectedBrands = [];
  brandCheckboxes.forEach(function(cb){
    if(cb.checked) selectedBrands.push(cb.value);
  });

  const activeTags = [];
  allTags.forEach(function(tag){
    if(tag.classList.contains('active')) activeTags.push(tag.dataset.value);
  });

  const searchTerm = searchInput.value.trim().toLowerCase();

  let filtered = products.filter(function(product){
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesCategory = !selectedCategory || (product.category === selectedCategory);
    const matchesBrand = (selectedBrands.length === 0) || selectedBrands.includes(product.brand);
    const matchesTag = (activeTags.length === 0) ||
      activeTags.some(function(t){ return product.tags.includes(t); });
    const matchesSearch = (searchTerm === '') || product.name.toLowerCase().includes(searchTerm);

    return matchesPrice && matchesCategory && matchesBrand && matchesTag && matchesSearch;
  });

  const sortValue = sortSelect.value;
  if(sortValue === 'price-low'){
    filtered.sort(function(a, b){ return a.price - b.price; });
  } else if(sortValue === 'price-high'){
    filtered.sort(function(a, b){ return b.price - a.price; });
  } else if(sortValue === 'rating'){
    filtered.sort(function(a, b){ return b.rating - a.rating; });
  }

  renderActiveFilters({
    category: selectedCategory,
    brands: selectedBrands,
    tags: activeTags
  });

  resultsCount.textContent = filtered.length;

  renderProducts(filtered);
}

function renderActiveFilters(state){
  const list = document.getElementById('activeFiltersList');

  const names = [];

  if(state.category){
    names.push(state.category);
  }

  state.brands.forEach(function(brand){
    names.push(brand);
  });

  state.tags.forEach(function(tag){
    names.push(tag);
  });

  const namesText = names.length > 0 ? names.join(', ') : '';

  list.innerHTML = `<span class="active-filters-label">Active Filters:</span> ${namesText}`;
}


