/* global Handlebars, $ */
'use-strict';

// --- this is a cup, we can change what's in it but we don't need to change the cup
const pictureArray = [];

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
PictureCreate.prototype.renderWithHandlebars = function() {
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

// --- retrieves info from json files -------
$.get('data/page-1.json', function (data) {
  data.forEach(picture => {
    const newPicture = new PictureCreate(picture.image_url, picture.title, picture.description, picture.keyword, picture.horns, '1');
    newPicture.renderWithHandlebars();
  });
  allKeyWords();
});

$.get('data/page-2.json', function (data) {
  data.forEach(picture => {
    const newPicture = new PictureCreate(picture.image_url, picture.title, picture.description, picture.keyword, picture.horns, '2');
    newPicture.renderWithHandlebars();
  });
  allKeyWords();
  $('li.2').hide();

});


// ---- makes an array of all keywords to use in the dropdown menu -----
const allKeyWords = () => {
  let keywordArray = [];
  console.log(pictureArray.length);
  pictureArray.forEach((value) => {
    if (!keywordArray.includes(value.keyword)) {
      keywordArray.push(value.keyword);
    }
  });
  keywordArray.sort();
  keywordArray.forEach((value) => {
    let optionKeywords = `<option value="${value}">${value}</option>`;
    $('select').append(optionKeywords);
  });
};

// --- button to handle click event and change which items are shown on page
$('#moreItems').on('click', function(){
  $('li.1').hide();
  $('li.2').show();
  $('#moreItems').hide();
  $('#goBack').show();
});

$('#goBack').on('click', function(){
  $('li.2').hide();
  $('li.1').show();
  $('#goBack').hide();
  $('#moreItems').show();
});


// ------


$('select').on('change', function () {



  // pictureArray.forEach((a, index) => {
  //   let x = $(this).val();
  //   if(x === pictureArray[index].keyword) {
  //     $(picture[index].keyword).hasClass(pictureArray[index].keyword);

  // console.log(index);
  // console.log($(this).val());
  // console.log(pictureArray[index].keyword);
  //   }
  // });


});
// if ($('select').children('option:selected').text() !== 'Filter By Keyword')  {
//   $('li').css('display', 'none');
//   $(`.${$('select').children('option:selected').val()}`).css('display', '')
// }


