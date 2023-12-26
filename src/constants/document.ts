import minDoc from 'min-document';

let topLevel: typeof global | typeof window | {} = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
let doccy: Document | undefined;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] as Document;

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

export default doccy;