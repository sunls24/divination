export function animateChildren(
  container: Element,
  duration: number = 300,
  easing: string = "ease-out",
) {
  interface ItemInfo {
    element: Element;

    x: number;
    y: number;
    width: number;
    height: number;
  }

  function getItemInfos(container: Element): ItemInfo[] {
    return Array.from(container.children).map((item) => {
      const rect = item.getBoundingClientRect();
      return {
        element: item,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
  }

  function animateItems(oldItems: ItemInfo[], newItems: ItemInfo[]) {
    for (const newItem of newItems) {
      if (newItem.element.className.includes("ignore-animate")) {
        continue;
      }

      let oldItem = oldItems.find((e) => e.element == newItem.element);
      if (!oldItem) {
        oldItem = {
          element: newItem.element,
          x: newItem.x,
          y: newItem.y,
          height: newItem.height / 1.5,
          width: newItem.width / 1.5,
        };
      }

      const translateX = oldItem.x - newItem.x;
      const translateY = oldItem.y - newItem.y;
      const scaleX = oldItem.width / newItem.width;
      const scaleY = oldItem.height / newItem.height;
      newItem.element.animate(
        [
          {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          },
          { transform: "none" },
        ],
        { duration: duration, easing: easing },
      );
    }
  }

  let oldItemInfos = getItemInfos(container);
  const observer = new MutationObserver(function (
    mutations: MutationRecord[],
    observer: MutationObserver,
  ) {
    const newItemInfos = getItemInfos(container);
    if (oldItemInfos) {
      animateItems(oldItemInfos, newItemInfos);
    }
    oldItemInfos = newItemInfos;
  });
  observer.observe(container, { childList: true });
  return observer;
}
