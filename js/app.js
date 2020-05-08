/* global Handlebars, $ */
'use-strict';

// --- this is a cup, we can change what's in it but we don't need to change the cup
PictureCreate.pictureArray = [];
let pageType = '1';

function PictureCreate(image_url, title, description, keyword, horns, page) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  this.page = page;
  PictureCreate.pictureArray.push(this);
}

// ---handlebars template for rendering to page -----
PictureCreate.prototype.renderWithHandlebars = function () {
  const pictureTemplateHandlebars = Handlebars.compile($('#pictureTemplate').html()); // declare the function
  const result = pictureTemplateHandlebars(this); // pass the object through the function
  $('#photo-template').append(result); // append the returned html
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
  PictureCreate.pictureArray.forEach((value) => {
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
  PictureCreate.pictureArray.forEach((value) => {
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
      $('li.2').hide();
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

//--------------Button to filter by # of Horns -------

$('#filterByHorns').on('click', function()  {
  $('#photo-template').empty();
  PictureCreate.pictureArray.sort((a, b) => {
    if(a.horns > b.horns) {
      return 1;
    } else if (a.horns < b.horns) {
      return -1;
    } else  {
      return 0;
    }
  })
  console.log(PictureCreate.pictureArray)
  PictureCreate.pictureArray.forEach(value => value.renderWithHandlebars())
  $('li').hide();
  $(`.${pageType}`).show();

  
})

// -------------Button to filter by Title --------

$('#filterByTitle').on('click', function()  {
  $('#photo-template').empty();
  PictureCreate.pictureArray.sort((a, b) => {
    if(a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else  {
      return 0;
    }
  })
  console.log(PictureCreate.pictureArray)
  PictureCreate.pictureArray.forEach(value => value.renderWithHandlebars())
  $('li').hide();
  $(`.${pageType}`).show();

  
})

// function calls

$('#pageTwoFilter').hide();
getDataPages();

// ------ make the filter change when selected------

$('select').on('change', function () {

  $('li').hide();
  let $selected = $(this).val();
  // if($selected !== 'default') {

    PictureCreate.pictureArray.forEach((a, index) => {
      if($selected === PictureCreate.pictureArray[index].keyword) {
        console.log('test')
        if (PictureCreate.pictureArray[index].page === pageType)  {
          PictureCreate.pictureArray[index].renderWithHandlebars();
        }
      }
    });
  // } else if (pictureArray.page === pageType)  {
  //   pictureArray.renderWithHandlebars();
  // }
});



