const app = document.getElementById("app");

app.innerHTML = `<form>
<div class="form-row">
<div class="form-group col-md-6">
  <label for="exampleInputEmail1">Quá trình</label>
  <input type="text" class="form-control" id="qt" aria-describedby="emailHelp" placeholder="Nhập điểm quá trình (nếu có)" required>
</div>
<div class="form-group col-md-6">
  <label for="exampleInputEmail1">Hệ số</label>
  <input type="text" class="form-control" id="hsqt" aria-describedby="emailHelp" placeholder="Nhập hệ số" required>
</div>
</div>
<div class="form-row">
<div class="form-group col-md-6"">
  <label for="exampleInputPassword1">Giữa kỳ</label>
  <input type="text" class="form-control" id="gk" placeholder="Nhập điểm giữa kỳ (nếu có)" required>
  </div>
  <div class="form-group col-md-6">
  <label for="exampleInputEmail1">Hệ số</label>
  <input type="text" class="form-control" id="hsgk" aria-describedby="emailHelp" placeholder="Nhập hệ số" required>
</div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
  <label for="exampleInputPassword1">Cuối kỳ</label>
  <input type="text" class="form-control" id="ck" placeholder="Nhập điểm cuối kỳ (nếu có)" required>
  </div>
  <div class="form-group col-md-6">
  <label for="exampleInputEmail1">Hệ số</label>
  <input type="text" class="form-control" id="hsck" aria-describedby="emailHelp" placeholder="Nhập hệ số" required>
</div>
  </div>
  <div class="form-group">
  <label for="inputState">Mục tiêu</label>
  <select id="inputState" class="form-control">
    <option selected>Chọn kiểu tính</option>
    <option>Tính điểm qua môn</option>
    <option>Tính điểm Tổng kết</option>
  </select>
</div>
<button id ="btnTinh" type="button" class="btn btn-primary">Tính</button>
<div class="form-group">
    <label for="exampleFormControlTextarea1">kết quả:</label>
    <textarea class="form-control" id="result" rows="3" readonly></textarea>
  </div>
</form>`

let qt = document.getElementById("qt");
let gk = document.getElementById("gk");
let ck = document.getElementById("ck");
let hsqt = document.getElementById("hsqt");
let hsgk = document.getElementById("hsgk");
let hsck = document.getElementById("hsck");
let kq = document.getElementById("inputState");
let tinh = document.getElementById("btnTinh");
let result = document.getElementById("result");
let kind = document.getElementById("inputState");

function chuyenDoi(num) {
    if (num < 1) {
        return num;
    } else {
        return num / 100;
    }
}

tinh.addEventListener("click", () => {
    if (kind.value === "Tính điểm qua môn") {
        if (qt.value !== "" && gk.value !== "" && hsqt.value !== "" && hsgk.value !== "") {
            let qtNum = parseFloat(qt.value);
            let gkNum = parseFloat(gk.value);
            let hsqtNum = parseFloat(hsqt.value);
            let hsgkNum = parseFloat(hsgk.value);
            if (
                (chuyenDoi(hsqtNum) + chuyenDoi(hsgkNum) <= 1) &&
                (qtNum <= 10 && qtNum > 0 && gkNum <= 10 && gkNum > 0) &&
                (hsgkNum > 0.0 && hsqtNum > 0.0)
            ) {
                let dqm = (4 - ((qtNum * chuyenDoi(hsqtNum)) + (gkNum * chuyenDoi(hsgkNum)))) / (1 - (chuyenDoi(hsgkNum) + chuyenDoi(hsqtNum)));
                if (dqm >= 0) {
                    result.innerText = "Điểm cuối kỳ cần để qua môn: " + dqm;
                }
                else {
                    result.innerText = "Dư điểm qua môn";
                }
            }
            else {
                alert("Hãy nhập đúng và đủ các mục mục điểm và hệ số tương ứng!!!");
            }
        }
        else {
            alert("Hãy nhập đúng và đủ các mục mục điểm và hệ số tương ứng!!!");
        }
    }
    else if (kind.value === "Tính điểm Tổng kết") {
        if (qt.value !== "" && gk.value !== "" && hsqt.value !== "" && hsgk.value !== "" && ck.value !== "" && hsck.value !== "") {
            let qtNum = parseFloat(qt.value);
            let gkNum = parseFloat(gk.value);
            let ckNum = parseFloat(ck.value);
            let hsqtNum = parseFloat(hsqt.value);
            let hsgkNum = parseFloat(hsgk.value);
            let hsckNum = parseFloat(hsck.value);
            if (
                (chuyenDoi(hsqtNum) + chuyenDoi(hsgkNum) + chuyenDoi(hsckNum) === 1.0) &&
                (qtNum > 0 && gkNum > 0 && ckNum > 0) &&
                (qtNum <= 10 && gkNum <= 10 && ckNum <= 10) &&
                (hsgkNum > 0.0 && hsqtNum > 0.0 && hsckNum > 0.0)
            ) {
                let dtk = qtNum * chuyenDoi(hsqtNum) + gkNum * chuyenDoi(hsgkNum) + ckNum * chuyenDoi(hsckNum);
                result.innerText = "Điểm Tổng kết: " + dtk;
            }
            else {
                alert("Hãy nhập đúng và đủ các mục mục điểm và hệ số tương ứng!!!");
            }
        } else {
            alert("Hãy nhập đúng và đủ các mục mục điểm và hệ số tương ứng!!!");
        }
    }
    else {
        alert("Hãy chọn mục tiêu tính!!!");
    }
})