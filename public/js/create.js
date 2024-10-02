function get(id) {
    return document.getElementById(id);
}

const elements = {
    form: {
        title: get("js-title"),
        articleCount: get("js-article-count"),
        reason: get("js-reason"),
        proposedBy: get("js-proposed-by"),
        date: {
            month: get("js-date-month"),
            day: get("js-date-day"),
            year: get("js-date-year"),
        },
        type: get("js-type"),
        docLink: get("js-doclink"),
    },
    editor: {
        submit: get("js-editor-submit"),
        resources: {
            span: get("js-editor-resources"),
            buttonAdd: get("js-editor-resource-add"),
            buttonRemove: get("js-editor-resource-remove"),
        },
    },
};

let resourceCount = 0;
elements.editor.resources.buttonAdd.onclick = () => {
    resourceCount++;
    elements.editor.resources.span.innerHTML += `
        <span>
            <small><b>Resource ${resourceCount} Google Doc Link</b></small><br/>
            <input required="true" type="text" placeholder="https://docs.google.com/document/d/1aFao0XOHGyYnJ2llA8WA7igzXHqnW1YzT8LdQb12SG8" style="width: 75%;" />
            <br/>
        </span>
    `;
};
elements.editor.resources.buttonRemove.onclick = () => {
    const lastChild =
        elements.editor.resources.span.children[
        elements.editor.resources.span.children.length - 1
        ];
    if (lastChild) {
        lastChild.remove();
        resourceCount--;
    }
};

elements.editor.submit.onclick = () => {
    const f = elements.form;

    let data = {
        title: f.title.value.trim(),
        articleCount: f.articleCount.value,
        reason: f.reason.value.trim().toLowerCase().replace(/\.$/, ""),
        proposedBy: f.proposedBy.value.trim().replace(" ", ""),
        date: {
            month: f.date.month.value.trim(),
            day: f.date.day.value.trim(),
            year: f.date.year.value.trim(),
        },
        type: f.type.value.trim(),
        docLink: f.docLink.value.trim().replace("/edit", ""),
    };

    function validateData(data) {
        if (!data.title) throw new Error("Title is required.");
        if (!data.articleCount) throw new Error("Article count is required.");
        if (!data.reason) throw new Error("Reason is required.");
        if (!data.proposedBy) throw new Error("Proposed by is required.");
        if (!data.date.month) throw new Error("Month is required.");
        if (!data.date.day) throw new Error("Day is required.");
        if (!data.date.year) throw new Error("Year is required.");
        if (!data.type) throw new Error("Type is required.");
        if (!data.docLink) throw new Error("Document link is required.");
    }

    try {
        validateData(data);
    } catch (error) {
        alert(error.message);
        return;
    }

    data.resources = [];
    const domResourcesChildren = elements.editor.resources.span.children;

    for (let i = 0; i < domResourcesChildren.length; i++) {
        const inputElement = domResourcesChildren[i].querySelector("input");
        if (inputElement) {
            const doclink = inputElement.value;
            data.resources.push({
                rnum: i + 1,
                doclink: doclink,
            });
        }
    }
    console.log(JSON.stringify(data));

    generateQrCode(data);
};

function generateQrCode(json) {
    const place = get("code-here");

    place.style.display = 'block';

    const qrcode = new QRCode(place, {
        text: JSON.stringify(json),
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.L
    });
}