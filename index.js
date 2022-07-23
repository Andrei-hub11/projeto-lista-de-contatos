const menu = document.getElementsByClassName("box-app__add-contact")[0];
const add = document.getElementsByClassName("box-app__button-add")[0];
const boxapp__contact = document.getElementsByClassName("box-app__contacts")[0];
const boxapp__contactList = document.getElementsByClassName(
  "box-app__contacts-list"
)[0];
const boxMain = document.getElementsByClassName("box-app")[0];
const boxContact = document.getElementsByClassName("box-main__contact")[0];
const inform = document.getElementsByClassName("box-app__informations")[0];
const menuSecond = document.getElementsByClassName(
  "second-menu__informations"
)[0];
const nameInform = document.getElementsByClassName("box-main__name")[0];
const numberInform = document.getElementsByClassName("number-info")[0];
const emailInform = document.getElementsByClassName("email-info")[0];
const hamburgerIcon = document.getElementById("menu");
const arrowIcon = document.getElementById("menu2");
const iconDots = document.getElementById("icon-dots");
const iconPencil = document.getElementById("icon-pencil");
const deleteBtn = document.querySelector(".nav__li");
const textCreateEdit = document.querySelector(".box-p__text");

/* const fistname = document.getElementById("name");
const sname = document.getElementById("name");
const number = document.getElementById("number");
const email = document.getElementById("email"); */
const Fistname = document.getElementsByClassName("name")[0];
const Sname = document.getElementsByClassName("sname")[0];
const number = document.getElementsByClassName("number")[0];
const Email = document.getElementsByClassName("email")[0];
const submit = document.getElementById("btn1");
const sendBtn = document.getElementById("btn");
const form = document.getElementsByClassName("box-app__form")[0];

window.addEventListener("load", () => {
  const list = JSON.parse(localStorage.getItem("listContact"));
  listadeContatos.push(...list);
  renderLocalContacts();
});

add.onclick = () => {
  menu.classList.toggle("show");
  boxMain.style.overflowY
    ? boxMain.style.removeProperty("overflow-y")
    : (boxMain.style.overflowY = "auto");
  boxapp__contact.style.display === "none"
    ? (boxapp__contact.style.display = "block")
    : (boxapp__contact.style.display = "none");
  textCreateEdit.textContent = "Criar contato";
  clearInput();
};

hamburgerIcon.onclick = () => {
  menu.classList.toggle("show");
  boxapp__contact.style.display === "none"
    ? (boxapp__contact.style.display = "block")
    : (boxapp__contact.style.display = "none");
};

const boxapp = (e) => {
  inform.classList.toggle("show");
  boxMain.style.overflowY
    ? boxMain.style.removeProperty("overflow-y")
    : (boxMain.style.overflowY = "auto");
  boxapp__contact.style.display === "none"
    ? (boxapp__contact.style.display = "block")
    : (boxapp__contact.style.display = "none");
  let elemId = parseInt(e);
  console.log(elemId);
  changeInfor(elemId);
};

arrowIcon.onclick = () => {
  inform.classList.toggle("show");
  boxapp__contact.style.display === "none"
    ? (boxapp__contact.style.display = "block")
    : (boxapp__contact.style.display = "none");
  boxMain.style.overflowY
    ? boxMain.style.removeProperty("overflow-y")
    : (boxMain.style.overflowY = "auto");
};

iconDots.onclick = () => {
  menuSecond.classList.toggle("show-menu__information");
};

document.addEventListener("click", (e) => {
  const isCloset = e.composedPath().includes(iconDots);
  if (!isCloset) {
    menuSecond.classList.remove("show-menu__information");
  }
});

Fistname.addEventListener("keypress", (e) => {
  let reg = RegExp("[A-Za-z]");
  if (!reg.test(e.key)) {
    e.preventDefault();
  }
});

Sname.addEventListener("keypress", (e) => {
  let reg = RegExp("[A-Za-z]");
  if (!reg.test(e.key)) {
    e.preventDefault();
  }
});

const listadeContatos = [];
let id = 0;

function send() {
  if (!form.checkValidity()) {
    submit.click();
    return;
  }
  if (form.checkValidity() && !sendBtn.classList.contains("btn-save")) {
    editContact();
    menu.classList.toggle("show");
    clearInput();
    boxapp__contact.style.display === "none"
      ? (boxapp__contact.style.display = "block")
      : (boxapp__contact.style.display = "none");
  } else {
    addContato();
    menu.classList.toggle("show");
    clearInput();
    boxapp__contact.style.display === "none"
      ? (boxapp__contact.style.display = "block")
      : (boxapp__contact.style.display = "none");
  }
}

sendBtn.addEventListener("click", send);

const addContato = () => {
  id = Date.now();
  const contact = {
    id: id,
    fistName: Fistname.value,
    secondName: Sname.value,
    numberContact: number.value,
    emailContact: Email.value,
  };
  listadeContatos.push(contact);

  ontput();
};

/* function displayContact() {
  for (let i = 0; i < listadeContatos.length; i++) {
    if (e.target.id == listadeContatos[i].id) {
      Fistname.value = listadeContatos[i].fistName;
      Sname.value = listadeContatos[i].secondName;
      Number.value = listadeContatos[i].numberContact;
      Email.value = listadeContatos[i].emailContact;
    }
  }
} */

