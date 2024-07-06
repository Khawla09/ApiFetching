document.addEventListener("click", (e) => {
  const isDropDown = e.target.matches("[data-dropdown-button]");
  if (!isDropDown && e.target.closest("[data-dropdown]") !== null) return;
  let currentDropdown;
  if (isDropDown) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if ((dropdown = currentDropdown)) return;

    dropdown.classList.remove("active");
  });
});
