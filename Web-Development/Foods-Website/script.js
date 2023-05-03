document.querySelector(".menu").addEventListener("click", () => {
	document.querySelectorAll(".target").forEach((item) => {
		item.classList.toggle("change");
	});
});

const icons = document.querySelectorAll(".section-1-icons i");

let num = 1;
setInterval(() => {
	num++;

	const icon = document.querySelector(".section-1-icons .change");
	icon.classList.remove("change");

	if (num > icons.length) {
		icons[0].classList.add("change");
		num = 1;
	} else {
		icon.nextElementSibling.classList.add("change");
	}
}, 4000);
