// 2단계: 팩토리 메서드
// - Exporter(추상 클래스)가 내보내기의 "전체 흐름"을 정의한다.
// - 요소를 "어떻게 만들지"(createElement)는 서브클래스가 결정한다.
// - 포맷을 추가할 때는 서브클래스만 새로 만들면 된다. (기존 코드 수정 없음)

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

// ---------- 창조자(Creator): 추상 클래스 ----------
class Exporter {
  // 템플릿 메서드: 전체 흐름은 여기서 고정한다.
  export(data) {
    return data
      .map((el) => this.createElement(el.type, el.text, el.url).render())
      .join("\n");
  }

  // 팩토리 메서드: 서브클래스가 반드시 구현해야 한다.
  createElement(type, text, url) {
    throw new Error("createElement()를 구현해야 합니다.");
  }
}

// ---------- 구체 창조자(Concrete Creator) ----------
class MarkdownExporter extends Exporter {
  // 재정의함
  createElement(type, text, url) {
    switch (type) {
      case "heading": return new MarkdownHeading(text);
      case "paragraph": return new MarkdownParagraph(text);
      case "code": return new MarkdownCode(text);
      case "link": return new MarkdownLink(text, url);
      default: throw new Error(`지원하지 않는 요소: ${type}`);
    }
  }
}

class HtmlExporter extends Exporter {
  // 재정의함
  createElement(type, text, url) {
    switch (type) {
      case "heading": return new HtmlHeading(text);
      case "paragraph": return new HtmlParagraph(text);
      case "code": return new HtmlCode(text);
      case "link": return new HtmlLink(text, url);
      default: throw new Error(`지원하지 않는 요소: ${type}`);
    }
  }
}

// ---------- 사용하는 쪽 ----------
const data = [
  { type: "heading", text: "팩토리 패턴 정리" },
  { type: "paragraph", text: "객체 생성을 캡슐화하는 패턴입니다." },
  { type: "code", text: 'console.log("hello");' },
  { type: "link", text: "헤드퍼스트 디자인 패턴", url: "https://example.com" },
];

console.log("===== Markdown =====");
console.log(new MarkdownExporter().export(data));

console.log("\n===== HTML =====");
console.log(new HtmlExporter().export(data));

// [해결된 것]
// - LaTeX 추가: LatexExporter 서브클래스만 만들면 된다. Exporter는 수정하지 않는다.

// [남은 한계]
// - 요소를 하나씩 따로 만들기 때문에, "한 문서 안에서 포맷이 섞이지 않는다"는 보장이 없다.
//   예) HtmlExporter 안에서 실수로 MarkdownLink를 만들어도 막을 방법이 없다.
