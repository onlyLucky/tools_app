import { PROJECT_NAME } from '@/config/setting.ts';

/**
 * 修改浏览器标题
 * @param title 标题
 */
export function setPageTitle(title: any) {
  const names = [];
  if (title) {
    names.push(title);
  }
  if (PROJECT_NAME) {
    names.push(PROJECT_NAME);
  }
  document.title = names.join(' - ');
}
