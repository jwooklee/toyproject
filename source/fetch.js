const url = "http://likelion-11th-uno.kro.kr:8000/";
const container = document.querySelector("#container");

//전체 방명록 조회
async function getData() {
  const response = await fetch(url);
  const fetchData = await response.json();
  console.log(fetchData);
  const datas = fetchData.data;
  display(datas);
}

function display(datas) {
  const listContainer = document.querySelector("#listContainer");
  listContainer.innerHTML = "";
  const list = document.createElement("div");
  list.classList.add("list");
  listContainer.appendChild(list);
  let str = " ";
  datas.forEach((data) => {
    const table = document.createElement("table");
    const row1 = document.createElement("tr");
    const header1 = document.createElement("th");
    header1.textContent = "작성자";
    const cell1 = document.createElement("td");
    cell1.textContent = data.writer;
    row1.appendChild(header1);
    row1.appendChild(cell1);
    table.appendChild(row1);

    const row2 = document.createElement("tr");
    const header2 = document.createElement("th");
    header2.textContent = "내용";
    const cell2 = document.createElement("td");
    cell2.textContent = data.content;
    row2.appendChild(header2);
    row2.appendChild(cell2);
    table.appendChild(row2);

    const button = document.createElement("button");
    button.id = "deleteButton";
    button.textContent = "삭제";
    button.addEventListener("click", () => {
      console.log(data);
      deleteData(data.id);
    });
    // 여기에 버튼에 대한 이벤트 리스너를 추가할 수 있다
    // button.addEventListener("click", () => {
    //   // 삭제 버튼을 눌렀을 때 수행할 동작을 여기에 작성
    // });

    const row3 = document.createElement("tr");
    const cell3 = document.createElement("td");
    cell3.setAttribute("colspan", "2");
    cell3.appendChild(button);
    row3.appendChild(cell3);
    table.appendChild(row3);

    list.appendChild(table);
  });
  listContainer.appendChild(list);
}

/*function display(datas) {
  const listContainer = document.querySelector("#listContainer");
  listContainer.innerHTML = ""; //비워놓고 다시 처음부터 끝까지 불러오는거라 목록 여러번 눌러도 한번만 뜨게함
  const list = document.createElement("div");
  list.classList.add("list");
  listContainer.appendChild(list);
  let str = " ";
  datas.forEach((data) => {
    str += `<table><tr><th>작성자</th><td>${data.writer}</td></tr>
		<tr><th>내용</th><td>${data.content}</td></tr></table>
		<button>삭제</button>`;
    //<tr><th>번호</th><td>${data.id}</td></tr>
  });
  list.innerHTML = str;

  // const xButton = document.createElement("button");
  // xButton.innerText = "X";
  // xButton.id = "bttn2";
  // datas.forEach((data) => {
  //   deleteButton = `${xButton}`;
  // });
  // list.appendChild(deleteButton);

  // button.style.display = "none";
  // list.appendChild(xButton);
}*/

//방명록 생성
async function postData() {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      writer: document.getElementById("writer").value,
      content: document.getElementById("content").value,
    }),
  });
  const fetchData = await response.json();
  console.log(fetchData);
  const datas = fetchData.data;
}

//방명록 삭제
async function deleteData(id) {
  const url = `http://likelion-11th-uno.kro.kr:8000/delete/${id}/`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const fetchData = await response.json();
  console.log(fetchData);
  const datas = fetchData.data;
}

const listButton = document.getElementById("listButton");
listButton.addEventListener("click", getData);

const submitButton = document.querySelector("button");
submitButton.addEventListener("click", postData, getData);
