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

// selecting required elements from profile section.
const profileSection = document.querySelector(".profile");

const profileEditButton = profileSection.querySelector(".profile__button-edit");

const profileTitle = profileSection.querySelector(".profile__title");

const profileDescription = profileSection.querySelector(
  ".profile__description"
);
// selecting required elements from modal section.
const modalSection = document.querySelector("#modal-edit");

const modalCloseButton = modalSection.querySelector(".modal__close-btn");

const modalNameInput = modalSection.querySelector("#name");

const modalDescriptionInput = modalSection.querySelector("#description");

const modalSaveButton = modalSection.querySelector(".modal__submit-btn");

// Adding event listener to the button selected elements.
profileEditButton.addEventListener("click", function () {
  modalSection.classList.add("modal_opened");
  modalNameInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
});

modalCloseButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalSection.classList.remove("modal_opened");
});

modalSaveButton.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  modalNameInput.value = "";
  modalDescriptionInput.value = "";
  modalSection.classList.remove("modal_opened");
});
// cloning template content & selecting the <ul> element("".cards__list").
const template = document.querySelector(".template").content;
const cardsContainer = document.querySelector(".cards__list");

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
