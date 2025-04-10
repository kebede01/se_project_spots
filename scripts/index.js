const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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

// selecting required elements from profile section for edit and post buttons. Besides for title and description.
const profileSection = document.querySelector(".profile");
const profileEditButton = profileSection.querySelector(".profile__button-edit");
const profilePostButton = profileSection.querySelector(".profile__button-post");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);

// selecting the template and the container to keep our cloned elements.
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");

// selecting required elements from the two popping up modal sections.
// 1. modal Edit elements
const modalEdit = document.querySelector("#edit-profile-modal");
const modalEditCloseButton = modalEdit.querySelector(".modal__close-btn");
const modalFormEdit = modalEdit.querySelector(".modal__form");
const modalEditNameInput = modalEdit.querySelector("#name");
const modalEditDescriptionInput = modalEdit.querySelector("#description");

// 2. modal post elements
const modalPost = document.querySelector("#new-post-modal");
const modalPostCloseButton = modalPost.querySelector(".modal__close-btn");
const modalFormPost = modalPost.querySelector(".modal__form");
const modalPostCardImg = modalPost.querySelector("#card-img-input");
const modalPostCardTitle = modalPost.querySelector("#card-img-title");

// 3. modal preview elements that would be visible on image clicking (after adding event listener).
const modalPreview = document.querySelector("#preview-modal");
const modalPreviewCloseButton = modalPreview.querySelector(".modal__close-btn");
const modalPreviewCardImage = modalPreview.querySelector(".modal__image");
const modalPreviewCaption = modalPreview.querySelector(".modal__caption");

// Add event listener to the modal preview close button
modalPreviewCloseButton.addEventListener("click", () => {
  closeModal(modalPreview);
});

// Adding event listener to the profile edit button .
profileEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  modalEdit.classList.add("modal_opened");
  modalEditNameInput.value = profileTitle.textContent;
  modalEditDescriptionInput.value = profileDescription.textContent;
});

// Adding event listener to the profile post button .
profilePostButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(modalPost);
});

// Adding event listener to the modal edit close button .
modalEditCloseButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(modalEdit);
});

// Adding event listener to the modal edit save button .
modalFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = modalEditNameInput.value;
  profileDescription.textContent = modalEditDescriptionInput.value;
  closeModal(modalEdit);
});

// Adding event listener to the modal-post close button .
modalPostCloseButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(modalPost);
});

// Adding event listener to the modal-post save button .
modalFormPost.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardImgUrl = modalPostCardImg.value;
  const cardTitle = modalPostCardTitle.value;
  const cardItem = {
    name: cardTitle,
    link: cardImgUrl,
  };
  const cardElement = getCardElement(cardItem);
  cardsContainer.prepend(cardElement);
  closeModal(modalPost);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
// function generating card from object literal "data" containing "name" and "link" key words.
function getCardElement(data) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-btn");
  cardImage.setAttribute("src", `${data.link}`);
  cardImage.setAttribute("alt", `${data.name}`);
  cardTitle.textContent = `${data.name}`;
  cardLikeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    cardLikeButton.classList.toggle("card__like-button_liked");
  });
  cardDeleteButton.addEventListener("click", () => {
    // cardDeleteButton.closest(".card").remove();
    card.remove();
  });
  cardImage.addEventListener("click", () => {
    modalPreviewCardImage.src = data.link;
    modalPreviewCardImage.alt = data.name;
    modalPreviewCaption.textContent = data.name;
    openModal(modalPreview);
  });

  return card;
}

// a function that loops an array of objects and appends cards to our HTML.
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsContainer.append(cardElement);
});
