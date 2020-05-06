'use-strict'

const pictureArray = [];
const keywordArray = [];

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
  console.log(pictureArray.length)
  pictureArray.forEach((value) => {
    if (!keywordArray.includes(value.keyword)) {
      keywordArray.push(value.keyword);
    }
  })
}

console.log(keywordArray)


const $optionKeywords = $('select').find('option').text('test');





