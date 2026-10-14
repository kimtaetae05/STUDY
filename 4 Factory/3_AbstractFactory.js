// 3단계: 추상 팩토리
// - DocumentFactory가 "요소 세트(제목, 문단, 코드, 링크)"를 만드는 인터페이스를 정의한다.
// - 구체 팩토리 하나는 한 포맷의 요소만 만들기 때문에, 포맷이 섞일 수 없다.
// - Document는 어떤 포맷인지 모른 채 팩토리만 받아서 사용한다.

// ---------- 제품군(Products): 구체 요소 클래스 ----------
class MarkdownHeading {
  constructor(text) { this.text = text; }
  render() { return `# ${this.text}`; }
}
class MarkdownParagraph {
  constructor(text) { this.text = text; }
  render() { return this.text; }
}
class MarkdownCode {
  constructor(code) { this.code = code; }
  render() { return "```\n" + this.code + "\n```"; }
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
  constructor(code) { this.code = code; }
  render() { return `<pre><code>${this.code}</code></pre>`; }
}
class HtmlLink {
  constructor(text, url) { this.text = text; this.url = url; }
  render() { return `<a href="${this.url}">${this.text}</a>`; }
}

// ---------- 추상 팩토리 ----------
// JavaScript에는 interface가 없으므로, 호출하면 에러를 던지는 메서드로 흉내 낸다.
class DocumentFactory {
  createHeading(text) { throw new Error("createHeading()을 구현해야 합니다."); }
  createParagraph(text) { throw new Error("createParagraph()를 구현해야 합니다."); }
  createCode(code) { throw new Error("createCode()을 구현해야 합니다."); }
  createLink(text, url) { throw new Error("createLink()를 구현해야 합니다."); }
}

// ---------- 구체 팩토리 ----------
class MarkdownFactory extends DocumentFactory {
  createHeading(text) { return new MarkdownHeading(text); }
  createParagraph(text) { return new MarkdownParagraph(text); }
  createCode(code) { return new MarkdownCode(code); }
  createLink(text, url) { return new MarkdownLink(text, url); }
}

class HtmlFactory extends DocumentFactory {
  createHeading(text) { return new HtmlHeading(text); }
  createParagraph(text) { return new HtmlParagraph(text); }
  createCode(code) { return new HtmlCode(code); }
  createLink(text, url) { return new HtmlLink(text, url); }
}

// ---------- 클라이언트: 포맷을 전혀 모른다 ----------
class Document {
  constructor(factory) {
    this.factory = factory;
    this.elements = [];
  }

  addHeading(text) {
    this.elements.push(this.factory.createHeading(text));
    return this;
  }
  addParagraph(text) {
    this.elements.push(this.factory.createParagraph(text));
    return this;
  }
  addCode(code) {
    this.elements.push(this.factory.createCode(code));
    return this;
  }
  addLink(text, url) {
    this.elements.push(this.factory.createLink(text, url));
    return this;
  }

  render() {
    return this.elements.map((e) => e.render()).join("\n");
  }
}

// ---------- 사용하는 쪽 ----------
function buildDocument(factory) {
  return new Document(factory)
    .addHeading("팩토리 패턴 정리")
    .addParagraph("객체 생성을 캡슐화하는 패턴입니다.")
    .addCode('console.log("hello");')
    .addLink("헤드퍼스트 디자인 패턴", "https://example.com");
}

console.log("===== Markdown =====");
console.log(buildDocument(new MarkdownFactory()).render());

console.log("\n===== HTML =====");
console.log(buildDocument(new HtmlFactory()).render());

// [해결된 것]
// - 문서를 만드는 코드(buildDocument)는 그대로 두고, 팩토리 한 줄만 바꾸면 포맷이 통째로 바뀐다.
// - 한 팩토리는 한 포맷의 요소만 만들기 때문에 포맷이 섞이지 않는다.
// - LaTeX 추가: LatexFactory + Latex 요소 클래스만 만들면 된다. 기존 코드는 수정하지 않는다.
//
// [트레이드오프]
// - 요소 종류(예: 이미지)를 새로 추가하려면 DocumentFactory와 모든 구체 팩토리를 수정해야 한다.
//   (추상 팩토리는 "포맷 추가"에는 강하지만 "요소 종류 추가"에는 약하다.)