function ontput() {
  let lastContact = listadeContatos.slice(-1);
  boxapp__contact.innerHTML += lastContact
    .map((contact) => {
      return `<div class="box-app__contacts-list" id=${
        contact.id
      } onclick="boxapp(this.id)">
        <div class="contact__nameinitial">${contact.fistName[0].toUpperCase()}</div>
        <div class="contact__name">${contact.fistName}</div>
      </div>`;
    })
    .join("");
  const contactList = [...document.querySelectorAll(".box-app__contacts-list")];
  const contacts = document.querySelector(".box-app__contacts");
  /* const c = [...document.querySelectorAll(".contact__name")]; */
  if (listadeContatos.length > 1) {
    contactList
      .sort((a, b) => a.innerText.localeCompare(b.innerText))
      .forEach((node) => {
        contacts.appendChild(node);
        console.log(node);
        console.log(node.innerText);
      });
  }
  localStorage.setItem("listContact", JSON.stringify(listadeContatos));
}

function changeInfor(e) {
  let elemId = e;
  for (let i = 0; i < listadeContatos.length; i++) {
    if (listadeContatos[i].id === elemId) {
      boxContact.id = listadeContatos[i].id;
      nameInform.textContent = listadeContatos[i].fistName[0].toUpperCase();
      numberInform.textContent = listadeContatos[i].numberContact;
      emailInform.textContent = listadeContatos[i].emailContact;
    }
  }
}

function changeInput(elemId) {
  for (let i = 0; i < listadeContatos.length; i++) {
    if (listadeContatos[i].id === elemId) {
      Fistname.value = listadeContatos[i].fistName;
      Sname.value = listadeContatos[i].secondName;
      number.value = listadeContatos[i].numberContact;
      Email.value = listadeContatos[i].emailContact;
    }
  }
}

function clearInput() {
  Fistname.value = "";
  Sname.value = "";
  number.value = "";
  Email.value = "";
}

const pencilFunction = () => {
  menu.classList.toggle("show");
  inform.classList.toggle("show");
  textCreateEdit.textContent == "Criar contato"
    ? (textCreateEdit.textContent = "Editar contato")
    : textCreateEdit.textContent == "Criar contato";
  const elemId = parseInt(boxContact.id);
  sendBtn.classList.remove("btn-save");
  changeInput(elemId);
};

const deleteContact = () => {
  const contactList = [...document.querySelectorAll(".box-app__contacts-list")];
  const elemId = parseInt(boxContact.id);
  const stringId = boxContact.id;
  for (let i = 0; i < contactList.length; i++) {
    if (stringId === contactList[i].id) {
      contactList[i].remove();
      /* Agora removendo do array de objetos */
      for (let y = 0; y < listadeContatos.length; y++) {
        if (elemId === listadeContatos[y].id) {
          listadeContatos.splice(y, 1);
          inform.classList.toggle("show");
          boxapp__contact.style.display === "none"
            ? (boxapp__contact.style.display = "block")
            : (boxapp__contact.style.display = "none");
          localStorage.setItem("listContact", JSON.stringify(listadeContatos));

          console.log("Contato deletado com sucesso!");
        }
      }
    }
  }
};

const renderLocalContacts = () => {
  boxapp__contact.innerHTML += listadeContatos
    .map((contact) => {
      return `<div class="box-app__contacts-list" id=${
        contact.id
      } onclick="boxapp(this.id)">
        <div class="contact__nameinitial">${contact.fistName[0].toUpperCase()}</div>
        <div class="contact__name">${contact.fistName}</div>
      </div>`;
    })
    .join("");
  const contactList = [...document.querySelectorAll(".box-app__contacts-list")];
  const contacts = document.querySelector(".box-app__contacts");
  /* const c = [...document.querySelectorAll(".contact__name")]; */
  contactList
    .sort((a, b) => a.innerText.localeCompare(b.innerText))
    .forEach((node) => {
      contacts.appendChild(node);
      console.log(node);
      console.log(node.innerText);
    });
};

const editContact = () => {
  const contactList = [...document.querySelectorAll(".box-app__contacts-list")];
  const elemId = parseInt(boxContact.id);
  const stringId = boxContact.id;

  for (let i = 0; i < listadeContatos.length; i++) {
    if (listadeContatos[i].id === elemId) {
      const editedContact = {
        id: Date.now(),
        fistName: Fistname.value,
        secondName: Sname.value,
        numberContact: number.value,
        emailContact: Email.value,
      };
      /* listadeContatos.push(editedContact);
      ontput(); */

      /* removendo contato nao editado da renderizacao anterior e do array de objetos, para evitar qualquer duplicidade */
      for (let y = 0; y < contactList.length; y++) {
        if (stringId === contactList[y].id) {
          contactList[y].remove();
        }
      }
      for (let j = 0; j < listadeContatos.length; j++) {
        if (elemId === listadeContatos[j].id) {
          listadeContatos.splice(j, 1);
        }
      }
      listadeContatos.push(editedContact);
      ontput();
    }
  }
  console.log("contato editado");
};
