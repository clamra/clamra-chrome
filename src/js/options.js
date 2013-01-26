// 将该脚本保存为“options.js”
// 将选项保存至 localStorage.
var CONST_STORAGE_EMAIL = "__STORAGE_EMAIL__";
var CONST_STORAGE_API_KEY = "__STORAGE_API_KEY__";
function save_options() {
    
  localStorage["favorite_color"] = color;
}

// 从保存在 localStorage 中的值恢复选定的内容。
function restore_options() {
  var favorite = localStorage["favorite_color"];

}
document.addEventListener('DOMContentReady', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
