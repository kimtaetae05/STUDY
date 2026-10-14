// 1단계: 심플 팩토리
// - 요소 생성 로직을 ElementFactory 한 곳으로 분리했다.
// - 아직 "패턴"이라기보다 생성 코드를 모아둔 관용구에 가깝다.

// ---------- 제품(Product): 요소 클래스 ----------
class MarkdownHeading {
  constructor(text) { this.text = text; }
  render() { return `# ${this.text}`; }
}
class MarkdownParagraph {
  constructor(text) { this.text = text; }
  render() { return this.text; }
}
class MarkdownCode {
  constructor(text) { this.text = text; }
  render() { return "```\n" + this.text + "\n```"; }
}
class MarkdownLink {
  constructor(text, url) { this.text = text; this.url = url; }
  render() { return `[${this.text}](${this.url})`; }
}

class HtmlHeading {
  constructor(text) { this.text = text; }
  render() { return `<h1>${this.text}</h1>`; }
}
class HtmlParagraph {
  constructor(text) { this.text = text; }
  render() { return `<p>${this.text}</p>`; }
}
class HtmlCode {
  constructor(text) { this.text = text; }
  render() { return `<pre><code>${this.text}</code></pre>`; }
}
class HtmlLink {
  constructor(text, url) { this.text = text; this.url = url; }
  render() { return `<a href="${this.url}">${this.text}</a>`; }
}

// ---------- 심플 팩토리 ----------
// 포맷 + 요소 종류를 받아서 알맞은 객체를 만들어 준다.
class ElementFactory {
  static create(format, type, text, url) {
    if (format === "markdown") {
      if (type === "heading") return new MarkdownHeading(text);
      if (type === "paragraph") return new MarkdownParagraph(text);
      if (type === "code") return new MarkdownCode(text);
      if (type === "link") return new MarkdownLink(text, url);
    } else if (format === "html") {
      if (type === "heading") return new HtmlHeading(text);
      if (type === "paragraph") return new HtmlParagraph(text);
      if (type === "code") return new HtmlCode(text);
      if (type === "link") return new HtmlLink(text, url);
    }
    throw new Error(`지원하지 않는 조합입니다: ${format} / ${type}`);
  }
}

// ---------- 사용하는 쪽 ----------
const data = [
  { type: "heading", text: "팩토리 패턴 정리" },
  { type: "paragraph", text: "객체 생성을 캡슐화하는 패턴입니다." },
  { type: "code", text: 'console.log("hello");' },
  { type: "link", text: "헤드퍼스트 디자인 패턴", url: "https://example.com" },
];

function exportDocument(data, format) {
  return data
    .map((el) => ElementFactory.create(format, el.type, el.text, el.url))
    .map((element) => element.render())
    .join("\n");
}

console.log("===== Markdown =====");
console.log(exportDocument(data, "markdown"));

console.log("\n===== HTML =====");
console.log(exportDocument(data, "html"));

console.log("\n===== 오류 작동 확인 =====");
console.log(exportDocument(data, "hmtl"));
// [한계]
// - LaTeX를 추가하려면 ElementFactory.create 안에 else if 블록을 또 넣어야 한다. (기존 코드 수정)
// - 요소 종류가 늘 때마다 포맷별 분기를 전부 고쳐야 한다.
