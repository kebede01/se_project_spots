import { enableValidation, settings } from "../scripts/validation";
import "./index.css";
import Api from "../scripts/utils/api.js";
import { setButtonText } from "../scripts/utils/helpers.js";

//instansiating Api class
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ebe2356b-d4e6-47c7-bd7d-14d766d1d651",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // a function that loops an array of objects and appends cards to our HTML.
    cards.forEach((card) => {
      renderCard(card, "append");
    });
    //handling user info
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatar.setAttribute("src", `${userInfo.avatar}`);
  })
  .catch((err) => {
    console.error(err);
  });

// selecting required elements from profile section for edit and post buttons. Besides for title and description.
const profileSection = document.querySelector(".profile");
const profileEditButton = profileSection.querySelector(".profile__button-edit");
const profilePostButton = profileSection.querySelector(".profile__button-post");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatar = document.querySelector(".profile__avatar");
// selecting the template and the container to keep our cloned elements.
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");

// selecting required elements from the two popping up modal sections.
// 1. modal Edit elements
const modalEdit = document.querySelector("#edit-profile-modal");
const modalFormEdit = modalEdit.querySelector(".modal__form");
const modalEditNameInput = modalEdit.querySelector("#name");
const modalEditDescriptionInput = modalEdit.querySelector("#description");
// 2. modal post elements
const modalPost = document.querySelector("#new-post-modal");
const modalFormPost = modalPost.querySelector(".modal__form");
const modalPostCardImg = modalPost.querySelector("#card-img-input");
const modalPostCardTitle = modalPost.querySelector("#card-img-title");
const modalButtonPost = modalPost.querySelector(".modal__submit-btn");
// 3. modal preview elements that would be visible on image clicking (after adding event listener).
const modalPreview = document.querySelector("#preview-modal");
const modalPreviewCardImage = modalPreview.querySelector(".modal__image");
const modalPreviewCaption = modalPreview.querySelector(".modal__caption");
// 4. Avatar modal and its elements
const modalAvatar = document.querySelector("#avatar-modal");
const modalAvatarForm = modalAvatar.querySelector("#edit__avatar-form");
const modalAvatarInput = modalAvatarForm.querySelector(".modal__input");
const deleteCardModal = document.querySelector("#delete-modal");
const deleteModalCardForm = deleteCardModal.querySelector("#delete__card-form");
const cancelButton = deleteCardModal.querySelector(
  ".modal__submit-btn_type-cancel"
);

let selectedCard;
let selectedCardId;
//Event listener for the popup card delete modal
cancelButton.addEventListener("click", (evt) => {
  closeModal(deleteCardModal);
});

// Adding event listener to the profile edit button .
profileEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(modalEdit);
  modalEditNameInput.value = profileTitle.textContent;
  modalEditDescriptionInput.value = profileDescription.textContent;
  // resetting the modal error message requires an array
  // resetValidation(
  //   modalFormEdit,
  //   [modalEditNameInput, modalEditDescriptionInput],
  //   settings
  // );
});

// Adding event listener to the profile post button .
profilePostButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(modalPost);
  disableButton(modalButtonPost, settings);
});

// Adding event listener to the modal-post save button .
modalFormPost.addEventListener("submit", (evt) => {
  const button = evt.submitter;
  setButtonText(button, true, "Saving...", "Save");
  evt.preventDefault();
  api
    .postCards({ link: modalPostCardImg.value, name: modalPostCardTitle.value })
    .then((data) => {
      console.log(data);
      renderCard(data);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      closeModal(modalPost);
      evt.target.reset();
      setButtonText(button, false, "Saving...", "Save");
    });
});

// Adding event listener to the modal edit save button .
modalFormEdit.addEventListener("submit", (evt) => {
  const button = evt.submitter;
  setButtonText(button, true, "Saving...", "Save");
  evt.preventDefault();
  //edit user info using api
  api
    .editUserInfo({
      name: modalEditNameInput.value,
      about: modalEditDescriptionInput.value,
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(modalEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(button, false, "Saving...", "Save");
    });
});

// Add event listener to all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// To close a pop up modal by pressing Escape key
function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    //find the currenctly opened modal, and close that one
    const currentlyOpenedModal = document.querySelector(".modal_opened");
    closeModal(currentlyOpenedModal);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", closeModalByEsc);
}
function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("keydown", closeModalByEsc);
}

// card delete handler
function handleDeleteCard(card, cardId) {
  openModal(deleteCardModal);
  selectedCard = card;
  selectedCardId = cardId;
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
  //to avoid loosing the like state after refresh
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }
  cardLikeButton.addEventListener("click", (evt) => {
    // const isLiked = evt.target.classList.contains("card__like-button_liked");
    api
      .handleLike({ CardId: data._id, isLiked: data.isLiked })
      .then((data) => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch((err) => console.error(err));
  });

  cardDeleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(card, data._id);
  });

  cardImage.addEventListener("click", () => {
    modalPreviewCardImage.src = data.link;
    modalPreviewCardImage.alt = data.name;
    modalPreviewCaption.textContent = data.name;
    openModal(modalPreview);
  });
  return card;
}

function handleDeleteSubmit(evt) {
  const button = evt.submitter;
  setButtonText(button, true, "Deleting...", "Delete");
  api;
  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(button, false, "Deleting", "Delete");
    });
}
// Adding submit listener to the delete modal form on clicking delete button .
deleteModalCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleDeleteSubmit(evt);
});

function renderCard(data, method = "prepend") {
  const cardElement = getCardElement(data);
  // Add the card into the section using the method
  cardsContainer[method](cardElement);
}

// Adding event listener to the profile avatar pencil-icon button .
profileAvatarBtn.addEventListener("click", () => {
  openModal(modalAvatar);
});

modalAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const button = evt.submitter;
  setButtonText(button, true, "Saving...", "Save");
  api
    .editAvatarInfo({ avatar: modalAvatarInput.value })
    .then((data) => {
      avatar.setAttribute("src", `${data.avatar}`);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    });
  closeModal(modalAvatar);
  setButtonText(button, false, "Saving...", "Save");
});

// To close a pop up modal by clicking outside the modal container
const modalOverLays = document.querySelectorAll(".modal");
modalOverLays.forEach((modalOverLay) => {
  modalOverLay.addEventListener("click", (evt) => {
    // if the element we clicked on is the overlay, then we close the modal
    if (evt.target === modalOverLay) {
      closeModal(modalOverLay);
    }
  });
});

enableValidation(settings);
