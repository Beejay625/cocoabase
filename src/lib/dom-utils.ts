export const getElementById = (id: string): HTMLElement | null => {
  if (typeof document === "undefined") return null;
  return document.getElementById(id);
};

export const getElementsByClassName = (className: string): HTMLCollectionOf<Element> => {
  if (typeof document === "undefined") return [] as unknown as HTMLCollectionOf<Element>;
  return document.getElementsByClassName(className);
};

export const querySelector = <T extends Element = Element>(selector: string): T | null => {
  if (typeof document === "undefined") return null;
  return document.querySelector<T>(selector);
};

export const querySelectorAll = <T extends Element = Element>(selector: string): NodeListOf<T> => {
  if (typeof document === "undefined") return [] as unknown as NodeListOf<T>;
  return document.querySelectorAll<T>(selector);
};

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attributes?: Record<string, string>,
  children?: (string | Node)[]
): HTMLElementTagNameMap[T] => {
  if (typeof document === "undefined") {
    throw new Error("Document is not available");
  }
  const element = document.createElement(tag);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
};

export const removeElement = (element: Element | null): void => {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

export const addClass = (element: Element | null, className: string): void => {
  if (element) {
    element.classList.add(className);
  }
};

export const removeClass = (element: Element | null, className: string): void => {
  if (element) {
    element.classList.remove(className);
  }
};

export const toggleClass = (element: Element | null, className: string): void => {
  if (element) {
    element.classList.toggle(className);
  }
};

export const hasClass = (element: Element | null, className: string): boolean => {
  return element?.classList.contains(className) || false;
};

export const setAttribute = (element: Element | null, name: string, value: string): void => {
  if (element) {
    element.setAttribute(name, value);
  }
};

export const getAttribute = (element: Element | null, name: string): string | null => {
  return element?.getAttribute(name) || null;
};

export const removeAttribute = (element: Element | null, name: string): void => {
  if (element) {
    element.removeAttribute(name);
  }
};

export const setStyle = (element: HTMLElement | null, styles: Partial<CSSStyleDeclaration>): void => {
  if (element) {
    Object.keys(styles).forEach((key) => {
      const value = styles[key as keyof CSSStyleDeclaration];
      if (value !== undefined && value !== null) {
        (element.style as Record<string, string>)[key] = String(value);
      }
    });
  }
};

export const getBoundingClientRect = (element: Element | null): DOMRect | null => {
  return element?.getBoundingClientRect() || null;
};

export const scrollIntoView = (
  element: Element | null,
  options?: ScrollIntoViewOptions
): void => {
  element?.scrollIntoView(options);
};

export const focus = (element: HTMLElement | null): void => {
  element?.focus();
};

export const blur = (element: HTMLElement | null): void => {
  element?.blur();
};

export const click = (element: HTMLElement | null): void => {
  element?.click();
};

export const getTextContent = (element: Element | null): string => {
  return element?.textContent || "";
};

export const setTextContent = (element: Element | null, text: string): void => {
  if (element) {
    element.textContent = text;
  }
};

export const getInnerHTML = (element: Element | null): string => {
  return element?.innerHTML || "";
};

export const setInnerHTML = (element: Element | null, html: string): void => {
  if (element) {
    element.innerHTML = html;
  }
};

export const appendChild = (parent: Element | null, child: Node): void => {
  parent?.appendChild(child);
};

export const removeChild = (parent: Element | null, child: Node): void => {
  if (parent && child.parentNode === parent) {
    parent.removeChild(child);
  }
};

export const insertBefore = (parent: Element | null, newChild: Node, refChild: Node | null): void => {
  if (parent) {
    parent.insertBefore(newChild, refChild);
  }
};

export const replaceChild = (parent: Element | null, newChild: Node, oldChild: Node): void => {
  if (parent && oldChild.parentNode === parent) {
    parent.replaceChild(newChild, oldChild);
  }
};

export const getParentElement = (element: Element | null): Element | null => {
  return element?.parentElement || null;
};

export const getChildren = (element: Element | null): HTMLCollection => {
  return element?.children || ([] as unknown as HTMLCollection);
};

export const getFirstChild = (element: Element | null): Element | null => {
  return element?.firstElementChild || null;
};

export const getLastChild = (element: Element | null): Element | null => {
  return element?.lastElementChild || null;
};

export const getNextSibling = (element: Element | null): Element | null => {
  return element?.nextElementSibling || null;
};

export const getPreviousSibling = (element: Element | null): Element | null => {
  return element?.previousElementSibling || null;
};

export const matches = (element: Element | null, selector: string): boolean => {
  return element?.matches(selector) || false;
};

export const closest = <T extends Element = Element>(
  element: Element | null,
  selector: string
): T | null => {
  return element?.closest<T>(selector) || null;
};

export const observeMutation = (
  target: Node,
  callback: (mutations: MutationRecord[]) => void,
  options?: MutationObserverInit
): () => void => {
  const observer = new MutationObserver(callback);
  observer.observe(target, options);
  return () => observer.disconnect();
};

export const observeIntersection = (
  target: Element,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): () => void => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);
  return () => observer.disconnect();
};

export const observeResize = (
  target: Element,
  callback: (entries: ResizeObserverEntry[]) => void
): () => void => {
  const observer = new ResizeObserver(callback);
  observer.observe(target);
  return () => observer.disconnect();
};

export const waitForElement = (
  selector: string,
  timeout: number = 5000
): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const element = querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
};

export const isVisible = (element: Element | null): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

export const isInViewport = (element: Element | null): boolean => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
};

export const getComputedStyle = (element: Element | null): CSSStyleDeclaration | null => {
  if (typeof window === "undefined" || !element) return null;
  return window.getComputedStyle(element);
};

export const getComputedProperty = (element: Element | null, property: string): string => {
  if (!element) return "";
  const style = getComputedStyle(element);
  return style?.getPropertyValue(property) || "";
};

export const setComputedProperty = (element: HTMLElement | null, property: string, value: string): void => {
  if (element) {
    element.style.setProperty(property, value);
  }
};

