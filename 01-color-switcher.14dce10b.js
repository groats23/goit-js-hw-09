!function(){var t=document.body,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),r=null;e.addEventListener("click",(function(){r=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.setAttribute("disabled",!0),n.removeAttribute("disabled")})),n.addEventListener("click",(function(){clearInterval(r),e.removeAttribute("disabled"),n.setAttribute("disabled",!0)})),n.setAttribute("disabled",!0)}();
//# sourceMappingURL=01-color-switcher.14dce10b.js.map
