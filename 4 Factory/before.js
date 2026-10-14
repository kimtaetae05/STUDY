// 패턴 적용 전 버전

// 문서 내용 (포맷과 무관한 데이터 -> const 정의함)
const document = [
    { type: "heading", text: "팩토리 패턴 정리" },
    { type: "paragraph", text: "객체 생성을 캡슐화하는 패턴입니다." },
    { type: "code", text: 'console.log("hello");' },
    { type: "link", text: "헤드퍼스트 디자인 패턴", url: "https://example.com" }
];

// 문서를 '지정한 포맷'으로 변환
function exportDocument(elements, format) {
    const result = [];

    for (const el of elements) {
        if (format === "markdown") {
            if (el.type === "heading") {
                result.push(`# ${el.text}`);
            } else if (el.type === "paragraph") {
                result.push(el.text);
            } else if (el.type === "code") {
                result.push("```\n" + el.text + "\n```");
            } else if (el.type === "link") {
                result.push(`[${el.text}](${el.url})`);
            }
        } else if (format === "html") {
            if (el.type === "heading") {
                result.push(`<h1>${el.text}</h1>`);
            } else if (el.type === "paragraph") {
                result.push(`<p>${el.text}</p>`);
            } else if (el.type === "code") {
                result.push(`<pre><code>${el.text}</code></pre>`);
            } else if (el.type === "link") {
                result.push(`<a href="${el.url}">${el.text}</a>`);
            }
        }
    }

    return result.join("\n");
}

console.log("===== Markdown =====");
console.log(exportDocument(document, "markdown"));

console.log("\n===== HTML =====");
console.log(exportDocument(document, "html"));