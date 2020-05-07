/* global Handlebars, $ */
'use-strict';

// --- this is a cup, we can change what's in it but we don't need to change the cup
const pictureArray = [];
let pageType = '1';

function PictureCreate(image_url, title, description, keyword, horns, page) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.page = page;
  pictureArray.push(this);
}

// ---handlebars template for rendering to page -----
PictureCreate.prototype.renderWithHandlebars = function () {
  const pictureTemplateHandlebars = Handlebars.compile($('#pictureTemplate').html()); // declare the function
  const result = pictureTemplateHandlebars(this); // pass the object through the function
  $('ul').append(result); // append the returned html
};

// -------------- OLD UNUSED render function - now we have handlebars! -----

PictureCreate.prototype.render = function () {
  const $pictureTemplateClone = $('li:first-child').clone();

  $pictureTemplateClone.addClass(this.page); // needed the brackets to make it work, i guess
  $pictureTemplateClone.addClass(this.keyword);
  $pictureTemplateClone.find('h2').text(this.title);
  $pictureTemplateClone.find('h4').text(this.keyword);
  $pictureTemplateClone.find('img').attr('src', this.image_url);
  $pictureTemplateClone.find('h5').text(this.horns);
  $pictureTemplateClone.find('p').text(this.description);
  $('ul').append($pictureTemplateClone);
};

// -------------- drop down menu functions --------
const pageOneDropdown = () => {
  let keywordArray = [];
  pictureArray.forEach((value) => {
    if (value.page === '1') {
      if (!keywordArray.includes(value.keyword)) {
        keywordArray.push(value.keyword);
      }
    }
  });
  $('option').not(':first').remove();
  keywordArray.sort();
  keywordArray.forEach((value) => {
    let optionKeywords = `<option value="${value}">${value}</option>`;
    $('select').append(optionKeywords);
  });
};

const pageTwoDropdown = () => {
  let keywordArray = [];
  pictureArray.forEach((value) => {
    if (value.page === '2') {
      if (!keywordArray.includes(value.keyword)) {
        keywordArray.push(value.keyword);
      }
    }
  });
  $('option').not(':first').remove();
  keywordArray.sort();
  keywordArray.forEach((value) => {
    let optionKeywords = `<option value="${value}">${value}</option>`;
    $('select').append(optionKeywords);
  });
};


// --- retrieves info from json files -------
const getDataPages = () => {
  $.get('data/page-1.json', function (data) {
    data.forEach(picture => {
      const newPicture = new PictureCreate(picture.image_url, picture.title, picture.description, picture.keyword, picture.horns, '1');
      newPicture.renderWithHandlebars();
    });
    pageOneDropdown();
  });

  $.get('data/page-2.json', function (data) {
    data.forEach(picture => {
      const newPicture = new PictureCreate(picture.image_url, picture.title, picture.description, picture.keyword, picture.horns, '2');
      newPicture.renderWithHandlebars();
    });
  });
};

// --- button to handle click event and change which items are shown on page
$('#moreItems').on('click', function () {
  const page2Switch = '2';
  pageType = page2Switch;
  $('li.1').hide();
  $('li.2').show();
  $('#moreItems').hide();
  $('#goBack').show();
  $('#pageOne').hide();
  $('#pageTwo').show();
  
  pageTwoDropdown();
});

$('#goBack').on('click', function () {
  const page1Switch = '1';
  pageType = page1Switch;
  $('li.2').hide();
  $('li.1').show();
  $('#goBack').hide();
  $('#moreItems').show();
  $('#pageOne').show();
  $('#pageTwo').hide();
  pageOneDropdown();
});

// function calls
$('li.2').hide();
$('#pageTwoFilter').hide();
getDataPages();

// ------ make the filter change when selected------

$('select').on('change', function () {

  $('li').hide();
  let $selected = $(this).val();
  // if($selected !== 'default') {

    pictureArray.forEach((a, index) => {
      if($selected === pictureArray[index].keyword) {
        console.log('test')
        if (pictureArray[index].page === pageType)  {
          pictureArray[index].renderWithHandlebars();
        }
      }
    });
  // } else if (pictureArray.page === pageType)  {
  //   pictureArray.renderWithHandlebars();
  // }
});



