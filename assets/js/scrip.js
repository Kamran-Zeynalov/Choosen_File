let file = document.getElementById("inp");
let images = document.querySelector(".images");
let imgArr = Array.from(images);
let lastContext;
let arr = [];
file.addEventListener("change", function (event) {
  let files = Array.from(event.target.files);
  files.forEach((file) => {
    ShowImage(file);
  });
});

function ShowImage(file) {
  if (!file.type.includes("image/")) {
    alert("Please choose img format");
    return;
  }
  if (file.size / 1024 / 1024 > 10) {
    alert("Max size have to be 1MB");
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("loadend", function () {
    let src = fileReader.result;
    let image = document.createElement("div");
    image.style.position = "relative";
    image.style.width = "150px";
    image.style.height = "150px";
    let closeButton = document.createElement("button");
    closeButton.className = "btn btn-outline-danger";
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";

    closeButton.addEventListener("click", function () {
      let ress = confirm("Are you sure to delete this image?");
      if (ress) {
        this.parentElement.remove();

        lastContext ? lastContext.remove() : "null";
        let addElement = document.createElement("div");
        addElement.style.width = "150px";
        addElement.style.height = "150px";
        addElement.style.display = "flex";
        addElement.style.alignItems = "center";
        let addButton = document.createElement("button");
        addButton.className = "btn btn-warning";
        addButton.innerText = "Give back";
        addButton.style.width = "100%";
        addButton.style.fontSize = "15px";
        addElement.append(addButton);
        document.body.append(addElement);
        lastContext = addElement;
        addButton.addEventListener("click", function () {
          this.parentElement.remove();
          images.append(image);
        });
      }
    });
    image.addEventListener("dblclick", function () {
      image.style.transition = ".5s";
      image.style.width = "180px";
      image.style.height = "180px";
      image.style.boxShadow = "1px 1px 25px 1px gray";
      arr.push(images);
      console.log(arr);
      let allDelete = document.createElement("button");
      let cancel = document.createElement("button");
      allDelete.innerHTML = "Delete";
      allDelete.style.position = "absolute";
      allDelete.style.right = "90px";
      cancel.innerHTML = "Cancel";
      cancel.style.position = "absolute";
      cancel.style.right = "10px";
      allDelete.className = "btn btn-danger";
      cancel.className = "btn btn-success";
      document.body.prepend(allDelete);
      document.body.prepend(cancel);

      allDelete.addEventListener("click", function () {
        arr.forEach((ell) => {
          if (!(ell.style.width == "150px")) {
            ell.remove();
          }
          allDelete.remove();
        });
      });
      cancel.addEventListener("click", function () {
        arr.forEach((ell) => {
          ell.style.transition = ".5s";
          ell.style.width = "150px";
          ell.style.height = "150px";
          ell.style.boxShadow = "0 0 0 0 white";
        });
      });
    });
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.src = src;
    image.append(img);
    image.append(closeButton);
    images.appendChild(image);
  });
}
