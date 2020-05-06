'use-strict'

const pictureArray = [];


function PictureCreate(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  pictureArray.push(this);
}

PictureCreate.prototype.render = function () {
  const $pictureTemplateClone = $('li:first-child').clone();

  $pictureTemplateClone.attr('class', this.keyword);
  $pictureTemplateClone.find('h2').text(this.title);
  $pictureTemplateClone.find('h4').text(this.keyword);
  $pictureTemplateClone.find('img').attr('src', this.image_url);
  $pictureTemplateClone.find('h5').text(this.horns);
  $pictureTemplateClone.find('p').text(this.description);

  $('ul').append($pictureTemplateClone);

}

$.get('data/page-1.json', function (data) {
  data.forEach(picture => {
    const newPicture = new PictureCreate(picture.image_url, picture.title, picture.description, picture.keyword, picture.horns);
    newPicture.render();
  })
  allKeyWords();
  
})



const allKeyWords = () => {
  let keywordArray = [];
  console.log(pictureArray.length)
  pictureArray.forEach((value) => {
    if (!keywordArray.includes(value.keyword)) {
      keywordArray.push(value.keyword);

    }
  })
  keywordArray.sort();
  keywordArray.forEach((value) => {
    let optionKeywords = `<option value="${value}">${value}</option>`;
    $('select').append(optionKeywords);
  })
}

$('select').on('change', function () {

  
  
  
  
  
  
  
  
  pictureArray.forEach((a, index) => {
    let x = $(this).val();
    if(x === pictureArray[index].keyword) {
      $(picture[index].keyword).hasClass(pictureArray[index].keyword);
      
      
      
      
      
      
      
      
      
      console.log(index)
      console.log($(this).val())
      console.log(pictureArray[index].keyword)
    }
  })




});

  // if ($('select').children('option:selected').text() !== 'Filter By Keyword')  {
  //   $('li').css('display', 'none');
  //   $(`.${$('select').children('option:selected').val()}`).css('display', '')
  // }


