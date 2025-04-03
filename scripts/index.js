const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// selecting required elements from profile section for edit button.
const profileSection = document.querySelector(".profile");

const profileEditButton = profileSection.querySelector(".profile__button-edit");

const profilePostButton = profileSection.querySelector(".profile__button-post");

const profileTitle = profileSection.querySelector(".profile__title");

const profileDescription = profileSection.querySelector(
  ".profile__description"
);

const template = document.querySelector(".template").content;
const cardsContainer = document.querySelector(".cards__list");
// selecting required elements from modal section.

const modalEdit = document.querySelector("#edit-profile-modal");
const modalEditCloseButton = modalEdit.querySelector(".modal__close-btn");
const modalFormEdit = modalEdit.querySelector(".modal__form");

const modalEditNameInput = modalEdit.querySelector("#name");
const modalEditDescriptionInput = modalEdit.querySelector("#description");

const modalPost = document.querySelector("#new-post-modal");
const modalPostCloseButton = modalPost.querySelector(".modal__close-btn");
const modalFormPost = modalPost.querySelector(".modal__form");

const modalPostCardImg = modalPost.querySelector("#card-img-input");
const modalPostCardCaption = modalPost.querySelector("#card-img-caption");
// Adding event listener to the button selected elements.
profileEditButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalEdit.classList.add("modal_is-opened");
  modalEditNameInput.value = profileTitle.textContent;
  modalEditDescriptionInput.value = profileDescription.textContent;
});

modalEditCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalEdit.classList.remove("modal_is-opened");
});

modalFormEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = modalEditNameInput.value;
  profileDescription.textContent = modalEditDescriptionInput.value;
  modalEdit.classList.remove("modal_is-opened");
});

profilePostButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalPost.classList.add("modal_is-opened");
});

modalPostCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalPost.classList.remove("modal_is-opened");
});

modalFormPost.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardImg = modalPostCardImg.value;
  const cardCaption = modalPostCardCaption.value;
  const cardItem = {
    name: cardCaption,
    link: cardImg,
  };
  console.log(cardItem);
  const cardElement = getCardElement(cardItem);
  cardsContainer.append(cardElement);

  modalPost.classList.remove("modal_is-opened");
});

function getCardElement(data) {
  const card = template.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.setAttribute("src", `${data.link}`);
  cardImage.setAttribute("alt", `${data.name}`);
  card.querySelector(".card__caption-content").textContent = `${data.name}`;
  return card;
}

for (let i = 0; i < initialCards.length; i++) {
  const data = initialCards[i];

  const cardElement = getCardElement(data);
  cardsContainer.append(cardElement);
}
