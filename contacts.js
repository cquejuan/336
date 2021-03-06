//document.getElementsByTagName("MAIN")[0].innerHTML = '<div id="card-data" class="row"></div>'
let contacts = {
  id: "contacts"
};
let con = document.createElement("UL");
con.setAttribute("class", "collapsible");
con.setAttribute("id", `${contacts.id}_list`);
document.getElementById(`${contacts.id}`).appendChild(con);
fetch(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7izqfiaPLsMd9TXs7vAbVdeAj6SmH0RBXmj8hg2w_76O2nys2JXSmRDitAxoAHGEOaDTVlDKww52-/pub?gid=0&single=true&output=tsv",
  { cache: "no-store" }
)
  .then(response => response.text())
  .then(data => {
    data = data.split(/\r?\n|\r/);
    for (let i = 1; i < data.length; i++) {
      let x = data[i].split("\t");
      let name,
        cat,
        hop,
        tel,
        map,
        desc,
        other = "";
      name = x[0];
      cat = x[1];
      hop = x[2];
      tel = x[3];
      map = x[4];
      desc = x[5];
      other = x[6];
      let tags = "";
      if (hop !== "") {
        tags = "Hours";
      }
      if (tel !== "") {
        tel = `<a class="red darken-3 btn" href="tel:${tel}">${tel}</a>`;
        tags += " Call";
      }
      if (map !== "") {
        map = `<a class="red darken-3 btn" target="_blank" href="${map}">Directions</a>`;
        tags += " Directions";
      }
      let y = document.createElement("LI");
      y.innerHTML = `
            <div class="collapsible-header">${name}<span class="badge">${tags}</span></div>
            <div class="collapsible-body">
              <div class="section"><span>${tel} ${map}</span></div>
              <div class="section ">${desc}</div>
              <div class="section">${hop}</div>
              <div class="section">${other}</div>
            </div>
      `;
      document.getElementById(`${contacts.id}_list`).appendChild(y);
    }
    M.AutoInit();
    searchUrl();
  });
