export function onCollapsible(e: React.MouseEvent) {
  const content: any = e.currentTarget.nextElementSibling;
  if (content && content.classList.contains("collapsibleContent")) {
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
