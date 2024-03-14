import { generate } from "@ant-design/colors";
function changeColor(color: string | undefined, dark: boolean) {
  const $html = document.documentElement;
  if (!$html) {
    return;
  }
  const id = "ele-theme-var";
  const elem = document.getElementById(id);
  // == null ? void 0 : elem.parentNode
  if (elem) {
    elem.parentNode?.removeChild(elem);
  }
  if (color) {
    const colors = generate(color, dark ? { theme: "dark" } : {});
    const selector = dark ? "html.dark" : ":root";
    const elem2 = document.createElement("style");
    elem2.id = id;
    elem2.setAttribute("type", "text/css");
    elem2.innerHTML = [
      `${selector}{`,
      `--el-color-primary:${color};`,
      `--el-color-primary-light-3:${colors[4]};`,
      `--el-color-primary-light-5:${colors[3]};`,
      `--el-color-primary-light-7:${colors[2]};`,
      `--el-color-primary-light-8:${colors[1]};`,
      `--el-color-primary-light-9:${colors[0]};`,
      `--el-color-primary-dark-2:${colors[6]};`,
      "}"
    ].join("");
    document.head.appendChild(elem2);
    $html.dataset.color = color;
  } else {
    $html.removeAttribute("data-color");
  }
  if (dark) {
    $html.classList.add("dark");
  } else {
    $html.classList.remove("dark");
  }
}
export {
  changeColor
};
