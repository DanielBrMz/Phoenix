import minDoc from 'min-document';

type TopLevelType = {
    '__GLOBAL_DOCUMENT_CACHE@4'?: Document;
}

let topLevel: TopLevelType = typeof global !== 'undefined' ? global as TopLevelType :
    typeof window !== 'undefined' ? window as TopLevelType : {}
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
