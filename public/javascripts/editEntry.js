function populateForm() {
    let prKyInput = document.getElementById('prKy');
    let vndNmInput = document.getElementById('vndNm');
    let ediNmInput = document.getElementById('ediNm');
    let issuDtInput = document.getElementById('issuDt');
    let ndNwCtInput = document.getElementById('ndNwCt');
    let updtwLtstInput = document.getElementById('updtwLtst');
    let rptrInput = document.getElementById('rptr');
    let cmntInput = document.getElementById('cmnt');

    prKyInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[0];
    vndNmInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[1];
    ediNmInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[2];
    issuDtInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[3];
    ndNwCtInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[4];
    updtwLtstInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[5];
    rptrInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[6];
    cmntInput.value = JSON.parse(localStorage.getItem("clickedRowData"))[7];
}
populateForm();