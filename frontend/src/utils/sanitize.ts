import DOMPurify from 'dompurify';

const defaultOptions = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'a', 'img', 'blockquote', 'pre', 'code', 'span', 'div',
    'svg', 'path', 'g', 'rect', 'circle', 'line', 'polyline', 'polygon'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'class', 'style', 'target', 'rel',
    'd', 'fill', 'stroke', 'stroke-width', 'viewBox', 'width', 'height', 'xmlns'
  ],
  ADD_ATTR: ['target'],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
};

export function sanitizeHTML(html: string, options: any = defaultOptions): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, options) as any;
}
