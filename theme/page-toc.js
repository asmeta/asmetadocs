document.addEventListener("DOMContentLoaded", function () {
  const content =
    document.querySelector(".page") ||
    document.querySelector("main") ||
    document.body;

  if (!content) return;

  const headers = Array.from(
    content.querySelectorAll("h2, h3, h4")
  ).filter((el) => el.id && el.textContent.trim().length > 0);

  if (headers.length === 0) return;

  const toc = document.createElement("aside");
  toc.className = "page-toc";

  const title = document.createElement("div");
  title.className = "page-toc-title";
  title.textContent = "On this page";
  toc.appendChild(title);

  const list = document.createElement("ul");
  list.className = "page-toc-list";

  headers.forEach((h) => {
    const li = document.createElement("li");
    li.className = "page-toc-item " + h.tagName.toLowerCase();

    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.trim();

    li.appendChild(a);
    list.appendChild(li);
  });

  toc.appendChild(list);

  const chapter = document.querySelector(".content");
  if (chapter) {
    chapter.parentNode.insertBefore(toc, chapter.nextSibling);
  } else {
    document.body.appendChild(toc);
  }

  const links = Array.from(toc.querySelectorAll("a"));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length === 0) return;

      const id = visible[0].target.id;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    },
    {
      rootMargin: "0px 0px -70% 0px",
      threshold: 0.1,
    }
  );

  headers.forEach((h) => observer.observe(h));
});
